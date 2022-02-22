const router = require('express').Router()
const User= require('../Model/User')
require('dotenv').config;
const {registerValidation, loginValidation} = require('../validation/validation')
const bcrypt= require('bcryptjs')
const jwt= require('jsonwebtoken')

router.post('/register', async (req,res)=>{

    const {error} = registerValidation(req.body) 
    if(error) return res.status(400).send(error.details[0].message)
    
    const emailexist= await User.findOne({email:req.body.email});
    if(emailexist) return res.status(400). send("Email already exists")
   

    const salt= await bcrypt.genSalt(10)
    const hashpassword= await bcrypt.hash(req.body.password,salt)

    const user= new User({
        name:req.body.name,
        email:req.body.email,
        password:hashpassword

    })
try {
      await user.save()
    res.send({user:user._id})

} catch (error) {
    res.status(404).send(error)
    console.log(error.message);
}

})


//Login

router.post('/login' , async (req,res)=>{
    const {error} = await loginValidation(req.body) 
    if(error) return res.status(400).send(error.details[0].message)

    const user= await User.findOne({email:req.body.email});
    if(!user) return res.status(400). send("Email or password is Incorrect")

    const validpassword= await bcrypt.compare(req.body.password, user.password)
    if(!validpassword) return res.status(400). send("Email or password is Incorrect")

        const token = jwt.sign({_id:user._id}, process.env.SECRET)
        res.header('auth-token' , token).send(token)
    res.send('Logged in')

})

module.exports=router;