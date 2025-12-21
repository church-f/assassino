import React, { useMemo, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Snackbar,
  TextField,
  Typography,
  useTheme,
  IconButton
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useNavigate } from "react-router-dom";

function getEnv(key) {
  // Supporta sia Vite (import.meta.env) sia CRA (process.env)
  try {
    // eslint-disable-next-line no-undef
    if (typeof import.meta !== "undefined" && import.meta.env) return import.meta.env[key];
  } catch (_) { }
  // eslint-disable-next-line no-undef
  if (typeof process !== "undefined" && process.env) return process.env[key];
  return undefined;
}

export default function ContactPage() {
  const theme = useTheme();
  const formRef = useRef(null);

  const navigate = useNavigate();

  const emailjsConfig = useMemo(() => {
    const serviceId =
      getEnv("VITE_EMAILJS_SERVICE_ID") || getEnv("REACT_APP_EMAILJS_SERVICE_ID");
    const templateId =
      getEnv("VITE_EMAILJS_TEMPLATE_ID") || getEnv("REACT_APP_EMAILJS_TEMPLATE_ID");
    const publicKey =
      getEnv("VITE_EMAILJS_PUBLIC_KEY") || getEnv("REACT_APP_EMAILJS_PUBLIC_KEY");
    return { serviceId, templateId, publicKey };
  }, []);

  const [values, setValues] = useState({
    from_name: "",
    reply_to: "",
    subject: "",
    message: "",
  });

  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const errors = useMemo(() => {
    const e = {};
    if (!values.from_name.trim()) e.from_name = "Inserisci il tuo nome.";
    if (!values.reply_to.trim()) e.reply_to = "Inserisci la tua email.";
    else if (!/^\S+@\S+\.\S+$/.test(values.reply_to)) e.reply_to = "Email non valida.";
    if (!values.subject.trim()) e.subject = "Inserisci un oggetto.";
    if (!values.message.trim()) e.message = "Scrivi un messaggio.";
    return e;
  }, [values]);

  const isValid = Object.keys(errors).length === 0;

  const handleChange = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
  };

  const handleBlur = (key) => () => {
    setTouched((t) => ({ ...t, [key]: true }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setTouched({ from_name: true, reply_to: true, subject: true, message: true });

    if (!emailjsConfig.serviceId || !emailjsConfig.templateId || !emailjsConfig.publicKey) {
      setToast({
        open: true,
        severity: "error",
        message:
          "Configurazione EmailJS mancante. Controlla SERVICE_ID, TEMPLATE_ID e PUBLIC_KEY nelle variabili d’ambiente.",
      });
      return;
    }

    if (!isValid) return;

    try {
      setLoading(true);

      // In EmailJS Template usa variabili come:
      // {{from_name}}, {{reply_to}}, {{subject}}, {{message}}
      await emailjs.sendForm(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        formRef.current,
        { publicKey: emailjsConfig.publicKey }
      );

      setToast({
        open: true,
        severity: "success",
        message: "Messaggio inviato! Ti risponderemo il prima possibile.",
      });

      setValues({ from_name: "", reply_to: "", subject: "", message: "" });
      setTouched({});
      formRef.current?.reset?.();
    } catch (err) {
      setToast({
        open: true,
        severity: "error",
        message: "Invio fallito. Riprova tra poco oppure scrivici via email.",
      });
      // Facoltativo: console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "secondary.main",
        color: "primary.main",
        py: { xs: 4, sm: 6 },
        display: "flex",
        alignItems: "flex-start",
      }}
    >
      <Container maxWidth="sm">
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px'}}>
          <IconButton onClick={() => navigate(-1)} sx={{ color: "primary.main" }}>
            <ArrowBackRoundedIcon />
          </IconButton>
          <Typography variant="h4" fontWeight={800} gutterBottom>
            Contattaci
          </Typography>
        </div>
        <Typography variant="body1" sx={{ opacity: 0.9, mb: 3 }}>
          Compila il form e ti risponderemo il prima possibile.
        </Typography>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 3 },
            borderRadius: 3,
            bgcolor: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(8px)",
          }}
        >
          <Box component="form" ref={formRef} onSubmit={onSubmit} noValidate>
            <TextField
              fullWidth
              margin="normal"
              label="Nome"
              name="from_name"
              value={values.from_name}
              onChange={handleChange("from_name")}
              onBlur={handleBlur("from_name")}
              error={!!touched.from_name && !!errors.from_name}
              helperText={touched.from_name ? errors.from_name : " "}
              InputLabelProps={{ sx: { color: "primary.main" } }}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="reply_to"
              type="email"
              value={values.reply_to}
              onChange={handleChange("reply_to")}
              onBlur={handleBlur("reply_to")}
              error={!!touched.reply_to && !!errors.reply_to}
              helperText={touched.reply_to ? errors.reply_to : " "}
              InputLabelProps={{ sx: { color: "primary.main" } }}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Oggetto"
              name="subject"
              value={values.subject}
              onChange={handleChange("subject")}
              onBlur={handleBlur("subject")}
              error={!!touched.subject && !!errors.subject}
              helperText={touched.subject ? errors.subject : " "}
              InputLabelProps={{ sx: { color: "primary.main" } }}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Messaggio"
              name="message"
              multiline
              minRows={5}
              value={values.message}
              onChange={handleChange("message")}
              onBlur={handleBlur("message")}
              error={!!touched.message && !!errors.message}
              helperText={touched.message ? errors.message : " "}
              InputLabelProps={{ sx: { color: "primary.main" } }}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={loading || !isValid}
              sx={{
                mt: 2,
                borderRadius: 999,
                px: 3,
                textTransform: "none",
                fontWeight: 700,
                bgcolor: theme.palette.primary.main,
                color: theme.palette.getContrastText(theme.palette.primary.main),
                "&:hover": { opacity: 0.9, bgcolor: theme.palette.primary.main },
              }}
            >
              {loading ? "Invio..." : "Invia messaggio"}
            </Button>
          </Box>
        </Paper>

        <Snackbar
          open={toast.open}
          autoHideDuration={5000}
          onClose={() => setToast((t) => ({ ...t, open: false }))}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setToast((t) => ({ ...t, open: false }))}
            severity={toast.severity}
            variant="filled"
            sx={{ borderRadius: 2 }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}
