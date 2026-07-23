
const jwt=require('jsonwebtoken')
async function identifyuser(req,res,next){
      const token=req.cookies.token

        if(!token){
            return res.status(401).json({
                message:"token not provided Unauthorized acces"
            })
        }
        //else token ke andar se data nikalo

let decoded=null
        try{
                decoded=jwt.verify(token,process.env.JWT_SECRET)
        } catch(err){
                return res.status(401).json({
                    message:"user not authorized"
                })
        }

        req.user=decoded //property
        next() //req ko controller pe forward krni hogi
}
module.exports=identifyuser