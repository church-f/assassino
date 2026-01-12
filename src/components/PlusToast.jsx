import { Paper, Box, Typography, Button } from "@mui/material";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

export default function PlusToast({  onClose, onUpgrade }) {

    return (


        <Paper
            elevation={0}
            sx={{
                width: { xs: "92vw", sm: 420 },
                borderRadius: 4,
                p: 2,
                color: "white",
                position: "relative",
                overflow: "hidden",
                background:
                    "linear-gradient(180deg, #0c3a52 0%, #06293a 100%)",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "0 14px 40px rgba(0,0,0,0.35)",
            }}
        >

            <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start", pt: 0.5 }}>
                <Box
                    sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 3,
                        display: "grid",
                        placeItems: "center",
                        bgcolor: "rgba(255,255,255,0.10)",
                        border: "1px solid rgba(255,255,255,0.10)",
                        flex: "0 0 auto",
                    }}
                >
                    <WorkspacePremiumRoundedIcon sx={{ fontSize: 26 }} />
                </Box>

                <Box sx={{ flex: 1 }}>
                    <Typography
                        sx={{
                            fontSize: 12,
                            letterSpacing: 1.2,
                            fontWeight: 800,
                            opacity: 0.9,
                        }}
                    >
                        OFFERTA ESCLUSIVA
                    </Typography>

                    <Typography
                        sx={{
                            mt: 0.5,
                            fontSize: 16,
                            lineHeight: 1.25,
                            fontWeight: 700,
                        }}
                    >
                        Sblocca avatar, colori ed effetti esclusivi per farti riconoscere
                        subito.
                    </Typography>
                </Box>
            </Box>

            <Button
                onClick={() => {
                    close();
                    onUpgrade?.();
                }}
                variant="contained"
                fullWidth
                endIcon={<ChevronRightRoundedIcon />}
                sx={{
                    mt: 2,
                    height: 52,
                    borderRadius: 999,
                    fontWeight: 900,
                    letterSpacing: 0.8,
                    textTransform: "uppercase",
                    boxShadow: "none",
                    color: "#0b2533",
                    background: "linear-gradient(180deg, #F7D774 0%, #D8A63A 100%)",
                    "&:hover": {
                        background: "linear-gradient(180deg, #FFE08B 0%, #C8942F 100%)",
                    },
                }}

            >
                PASSA A PLUS
            </Button>
        </Paper>
    )

}