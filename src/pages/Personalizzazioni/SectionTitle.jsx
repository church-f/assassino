import { Stack, Box, Typography } from "@mui/material";


export default function SectionTitle({ icon, title, sx }) {
  return (
    <Stack direction="row" spacing={1} alignItems="center" sx={sx}>
      <Box
        sx={{
          width: 34,
          height: 34,
          borderRadius: 4,
          display: "grid",
          placeItems: "center",
          bgcolor: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        {icon}
      </Box>
      <Typography sx={{ fontWeight: 1000, fontSize: 14.5 }}>{title}</Typography>
    </Stack>
  );
}