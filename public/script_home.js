const socket = io()



const btn_entra = document.getElementById('entra_btn')
btn_entra.addEventListener('click', ()=>{
    entra()
})

const btn_crea = document.getElementById('crea_btn')
btn_crea.addEventListener('click', ()=>{
    crea()
})


const titolo = document.getElementById('titolo')
const lista = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"]

titolo.addEventListener('click', ()=>{
    var colore = '#'
    for(i = 0; i<6; i++){
        var a = Math.floor(Math.random()*lista.length)
        colore+=lista[a]  
    }
    titolo.style.color = colore
})