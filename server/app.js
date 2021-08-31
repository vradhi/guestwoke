const express = require('express'); //to import express 
const app = express(); //to invoke express
const PORT = 5000
const mongoose = require('mongoose');
const {MONGOURI} = require('./keys');





mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected',()=>{
    console.log('connected to mongo db')
})
mongoose.connection.on('error',(err)=>{
    console.log('error in connecting to mongo db',err)
})
app.listen(PORT,()=>{
console.log("server is running on port",PORT)                            
})
require('./models/user')
require('./models/post')
require('./models/tenant')

app.use(express.json()) 
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))
