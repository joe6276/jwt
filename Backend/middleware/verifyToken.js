const jwt= require('jsonwebtoken')
require('dotenv').config()
 module.exports =function(req,res, next){

    const token = req.header('auth-token');

    if(!token) return res.status(400). send('Access Denied ')
    try {
        const verified= jwt.verify(token,process.env.SECRET)
        req.user=verified
        next();
    } catch (error) {
        res.status(404).send('Invalid Token')
    }
}