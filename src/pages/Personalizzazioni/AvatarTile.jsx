import { Paper, Box, Avatar, Typography, alpha } from "@mui/material";

import ElderlyIcon from '@mui/icons-material/Elderly';
import AvatarIcon from "../../components/AvatarIcon";


export default function AvatarTile({  selected, onClick, label, img, styles, badge }) {
  return (
    <Paper
      elevation={0}
      onClick={onClick}
      role="button"
      tabIndex={0}
      sx={{
        p: 1,
        borderRadius: 5,
        cursor: "pointer",
        textAlign: "center",
        bgcolor: selected ? alpha(styles.fg, 0.10) : styles.card2,
        border: `1px solid ${selected ? alpha(styles.fg, 0.22) : styles.soft}`,
        transition: "transform 120ms ease, background-color 120ms ease",
        "&:hover": { transform: "translateY(-1px)", bgcolor: alpha(styles.fg, 0.08) },
      }}
    >
      <Box sx={{ position: "relative", display: "grid", placeItems: "center" }}>
        <Avatar
          
          sx={{
            width: 48,
            height: 48,
            bgcolor: alpha(styles.fg, 0.12),
            border: `1px solid ${styles.soft}`,
          }}
        >
          <AvatarIcon id={img} selected={selected} />
        </Avatar>
        {badge && (
          <Box
            sx={{
              position: "absolute",
              top: -6,
              right: -6,
              width: 18,
              height: 18,
              borderRadius: 999,
              bgcolor: "#22C55E",
              border: "2px solid rgba(255,255,255,0.35)",
            }}
          />
        )}
      </Box>
      <Typography sx={{ mt: 0.8, fontWeight: 950, fontSize: 11.5, opacity: 0.9 }} color="primary.secondary">
        {label}
      </Typography>
    </Paper>
  );
}