import { Box } from "@mui/material";
import Lottie from "lottie-react";
import incendio from './incendio.json';
import Fireworks from './Fireworks.json'
import moneyRain from './money rain.json'
export function EntryLottieOverlay({ item, onDone }) {
  if (!item) return null;
  const animationDataByType = {
    0: incendio,
    1: Fireworks,
    2: moneyRain,
  };

  const anim = animationDataByType[item.type];
  if (!anim) return null;

  return (
    <Box
    id='dioporco'
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 20000,
        pointerEvents: "none",
        height: '100vh',
        display: 'flex',
        alignItems: 'flex-end'
      }}
      aria-hidden="true"
    >
      <Lottie
        key={item.id}               // IMPORTANT: forza restart quando cambia item
        animationData={anim}
        loop={false}
        autoplay
        onComplete={onDone}         // IMPORTANT: sblocca la coda
        style={{ width: "100%"}}
      />
    </Box>
  );
}
