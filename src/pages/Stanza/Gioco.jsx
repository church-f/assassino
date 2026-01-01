import React from "react";
import {
  Box,
  Button,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import GroupsIcon from "@mui/icons-material/Groups";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { apiFetch } from "../../api.js";
import { useNavigate } from "react-router-dom";
import EndGameDialog from "./EndGameDialog.jsx";

export default function Gioco(props) {
  const navigate = useNavigate();
  const [openEndGame, setOpenEndGame] = React.useState(false);

  const [alignment, setAlignment] = React.useState("assassino");
  const [openListPlayers, setOpenListPlayers] = React.useState(false);

  // ✅ UI ONLY: animazione quando cambia il ruolo
  const [rolePulse, setRolePulse] = React.useState(false);

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const endGame = (vincitore) => {
    // chiamata API per terminare la partita
    apiFetch(`/rooms/${props.room.code}/end`, {
      method: "POST",
      body: { winningRole: vincitore },
    });
  };

  const leaveGame = () => {
    // chiamata API per lasciare la partita
    apiFetch(
      `/rooms/${props.room.code}/leave`,
      {
        method: "POST",
        body: { playerId: props.playerId },
      },
      () => {
        navigate("/home");
      }
    );
  };

  const me = props.room.players.find((p) => p.playerId === props.playerId);
  const myRole = me?.role;
  const isAdmin = !!me?.isAdmin;

  React.useEffect(() => {
    if (!myRole) return;
    setRolePulse(true);
    const t = setTimeout(() => setRolePulse(false), 650);
    return () => clearTimeout(t);
  }, [myRole]);

  // UI helper (solo presentazione)
  const roleLabel = (myRole || "In attesa…").toUpperCase();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "secondary.main",
        color: "primary.main",
        py: 3,
        "@keyframes rolePop": {
          "0%": { transform: "scale(0.985)", filter: "brightness(1)" },
          "35%": { transform: "scale(1.03)", filter: "brightness(1.10)" },
          "100%": { transform: "scale(1)", filter: "brightness(1)" },
        },
        "@keyframes roleShine": {
          "0%": { opacity: 0, transform: "translateX(-40%)" },
          "25%": { opacity: 0.35 },
          "100%": { opacity: 0, transform: "translateX(40%)" },
        },
      }}
    >
      <Container maxWidth="sm" sx={{ px: 2 }}>
        {/* Header */}
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <Paper
            elevation={0}
            sx={{
              px: 1.2,
              py: 0.9,
              borderRadius: 4,
              bgcolor: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography sx={{ fontWeight: 950, fontSize: 13.5, opacity: 0.9 }}>
              Partita in corso
            </Typography>
            <Chip
              size="small"
              label={props.room.code}
              sx={{
                height: 24,
                fontWeight: 900,
                letterSpacing: 1,
                bgcolor: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.14)",
                color: "primary.main",
              }}
            />
          </Paper>

          <Box sx={{ flex: 1 }} />

          <IconButton
            color="primary"
            onClick={() => setOpenListPlayers(true)}
            sx={{
              bgcolor: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 4,
              "&:hover": { bgcolor: "rgba(255,255,255,0.10)" },
            }}
            aria-label="Lista giocatori"
          >
            <GroupsIcon />
          </IconButton>

          <Chip
            label={`${props.room.players.length}`}
            sx={{
              fontWeight: 950,
              bgcolor: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "primary.main",
            }}
          />
        </Stack>

        {/* MAIN */}
        <Paper
          elevation={0}
          sx={{
            p: 2.2,
            borderRadius: 5,
            bgcolor: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <Typography sx={{ fontWeight: 950, fontSize: 18, letterSpacing: -0.2 }}>
            Gioco in corso…
          </Typography>
          <Typography sx={{ mt: 0.6, opacity: 0.75, fontSize: 13.5 }}>
            Fate le accuse quando siete pronti. Se sei admin puoi terminare e far ripartire.
          </Typography>

          <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.12)" }} />

          {/* ROLE BANNER (molto più evidente + animazione) */}
          <Paper
            elevation={0}
            sx={{
              position: "relative",
              overflow: "hidden",
              borderRadius: 5,
              p: 2,
              bgcolor: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.14)",
              boxShadow: rolePulse
                ? `0 18px 60px ${alpha("#000", 0.18)}`
                : `0 10px 40px ${alpha("#000", 0.10)}`,
              animation: rolePulse ? "rolePop 650ms ease-out" : "none",
              transformOrigin: "center",
              // glow soft
              "&:before": {
                content: '""',
                position: "absolute",
                inset: -2,
                borderRadius: 6,
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.00), rgba(255,255,255,0.16), rgba(255,255,255,0.00))",
                opacity: rolePulse ? 0.55 : 0.18,
                filter: "blur(10px)",
                pointerEvents: "none",
              },
              // shine che passa quando cambia ruolo
              "&:after": {
                content: '""',
                position: "absolute",
                top: -60,
                left: "-55%",
                width: "60%",
                height: "220%",
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.25) 45%, rgba(255,255,255,0) 100%)",
                transform: "rotate(12deg)",
                opacity: 0,
                pointerEvents: "none",
                animation: rolePulse ? "roleShine 650ms ease-out" : "none",
              },
            }}
          >
            <Stack direction="row" spacing={1.2} alignItems="center">
              <Box
                sx={{
                  width: 46,
                  height: 46,
                  borderRadius: 4,
                  display: "grid",
                  placeItems: "center",
                  bgcolor: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.14)",
                }}
              >
                <PersonOutlineIcon sx={{ opacity: 0.95 }} />
              </Box>

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ fontWeight: 950, fontSize: 12.5, opacity: 0.75 }}>
                  IL TUO RUOLO
                </Typography>

                <Typography
                  sx={{
                    mt: 0.2,
                    fontWeight: 1000,
                    fontSize: 26,
                    letterSpacing: 1.2,
                    lineHeight: 1.1,
                    textTransform: "uppercase",
                    textShadow: "0 12px 40px rgba(0,0,0,0.18)",
                  }}
                >
                  {roleLabel}
                </Typography>
              </Box>

              {isAdmin ? (
                <Chip
                  size="small"
                  label="Admin"
                  sx={{
                    fontWeight: 900,
                    bgcolor: "rgba(255,255,255,0.10)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    color: "primary.main",
                  }}
                />
              ) : null}
            </Stack>
          </Paper>

          {/* Actions */}
          <Stack spacing={1.2} sx={{ mt: 2 }}>
            {isAdmin ? (
              <Button
                fullWidth
                onClick={() => setOpenEndGame(true)}
                startIcon={<WarningAmberRoundedIcon />}
                sx={{
                  py: 1.2,
                  borderRadius: 4,
                  textTransform: "none",
                  fontWeight: 950,
                  color: "#fff",
                  background: '#003049'
                    // "linear-gradient(90deg, rgba(225,29,72,1) 0%, rgba(190,18,60,1) 45%, rgba(153,27,27,1) 100%)",
                //   boxShadow: "0 16px 46px rgba(153,27,27,0.20)",
                //   "&:hover": {
                //     boxShadow: "0 18px 52px rgba(153,27,27,0.26)",
                //     opacity: 0.98,
                //   },
                }}
              >
                Ridistribusci i ruoli
              </Button>
            ) : null}

            <Button
              fullWidth
              variant="outlined"
              onClick={leaveGame}
              startIcon={<LogoutRoundedIcon />}
              color="error"
              sx={{
                py: 1.15,
                borderRadius: 4,
                textTransform: "none",
                fontWeight: 950,
                // color: "primary.main",
                borderColor: "rgba(255,255,255,0.20)",
                bgcolor: "rgba(255,255,255,0.03)",
                "&:hover": {
                  borderColor: "rgba(255,255,255,0.26)",
                  bgcolor: "rgba(255,255,255,0.06)",
                },
              }}
            >
              Lascia partita
            </Button>
          </Stack>
        </Paper>

        {/* Lista giocatori */}
        <Dialog
          open={openListPlayers}
          onClose={() => setOpenListPlayers(false)}
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle sx={{ fontWeight: 950 }}>Lista giocatori</DialogTitle>
          <DialogContent dividers>
            <Stack spacing={1}>
              {props.room.players.map((p) => (
                <Paper
                  key={p.playerId}
                  elevation={0}
                  sx={{
                    p: 1.2,
                    borderRadius: 3,
                    bgcolor:
                      p.playerId === props.playerId
                        ? "rgba(0,0,0,0.06)"
                        : "rgba(0,0,0,0.03)",
                    border: "1px solid rgba(0,0,0,0.08)",
                  }}
                >
                  <Typography sx={{ fontWeight: 900, fontSize: 14 }}>
                    {p.name} {p.playerId === props.playerId && "(Tu)"}
                  </Typography>
                  <Typography sx={{ opacity: 0.65, fontSize: 12.5 }}>
                    ID: {p.playerId.slice(0, 6)}…
                  </Typography>
                </Paper>
              ))}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpenListPlayers(false)}
              sx={{ textTransform: "none", fontWeight: 900 }}
            >
              Chiudi
            </Button>
          </DialogActions>
        </Dialog>

        {/* Termina partita */}
        <EndGameDialog
          open={openEndGame}
          onClose={() => setOpenEndGame(false)}
          onConfirm={(vincitore) => {
            endGame(vincitore);
            setOpenEndGame(false);
          }}
        />
      </Container>
    </Box>
  );
}
