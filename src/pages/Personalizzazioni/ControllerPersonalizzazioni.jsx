import PersonalizzaStanzaPage from "./Personalizzazioni";
import StatsAuthGatePage from '../Statistiche/Accedi'
import { useMe } from "../../useMe";

export default function ControllerPersonalizzazioni(props) {
    const { data: user } = useMe();

    return (
        <>
            {!user ? <StatsAuthGatePage 
            titolo='Personalizzazioni bloccate' 
            sottoTitolo='Per personalizzare profilo e stile di gioco devi accedere o creare un account.'
            tip='Tip: una volta fatto l’accesso, potrai scegliere avatar, colore e font del nome, e l’animazione d’ingresso (salvati sul tuo account).'/> : <PersonalizzaStanzaPage />}
        </>
    )
}