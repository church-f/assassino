const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')   
const app = express()
const server = http.createServer(app)
const io = socketio(server)
const PORT = process.env.PORT || 3000

server.listen(PORT)

//socket
var stanze = {}
io.on('connection', socket=>{
    
    socket.on('entra', stanza=>{
        
        socket.join(stanza)
    })
    socket.on('dist', stanza=>{
        var ruoli = ['sbirro', 'puttana', 'assassino']
        var aa = socket.adapter.rooms.get(stanza)
        const clients = aa ? aa.size : 0;
        if(clients > 3){
            var rim = clients-3
            for(var i=0; i<rim; i++){
                
                ruoli.push('cittadino')
            }
        }
        ruoli.sort(function(a, b){return 0.5 - Math.random()})
        var t = 0
        for(var a of aa){
            io.to(a).emit('ruolo', ruoli[t])
            t++
            
        }
        
        
    })
})


//express
app.set('view engine', 'ejs')


app.use(express.static(path.join(__dirname, "public")))

app.use(express.urlencoded());

app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/home.html')
})

app.get('/:room/admin', (req, res)=>{
    res.render('admin', {stanza: req.params.room})
    
})
app.post('/admin', (req, res)=>{
    if(stanze[req.body.crea] != null){
        res.redirect('/')
    }
    
    stanze[req.body.crea] = {user:{}}
    res.redirect(req.body.crea+'/admin')
})

app.get('/:room/user', (req, res)=>{
    res.render('user', {stanza: req.params.room})
    
    
})
app.post('/user', (req, res)=>{
    if(stanze[req.body.entra] != null){
        res.redirect(req.body.entra+'/user')
    }
    
    res.redirect('/')
})



function shuffle(array) {
    var currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  

