import { Box, Typography, alpha } from "@mui/material";



export default function ColorDot({ color, selected, onClick, styles, dashed, label }) {
  return (
    <Box
      onClick={onClick}
      role="button"
      tabIndex={0}
      sx={{
        width: 34,
        height: 34,
        borderRadius: 999,
        bgcolor: color,
        cursor: "pointer",
        display: "grid",
        placeItems: "center",
        border: selected
          ? `3px solid ${alpha(styles.fg, 0.35)}`
          : `1px solid ${styles.soft}`,
        outline: selected ? `2px solid ${alpha(styles.fg, 0.20)}` : "none",
        outlineOffset: 2,
        ...(dashed
          ? {
              bgcolor: "transparent",
              border: `2px dashed ${alpha(styles.fg, 0.25)}`,
              color: alpha(styles.fg, 0.75),
              fontWeight: 1000,
            }
          : null),
      }}
    >
      {label ? <Typography sx={{ fontWeight: 1000, fontSize: 14 }}>{label}</Typography> : null}
    </Box>
  );
}