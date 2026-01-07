import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton } from '@mui/material';
import Divider from '@mui/material/Divider';
import { Turn as Hamburger } from 'hamburger-react'
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../api';
import { useQueryClient } from "@tanstack/react-query";
import { useMe } from '../useMe';
import { useToast } from '../components/Toast.jsx';

export default function PositionedMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const qc = useQueryClient();
    const { data: user } = useMe();
    const { showToast } = useToast();

    // const loggedUser = useSelector((state) => state.player.loggedUser);


    async function logoutSession() {
        const { csrfToken } = await apiFetch("/auth/csrf");
        await apiFetch("/auth/logout", {
            method: "POST",
            headers: { "x-csrf-token": csrfToken }
        }, ()=>{
            showToast({severity: 'success', message: "Logout effettuato con successo"});
        });
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNavigate = (path) => {
        handleClose()
        navigate(path)
    }
    const elementStyle = {
        textDecoration: 'none',
        color: 'inherit'
    }



    return (
        <div>
            <IconButton
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                aria-label='menu'
            >
                <Hamburger size={27} onToggle={(val) => { setAnchorEl(val) }} toggled={anchorEl} color="#fff"/>
                {/* <MenuIcon /> */}
            </IconButton>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            // anchorOrigin={{
            //     vertical: 'top',
            //     horizontal: 'left',
            // }}
            // transformOrigin={{
            //     vertical: 'top',
            //     horizontal: 'left',
            // }}
            >
                <MenuItem onClick={() => { handleNavigate('/home') }}>Home</MenuItem>

                <MenuItem onClick={() => { handleNavigate('/regole') }}>Regole</MenuItem>
                {/* <MenuItem onClick={()=>{handleNavigate('/about-us')}}>Chi siamo</MenuItem> */}
                <MenuItem onClick={() => { handleNavigate('/contattaci') }}>Contattaci</MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={() => { handleNavigate('/privacy-policy') }}>Privacy policy</MenuItem>
                <Divider sx={{ my: 0.5 }} />
                {user == null ? <MenuItem onClick={() => { handleNavigate('/registrati') }}>Registrati</MenuItem> : <MenuItem onClick={async () => { await logoutSession(); qc.removeQueries({ queryKey: ["me"] }); }}>Logout</MenuItem>}

                {/* <Divider sx={{ my: 0.5 }} /> */}

                {/* <Divider sx={{ my: 0.5 }} /> */}
                {/* {loggedUser != null ? <MenuItem onClick={()=>{handleNavigate('/profile')}}>{t('Profilo')}</MenuItem> :  <MenuItem onClick={()=>{handleNavigate('/login')}}>{t('Accedi')}</MenuItem>} */}
            </Menu>

        </div>
    );
}