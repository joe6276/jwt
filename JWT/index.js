const express= require('express')
require('dotenv').config();

const jwt= require('jsonwebtoken')


const posts=[
    {
        title:'Title One',
        Description:'Here is the Body of Title one'
    },
    {
        title:'Title Two',
        Description:'Here is the Body of Title Two'
    }
]
const app = express();
app.use(express.json())

app.get('/posts',(req,res)=>{
    res.status(200).send(
        posts
    )
})


app.post('/posts',verifyToken,(req,res)=>{

    jwt.verify(req.token,process.env.DB_SECRET,{ expiresIn:'30s' },(err,authdata)=>{
        if(err) res.sendStatus(403)

        else{
            res.json({
                message:"Post created",
                authdata
            })
        }
    })
   
})
app.post('/login',(req,res)=>{
    const user={
        id:1,
        firstname:'Jonathan',
        email:'joendambuki16@gmail.com'
    }
  
     try {
        const token=  jwt.sign(user, process.env.DB_SECRET)
        res.json({AccessToken : token})
     } 
    
     
    catch (error) {
        console.log(error) 
    }
  
})


function verifyToken(req,res,next){
    const bearerHeader= req.headers['authorization']

    if(typeof bearerHeader!== 'undefined')
    {
        const bearer=  bearerHeader.split(' ')
        const bearerToken =bearer[1]
        req.token= bearerToken
        next()
    }
     else{  
        res.sendStatus(403)
        }
}

app.listen(8000, ()=>{
    console.log("Server Up and Running");
})