import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiFetch } from "../../api";
import { io } from "socket.io-client";
import Gioco from "./Gioco.jsx";
import Attesa from "./Attesa.jsx";
const url = import.meta.env.VITE_API_URL

export default function Stanza() {
    const { roomCode } = useParams();
    const [room, setRoom] = useState(null);

    const playerId = localStorage.getItem("playerId");
    const isAdmin = JSON.parse(localStorage.getItem("isAdmin") || "false");

    useEffect(() => {
        if (!roomCode || !playerId) {
            // se manca qualcosa puoi rimandare alla home
            // navigate("/");
            return;
        }

        apiFetch(`/rooms/${roomCode}`, {}, (data, res) => {
            setRoom(data);
            const socket = io(url, {
                auth: { roomCode, playerId },
                reconnection: true,
                reconnectionAttempts: Infinity,
            });
            socket.on('connect', (a) => {
                console.log('Socket connected:', socket.id);
            })
            socket.on("room-updated", (room) => setRoom(room));
        });

        // 2) apri il socket e ti associ con roomCode + playerId
        // const socket = io("/", {
        //   auth: { roomCode, playerId },
        // });
        // socket.on("room-updated", (room) => setRoom(room));
        // socket.on("role-assigned", (payload) => { ... });

        // return () => socket.disconnect();
    }, [roomCode, playerId]);

    if (!room) return <div>Caricamento stanza...</div>;

    function startGame() {
        apiFetch(`/rooms/${roomCode}/start`, { method: "POST" });
    }

    function getContent() {
        
        let isWaiting = room.players.find(p => p.playerId === playerId)?.isWaiting;
        console.log(isWaiting);
        console.log(room);
        console.log(playerId);
        if (room.status === "in-game" && !isWaiting) {
            return <Gioco room={room} playerId={playerId} />;
        } else if (room.status === "in-game" && isWaiting) {
            return <Attesa room={room} playerId={playerId} />;
        }
        return (<>
            <h1>Stanza {roomCode}</h1>
            {isAdmin && <p>Sei l'admin di questa stanza</p>}
            {room.players.length} giocatori connessi.
            {room.players.map((p) => (
                <div key={p.playerId}>
                    {p.name} {p.playerId === playerId && "(Tu)"}
                </div>
            ))}
            {isAdmin && (<button
                onClick={startGame}
            >avvia partita</button>)}</>);
    }

    return (
        <>
            {getContent()}
        </>
    );
}
