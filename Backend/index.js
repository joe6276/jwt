const express= require('express')
const app= express()
const mongoose= require('mongoose')
require('dotenv').config()
app.use(express.json())
const posts = require('./Routes/post')

mongoose.connect(process.env.URI, {
    
        useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useCreateIndex:true,
        // useFindAndModify: false 
    
}, ()=>{
    console.log('Connected to MongoDB')
})

app.use('/users', require('./Routes/index'))
app.use('/posts',posts)

app.listen(5000, ()=>{
    console.log('Listening to port 5000');
})