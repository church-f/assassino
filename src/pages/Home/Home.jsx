import React, { useMemo, useState } from "react";
import {
    Box,
    Button,
    Container,
    IconButton,
    InputAdornment,
    Paper,
    TextField,
    Typography,
    alpha,
    useTheme,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import KeyIcon from "@mui/icons-material/Key";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";
import { apiFetch } from "../../api";
import { useNavigate } from "react-router-dom";
import PositionedMenu from '../../components/Menu.jsx';
import { useMe } from "../../useMe.js";
import { useToast } from "../../components/Toast.jsx";

export default function HomeLobbyPage() {
    const theme = useTheme();
    const [roomCode, setRoomCode] = useState("");
    const navigate = useNavigate();
    const [nickname, setNickname] = useState("");
    const { showToast } = useToast();

    const { data: user } = useMe();
    React.useEffect(() => {
        if (user && user.displayName) {
            setNickname(user.displayName);
        }
    }, [user]);

    const styles = useMemo(() => {
        const fg = theme.palette.primary.main;
        return {
            fg,
            soft: alpha(fg, 0.12),
            softer: alpha(fg, 0.08),
            card: alpha(fg, 0.05),
            card2: alpha(fg, 0.035),
        };
    }, [theme]);

    const onCreateRoom = () => {
        apiFetch("/rooms", { method: "POST", body: { playerName: nickname, playerFirebaseUid: user?.uid } }, (data, res) => {
            localStorage.setItem("roomCode", data.roomCode);
            localStorage.setItem("playerId", data.playerId);
            localStorage.setItem("isAdmin", JSON.stringify(true));
            navigate(`/stanza/${data.roomCode}`);
        });
    };
    const onJoinRoom = () => {
        apiFetch(`/rooms/${roomCode}/join`, { method: 'POST', body: { playerName: nickname, playerFirebaseUid: user?.uid } }, (data, res) => {
            localStorage.setItem("roomCode", roomCode);
            localStorage.setItem("playerId", data.playerId);
            localStorage.setItem("isAdmin", JSON.stringify(false));
            navigate(`/stanza/${roomCode}`);
        }, (err, res) => {
            showToast({ severity: 'error', message: err.message || "Errore durante l'accesso alla stanza" });
        })
    };
    const goLooks = () => {
        navigate("/personalizzazioni");
    };
    const goStats = () => {
        navigate("/statistiche");
    };

    const changeDisplayName = (name) => {
        setNickname(name);
        apiFetch('/utils/changeDisplayName', { method: 'PUT', body: { displayName: name, firebaseUid: user?.uid } }, (data, res) => {
            // showToast({ severity: 'success', message: 'Nickname aggiornato con successo!' });
        });
    }

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "secondary.main", color: "primary.main" }}>
            <Container maxWidth="sm" sx={{ px: 2, pt: 2, pb: 4 }}>
                {/* Header */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography sx={{ fontWeight: 900, fontSize: 18, letterSpacing: -0.2 }}>
                        Assassino Online
                    </Typography>
                    <Box sx={{ flex: 1 }} />
                    <PositionedMenu />
                    {/* <IconButton
                        aria-label="Impostazioni"
                        sx={{
                            color: "primary.main",
                            bgcolor: styles.card,
                            border: `1px solid ${styles.soft}`,
                            borderRadius: 3,
                            "&:hover": { bgcolor: styles.softer },
                        }}
                    >
                        <SettingsIcon />
                    </IconButton> */}
                </Box>

                {/* Hero */}
                <Box sx={{ mt: 4, mb: 1 }}>
                    <Typography
                        sx={{
                            fontWeight: 650,
                            fontSize: 38,
                            lineHeight: 1.05,
                            letterSpacing: -0.8,
                        }}
                        color="primary.secondary"
                    >
                        Pronto a colpire?
                    </Typography>
                    <Typography sx={{ mt: 1, opacity: 0.75, fontSize: 14 }} color="primary.secondary">
                        Crea una stanza privata oppure entra con un codice.
                    </Typography>
                </Box>
                <TextField
                    value={nickname}
                    label="Nickname"
                    onChange={(e) => changeDisplayName(e.target.value)}
                    placeholder="Il tuo nickname"
                    fullWidth
                    InputLabelProps={{
                        sx: {
                            color: "chiaro.main",
                            "&.Mui-focused": {
                                color: "chiaro.main",
                            },
                        },
                    }}
                    inputProps={{
                        sx: {
                            "&::placeholder": {
                                color: "chiaro.main",
                                opacity: 0.7,
                            },
                        },
                    }}
                    sx={{
                        width: "100%",
                        marginBottom: '10px',
                        mt: 1,
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 3,
                            bgcolor: styles.card2,
                            "& fieldset": { borderColor: styles.soft },
                            "&:hover fieldset": { borderColor: alpha(styles.fg, 0.22) },
                            "&.Mui-focused fieldset": { borderColor: alpha(styles.fg, 0.32) },
                            color: "chiaro.main",
                        },
                        "& input": {
                            color: "chiaro.main",
                            fontWeight: 600,
                            // letterSpacing: 2,
                        },
                    }}
                />
                {/* GROUP 1: STANZE (Crea + Entra) */}
                <SectionCard title="Stanze" styles={styles}>
                    {/* Crea stanza */}

                    <Button
                        fullWidth
                        onClick={onCreateRoom}
                        disabled={!nickname.trim()}
                        sx={{
                            borderRadius: 3.5,
                            textTransform: "none",
                            py: 1.35,
                            px: 1.25,
                            justifyContent: "space-between",
                            color: "#fff",
                            background:
                               "linear-gradient(90deg, #660708 0%, #a11113ff 100%)",
                            boxShadow: "0 14px 40px rgba(153,27,27,0.22)",
                            "&:hover": {
                                boxShadow: "0 18px 46px rgba(153,27,27,0.28)",
                                opacity: 0.98,
                            },
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.1 }}>
                            <Box
                                sx={{
                                    width: 44,
                                    height: 44,
                                    borderRadius: 3,
                                    display: "grid",
                                    placeItems: "center",
                                    bgcolor: "rgba(255,255,255,0.18)",
                                    border: "1px solid rgba(255,255,255,0.14)",
                                }}
                            >
                                <AddIcon />
                            </Box>

                            <Box sx={{ textAlign: "left" }}>
                                <Typography sx={{ fontWeight: 900, fontSize: 16, lineHeight: 1.1 }}>
                                    Crea Stanza
                                </Typography>
                                <Typography sx={{ fontSize: 12.5, opacity: 0.9 }}>
                                    Ospita una partita privata
                                </Typography>
                            </Box>
                        </Box>

                        <ArrowForwardIosIcon sx={{ opacity: 0.9, fontSize: 18 }} />
                    </Button>

                    {/* Entra con codice */}
                    <Box sx={{ mt: 1.6 }}>
                        <Typography sx={{ fontWeight: 900, fontSize: 13.5, opacity: 0.9 }} color="primary.secondary">
                            Entra con codice
                        </Typography>

                        <TextField
                            value={roomCode}
                            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                            placeholder="ES. A7K9P2"
                            fullWidth
                            sx={{
                                mt: 1,
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 3,
                                    bgcolor: "linear-gradient(90deg, #660708 0%, #BA181B 45%, #E5383B 100%)",
                                    "& fieldset": { borderColor: styles.soft },
                                    "&:hover fieldset": { borderColor: alpha(styles.fg, 0.22) },
                                    "&.Mui-focused fieldset": { borderColor: alpha(styles.fg, 0.32) },
                                },
                                "& input": {
                                    color: "primary.main",
                                    fontWeight: 900,
                                    letterSpacing: 2,
                                },
                            }}
                            inputProps={{ maxLength: 10 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <KeyIcon sx={{ color: alpha(styles.fg, 0.65) }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="Entra"
                                            onClick={onJoinRoom}
                                            disabled={!roomCode.trim() || !nickname.trim()}
                                            sx={{
                                                width: 44,
                                                height: 44,
                                                borderRadius: 3,
                                                color: "primary.main",
                                                bgcolor: alpha(styles.fg, 0.06),
                                                border: `1px solid ${styles.soft}`,
                                                "&:hover": { bgcolor: alpha(styles.fg, 0.09) },
                                                "&.Mui-disabled": { opacity: 0.45 },
                                            }}
                                        >
                                            <ArrowForwardIosIcon sx={{ fontSize: 18 }} />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                </SectionCard>

                {/* GROUP 2: REDIRECT (Aspetto + Statistiche) */}
                <SectionCard title="Profilo" styles={styles} sx={{ mt: 2 }}>
                    <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: 1.25 }}>
                        <ActionTile
                            title="Statistiche"
                            subtitle={user ? `${user.statistiche.partite} partite giocate` : "Registrati per visualizzare \n le tue statistiche"}
                            icon={<QueryStatsOutlinedIcon color="chiaro" />}
                            onClick={goStats}
                            styles={styles}
                        />
                        <ActionTile
                            title="Aspetto"
                            subtitle="Personalizza il tuo killer"
                            icon={<PaletteOutlinedIcon color="chiaro" />}
                            onClick={goLooks}
                            styles={styles}
                        />
                    </Box>
                </SectionCard>
            </Container>
        </Box>
    );
}

function SectionCard({ title, children, styles, sx }) {
    return (
        <Paper
            elevation={0}
            sx={{
                mt: 3,
                p: 2,
                borderRadius: 5,
                bgcolor: styles.card,
                border: `1px solid ${styles.soft}`,
                ...sx,
            }}
        >
            <Typography sx={{ fontWeight: 950, fontSize: 13.5, opacity: 0.9 }} color="primary.secondary">
                {title}
            </Typography>
            <Box sx={{ mt: 1.3 }}>{children}</Box>
        </Paper>
    );
}

function ActionTile({ title, subtitle, icon, onClick, styles }) {
    return (
        <Paper
            elevation={0}
            onClick={onClick}
            role="button"
            tabIndex={0}
            sx={{
                p: 1.6,
                borderRadius: 4,
                bgcolor: alpha(styles.fg, 0.035),
                border: `1px solid ${styles.soft}`,
                cursor: "pointer",
                outline: "none",
                transition: "transform 120ms ease, background-color 120ms ease",
                "&:hover": { bgcolor: alpha(styles.fg, 0.055), transform: "translateY(-1px)" },
                "&:active": { transform: "translateY(0px)" },
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.1 }}>
                <Box
                    sx={{
                        width: 42,
                        height: 42,
                        borderRadius: 3,
                        display: "grid",
                        placeItems: "center",
                        bgcolor: alpha(styles.fg, 0.06),
                        border: `1px solid ${styles.soft}`,
                    }}
                >
                    {icon}
                </Box>

                <Box sx={{ minWidth: 0 }}>
                    <Typography sx={{ fontWeight: 950, fontSize: 14 }} color="primary.secondary">
                        {title}
                    </Typography>
                    <Typography
                        sx={{
                            mt: 0.2,
                            fontSize: 12,
                            opacity: 0.75,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                        color="primary.secondary"
                    >
                        {subtitle}
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
}
