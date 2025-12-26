import React from "react";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import HourglassBottomRoundedIcon from "@mui/icons-material/HourglassBottomRounded";

export default function Attesa(props) {
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
            p: 3,
            borderRadius: 5,
            bgcolor: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: 3,
                display: "grid",
                placeItems: "center",
                bgcolor: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <HourglassBottomRoundedIcon sx={{ opacity: 0.9 }} />
            </Box>

            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontWeight: 950, fontSize: 16, lineHeight: 1.2 }}>
                In attesa…
              </Typography>
              <Typography sx={{ mt: 0.4, opacity: 0.78, fontSize: 13.5 }}>
                La partita è in corso, al prossimo turno entrerai automaticamente
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
