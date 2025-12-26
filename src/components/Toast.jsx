import React from 'react';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import { t } from 'i18next';
// import { useSelector } from "react-redux";
// import { startCheckout } from "../api";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function Toast(props) {
    const navigate = useNavigate();

    // const loggedUser = useSelector((state) => state.player.loggedUser);

    // const onTakeDiscount = () => {
    //     if (loggedUser) {
    //         startCheckout();
    //     } else {
    //         // Reindirizza alla pagina Plus per la registrazione/login
    //         localStorage.setItem('isBuingPlus', true)
    //         navigate('/register', {state:{isBuingPlus: true}} );
    //     }
    // }
    return <Snackbar
        open={props.open}
        autoHideDuration={6000}
        onClose={props.handleClose}
        message={props.message}
    >
        <Alert
            onClose={props.handleClose}
            severity={props.severity ?? 'success'}
            message={props.message}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column', gap: '10px' }} >
                {props.message}
                {/* {props.ctaPlus ? <Button onClick={onTakeDiscount} size='small' style={{ background: 'white', }}>{t('Passa a plus')}</Button> : null} */}
            </div>
        </Alert>
    </Snackbar>
}