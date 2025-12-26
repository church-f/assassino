import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Icon } from '@mui/material';
import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { apiFetch } from '../../Api.js';
import GroupsIcon from '@mui/icons-material/Groups';
import { useNavigate } from 'react-router-dom';


export default function Gioco(props) {
    const navigate = useNavigate();
    const [openEndGame, setOpenEndGame] = React.useState(false);

    const [alignment, setAlignment] = React.useState('impostore');
    const [openListPlayers, setOpenListPlayers] = React.useState(false);

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const endGame = () => {
        // chiamata API per terminare la partita
        apiFetch(`/rooms/${props.room.code}/end`, {
            method: 'POST',
            body: { winningRole: alignment },
        }, ()=>{
            navigate('/home')
        });
    }

    const leaveGame = () => {
        // chiamata API per lasciare la partita
        apiFetch(`/rooms/${props.room.code}/leave`, {
            method: 'POST',
            body: { playerId: props.playerId },
            
        });
    }
    return (
        <>
            <IconButton color='primary' onClick={()=>{setOpenListPlayers(true)}}>
                <GroupsIcon />
                <span>{props.room.players.length}</span>
            </IconButton>
            <div>Gioco in corso...</div>
            <p>{props.room.players.find(p => p.playerId === props.playerId)?.role}</p>
            {props.room.players.find(p => p.playerId === props.playerId)?.isAdmin ? <button variant="contained" color="primary" onClick={() => setOpenEndGame(true)}>Termina Partita</button> : null}
            <button variant="contained" color="secondary" onClick={leaveGame}>Lascia Partita</button>
           
           
            <Dialog open={openListPlayers} onClose={() => setOpenListPlayers(false)}>
                <DialogTitle>Lista Giocatori</DialogTitle>
                <DialogContent>
                    {props.room.players.map((p) => (
                        <div key={p.playerId}>
                            {p.name} {p.playerId === props.playerId && "(Tu)"}
                        </div>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setOpenListPlayers(false);
                    }} color="primary">
                        Chiudi
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openEndGame} onClose={() => setOpenEndGame(false)}>
                <DialogTitle>Termina Partita</DialogTitle>
                <DialogContent>
                    {/* Chi ha vinto?
                    <ToggleButtonGroup
                        value={alignment}
                        exclusive
                        onChange={handleAlignment}
                        aria-label="text alignment"
                    >
                        <ToggleButton value="impostore" aria-label="Impostore">
                            Impostore
                        </ToggleButton>
                        <ToggleButton value="cittadini" aria-label="Cittadini">
                            Cittadini
                        </ToggleButton>
                    </ToggleButtonGroup> */}
                    Terminare e iniziare una nuova partita?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEndGame(false)} color="primary">
                        Annulla
                    </Button>
                    <Button onClick={() => {
                        endGame()
                        setOpenEndGame(false);
                    }} color="primary">
                        Sì
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}