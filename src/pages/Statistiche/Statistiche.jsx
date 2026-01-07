import React, { useMemo } from "react";
import {
    Avatar,
    Box,
    Chip,
    Container,
    Divider,
    IconButton,
    LinearProgress,
    Paper,
    Stack,
    Typography,
    alpha,
    useTheme,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import SportsEsportsRoundedIcon from "@mui/icons-material/SportsEsportsRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import GppGoodRoundedIcon from "@mui/icons-material/GppGoodRounded";
import MedicalServicesRoundedIcon from "@mui/icons-material/MedicalServicesRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import { useMe } from "../../useMe";
import { useNavigate } from "react-router-dom";
import StatsAuthGatePage from "./Accedi.jsx";
import PeopleIcon from '@mui/icons-material/People';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import LockOutlineIcon from '@mui/icons-material/LockOutline';

export default function StatistichePage() {
    const theme = useTheme();
    const { data: user } = useMe();
    const navigate = useNavigate();
    const stastistiche = user?.statistiche || {};

    // Demo data (aggancia ai tuoi dati reali)
    const player = {
        name: user?.displayName,
        title: "Maestro delle Ombre",
        level: 42,
        avatarUrl: "/hero-avatar.png",
        totals: { played: stastistiche.partite, wins: stastistiche.vittorie, losses: stastistiche.sconfitte },
        roles: {
            assassin: stastistiche.assassino,
            medic: stastistiche.rianimatrice,
            cop: stastistiche.sbirro,
            accomplice: stastistiche.complice,
        },
        performance: {
            winPctTotal: user?.plus ? (stastistiche.partite > 0 ? Math.round((stastistiche.vittorie / stastistiche.partite) * 100) : 0) : '-',
        },
    };

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

    const onBack = () => {
        navigate(-1);
    };

    const onShare = () => {
        // TODO: share
    };

    return (
        <>
            {
                !user ? <StatsAuthGatePage /> : <>

                    <Box sx={{ minHeight: "100vh", bgcolor: "secondary.main", color: "primary.main", py: 2 }}>
                        <Container maxWidth="sm" sx={{ px: 2, pb: 4 }}>
                            {/* Top bar */}
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <IconButton
                                    onClick={onBack}
                                    aria-label="Indietro"
                                    sx={{
                                        color: "primary.main",
                                        bgcolor: styles.card,
                                        border: `1px solid ${styles.soft}`,
                                        borderRadius: 3,
                                        "&:hover": { bgcolor: styles.softer },
                                    }}
                                >
                                    <ArrowBackRoundedIcon />
                                </IconButton>

                                <Typography sx={{ flex: 1, textAlign: "center", fontWeight: 950, fontSize: 14.5 }}>
                                    Statistiche Giocatore
                                </Typography>

                                {/* <IconButton
                                    onClick={onShare}
                                    aria-label="Condividi"
                                    sx={{
                                        color: "primary.main",
                                        bgcolor: styles.card,
                                        border: `1px solid ${styles.soft}`,
                                        borderRadius: 3,
                                        "&:hover": { bgcolor: styles.softer },
                                    }}
                                >
                                    <ShareRoundedIcon />
                                </IconButton> */}
                            </Stack>

                            {/* Profile */}
                            <Box sx={{ mt: 2.5, textAlign: "center" }}>
                                <Box sx={{ display: "grid", placeItems: "center" }}>
                                    <Box
                                        sx={{
                                            width: 104,
                                            height: 104,
                                            borderRadius: 999,
                                            p: 0.6,
                                            background:
                                                "conic-gradient(from 210deg, rgba(250,204,21,1), rgba(250,204,21,0.35), rgba(250,204,21,1))",
                                            boxShadow: "0 18px 60px rgba(0,0,0,0.12)",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: 999,
                                                p: 0.6,
                                                bgcolor: alpha(styles.fg, 0.08),
                                                border: `1px solid ${styles.soft}`,
                                                position: "relative",
                                            }}
                                        >
                                            <Avatar
                                                src={player.avatarUrl}
                                                alt={player.name}
                                                sx={{
                                                    width: "100%",
                                                    height: "100%",
                                                    bgcolor: alpha(styles.fg, 0.12),
                                                    border: `1px solid ${styles.soft}`,
                                                }}
                                            />

                                            {/* LVL badge */}
                                            {/* <Chip
                  size="small"
                  label={`LVL ${player.level}`}
                  sx={{
                    position: "absolute",
                    right: -6,
                    bottom: -8,
                    height: 24,
                    fontWeight: 950,
                    bgcolor: "#22C55E",
                    color: "#fff",
                    border: "2px solid rgba(255,255,255,0.35)",
                    "& .MuiChip-label": { px: 1.1 },
                  }}
                /> */}
                                        </Box>
                                    </Box>
                                </Box>

                                <Typography
                                    sx={{
                                        mt: 1.6,
                                        fontWeight: 1000,
                                        fontSize: 22,
                                        letterSpacing: -0.4,
                                    }}
                                >
                                    {player.name}
                                </Typography>

                                {/* <Typography sx={{ mt: 0.4, opacity: 0.75, fontSize: 13 }}>
            {player.title}
          </Typography> */}
                            </Box>

                            {/* Totals */}
                            <Box sx={{ mt: 2.5, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1.2 }}>
                                <MiniStat
                                    icon={<SportsEsportsRoundedIcon color='chiaro'/>}
                                    label="PARTITE"
                                    value={player.totals.played}
                                    styles={styles}
                                    plus={true}
                                />
                                <MiniStat
                                    icon={<EmojiEventsRoundedIcon color='chiaro'/>}
                                    label="VINTE"
                                    value={player.totals.wins}
                                    styles={styles}
                                    plus={user.plus}
                                />
                                <MiniStat
                                    icon={<CloseRoundedIcon color='chiaro'/>}
                                    label="PERSE"
                                    value={player.totals.losses}
                                    styles={styles}
                                    tone="danger"
                                    plus={user.plus}
                                />
                            </Box>
                            {
                                !user.plus && <Typography sx={{ margin: '15px 0' }}>
                                    Passa al <p style={{ display: 'inline', fontWeight: 'bold' }}>Plus</p> per sbloccare tutte le statistiche!
                                </Typography>
                            }

                            {/* Role stats */}
                            <Typography sx={{ mt: 2.6, fontWeight: 950, fontSize: 14.5 }}>
                                Statistiche Ruoli
                            </Typography>

                            <Box sx={{ mt: 1.2, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.2 }}>
                                <RoleCard
                                    title="ASSASSINO"
                                    value={player.roles.assassin}
                                    icon={<GppGoodRoundedIcon />}
                                    gradient="linear-gradient(135deg, rgba(185,28,28,1) 0%, rgba(127,29,29,1) 100%)"
                                    styles={styles}
                                    plus={user.plus}
                                />
                                <RoleCard
                                    title="RIANIMATRICE"
                                    value={player.roles.medic}
                                    icon={<MedicalServicesRoundedIcon />}
                                    gradient="linear-gradient(135deg, rgba(2,132,199,1) 0%, rgba(3,105,161,1) 100%)"
                                    styles={styles}
                                    plus={user.plus}
                                />
                                <RoleCard
                                    title="SBIRRO"
                                    value={player.roles.cop}
                                    icon={<LocalPoliceIcon />}
                                    gradient="linear-gradient(135deg, rgba(59,130,246,1) 0%, rgba(37,99,235,1) 100%)"
                                    styles={styles}
                                    plus={user.plus}
                                />
                                <RoleCard
                                    title="COMPLICE"
                                    value={player.roles.accomplice}
                                    icon={<PeopleIcon />}
                                    gradient="linear-gradient(135deg, rgba(220,38,38,1) 0%, rgba(153,27,27,1) 100%)"
                                    styles={styles}
                                    plus={user.plus}
                                />
                            </Box>

                            {/* Performance */}
                            <Paper
                                elevation={0}
                                sx={{
                                    mt: 2.2,
                                    p: 2,
                                    borderRadius: 5,
                                    bgcolor: styles.card,
                                    border: `1px solid ${styles.soft}`,
                                }}
                            >
                                <Stack direction="row" alignItems="center" justifyContent="space-between">
                                    <Typography sx={{ fontWeight: 950, fontSize: 14.5 }} color="primary.secondary">Performance</Typography>
                                    <Typography sx={{ fontWeight: 1000, fontSize: 16 }} color="primary.secondary">
                                        {player.performance.winPctTotal}%
                                    </Typography>
                                </Stack>

                                <Typography sx={{ mt: 0.4, fontSize: 12.5, opacity: 0.75 }} color="primary.secondary">
                                    Percentuale di vittorie totale
                                </Typography>

                                <Box sx={{ mt: 1.2 }}>
                                    <LinearProgress
                                        variant="determinate"
                                        value={player.performance.winPctTotal}
                                        sx={{
                                            height: 10,
                                            borderRadius: 999,
                                            bgcolor: alpha(styles.fg, 0.10),
                                            "& .MuiLinearProgress-bar": {
                                                borderRadius: 999,
                                                background:
                                                    "linear-gradient(90deg, rgba(250,204,21,1) 0%, rgba(34,197,94,1) 100%)",
                                            },
                                        }}
                                    />
                                    {
                                        !user.plus ? <Typography color="primary.secondary">
                                            scopri la tua percentuale di vittorie totale con il Plus!
                                        </Typography> : ''
                                    }

                                </Box>

                                <Divider sx={{ my: 1.6, borderColor: styles.soft }} />

                                {/* <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.2 }}>
            <SmallRate
              title="Win Rate (Assassino)"
              value={`${player.performance.assassinWinRate}%`}
              emphasis
              styles={styles}
            />
            <SmallRate
              title="Win Rate (Crew)"
              value={`${player.performance.crewWinRate}%`}
              styles={styles}
            />
          </Box> */}
                            </Paper>
                        </Container>
                    </Box>
                </>
            }
        </>
    );

}

function MiniStat({ icon, label, value, styles, tone, plus }) {
    const toneColor =
        tone === "danger" ? "rgba(239,68,68,0.14)" : alpha(styles.fg, 0.06);

    return (
        <Paper
            elevation={0}
            sx={{
                p: 1.4,
                borderRadius: 5,
                bgcolor: styles.card,
                border: `1px solid ${styles.soft}`,
                textAlign: "center",
            }}
        >
            <Box
                sx={{
                    mx: "auto",
                    width: 40,
                    height: 40,
                    borderRadius: 4,
                    display: "grid",
                    placeItems: "center",
                    bgcolor: toneColor,
                    border: `1px solid ${styles.soft}`,
                }}
            >
                {icon}
            </Box>

            <Typography sx={{ mt: 0.9, fontWeight: 1000, fontSize: 16 }} color="primary.secondary">
                {!plus && <LockOutlineIcon color="primary" fontSize="small" />}
                {!plus ? '***' : Number(value).toLocaleString("it-IT")}
            </Typography>
            <Typography sx={{ mt: 0.2, fontSize: 11, opacity: 0.75, letterSpacing: 0.9 }} color="primary.secondary">
                {label}
            </Typography>
        </Paper>
    );
}

function RoleCard({ title, value, icon, gradient, styles, plus }) {
    return (
        <Paper
            elevation={0}
            sx={{
                borderRadius: 6,
                overflow: "hidden",
                border: `1px solid ${styles.soft}`,
                boxShadow: "0 18px 60px rgba(0,0,0,0.10)",
                position: "relative",
            }}
        >
            <Box
                sx={{
                    p: 1.7,
                    background: gradient,
                    color: "#fff",
                    position: "relative",
                    minHeight: 112,
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        inset: -40,
                        background:
                            "radial-gradient(circle at 35% 20%, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0) 60%)",
                        pointerEvents: "none",
                    }}
                />

                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Box
                        sx={{
                            width: 42,
                            height: 42,
                            borderRadius: 4,
                            display: "grid",
                            placeItems: "center",
                            bgcolor: "rgba(255,255,255,0.16)",
                            border: "1px solid rgba(255,255,255,0.18)",
                        }}
                    >
                        {icon}
                    </Box>

                    <Typography sx={{ fontWeight: 1000, fontSize: 24, letterSpacing: 0.4 }}>
                        {plus ? value : '***'}
                    </Typography>
                </Stack>

                <Typography sx={{ mt: 1.2, fontWeight: 950, fontSize: 12, letterSpacing: 1, display: "flex", alignItems: "center", gap: 0.4, marginTop: '15px' }}>
                    {!plus && <LockOutlineIcon color="primary" fontSize="small" />}
                    {title}
                </Typography>
            </Box>
        </Paper>
    );
}


