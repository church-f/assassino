import ReactGA from "react-ga4";

const TRACKING_ID = "G-K2BP9CSWNH";  // Sostituisci con il tuo ID GA4

export const initGA = () => {
  ReactGA.initialize(TRACKING_ID);
};

export const logPageView = () => {
  const path = window.location.pathname;
  ReactGA.send({ hitType: "pageview", page: path, title: path });
};
