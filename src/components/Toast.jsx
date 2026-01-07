import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

/**
 * @typedef {"success"|"info"|"warning"|"error"} Severity
 *
 * @typedef ToastOptions
 * @property {Severity} severity
 * @property {string} message
 * @property {boolean=} persist         // se true non si chiude da solo
 * @property {boolean=} hideIcon
 * @property {boolean=} closable
 * @property {number=} autoHideDuration // ms
 * @property {"top"|"bottom"=} vertical
 * @property {"left"|"center"|"right"=} horizontal
 */

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({
    open: false,
    severity: "info",
    message: "",
    persist: false,
    hideIcon: false,
    closable: true,
    autoHideDuration: 3500,
    vertical: "bottom",
    horizontal: "center",
  });

  const showToast = useCallback((opts) => {
    setToast((prev) => ({
      ...prev,
      ...opts,
      open: true,
      // fallback sensati
      autoHideDuration:
        opts?.persist ? null : (opts?.autoHideDuration ?? prev.autoHideDuration),
    }));
  }, []);

  const closeToast = useCallback((_, reason) => {
    // evita che si chiuda cliccando fuori se vuoi
    if (reason === "clickaway") return;
    setToast((t) => ({ ...t, open: false }));
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}

      <Snackbar
        open={toast.open}
        onClose={closeToast}
        autoHideDuration={toast.persist ? null : toast.autoHideDuration}
        anchorOrigin={{ vertical: toast.vertical, horizontal: toast.horizontal }}
      >
        <Alert
          onClose={toast.closable ? closeToast : undefined}
          severity={toast.severity}
          variant="filled"
          icon={toast.hideIcon ? false : undefined}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast deve essere usato dentro <ToastProvider />");
  }
  return ctx;
}
    