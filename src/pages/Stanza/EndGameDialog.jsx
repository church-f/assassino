import React, { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Button,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
  alpha
} from "@mui/material";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

/**
 * Props:
 * - open: boolean
 * - onClose: () => void
 * - onConfirm: (winner: "assassino" | "cittadini") => void
 * - initialWinner?: "assassino" | "cittadini"   // opzionale
 */
export default function EndGameDialog({
  open,
  onClose,
  onConfirm,
  initialWinner
}) {
  const theme = useTheme();

  // Forza una scelta: default su initialWinner oppure "assassino"
  const defaultWinner = useMemo(
    () => initialWinner ?? "assassino",
    [initialWinner]
  );
  const [winner, setWinner] = useState(defaultWinner);

  // ogni volta che si apre, reset coerente
  useEffect(() => {
    if (open) setWinner(defaultWinner);
  }, [open, defaultWinner]);

  const handleWinnerChange = (_e, next) => {
    // ToggleButtonGroup "exclusive" passa null quando clicchi l'opzione già selezionata:
    // noi impediamo il null per avere sempre una selezione.
    if (next) setWinner(next);
  };

  const cardSx = (isSelected) => ({
    flex: 1,
    minWidth: 0,
    borderRadius: 3,
    py: 2,
    px: 1.5,
    border: "1px solid",
    borderColor: isSelected
      ? alpha(theme.palette.primary.main, 0.55)
      : alpha(theme.palette.text.primary, 0.08),
    backgroundColor: isSelected
      ? alpha(theme.palette.primary.main, 1)
      : alpha(theme.palette.text.primary, 0.03),
    boxShadow: isSelected ? `0 10px 30px ${alpha(theme.palette.primary.main, 0.15)}` : "none",
    textTransform: "none",
    "&:hover": {
      backgroundColor: isSelected
        ? alpha(theme.palette.primary.main, 0.12)
        : alpha(theme.palette.text.primary, 0.05)
    }
  });

  const iconCircleSx = (isSelected, accent) => ({
    width: 46,
    height: 46,
    borderRadius: "999px",
    display: "grid",
    placeItems: "center",
    backgroundColor: alpha(accent, isSelected ? 0.14 : 0.08)
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          p: 1.5
        }
      }}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", px: 1 }}>
        <Box sx={{ pt: 0.5 }}>
          <DialogTitle sx={{ p: 0, fontWeight: 800, fontSize: 22, lineHeight: 1.1 }}>
            Termina partita
          </DialogTitle>
          <Typography sx={{ mt: 0.75, color: "text.secondary", fontSize: 14 }}>
            Conferma il risultato finale
          </Typography>
        </Box>

        <IconButton onClick={onClose} sx={{ mt: 0.25 }}>
          <CloseRoundedIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ pt: 2.5 }}>
        <Typography
          align="center"
          sx={{ fontWeight: 800, letterSpacing: 0.6, fontSize: 12, color: "text.secondary", mb: 1.5 }}
        >
          CHI HA VINTO?
        </Typography>

        <ToggleButtonGroup
          value={winner}
          exclusive
          onChange={handleWinnerChange}
          fullWidth
          sx={{
            gap: 1.5,
            "& .MuiToggleButtonGroup-grouped": {
              border: "none !important",
              borderRadius: "16px !important"
            }
          }}
        >
          <ToggleButton value="assassino" sx={cardSx(winner === "assassino")}>
            <Box sx={{ display: "grid", placeItems: "center", gap: 1 }}>
              <Box sx={iconCircleSx(winner === "assassino", theme.palette.error.main)}>
                <LocalFireDepartmentRoundedIcon
                  sx={{ color: theme.palette.error.main }}
                  fontSize="small"
                />
              </Box>
              <Typography sx={{ fontWeight: 900, fontSize: 12, letterSpacing: 0.4 }}>
                ASSASSINO
              </Typography>
            </Box>
          </ToggleButton>

          <ToggleButton value="cittadini" sx={cardSx(winner === "cittadini")}>
            <Box sx={{ display: "grid", placeItems: "center", gap: 1 }}>
              <Box sx={iconCircleSx(winner === "cittadini", theme.palette.primary.main)}>
                <GroupsRoundedIcon
                  sx={{ color: theme.palette.primary.main }}
                  fontSize="small"
                />
              </Box>
              <Typography sx={{ fontWeight: 900, fontSize: 12, letterSpacing: 0.4 }}>
                CITTADINI
              </Typography>
            </Box>
          </ToggleButton>
        </ToggleButtonGroup>
      </DialogContent>

      <DialogActions sx={{ px: 2.5, pb: 2.25, pt: 0.5, gap: 1 }}>
        <Button
          variant="text"
          onClick={onClose}
          sx={{
            flex: 1,
            borderRadius: 999,
            fontWeight: 700,
            textTransform: "none"
          }}
        >
          Annulla
        </Button>

        <Button
          variant="contained"
          onClick={() => onConfirm?.(winner)}
          sx={{
            flex: 1,
            borderRadius: 999,
            fontWeight: 800,
            textTransform: "none",
            px: 2,
            backgroundColor: theme.palette.primary.main,
            "&:hover": { backgroundColor: theme.palette.error.dark }
          }}
        >
          Sì, conferma
        </Button>
      </DialogActions>
    </Dialog>
  );
}
