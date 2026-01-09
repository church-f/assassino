import React, { use, useEffect, useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import WaterDropRoundedIcon from "@mui/icons-material/WaterDropRounded";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import FormatColorTextRoundedIcon from "@mui/icons-material/FormatColorTextRounded";
import TextFieldsRoundedIcon from "@mui/icons-material/TextFieldsRounded";
import { useNavigate } from "react-router-dom";
import { useMe } from "../../useMe";
import { apiFetch } from "../../api";
import SectionTitle from './SectionTitle'
import AvatarTile from './AvatarTile'
import SelectCard from './SelectCard'
import ColorDot from './ColorDot'
import { useQueryClient } from "@tanstack/react-query";
import PaidIcon from '@mui/icons-material/Paid';
import { useLottieQueue } from "../Stanza/UsesLottieQueue";
import { EntryLottieOverlay } from "../Stanza/EntryLottieOverlay";
import WaterDropIcon from '@mui/icons-material/WaterDrop';

export default function PersonalizzaStanzaPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { data: user } = useMe();
  let enums = window.Enums || {}
  const qc = useQueryClient();

  const styles = useMemo(() => {
    const fg = theme.palette.primary.main;
    return {
      fg,
      soft: alpha(fg, 0.12),
      softer: alpha(fg, 0.08),
      card: alpha(fg, 0.055),
      card2: alpha(fg, 0.035),
    };
  }, [theme]);

  // ---- STATE (placeholder) ----
  const [avatar, setAvatar] = useState(0);
  const [entryFx, setEntryFx] = useState(0);
  const [nameStyle, setNameStyle] = useState("bold");
  const [nameColor, setNameColor] = useState("red");

  const [colorOptions, setColorOptions] = useState([]);
  const [entranceOptions, setEntranceOptions] = useState([]);
  const [avatarArray, setAvatarArray] = useState([]);

  const [Enums, setEnums] = useState({ colors: {}, entrances: {} });

  const q = useLottieQueue();

  useEffect(() => {
    // apiFetch('/utils/Enums', undefined, (data) => {
    setColorOptions(Object.values(enums.colors));
    setEnums(prev => ({ ...prev, colors: enums?.colors || {}, entrances: enums?.entrances || {} }))
    // });
    setNameColor(user?.personalizzazioni.colore.int)
    setAvatar(user?.personalizzazioni.avatar)
    setEntryFx(user?.personalizzazioni.entrata)
  }, [user]);


  useEffect(() => {
    if (enums.avatars) {
      const temp = Object.entries(enums.avatars).map(([key, value]) => ({
        id: parseInt(key),
        label: value
      }));
      setAvatarArray(temp);
    }
    if (enums.entrances) {
      const tempEntrance = Object.entries(enums.entrances).map(([key, value]) => ({
        id: parseInt(key),
        label: value
      }));
      setEntranceOptions(tempEntrance);
    }
  }, [])
  // ---- ACTIONS (placeholder) ----
  const onBack = () => {
    navigate(-1)
  };

  const onSave = () => {
    // Trova la chiave corrispondente al valore selezionato
    const colorKey = Object.keys(Enums.colors).find(key => Enums.colors[key] === nameColor);
    let data = {
      ...user.personalizzazioni,
      colore: parseInt(colorKey) || 0,
      avatar: avatar || 0,
      entrata: entryFx || 0,
    }
    apiFetch('/utils/changePersonalization', { method: 'PUT', body: data }, () => {
      qc.removeQueries({ queryKey: ["me"] })
      navigate('/home')
    })
  };


  const entranceIcons = new Map([
    [0, <LocalFireDepartmentRoundedIcon color="chiaro" />],
    [1, <AutoAwesomeRoundedIcon color="chiaro" />],
    [2, <PaidIcon color="chiaro" />],
    [3, <img src="/img/celebration.svg"/>],
    [4, <WaterDropIcon color="chiaro" />],
    [5, <img src="/img/stella.svg"/>],
  ]);

  const nameStyleOptions = [
    { id: "bold", label: "Aa", weight: 650 },
    { id: "medium", label: "Aa", weight: 700 },
    { id: "regular", label: "Aa", weight: 500 },
    { id: "italic", label: "Aa", weight: 700, italic: true },
  ];

  // const colorOptions = ["yellow", "blue", "red", "#0EA5E9", "#0F172A"];

  return (
    <>
      <EntryLottieOverlay
        item={q.current}
        onDone={q.done}
      />
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

            <Typography sx={{ flex: 1, textAlign: "center", fontWeight: 950, fontSize: 14.5 }}>
              Personalizzazioni
            </Typography>

            <Box sx={{ width: 44 }} />
          </Stack>

          {/* Preview card */}


          {/* Section: Avatar */}
          <SectionTitle icon={<PersonRoundedIcon />} title="Scegli Avatar" sx={{ mt: 2.3 }} />
          <Paper
            elevation={0}
            sx={{
              mt: 1.2,
              p: 1.6,
              borderRadius: 6,
              bgcolor: styles.card,
              border: `1px solid ${styles.soft}`,
            }}
          >
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 1.2 }}>
              {avatarArray.map((a) => (
                <AvatarTile
                  key={a.id}
                  selected={avatar === a.id}
                  onClick={() => setAvatar(a.id)}
                  label={a.label}
                  img={a.id}
                  styles={styles}
                // badge={a.badge}
                />
              ))}
            </Box>
          </Paper>

          {/* Section: Entry effects */}
          <SectionTitle icon={<AutoAwesomeRoundedIcon />} title="Effetti Ingresso" sx={{ mt: 2.2 }} />
          <Paper
            elevation={0}
            sx={{
              mt: 1.2,
              p: 1.6,
              borderRadius: 6,
              bgcolor: styles.card,
              border: `1px solid ${styles.soft}`,
            }}
          >
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.2 }}>
              {entranceOptions.map((fx) => (
                <SelectCard
                  key={fx.id}
                  selected={entryFx === fx.id}
                  onClick={() => {
                    q.enqueue({ type: fx.id });
                    setEntryFx(fx.id)
                  }}
                  title={fx.label}
                  icon={entranceIcons.get(fx.id)}
                  styles={styles}
                />
              ))}
            </Box>
          </Paper>

          {/* Section: Name style */}
          {/* <SectionTitle
            icon={<FormatColorTextRoundedIcon />}
            title="Stile Nome"
            sx={{ mt: 2.2 }}
          />
          <Paper
            elevation={0}
            sx={{
              mt: 1.2,
              p: 1.6,
              borderRadius: 6,
              bgcolor: styles.card,
              border: `1px solid ${styles.soft}`,
            }}
          >
            <ToggleButtonGroup
              value={nameStyle}
              exclusive
              onChange={(e, v) => v && setNameStyle(v)}
              fullWidth
              sx={{
                "& .MuiToggleButton-root": {
                  flex: 1,
                  borderRadius: 4,
                  border: `1px solid ${styles.soft}`,
                  bgcolor: styles.card2,
                  color: "primary.main",
                  textTransform: "none",
                  fontWeight: 950,
                  marginLeft: '5px'
                },
                "& .MuiToggleButton-root.Mui-selected": {
                  bgcolor: alpha(styles.fg, 0.10),
                  borderColor: alpha(styles.fg, 0.22),
                },
              }}
            >
              {nameStyleOptions.map((s) => (
                <ToggleButton key={s.id} value={s.id}>
                  <Typography
                    sx={{
                      fontWeight: s.weight,
                      fontStyle: s.italic ? "italic" : "normal",
                    }}
                    color="primary.secondary"
                  >
                    {s.label}
                  </Typography>
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Paper> */}

          {/* Section: Name color */}
          <SectionTitle icon={<TextFieldsRoundedIcon />} title="Colore Nome" sx={{ mt: 2.2 }} />
          <Paper
            elevation={0}
            sx={{
              mt: 1.2,
              p: 1.6,
              borderRadius: 6,
              bgcolor: styles.card,
              border: `1px solid ${styles.soft}`,
            }}
          >
            <Stack direction="row" spacing={1.2} alignItems="center" sx={{ flexWrap: "wrap" }}>
              {colorOptions.map((c) => (
                <ColorDot
                  key={c}
                  color={c}
                  selected={nameColor === c}
                  onClick={() => setNameColor(c)}
                  styles={styles}
                />
              ))}


            </Stack>
          </Paper>

          {/* Save */}
          <Button
            onClick={onSave}
            fullWidth
            startIcon={<SaveRoundedIcon />}
            sx={{
              mt: 3,
              py: 1.25,
              borderRadius: 999,
              textTransform: "none",
              fontWeight: 1000,
              color: "#FFF",
              bgcolor: "primary.main",
              "&:hover": { opacity: 0.98, boxShadow: "0 24px 70px rgba(234,179,8,0.28)" },
            }}
          >
            Salva e Esci
          </Button>
        </Container>
      </Box>
    </>
  );
}

