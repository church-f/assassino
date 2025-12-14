import * as React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Container,
  Stack,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import { useNavigate } from "react-router-dom";

export default function RegoleDelGiocoPage({ onBack = () => {} }) {
  const theme = useTheme();
  const P = theme.palette.primary.main; // testo + icone (primary)
  const BG = theme.palette.secondary.main; // sfondo (secondary)

  const surface = alpha(P, 0.08);
  const surface2 = alpha(P, 0.06);
  const border = alpha(P, 0.16);
  const muted = alpha(P, 0.72);

    const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: BG, color: P }}>
      {/* Top Bar */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: BG,
          color: P,
          borderBottom: `1px solid ${alpha(P, 0.12)}`,
        }}
      >
        <Toolbar sx={{ minHeight: 64 }}>
          <IconButton onClick={() => navigate(-1)} sx={{ color: P }}>
            <ArrowBackRoundedIcon />
          </IconButton>
          <Typography sx={{ fontWeight: 900, ml: 1, letterSpacing: 0.2 }}>
            Regole del Gioco
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ py: 2.2 }}>
        {/* Header block */}
        <Stack spacing={1.2} sx={{ mt: 0.5 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box
              sx={{
                width: 26,
                height: 26,
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                bgcolor: surface,
                border: `1px solid ${border}`,
              }}
            >
              <FlagRoundedIcon sx={{ fontSize: 16, color: P }} />
            </Box>
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 900,
                letterSpacing: 0.9,
                textTransform: "uppercase",
                color: muted,
              }}
            >
              Guida ufficiale
            </Typography>
          </Stack>

          <Typography
            sx={{
              fontWeight: 1000,
              letterSpacing: 0.2,
              lineHeight: 1.05,
              fontSize: 28,
            }}
          >
            Sopravvivenza & <span style={{ color: P }}>Inganno</span>
          </Typography>

          <Typography sx={{ fontSize: 13, lineHeight: 1.6, color: muted }}>
            In Assassino Online, la fiducia è una risorsa scarsa. Impara le regole
            fondamentali per dominare l’arena.
          </Typography>
        </Stack>

        {/* Stat cards */}
        <Stack direction="row" spacing={1.4} sx={{ mt: 2 }}>
          <MiniStat
            icon={<PeopleAltRoundedIcon />}
            label="GIOCATORI"
            value="min 4"
            P={P}
            surface={surface}
            border={border}
            muted={muted}
          />
          <MiniStat
            icon={<AccessTimeRoundedIcon />}
            label="DURATA"
            value="5 - 10 Min"
            P={P}
            surface={surface}
            border={border}
            muted={muted}
          />
        </Stack>

        {/* Manuale */}
        <Typography
          sx={{
            mt: 2.4,
            mb: 1.2,
            fontWeight: 1000,
            letterSpacing: 0.2,
            color: P,
          }}
        >
          Manuale di Gioco
        </Typography>

        <Stack spacing={1.2}>
          <RulesAccordion
            title="obbiettivi del gioco"
            icon={<FlagRoundedIcon />}
            P={P}
            BG={BG}
            surface={surface2}
            border={border}
            muted={muted}
          >
            <Typography sx={{ fontSize: 13, lineHeight: 1.7, color: muted }}>
              Il tuo obiettivo cambia in base al ruolo segreto assegnato all’inizio
              della partita. Gioca con attenzione, osserva le contraddizioni e non
              fidarti delle apparenze.
            </Typography>
          </RulesAccordion>

          <RulesAccordion
            title="compiti dei ruoli"
            icon={<BadgeRoundedIcon />}
            P={P}
            BG={BG}
            surface={surface2}
            border={border}
            muted={muted}
          >
            <Stack spacing={1.2}>
              <RoleLine
                title="Assassino"
                sections={{
                  cosE: "Il giocatore che deve eliminare tutti gli altri per vincere.",
                  cosaFa: "Uccide gli altri giocatori uno alla volta.",
                  comeLoFa: "Fa l’occhiolino alla vittima senza essere visto dagli altri.",
                  obbiettivo: " Eliminare sbirro e rianimatrice il prima possibile, poi i cittadini. Vince quando rimane l’ultimo in vita o quando nessuno può più accusarlo.",
                }}
                P={P}
                muted={muted}
              />
 

              <Divider sx={{ borderColor: alpha(P, 0.12) }} />

              <RoleLine
                title="Sbirro"
                sections={{
                  cosE: " L’unico ruolo in grado di far perdere l’assassino.",
                  cosaFa: "Osserva attentamente e deve capire chi è l’assassino.",
                  comeLoFa: " Quando ha un sospetto, accusa l’assassino (o assassino + complice) senza guardarli negli occhi.",
                  obbiettivo: "Scoprire l’assassino prima di morire.",
                  nota: " Se viene ucciso, deve dichiarare ad alta voce: “LO SBIRRO È MORTO” dopo circa 5 secondi.",
                }}
                P={P}
                muted={muted}
              />
              <Divider sx={{ borderColor: alpha(P, 0.12) }} />

              <RoleLine
                title="Rianimatrice"
                sections={{
                  cosE: " Il ruolo che può riportare in vita i morti una sola volta per volta.",
                  cosaFa: "Sceglie un giocatore morto e lo rianima.",
                  comeLoFa: "Manda un bacio alla persona che vuole rianimare, senza farsi vedere dagli altri – solo la vittima deve accorgersene.",
                  obbiettivo: " Tenere in vita lo sbirro o salvare giocatori utili al villaggio.",
                  nota: "Se muore, deve dire: “LA RIANIMATRICE È MORTA” dopo circa 5 secondi.",
                }}
                P={P}
                muted={muted}
              />
              <Divider sx={{ borderColor: alpha(P, 0.12) }} />

              <RoleLine
                title="Cittadino"
                sections={{
                  cosE: "Un giocatore senza poteri speciali.",
                  cosaFa: "Non ha azioni particolari, osserva e parla come in un normale gioco sociale.",
                  comeLoFa: "Deve solo comunicare quando muore (senza dire il proprio ruolo).",
                  obbiettivo: "Sopravvivere e aiutare sbirro e rianimatrice con ragionamenti e osservazioni.",
                }}
                P={P}
                muted={muted}
              />
              <Divider sx={{ borderColor: alpha(P, 0.12) }} />

              <RoleLine
                title="Complice"
                sections={{
                  cosE: "L’alleato segreto dell’assassino.",
                  cosaFa: "All’inizio è un normale cittadino. Diventa complice solo quando l’assassino gli fa l’occhiolino di “sblocco”.",
                  comeLoFa: "Una volta attivo, può uccidere anche lui facendo l’occhiolino.",
                  obbiettivo: "Aiutare l’assassino a confondere il villaggio ed eliminare sbirro e rianimatrice.",
                }}
                P={P}
                muted={muted}
              />
            </Stack>
          </RulesAccordion>

          <RulesAccordion
            title="come vincere"
            icon={<EmojiEventsRoundedIcon />}
            P={P}
            BG={BG}
            surface={surface2}
            border={border}
            muted={muted}
          >
            <Stack spacing={1}>
              <Typography sx={{ fontSize: 13, lineHeight: 1.7, color: muted }}>
                • Gli Innocenti vincono se lo sbirro accusa correttamente l’Assassino.
              </Typography>
              <Typography sx={{ fontSize: 13, lineHeight: 1.7, color: muted }}>
                • L’Assassino (e il complice) vincono se sia lo sbirro e sia la rianimatrice sono eliminati.
              </Typography>
            </Stack>
          </RulesAccordion>
        </Stack>
      </Container>
    </Box>
  );
}

function MiniStat({ icon, label, value, P, surface, border, muted }) {
  return (
    <Card
      elevation={0}
      sx={{
        flex: 1,
        borderRadius: 4,
        bgcolor: surface,
        border: `1px solid ${border}`,
        color: P,
      }}
    >
      <CardContent sx={{ py: 1.6, "&:last-child": { pb: 1.6 } }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              bgcolor: alpha(P, 0.1),
              border: `1px solid ${alpha(P, 0.14)}`,
            }}
          >
            {React.cloneElement(icon, { sx: { color: P, fontSize: 18 } })}
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: 10,
                fontWeight: 1000,
                letterSpacing: 0.9,
                color: muted,
              }}
            >
              {label}
            </Typography>
            <Typography sx={{ fontSize: 16, fontWeight: 1000, color: P }}>
              {value}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

function RulesAccordion({ title, icon, children, P, BG, surface, border, muted }) {
  return (
    <Accordion
      disableGutters
      elevation={0}
      sx={{
        bgcolor: surface,
        color: P,
        border: `1px solid ${border}`,
        borderRadius: 4,
        overflow: "hidden",
        "&:before": { display: "none" },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreRoundedIcon sx={{ color: P }} />}
        sx={{
          px: 1.6,
          py: 0.7,
          "& .MuiAccordionSummary-content": { alignItems: "center", gap: 1.2 },
        }}
      >
        <Box
          sx={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            bgcolor: alpha(P, 0.1),
            border: `1px solid ${alpha(P, 0.14)}`,
          }}
        >
          {React.cloneElement(icon, { sx: { color: P, fontSize: 18 } })}
        </Box>

        <Box>
          <Typography
            sx={{
              fontWeight: 1000,
              textTransform: "uppercase",
              letterSpacing: 0.8,
              fontSize: 12,
              color: P,
            }}
          >
            {title}
          </Typography>
          <Typography sx={{ fontSize: 12, color: muted }}>
            Tocca per aprire i dettagli
          </Typography>
        </Box>
      </AccordionSummary>

      <AccordionDetails sx={{ px: 1.6, pb: 1.6, pt: 0 }}>
        <Box
          sx={{
            mt: 0.8,
            p: 1.4,
            borderRadius: 3,
            bgcolor: alpha(BG, 0.25),
            border: `1px solid ${alpha(P, 0.10)}`,
          }}
        >
          {children}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

/**
 * RoleLine con 5 sottocapitoli:
 * - Cos'è
 * - Cosa fa
 * - Come lo fa
 * - Obbiettivo
 * - (Facoltativo) Nota
 */
function RoleLine({ title, sections, P, muted }) {
  const items = [
    { k: "cosE", label: "Cos’è", text: sections?.cosE },
    { k: "cosaFa", label: "Cosa fa", text: sections?.cosaFa },
    { k: "comeLoFa", label: "Come lo fa", text: sections?.comeLoFa },
    { k: "obbiettivo", label: "Obbiettivo", text: sections?.obbiettivo },
    { k: "nota", label: "Nota", text: sections?.nota, optional: true },
  ];

  return (
    <Box>
      <Typography sx={{ fontSize: 13, fontWeight: 1000, color: P, mb: 0.6 }}>
        {title}
      </Typography>

      <Stack spacing={0.9}>
        {items
          .filter((it) => !!it.text) // se "nota" non c'è, non la mostra
          .map((it) => (
            <Box
              key={it.k}
              sx={{
                p: 1.1,
                borderRadius: 2,
                bgcolor: alpha(P, 0.04),
                border: `1px solid ${alpha(P, 0.10)}`,
              }}
            >
              <Typography
                sx={{
                  fontSize: 11,
                  fontWeight: 1000,
                  letterSpacing: 0.7,
                  textTransform: "uppercase",
                  color: alpha(P, 0.9),
                }}
              >
                {it.label}
              </Typography>
              <Typography
                sx={{
                  mt: 0.35,
                  fontSize: 12.5,
                  lineHeight: 1.65,
                  color: muted,
                }}
              >
                {it.text}
              </Typography>
            </Box>
          ))}
      </Stack>
    </Box>
  );
}
