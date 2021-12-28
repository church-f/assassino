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
var stanze = []
var admin = {}
io.on('connection', socket=>{
    
    //aggiungi persona nella stanza
    socket.on('entra', stanza=>{
        socket.join(stanza)
    })
    socket.on('crea', stanza=>{
        socket.join(stanza)
        admin[stanza] = socket.id
        
        
    })
    //distrubuisci ruoli
    socket.on('dist', ({stanza, complice})=>{
        var ruoli = ['sbirro', 'puttana', 'assassino']
        var sottrazione = 3
        if(complice == true){
            ruoli.push('complice')
            sottrazione++
        }
        var aa = socket.adapter.rooms.get(stanza)
        
        const clients = aa ? aa.size : 0;
        if(clients > 3){
            var rim = clients-sottrazione
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
    //distruggi stanza se l'admin esce
    socket.on('disconnect', ()=>{
        
        for(x in admin){
            var nome = admin[x]
            if( nome== socket.id){
                const index = stanze.indexOf(x);
                if (index > -1) {
                stanze.splice(index, 1);
                }
            }
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
    if(stanze.includes(req.body.crea) != false){
        res.redirect('/')
    }
    
    stanze.push(req.body.crea)
    res.redirect(req.body.crea+'/admin')
})

app.get('/:room/user', (req, res)=>{
    res.render('user', {stanza: req.params.room})
    
    
})
app.post('/user', (req, res)=>{
    if(stanze.includes(req.body.entra) != false){
        res.redirect(req.body.entra+'/user')
    }

    
    
})
app.get('/dio', (req, res)=>{
    res.send(stanze)
})

app.get('/regole', (req, res)=>{
    res.sendFile(__dirname+'/regole.html')
})


  

