import * as React from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import OndemandVideoRoundedIcon from "@mui/icons-material/OndemandVideoRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import "./Landingpage.css";

export default function AssassinoOnlinePage() {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#05070b",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* “Phone frame” container */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 430,
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
          borderRadius: { xs: 0, sm: 4 },
          boxShadow: { xs: "none", sm: "0 30px 80px rgba(0,0,0,.6)" },
          bgcolor: "#05070b",
        }}
      >
        {/* HERO */}
        <Box
          sx={{
            position: "relative",
            height: 680,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 2,
            backgroundImage: `url("img/bgLandingpage.webp")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* overlays for “game landing” vibe + readability */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: `
                radial-gradient(700px 420px at 50% 18%, rgba(226,27,44,.22), rgba(0,0,0,0) 58%),
                radial-gradient(900px 520px at 55% 25%, rgba(137, 214, 235, 0.16), rgba(51, 51, 51, 0) 62%),
                linear-gradient(180deg, rgba(0,0,0,.15) 0%, rgba(0,0,0,.68) 70%, rgba(0,0,0,.92) 100%)
              `,
              pointerEvents: "none",
            }}
          />

          {/* subtle “HUD glow line” */}
          <Box
            sx={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: 2,
              background:
                "linear-gradient(90deg, rgba(226,27,44,0) 0%, rgba(226,27,44,.55) 35%, rgba(120,210,235,.45) 65%, rgba(120,210,235,0) 100%)",
              opacity: 0.8,
              pointerEvents: "none",
            }}
          />

          <Container
            maxWidth="sm"
            sx={{
              position: "relative",
              zIndex: 1,
              textAlign: "center",
              mt: -1,
            }}
          >
            {/* Top mini HUD */}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                mb: 3,
                px: 0.5,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 900,
                  letterSpacing: 1,
                  color: "rgba(255,255,255,.9)",
                  textTransform: "uppercase",
                  fontSize: 12,
                }}
              >
                ASSASSINO
              </Typography>

              <Box
                sx={{
                  px: 1.2,
                  py: 0.6,
                  borderRadius: 999,
                  bgcolor: "rgba(255,255,255,.06)",
                  border: "1px solid rgba(255,255,255,.12)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 11,
                    fontWeight: 900,
                    color: "rgba(255,255,255,.82)",
                    letterSpacing: 0.6,
                    textTransform: "uppercase",
                  }}
                >
                  Online multiplayer
                </Typography>
              </Box>
            </Stack>

            {/* Title */}
            <Typography
              sx={{
                fontWeight: 900,
                letterSpacing: 1.6,
                lineHeight: 1.0,
                color: "rgba(255,255,255,.96)",
                fontSize: isSmall ? 44 : 50,
                textTransform: "uppercase",
                textShadow: "0 10px 30px rgba(0,0,0,.65)",
              }}
            >
              ASSASSINO
            </Typography>
            <Typography
              sx={{
                fontWeight: 900,
                letterSpacing: 1.6,
                lineHeight: 1.0,
                // color: "#e21b2c",
                fontSize: isSmall ? 44 : 50,
                textTransform: "uppercase",
                mt: 0.25,
                textShadow: "0 10px 30px rgba(0,0,0,.65)",
              }}
              color="primary"
            >
              ONLINE
            </Typography>

            {/* Subtitle */}
            <Typography
              sx={{
                mt: 1.8,
                fontSize: 16,
                fontWeight: 800,
                color: "rgba(255,255,255,.88)",
              }}
            >
              Fidati di nessuno.
              <br />
              Sopravvivi alla notte.
            </Typography>

            {/* Metrics chips */}
            <Stack
              direction="row"
              spacing={1}
              justifyContent="center"
              sx={{ mt: 1.8, flexWrap: "wrap" }}
            >
              <MetricChip icon={<StarRoundedIcon sx={{ fontSize: 16 }} />} text="4.7" />
              <MetricChip icon={<GroupsRoundedIcon sx={{ fontSize: 16 }} />} text="1M+ giocatori" />
              <MetricChip icon={<BoltRoundedIcon sx={{ fontSize: 16 }} />} text="Partite 5–10 min" />
            </Stack>

            {/* Description */}
            <Typography
              sx={{
                mt: 2,
                fontSize: 13,
                lineHeight: 1.6,
                color: "rgba(190,220,235,.78)",
                textShadow: "0 8px 20px rgba(0,0,0,.55)",
              }}
            >
              Unisciti a migliaia di giocatori in questo thriller psicologico multiplayer.
              Trova l’assassino tra i tuoi amici prima che sia troppo tardi.
            </Typography>

            {/* CTAs */}
            <Stack alignItems="center" sx={{ mt: 3 }}>
              <Button
                fullWidth
                variant="contained"
                disableElevation
                onClick={() => {}}
                sx={{
                  height: 56,
                  maxWidth: 270,
                  borderRadius: 999,
                  // bgcolor: "#e21b2c",
                  // "&:hover": { bgcolor: "#c81625" },
                  textTransform: "uppercase",
                  fontWeight: 900,
                  letterSpacing: 0.8,
                  fontSize: 22,
                  position: "relative",
                  boxShadow: "0 16px 40px rgba(27, 40, 226, 0.24)",
                }}
                color="primary"
              >
                GIOCA ORA
                {/* small play bubble on the right */}
                <Box
                  sx={{
                    position: "absolute",
                    right: 10,
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    bgcolor: "rgba(255,255,255,.14)",
                    border: "1px solid rgba(255,255,255,.18)",
                  }}
                >
                  <PlayArrowIcon sx={{ color: "#fff" }} />
                </Box>
              </Button>


              <Typography sx={{ mt: 0.8, fontSize: 11, color: "rgba(255,255,255,.45)" }}>
                Gratis • Nessuna carta • Inizia in 10 secondi
              </Typography>
            </Stack>
          </Container>
        </Box>

        {/* HOW TO PLAY (3 steps) */}
        <Box sx={{ px: 2, pb: 4, mt: -1, marginTop: 4 }}>
          <Typography
            sx={{
              fontWeight: 900,
              // color: "rgba(255,255,255,.92)",
              // fontSize: 14,
              // textTransform: "uppercase",
              // letterSpacing: 0.8,
              // mb: 1,
              marginLeft: 1,
              marginBottom: 2,
            }}
            variant="h6"
            color="white"

          >
            Come si gioca
          </Typography>

          <Stack spacing={1.2}>
            <StepCard
              title="Entra in una lobby"
              body="Crea una partita o unisciti con un codice. Invita gli amici e divertitevi"
            />
            <StepCard
              title="Distribuisci i ruoli"
              body="Ogni giocatore riceve un ruolo segreto: innocente, detective o assassino."
            />
            <StepCard
              title="Uccidi o sopravvivi"
              body="Gli assassini devono eliminare gli innocenti senza farsi scoprire. I detective devono proteggere gli innocenti e smascherare gli assassini."
            />
          </Stack>

          <Button
            fullWidth
            variant="outlined"
            onClick={() => {}}
            sx={{
              mt: 1.6,
              height: 48,
              borderRadius: 999,
              borderColor: "rgba(255,255,255,.18)",
              color: "rgba(255,255,255,.88)",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: 0.7,
              "&:hover": { borderColor: "rgba(255,255,255,.35)" },
            }}
          >
            Leggi le regole complete
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

function MetricChip({ icon, text }) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.7,
        px: 1.1,
        py: 0.6,
        borderRadius: 999,
        bgcolor: "rgba(255,255,255,.06)",
        border: "1px solid rgba(255,255,255,.10)",
        backdropFilter: "blur(10px)",
        color: "rgba(255,255,255,.85)",
      }}
    >
      <Box sx={{ display: "grid", placeItems: "center" }}>{icon}</Box>
      <Typography sx={{ fontSize: 12, fontWeight: 800, letterSpacing: 0.2 }}>
        {text}
      </Typography>
    </Box>
  );
}

function StepCard({ title, body }) {
  return (
    <Box
      sx={{
        p: 1.6,
        borderRadius: 3,
        bgcolor: "rgba(255,255,255,.04)",
        border: "1px solid rgba(255,255,255,.08)",
      }}
    >
      <Typography sx={{ fontWeight: 900, color: "rgba(255,255,255,.92)", fontSize: 13 }}>
        {title}
      </Typography>
      <Typography sx={{ mt: 0.5, fontSize: 12.5, lineHeight: 1.65, color: "rgba(255,255,255,.65)" }}>
        {body}
      </Typography>
    </Box>
  );
}
