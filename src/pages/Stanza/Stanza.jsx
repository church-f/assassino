import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiFetch } from "../../api";
import { io } from "socket.io-client";
import Gioco from "./Gioco.jsx";
import Attesa from "./Attesa.jsx";

import {
    Box,
    Button,
    Chip,
    CircularProgress,
    Container,
    Divider,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import AvatarIcon from "../../components/AvatarIcon.jsx";

import { useLottieQueue } from "./UsesLottieQueue";
import { EntryLottieOverlay } from "./EntryLottieOverlay";

const url = import.meta.env.VITE_API_URL;

export default function Stanza() {
    const { roomCode } = useParams();
    const [room, setRoom] = useState(null);
    const playerId = localStorage.getItem("playerId");
    const isAdmin = JSON.parse(localStorage.getItem("isAdmin") || "false");

    const q = useLottieQueue();

    

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
            socket.on("room-updated", (room) => setRoom(room));
            socket.on('room-joined', (payload) => {
                q.enqueue({ type: payload.entrata, playerId: payload.playerId, name: payload.playerName });
            })
        });

        // 2) apri il socket e ti associ con roomCode + playerId
        // const socket = io("/", {
        //   auth: { roomCode, playerId },
        // });
        // socket.on("room-updated", (room) => setRoom(room));
        // socket.on("role-assigned", (payload) => { ... });

        // return () => socket.disconnect();
    }, [roomCode, playerId]);

    if (!room)
        return (
            <Box
                sx={{
                    minHeight: "100vh",
                    bgcolor: "secondary.main",
                    color: "primary.main",
                    display: "grid",
                    placeItems: "center",
                    p: 2,
                }}
            >
                <Paper
                    elevation={0}
                    sx={{
                        p: 3,
                        borderRadius: 4,
                        bgcolor: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        width: "100%",
                        maxWidth: 420,
                    }}
                >
                    <Stack direction="row" spacing={2} alignItems="center">
                        <CircularProgress size={22} />
                        <Box>
                            <Typography sx={{ fontWeight: 900, fontSize: 16 }}>
                                Caricamento stanza…
                            </Typography>
                            <Typography sx={{ opacity: 0.75, fontSize: 13 }}>
                                Recupero dati e connessione…
                            </Typography>
                        </Box>
                    </Stack>
                </Paper>
            </Box>
        );

    function startGame() {
        apiFetch(`/rooms/${roomCode}/start`, { method: "POST" });
    }


    function getColor(num){
        return window.Enums.colors[num];
    }

    function getContent() {
        let isWaiting = room.players.find((p) => p.playerId === playerId)?.isWaiting;

        if (room.status === "in-game" && !isWaiting) {
            return <Gioco room={room} playerId={playerId} />;
        } else if (room.status === "in-game" && isWaiting) {
            return <Attesa room={room} playerId={playerId} />;
        }

        // LOBBY (stessa logica di prima, UI migliorata)    
        const connectedCount = room.players.length;

        return (
            <>
                <EntryLottieOverlay
                    item={q.current}
                    onDone={q.done}
                />

                <Box
                    sx={{
                        minHeight: "100vh",
                        bgcolor: "secondary.main",
                        color: "primary.main",
                        py: 3,
                    }}
                >
                    <Container maxWidth="sm" sx={{ px: 2 }}>
                        {/* Header */}
                        <Stack spacing={1.2} sx={{ mb: 2 }}>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <MeetingRoomOutlinedIcon sx={{ opacity: 0.8 }} />
                                <Typography sx={{ fontWeight: 950, fontSize: 20, letterSpacing: -0.3 }}>
                                    Stanza
                                </Typography>

                                <Chip
                                    label={roomCode}
                                    sx={{
                                        ml: 0.5,
                                        fontWeight: 900,
                                        letterSpacing: 1,
                                        bgcolor: "rgba(255,255,255,0.10)",
                                        border: "1px solid rgba(255,255,255,0.14)",
                                        color: "primary.main",
                                    }}
                                />

                                <Box sx={{ flex: 1 }} />

                                {isAdmin ? (
                                    <Chip
                                        icon={<AdminPanelSettingsOutlinedIcon />}
                                        label="Admin"
                                        sx={{
                                            fontWeight: 900,
                                            bgcolor: "rgba(255,255,255,0.10)",
                                            border: "1px solid rgba(255,255,255,0.14)",
                                            color: "primary.main",
                                            "& .MuiChip-icon": { color: "primary.main" },
                                        }}
                                    />
                                ) : null}
                            </Stack>

                            <Typography sx={{ opacity: 0.75, fontSize: 13.5 }} color="primary.secondary">
                                {connectedCount} giocatori connessi. In attesa dell’avvio…
                            </Typography>
                        </Stack>

                        {/* Card lista giocatori */}
                        <Paper
                            elevation={0}
                            sx={{
                                borderRadius: 5,
                                p: 2,
                                bgcolor: "rgba(255,255,255,0.06)",
                                border: "1px solid rgba(255,255,255,0.12)",
                            }}
                        >
                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                                <Typography sx={{ fontWeight: 950, fontSize: 14.5 }} color="primary.secondary">
                                    Giocatori
                                </Typography>
                                <Chip
                                    size="small"
                                    label={`${connectedCount}`}
                                    sx={{
                                        fontWeight: 900,
                                        bgcolor: "rgba(255,255,255,0.10)",
                                        border: "1px solid rgba(255,255,255,0.14)",
                                        color: "primary.main",
                                    }}
                                />
                            </Stack>

                            <Divider sx={{ my: 1.5, borderColor: "rgba(255,255,255,0.12)" }} />

                            <Stack spacing={1}>
                                {room.players.map((p) => {
                                    const isMe = p.playerId === playerId;

                                    return (
                                        <Paper
                                            key={p.playerId}
                                            elevation={0}
                                            sx={{
                                                p: 1.25,
                                                borderRadius: 4,
                                                bgcolor: isMe ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.04)",
                                                border: "1px solid rgba(255,255,255,0.10)",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1.2,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: 36,
                                                    height: 36,
                                                    borderRadius: 3,
                                                    display: "grid",
                                                    placeItems: "center",
                                                    bgcolor: "rgba(255,255,255,0.08)",
                                                    border: "1px solid rgba(255,255,255,0.10)",
                                                }}
                                            >
                                                {/* <PersonOutlineIcon sx={{ opacity: 0.85 }} color="chiaro" /> */}
                                                <AvatarIcon id={p.avatar} style={{ color: getColor(p.color) }} />
                                            </Box>

                                            <Box sx={{ minWidth: 0, flex: 1 }}>
                                                <Typography
                                                    sx={{
                                                        fontWeight: 900,
                                                        fontSize: 14,
                                                        whiteSpace: "nowrap",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                    }}
                                                    color={getColor(p.color)}
                                                >
                                                    {p.name}
                                                </Typography>

                                                {
                                                    isAdmin ? <Typography sx={{ opacity: 0.65, fontSize: 12 }} color="primary.secondary">
                                                        ID: {p.playerId.slice(0, 6)}…
                                                    </Typography> : null
                                                }
                                            </Box>

                                            {isMe && (
                                                <Chip
                                                    size="small"
                                                    label="Tu"
                                                    sx={{
                                                        fontWeight: 900,
                                                        bgcolor: "rgba(255,255,255,0.12)",
                                                        border: "1px solid rgba(255,255,255,0.14)",
                                                        color: "primary.main",
                                                    }}
                                                />
                                            )}
                                        </Paper>
                                    );
                                })}
                            </Stack>

                            {/* CTA Admin */}
                            {isAdmin && (
                                <Box sx={{ mt: 2 }}>
                                    <Button
                                        fullWidth
                                        onClick={startGame}
                                        startIcon={<PlayArrowRoundedIcon />}
                                        sx={{
                                            py: 1.2,
                                            borderRadius: 4,
                                            textTransform: "none",
                                            fontWeight: 950,
                                            color: "#fff",
                                            background:
                                                "linear-gradient(90deg, rgba(225,29,72,1) 0%, rgba(190,18,60,1) 45%, rgba(153,27,27,1) 100%)",
                                            boxShadow: "0 16px 46px rgba(153,27,27,0.22)",
                                            "&:hover": {
                                                boxShadow: "0 18px 52px rgba(153,27,27,0.28)",
                                                opacity: 0.98,
                                            },
                                        }}
                                    >
                                        Avvia partita
                                    </Button>

                                    <Typography sx={{ mt: 1, opacity: 0.65, fontSize: 12.5 }} color="primary.secondary">
                                        Consiglio: avvia quando tutti sono dentro.
                                    </Typography>
                                </Box>
                            )}
                        </Paper>
                    </Container>
                </Box>
            </>
        );
    }

    return <>{getContent()}</>;
}
