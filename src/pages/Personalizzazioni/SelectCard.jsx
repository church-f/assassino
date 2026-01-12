import { Paper, Box, Typography, alpha } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';



export default function SelectCard({ selected, onClick, title, icon, styles, isFree }) {
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
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 4,
            display: "grid",
            placeItems: "center",
            bgcolor: isFree ? alpha(styles.fg, 0.06) : alpha('#979797ff', 0.12),
            border: `1px solid ${styles.soft}`,
          }}
        >
          {icon}
        </Box>
        {!isFree ? <LockIcon sx={{ fontSize: 16, color: alpha('#fffdfdff', 0.42), marginTop: '-8px' }} /> : ''}
      </div>

      <Box sx={{ minWidth: 0 }}>
        <Typography sx={{ fontWeight: 1000, fontSize: 13.5, display: 'flex', alignItems: 'center', gap: 0.5, justifyContent: 'center' }} color="primary.secondary">
          {title}
        </Typography>
      </Box>
    </Paper>
  );
}