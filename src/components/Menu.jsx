import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton } from '@mui/material';
import Divider from '@mui/material/Divider';
import { Turn as Hamburger } from 'hamburger-react'
import { useNavigate } from 'react-router-dom';

export default function PositionedMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();


    // const loggedUser = useSelector((state) => state.player.loggedUser);


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
            <Hamburger size={27} onToggle={(val)=>{setAnchorEl(val)}} toggled={anchorEl}/>
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
                <MenuItem onClick={()=>{handleNavigate('/home')}}>Home</MenuItem>
                <MenuItem onClick={()=>{handleNavigate('/registrati')}}>Registrati</MenuItem>
                <MenuItem onClick={()=>{handleNavigate('/regole')}}>Regole</MenuItem>
                {/* <MenuItem onClick={()=>{handleNavigate('/about-us')}}>Chi siamo</MenuItem> */}
                <MenuItem onClick={()=>{handleNavigate('/contattaci')}}>Contattaci</MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={()=>{handleNavigate('/privacy-policy')}}>Privacy policy</MenuItem>
                {/* <Divider sx={{ my: 0.5 }} /> */}
                
                {/* <Divider sx={{ my: 0.5 }} /> */}
                {/* {loggedUser != null ? <MenuItem onClick={()=>{handleNavigate('/profile')}}>{t('Profilo')}</MenuItem> :  <MenuItem onClick={()=>{handleNavigate('/login')}}>{t('Accedi')}</MenuItem>} */}
                </Menu>
                        
        </div>
    );
}