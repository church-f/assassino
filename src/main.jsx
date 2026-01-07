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
import ContactPage from "./pages/Contattaci/Contattaci.jsx";
import Stanza from "./pages/Stanza/Stanza.jsx";
import Invito from "./pages/Stanza/Invito.jsx";
import RegisterPage from "./pages/Register/Register.jsx";
import { useMe } from "./useMe.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import StatistichePage from "./pages/Statistiche/Statistiche.jsx";
import { ToastProvider } from "./components/Toast.jsx";
import ControllerPersonalizzazioni from './pages/Personalizzazioni/ControllerPersonalizzazioni.jsx'
import { apiFetch } from "./api.js";
const queryClient = new QueryClient();

const Main = () => {
  let { data } = useMe();
  useEffect(() => {
    initGA();
    apiFetch('/utils/Enums', undefined, (data) => {
      window.Enums = data
    })
  }, []);

  const theme = createTheme({
    typography: {
      fontFamily: "'Poppins', 'Lato', sans-serif",
    },
    palette: {
      primary: {
        main: '#E5383B',
        secondary: '#e7e7e7ff'
      },
      secondary: {
        main: '#161A1D'
      },
      red: {
        main: '#C1121F'
      },
      chiaro: {
        main: '#F5F3F4'
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <Router>
          <PageTracker />
          {/* <AutomaticAdsManager /> */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/regole" element={<Regole />} />
            <Route path="/login" element={<Login />} />
            <Route path="/statistiche" element={<StatistichePage />} />
            <Route path="/personalizzazioni" element={<ControllerPersonalizzazioni />} />
            <Route path="/registrati" element={<RegisterPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/contattaci" element={<ContactPage />} />
            <Route path="/stanza/:roomCode" element={<Stanza />} />
            <Route path="/invito/:roomCode" element={<Invito />} />
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </Router>
      </ToastProvider>
    </ThemeProvider>
  );
};

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Main />
  </QueryClientProvider>
);
