import * as React from "react";
import {
    Box,
    Container,
    Paper,
    IconButton,
    Typography,
    Divider,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Link,
    List,
    ListItem,
    ListItemText,
    Chip,
    Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

const LAST_UPDATED = "14 dicembre 2025";
const PRIVACY_EMAIL = "contattaci@assassinoonline.com";
const DATA_CONTROLLER = "Cristian Romano";



export default function PrivacyPolicyPage() {
    const theme = useTheme();
    const P = theme.palette.primary.main; // testo + icone (primary)
    const BG = theme.palette.secondary.main; // sfondo (secondary)
    const navigate = useNavigate()

    const sections = [
        {
            id: "titolare",
            title: "1) Titolare del trattamento",
            content: (
                <>
                    <Typography paragraph color="primary">
                        Il Titolare del trattamento è <strong>{DATA_CONTROLLER}</strong> (persona fisica).
                    </Typography>
                    <Typography paragraph color="primary">
                        Contatti:{" "}
                        <Link
                            href={`mailto:${PRIVACY_EMAIL}`}
                            underline="hover"
                            sx={{ color: theme.palette.primary.main }}
                        >
                            {PRIVACY_EMAIL}
                        </Link>
                    </Typography>
                    <Typography color="primary">
                        Non è stato nominato un DPO (Responsabile della Protezione dei Dati).
                    </Typography>
                </>
            ),
        },
        {
            id: "servizio",
            title: "2) Che cos’è il Servizio",
            content: (
                <>
                    <Typography paragraph color="primary">
                        Assassino Online è un gioco online basato su “stanze” e partite.
                        È possibile effettuare <strong>una partita senza registrazione</strong>; per continuare è richiesta la
                        creazione di un account.
                    </Typography>
                </>
            ),
        },
        {
            id: "dati",
            title: "3) Dati personali trattati",
            content: (
                <>
                    <Typography variant="subtitle1" gutterBottom color="primary">
                        3.1 Dati forniti dall’utente o dai provider di login
                    </Typography>
                    <List dense sx={{ color: theme.palette.primary.main }}>
                        <ListItem disableGutters>
                            <ListItemText primary="Email" />
                        </ListItem>
                        <ListItem disableGutters>
                            <ListItemText primary="Nickname" />
                        </ListItem>
                        <ListItem disableGutters>
                            <ListItemText primary="Nome (se disponibile dal provider, es. account Google)" />
                        </ListItem>
                    </List>

                    <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.2)" }} />

                    <Typography variant="subtitle1" gutterBottom color="primary">
                        3.2 Dati di utilizzo/gioco
                    </Typography>
                    <List dense sx={{ color: theme.palette.primary.main }}>
                        <ListItem disableGutters>
                            <ListItemText primary="Statistiche minime: partite fatte, vinte, perse, volte impostore" />
                        </ListItem>
                        <ListItem disableGutters>
                            <ListItemText primary="Personalizzazioni: tema, avatar, colore nome, font nome" />
                        </ListItem>
                        <ListItem disableGutters>
                            <ListItemText primary="Stato piano Plus: booleano (attivo/non attivo)" />
                        </ListItem>
                    </List>

                    <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.2)" }} />

                    <Typography variant="subtitle1" gutterBottom color="primary">
                        3.3 Dati tecnici
                    </Typography>
                    <Typography paragraph color="primary">
                        Trattiamo dati tecnici essenziali per il funzionamento e la sicurezza del Servizio (es. log).
                        Non effettuiamo backup.
                    </Typography>
                </>
            ),
        },
        {
            id: "finalita",
            title: "4) Finalità e basi giuridiche",
            content: (
                <>
                    <Typography paragraph color="primary">
                        Trattiamo i dati solo quando esiste una base giuridica valida (es. esecuzione del servizio richiesto,
                        obblighi di legge, consenso).
                    </Typography>

                    <Typography variant="subtitle1" gutterBottom color="primary">
                        Finalità principali
                    </Typography>

                    <List dense sx={{ color: theme.palette.primary.main }}>
                        <ListItem disableGutters>
                            <ListItemText
                                primary="Registrazione e gestione account / accesso al Servizio"
                                secondary="Base giuridica: esecuzione del servizio richiesto dall’utente."
                                secondaryTypographyProps={{ sx: { color: theme.palette.primary.main, opacity: 0.85 } }}
                            />
                        </ListItem>

                        <ListItem disableGutters>
                            <ListItemText
                                primary="Funzionamento del gioco, statistiche minime e personalizzazioni"
                                secondary="Base giuridica: esecuzione del servizio richiesto dall’utente."
                                secondaryTypographyProps={{ sx: { color: theme.palette.primary.main, opacity: 0.85 } }}
                            />
                        </ListItem>

                        <ListItem disableGutters>
                            <ListItemText
                                primary="Piano Plus e pagamenti (una tantum)"
                                secondary="Base giuridica: esecuzione del servizio e obblighi di legge (es. contabilità)."
                                secondaryTypographyProps={{ sx: { color: theme.palette.primary.main, opacity: 0.85 } }}
                            />
                        </ListItem>

                        <ListItem disableGutters>
                            <ListItemText
                                primary="Email marketing verso utenti registrati"
                                secondary="Base giuridica: consenso esplicito (revocabile in ogni momento)."
                                secondaryTypographyProps={{ sx: { color: theme.palette.primary.main, opacity: 0.85 } }}
                            />
                        </ListItem>

                        <ListItem disableGutters>
                            <ListItemText
                                primary="Analisi e misurazione (Google Analytics)"
                                secondary="In genere richiede gestione cookie/consenso secondo normativa applicabile."
                                secondaryTypographyProps={{ sx: { color: theme.palette.primary.main, opacity: 0.85 } }}
                            />
                        </ListItem>

                        <ListItem disableGutters>
                            <ListItemText
                                primary="Pubblicità (Google AdSense)"
                                secondary="Gli annunci possono comportare cookie/strumenti di tracciamento secondo impostazioni Google e consensi."
                                secondaryTypographyProps={{ sx: { color: theme.palette.primary.main, opacity: 0.85 } }}
                            />
                        </ListItem>
                    </List>
                </>
            ),
        },
        {
            id: "cookie",
            title: "5) Cookie e tracciamento",
            content: (
                <>
                    <Typography paragraph color="primary">
                        Il Servizio può utilizzare cookie/strumenti tecnici necessari al funzionamento e strumenti di terze parti
                        (es. Google Analytics e Google AdSense). Puoi gestire i cookie dalle impostazioni del browser; disattivandoli,
                        alcune funzionalità potrebbero non funzionare correttamente.
                    </Typography>
                    <Typography color="primary">
                        Nota: Google può erogare annunci personalizzati o non personalizzati in base alle proprie impostazioni e alle
                        preferenze/consensi dell’utente.
                    </Typography>
                </>
            ),
        },
        {
            id: "fornitori",
            title: "6) Destinatari e fornitori (terze parti)",
            content: (
                <>
                    <Typography paragraph color="primary">
                        Possiamo condividere dati con fornitori che supportano l’erogazione del Servizio, nei limiti necessari.
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        {["Firebase", "Stripe", "Google Analytics", "Google AdSense"].map((name) => (
                            <Chip
                                key={name}
                                label={name}
                                sx={{
                                    bgcolor: "rgba(255,255,255,0.12)",
                                    color: theme.palette.primary.main,
                                    border: "1px solid rgba(255,255,255,0.18)",
                                }}
                            />
                        ))}
                    </Stack>
                    <Typography sx={{ mt: 2 }} color="primary">
                        A seconda dei casi, tali soggetti possono operare come responsabili del trattamento o titolari autonomi per i
                        propri trattamenti.
                    </Typography>
                </>
            ),
        },
        {
            id: "extraue",
            title: "7) Trasferimenti extra-UE",
            content: (
                <>
                    <Typography paragraph color="primary">
                        L’uso di fornitori come Google (Firebase/Analytics/AdSense) e Stripe può comportare trattamenti anche fuori
                        dallo Spazio Economico Europeo, inclusi gli Stati Uniti. In tali casi, i trasferimenti avvengono secondo i
                        meccanismi previsti dalla normativa applicabile.
                    </Typography>
                </>
            ),
        },
        {
            id: "retention",
            title: "8) Conservazione dei dati",
            content: (
                <>
                    <List dense sx={{ color: theme.palette.primary.main }}>
                        <ListItem disableGutters>
                            <ListItemText primary="Dati account, statistiche e personalizzazioni: finché l’account resta attivo o finché richiedi la cancellazione." />
                        </ListItem>
                        <ListItem disableGutters>
                            <ListItemText primary="Log tecnici/sicurezza: 7 giorni." />
                        </ListItem>
                        <ListItem disableGutters>
                            <ListItemText primary="Backup: non effettuati." />
                        </ListItem>
                    </List>
                    <Typography sx={{ mt: 1 }} color="primary">
                        In caso di cancellazione, potremmo conservare solo quanto necessario per adempiere ad obblighi di legge (es.
                        contabili/fiscali per acquisti).
                    </Typography>
                </>
            ),
        },
        {
            id: "minori",
            title: "9) Minori",
            content: (
                <>
                    <Typography paragraph color="primary">
                        Il Servizio non è destinato ai minori e non sono presenti sistemi di verifica dell’età. Se ritieni che un minore
                        abbia fornito dati personali, contattaci per richiederne la rimozione.
                    </Typography>
                </>
            ),
        },
        {
            id: "diritti",
            title: "10) Diritti degli utenti",
            content: (
                <>
                    <Typography paragraph color="primary">
                        Puoi richiedere accesso, rettifica, cancellazione, limitazione, opposizione e (se applicabile) portabilità.
                        Puoi revocare il consenso al marketing in qualsiasi momento (es. tramite link “Disiscriviti”).
                    </Typography>
                    <Typography paragraph color="primary">
                        Per esercitare i diritti:{" "}
                        <Link
                            href={`mailto:${PRIVACY_EMAIL}`}
                            underline="hover"
                            sx={{ color: theme.palette.primary.main }}
                        >
                            {PRIVACY_EMAIL}
                        </Link>
                        .
                    </Typography>
                </>
            ),
        },
        {
            id: "modifiche",
            title: "11) Modifiche a questa informativa",
            content: (
                <>
                    <Typography color="primary">
                        Potremmo aggiornare questa Privacy Policy. La versione aggiornata sarà pubblicata sul sito con data di
                        aggiornamento.
                    </Typography>
                </>
            ),
        },
    ];

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: theme.palette.secondary.main,
                color: theme.palette.primary.main,
                py: { xs: 3, sm: 5 },
            }}
        >
            <Container maxWidth="md">
                {/* <Paper
                    elevation={3}
                    sx={{
                        p: { xs: 2, sm: 4 },
                        bgcolor: "rgba(0,0,0,0.18)",
                        borderRadius: 3,
                        border: "1px solid rgba(255,255,255,0.15)",
                        backdropFilter: "blur(6px)",
                    }}
                > */}
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: '8px'}}>

                <IconButton onClick={() => navigate(-1)} sx={{ color: P }}>
                    <ArrowBackRoundedIcon />
                </IconButton>
                <Typography variant="h4" fontWeight={800} gutterBottom color="primary">
                    Privacy Policy — Assassino Online
                </Typography>
                </div>

                <Typography variant="body2" sx={{ opacity: 0.9 }} color="primary">
                    Ultimo aggiornamento: {LAST_UPDATED}
                </Typography>

                <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.2)" }} />

                <Typography variant="body1" paragraph color="primary">
                    Questa informativa descrive come trattiamo i dati personali degli utenti che utilizzano il Servizio, in
                    conformità alla normativa applicabile.
                </Typography>

                <Box sx={{ mt: 2 }}>
                    {sections.map((s, idx) => (
                        <Accordion
                            key={s.id}
                            disableGutters
                            defaultExpanded={idx === 0}
                            sx={{
                                bgcolor: "rgba(255,255,255,0.06)",
                                color: theme.palette.primary.main,
                                border: "1px solid rgba(255,255,255,0.12)",
                                borderRadius: 2,
                                mb: 1.2,
                                "&:before": { display: "none" },
                            }}
                        >
                            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.main }} />}>
                                <Typography fontWeight={700} color="primary">
                                    {s.title}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ pt: 0 }}>{s.content}</AccordionDetails>
                        </Accordion>
                    ))}
                </Box>

                <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.2)" }} />

                <Typography variant="body2" sx={{ opacity: 0.9 }} color="primary">
                    Contatto privacy:{" "}
                    <Link
                        href={`mailto:${PRIVACY_EMAIL}`}
                        underline="hover"
                        sx={{ color: theme.palette.primary.main }}
                    >
                        {PRIVACY_EMAIL}
                    </Link>
                </Typography>
                {/* </Paper> */}
            </Container>
        </Box>
    );
}
