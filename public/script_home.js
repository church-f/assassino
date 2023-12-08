const socket = io()



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

var popup = document.querySelector('.popupContainer')

function apriPopup(){
    popup.classList.add('active')
    popup.classList.remove('inactive')
}

function chiudiPopup(){
    console.log('dioca')
    popup.classList.remove('active')
    popup.classList.add('inactive')
}