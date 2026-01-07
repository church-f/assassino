import { signupAndCreateSession, googleLoginAndCreateSession } from "../../login";
import React, { useMemo, useState } from "react";
import {
    Box,
    Button,
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
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useNavigate } from "react-router-dom";
import GoogleButton from "../../components/googleButton/GoogleButton.jsx";
import { useToast } from "../../components/Toast.jsx";

export default function LoginPage() {
    const theme = useTheme();
    const navigate = useNavigate();
    const { showToast } = useToast();

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
    const [showPass, setShowPass] = useState(false);

    const onBack = () => {
        navigate(-1)
    };

    const onGoogle = () => {
        googleLoginAndCreateSession().then(() => {
            showToast({severity: 'success', message: "Accesso con Google effettuato con successo"});
            navigate("/home");
        })
    };

    const onLogin = (e) => {
        e.preventDefault();
        // TODO: login with email/pass
    };

    const onForgot = () => {
        // TODO: navigate("/forgot")
    };

    const onRegister = () => {
        navigate("/registrati")
    };

    const canSubmit = email.trim() && pass.trim();

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "secondary.main", color: "primary.main", py: 2 }}>
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

                    <Box sx={{ flex: 1, textAlign: "center", pr: 5 }}>
                        <Typography sx={{ fontWeight: 900, fontSize: 15, opacity: 0.9 }}>
                            Accesso Agente
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
                    {/* Icon */}
                    <Box sx={{ display: "grid", placeItems: "center", mb: 1.6 }}>
                        <Box
                            sx={{
                                width: 74,
                                height: 74,
                                borderRadius: 4,
                                background:
                                    "linear-gradient(180deg, rgba(220,38,38,1) 0%, rgba(153,27,27,1) 100%)",
                                boxShadow: "0 20px 60px rgba(153,27,27,0.22)",
                                display: "grid",
                                placeItems: "center",
                                position: "relative",
                                overflow: "hidden",
                            }}
                        >
                            {/* “fingerprint” minimal senza asset */}
                            <Box
                                sx={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 999,
                                    border: "2px solid rgba(255,255,255,0.35)",
                                    boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.10)",
                                }}
                            />
                            <Box
                                sx={{
                                    position: "absolute",
                                    inset: -30,
                                    background:
                                        "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 55%)",
                                }}
                            />
                        </Box>
                    </Box>

                    <Typography
                        sx={{
                            textAlign: "center",
                            fontWeight: 1000,
                            fontSize: 30,
                            letterSpacing: -0.6,
                            lineHeight: 1.1,
                        }}
                    >
                        Bentornato
                    </Typography>

                    <Typography sx={{ textAlign: "center", mt: 1, opacity: 0.75, fontSize: 13.5 }}>
                        Inserisci le tue credenziali per riprendere la missione.
                    </Typography>

                    {/* Google */}
                    {/* <Button
                        onClick={onGoogle}
                        fullWidth
                        variant="outlined"
                        sx={{
                            mt: 2.2,
                            py: 1.1,
                            borderRadius: 4,
                            textTransform: "none",
                            fontWeight: 900,
                            color: "primary.main",
                            borderColor: styles.soft,
                            bgcolor: alpha(styles.fg, 0.03),
                            "&:hover": {
                                borderColor: alpha(styles.fg, 0.22),
                                bgcolor: alpha(styles.fg, 0.055),
                            },
                        }}
                        startIcon={
                            <Box
                                sx={{
                                    width: 18,
                                    height: 18,
                                    borderRadius: 999,
                                    display: "grid",
                                    placeItems: "center",
                                    fontWeight: 900,
                                    fontSize: 12,
                                }}
                            >
                                G
                            </Box>
                        }
                    >
                        Continua con Google
                    </Button> */}
                    <GoogleButton onClick={onGoogle} text="Accedi con Google" width="100%" />

                    {/* Divider */}
                    <Stack direction="row" alignItems="center" spacing={1.2} sx={{ my: 2.1 }}>
                        <Divider sx={{ flex: 1, borderColor: styles.soft }} />
                        <Typography sx={{ fontSize: 11, opacity: 0.75, letterSpacing: 0.6 }}>
                            OPPURE ACCEDI CON EMAIL
                        </Typography>
                        <Divider sx={{ flex: 1, borderColor: styles.soft }} />
                    </Stack>

                    {/* Form */}
                    <Box component="form" onSubmit={onLogin} noValidate>
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
                                autoComplete="current-password"
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

                            {/* <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 0.2 }}>
                                <Link
                                    component="button"
                                    onClick={onForgot}
                                    underline="hover"
                                    sx={{ color: "primary.main", fontWeight: 900, fontSize: 12.5, opacity: 0.85 }}
                                >
                                    Password dimenticata?
                                </Link>
                            </Box> */}

                            {/* CTA */}
                            <Button
                                type="submit"
                                fullWidth
                                disabled={!canSubmit}
                                endIcon={<ArrowForwardRoundedIcon />}
                                sx={{
                                    mt: 0.6,
                                    py: 1.25,
                                    borderRadius: 4,
                                    textTransform: "none",
                                    fontWeight: 1000,
                                    letterSpacing: 0.6,
                                    color: "#fff",
                                    background:
                                        "linear-gradient(90deg, rgba(225,29,72,1) 0%, rgba(190,18,60,1) 45%, rgba(153,27,27,1) 100%)",
                                    boxShadow: "0 16px 50px rgba(153,27,27,0.22)",
                                    "&:hover": {
                                        opacity: 0.98,
                                        boxShadow: "0 20px 60px rgba(153,27,27,0.28)",
                                    },
                                    "&.Mui-disabled": {
                                        color: "rgba(255,255,255,0.55)",
                                        background: "rgba(225,29,72,0.35)",
                                        boxShadow: "none",
                                    },
                                }}
                            >
                                ACCEDI
                            </Button>

                            {/* Register */}
                            <Typography sx={{ textAlign: "center", fontSize: 13, opacity: 0.8, mt: 1 }}>
                                Non hai ancora un account?{" "}
                                <Link
                                    component="button"
                                    onClick={onRegister}
                                    underline="hover"
                                    sx={{ color: "primary.main", fontWeight: 1000 }}
                                >
                                    Registrati
                                </Link>
                            </Typography>
                        </Stack>
                    </Box>
                </Paper>
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
