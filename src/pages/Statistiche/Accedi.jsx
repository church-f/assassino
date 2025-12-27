import React, { useMemo } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useNavigate } from "react-router-dom";

export default function StatsAuthGatePage() {
  const theme = useTheme();
  const navigate = useNavigate();

  const styles = useMemo(() => {
    const fg = theme.palette.primary.main;
    return {
      fg,
      soft: alpha(fg, 0.12),
      card: alpha(fg, 0.055),
      card2: alpha(fg, 0.035),
    };
  }, [theme]);

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
      <Container maxWidth="sm" sx={{ px: 2 }}>
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            borderRadius: 6,
            bgcolor: styles.card,
            border: `1px solid ${styles.soft}`,
          }}
        >
          {/* Header */}
          <Stack direction="row" spacing={1.2} alignItems="center">
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 4,
                display: "grid",
                placeItems: "center",
                bgcolor: styles.card2,
                border: `1px solid ${styles.soft}`,
              }}
            >
              <BarChartRoundedIcon sx={{ opacity: 0.9 }} />
            </Box>

            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontWeight: 1000, fontSize: 18, letterSpacing: -0.2 }}>
                Statistiche bloccate
              </Typography>
              <Typography sx={{ mt: 0.4, opacity: 0.75, fontSize: 13.5 }}>
                Per vedere le tue statistiche devi accedere o creare un account.
              </Typography>
            </Box>
          </Stack>

          {/* CTA */}
          <Stack spacing={1.2} sx={{ mt: 2.2 }}>
            <Button
              fullWidth
              onClick={() => navigate("/login")}
              startIcon={<LoginRoundedIcon />}
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                py: 1.2,
                borderRadius: 4,
                textTransform: "none",
                fontWeight: 1000,
                color: "#fff",
                background:
                  "linear-gradient(180deg, rgba(59,130,246,1) 0%, rgba(37,99,235,1) 100%)",
                boxShadow: "0 18px 55px rgba(37,99,235,0.26)",
                "&:hover": {
                  opacity: 0.98,
                  boxShadow: "0 22px 64px rgba(37,99,235,0.32)",
                },
              }}
            >
              Accedi
            </Button>

            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate("/registrati")}
              startIcon={<PersonAddRoundedIcon />}
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                py: 1.15,
                borderRadius: 4,
                textTransform: "none",
                fontWeight: 1000,
                color: "primary.main",
                borderColor: styles.soft,
                bgcolor: alpha(styles.fg, 0.03),
                "&:hover": {
                  borderColor: alpha(styles.fg, 0.22),
                  bgcolor: alpha(styles.fg, 0.055),
                },
              }}
            >
              Registrati
            </Button>
          </Stack>

          <Typography sx={{ mt: 1.8, fontSize: 12.5, opacity: 0.7 }}>
            Tip: una volta fatto l’accesso, le tue partite verranno salvate e potrai vedere
            progressi, K/D e ruoli giocati.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
