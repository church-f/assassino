import React, { useMemo, useState } from "react";
import {
    Box,
    Button,
    Checkbox,
    Container,
    Divider,
    IconButton,
    InputAdornment,
    Link,
    Paper,
    Stack,
    TextField,
    Typography,
    alpha,
    useTheme,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import GppGoodRoundedIcon from "@mui/icons-material/GppGoodRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import GoogleButton from "../../components/googleButton/GoogleButton.jsx";
import { googleLoginAndCreateSession } from "../../login.js";
import { useNavigate } from "react-router-dom";
import { useMe } from "../../useMe.js";

export default function RegisterPage() {
    const theme = useTheme();
    const navigate = useNavigate();

    const styles = useMemo(() => {
        const fg = theme.palette.primary.main; // testo
        return {
            fg,
            soft: alpha(fg, 0.12),
            softer: alpha(fg, 0.08),
            card: alpha(fg, 0.055),
            inputBg: alpha(fg, 0.035),
        };
    }, [theme]);

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [pass2, setPass2] = useState("");
    const [accept, setAccept] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [showPass2, setShowPass2] = useState(false);

    const onBack = () => {
        navigate(-1)
    };

    const onGoogle = async () => {
        await googleLoginAndCreateSession()
        useMe()
        navigate("/home");
    };

    const onRegister = (e) => {
        e.preventDefault();
        // TODO: register with email/pass
    };

    const goLogin = () => {
        navigate("/login")
    };

    const canSubmit =
        email.trim() &&
        pass.trim() &&
        pass2.trim() &&
        accept &&
        pass.length >= 6 &&
        pass === pass2;

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "secondary.main",
                color: "primary.main",
                py: 2,
            }}
        >
            <Container maxWidth="sm" sx={{ px: 2, pb: 4 }}>
                {/* Top bar */}
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
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

                    <Box sx={{ flex: 1, textAlign: "center", pr: 5 /* bilancia il tasto back */ }}>
                        <Typography sx={{ fontWeight: 900, fontSize: 15, opacity: 0.9 }}>
                            Nuova Recluta
                        </Typography>
                    </Box>
                </Stack>

                {/* Card */}
                <Paper
                    elevation={0}
                    sx={{
                        p: 2.4,
                        borderRadius: 6,
                        bgcolor: alpha(styles.fg, 0.04),
                        border: `1px solid ${styles.soft}`,
                    }}
                >
                    {/* Logo / Icon */}

                    <Typography
                        sx={{
                            textAlign: "center",
                            fontWeight: 1000,
                            fontSize: 28,
                            letterSpacing: -0.6,
                            lineHeight: 1.1,
                        }}
                    >
                        Unisciti all&apos;Ordine
                    </Typography>
                    <Typography sx={{ textAlign: "center", mt: 1, opacity: 0.75, fontSize: 13.5 }}>
                        Crea il tuo profilo assassino e inizia la tua prima missione.
                    </Typography>

                    {/* Google */}
                    <GoogleButton onClick={onGoogle} text="Registrati con Google" width="100%" />

                    {/* Divider */}
                    <Stack direction="row" alignItems="center" spacing={1.2} sx={{ my: 2.1 }}>
                        <Divider sx={{ flex: 1, borderColor: styles.soft }} />
                        <Typography sx={{ fontSize: 11, opacity: 0.75, letterSpacing: 0.6 }}>
                            OPPURE REGISTRATI CON EMAIL
                        </Typography>
                        <Divider sx={{ flex: 1, borderColor: styles.soft }} />
                    </Stack>

                    {/* Form */}
                    <Box component="form" onSubmit={onRegister} noValidate>
                        <Stack spacing={1.6}>
                            <FieldLabel>Email</FieldLabel>
                            <TextField
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="agente@esempio.com"
                                fullWidth
                                autoComplete="email"
                                sx={inputSx(styles)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailRoundedIcon sx={{ color: alpha(styles.fg, 0.65) }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <FieldLabel>Password</FieldLabel>
                            <TextField
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                                type={showPass ? "text" : "password"}
                                placeholder="••••••••"
                                fullWidth
                                autoComplete="new-password"
                                sx={inputSx(styles)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockRoundedIcon sx={{ color: alpha(styles.fg, 0.65) }} />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPass((s) => !s)}
                                                edge="end"
                                                aria-label="Mostra password"
                                                sx={{ color: alpha(styles.fg, 0.75) }}
                                            >
                                                {showPass ? <VisibilityOffRoundedIcon /> : <VisibilityRoundedIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <FieldLabel>Conferma Password</FieldLabel>
                            <TextField
                                value={pass2}
                                onChange={(e) => setPass2(e.target.value)}
                                type={showPass2 ? "text" : "password"}
                                placeholder="••••••••"
                                fullWidth
                                autoComplete="new-password"
                                sx={inputSx(styles)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <GppGoodRoundedIcon sx={{ color: alpha(styles.fg, 0.65) }} />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPass2((s) => !s)}
                                                edge="end"
                                                aria-label="Mostra password conferma"
                                                sx={{ color: alpha(styles.fg, 0.75) }}
                                            >
                                                {showPass2 ? <VisibilityOffRoundedIcon /> : <VisibilityRoundedIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            {/* Terms */}
                            <Stack direction="row" spacing={1} alignItems="flex-start" sx={{ mt: 0.5 }}>
                                <Checkbox
                                    checked={accept}
                                    onChange={(e) => setAccept(e.target.checked)}
                                    sx={{
                                        p: 0,
                                        mt: 0.25,
                                        color: alpha(styles.fg, 0.5),
                                        "&.Mui-checked": { color: "primary.main" },
                                    }}
                                />
                                <Typography sx={{ fontSize: 12.5, opacity: 0.85 }}>
                                    Accetto i{" "}
                                    <Link
                                        component="button"
                                        onClick={() => { }}
                                        underline="hover"
                                        sx={{ color: "primary.main", fontWeight: 900 }}
                                    >
                                        Termini di Servizio
                                    </Link>{" "}
                                    e la{" "}
                                    <Link
                                        component="button"
                                        onClick={() => { }}
                                        underline="hover"
                                        sx={{ color: "primary.main", fontWeight: 900 }}
                                    >
                                        Privacy Policy
                                    </Link>
                                    .
                                </Typography>
                            </Stack>

                            {/* CTA */}
                            <Button
                                type="submit"
                                fullWidth
                                disabled={!canSubmit}
                                endIcon={<ArrowForwardIosIcon sx={{ fontSize: 18 }} />}
                                sx={{
                                    mt: 1,
                                    py: 1.35,
                                    borderRadius: 4,
                                    textTransform: "none",
                                    fontWeight: 1000,
                                    letterSpacing: 0.6,
                                    color: "#fff",
                                    background:
                                        "linear-gradient(180deg, rgba(59,130,246,1) 0%, rgba(37,99,235,1) 100%)",
                                    boxShadow: "0 18px 55px rgba(37,99,235,0.26)",
                                    "&:hover": {
                                        opacity: 0.98,
                                        boxShadow: "0 22px 64px rgba(37,99,235,0.32)",
                                    },
                                    "&.Mui-disabled": {
                                        color: "rgba(255,255,255,0.55)",
                                        background: "rgba(59,130,246,0.35)",
                                        boxShadow: "none",
                                    },
                                }}
                            >
                                REGISTRATI
                            </Button>

                            {/* Login */}
                            <Typography sx={{ textAlign: "center", fontSize: 13, opacity: 0.8, mt: 1 }}>
                                Hai già un account?{" "}
                                <Link
                                    component="button"
                                    onClick={goLogin}
                                    underline="hover"
                                    sx={{ color: "primary.main", fontWeight: 1000 }}
                                >
                                    Accedi
                                </Link>
                            </Typography>
                        </Stack>
                    </Box>
                </Paper>

                {/* Small helper */}
                <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 2, opacity: 0.55 }}>
                    <LoginRoundedIcon sx={{ fontSize: 18 }} />
                    <Typography sx={{ fontSize: 12.5 }}>
                        Suggerimento: usa una password lunga almeno 6 caratteri.
                    </Typography>
                </Stack>
            </Container>
        </Box>
    );
}

function FieldLabel({ children }) {
    return (
        <Typography sx={{ fontWeight: 950, fontSize: 13, opacity: 0.9 }}>
            {children}
        </Typography>
    );
}

function inputSx(styles) {
    return {
        "& .MuiOutlinedInput-root": {
            borderRadius: 4,
            bgcolor: styles.inputBg,
            "& fieldset": { borderColor: styles.soft },
            "&:hover fieldset": { borderColor: alpha(styles.fg, 0.22) },
            "&.Mui-focused fieldset": { borderColor: alpha(styles.fg, 0.32) },
        },
        "& input": {
            color: "primary.main",
            fontWeight: 850,
        },
        "& input::placeholder": {
            color: alpha(styles.fg, 0.45),
            opacity: 1,
            fontWeight: 750,
        },
    };
}
