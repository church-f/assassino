import { use } from "react";
import { apiFetch } from "../../Api";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Invito(props) {
    const { roomCode } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if (!roomCode) {
            return;
        }
        apiFetch(`/rooms/${roomCode}/join`, {method: 'POST'}, (data, res) => {
            localStorage.setItem("roomCode", roomCode);
            localStorage.setItem("playerId", data.playerId);
            localStorage.setItem("isAdmin", JSON.stringify(false));
            navigate(`/stanza/${roomCode}`);
        })


    }, [roomCode]);
    return ''
}