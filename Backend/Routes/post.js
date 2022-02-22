const router= require('express').Router()
const verify = require('../middleware/verifyToken')
router.get('/' , verify,(req,res)=>{
    res.json({
        post:{ title:"First title",
             body:" Here is the description of his post "
    }
    })
})

module.exports= router