import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { logPageView } from "./analytics";
import {auth} from "../firebase";

const PageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    logPageView();
  }, [location.pathname]);  // Traccia ogni cambio di pathname

  return null;
};

export default PageTracker;
