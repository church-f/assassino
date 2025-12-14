import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { initGA } from "./utils/analytics";
import PageTracker from "./utils/PageTracker";
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import AutomaticAdsManager from "./component/AutomaticAdsManager.jsx";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Regole from "./pages/Regole/Regole.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy.jsx";

const Main = () => {
  useEffect(() => {
    initGA();
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#003049'
      },
      secondary: {
        main: '#FDF0D5'
      },
      red: {
        main: '#C1121F'
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
        <Router>
          <PageTracker />
          {/* <AutomaticAdsManager /> */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/regole" element={<Regole />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </Router>
    </ThemeProvider>
  );
};

createRoot(document.getElementById("root")).render(<Main />);
