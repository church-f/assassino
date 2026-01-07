import { Paper, Box, Typography, alpha } from "@mui/material";



export default function SelectCard({ selected, onClick, title, icon, styles }) {
  return (
    <Paper
      elevation={0}
      onClick={onClick}
      role="button"
      tabIndex={0}
      sx={{
        p: 1.4,
        borderRadius: 5,
        cursor: "pointer",
        bgcolor: selected ? alpha(styles.fg, 0.10) : styles.card2,
        border: `1px solid ${selected ? alpha(styles.fg, 0.22) : styles.soft}`,
        transition: "transform 120ms ease, background-color 120ms ease",
        "&:hover": { transform: "translateY(-1px)", bgcolor: alpha(styles.fg, 0.08) },
        display: "flex",
        alignItems: "center",
        gap: 1.1,
      }}
    >
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: 4,
          display: "grid",
          placeItems: "center",
          bgcolor: alpha(styles.fg, 0.06),
          border: `1px solid ${styles.soft}`,
        }}
      >
        {icon}
      </Box>

      <Box sx={{ minWidth: 0 }}>
        <Typography sx={{ fontWeight: 1000, fontSize: 13.5 }} color="primary.secondary">
          {title}
        </Typography>
      </Box>
    </Paper>
  );
}