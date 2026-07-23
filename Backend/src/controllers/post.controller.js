const postModel=require("../models/post.model")
const ImageKit=require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs");
//konsa user request kr rha h
const jwt=require("jsonwebtoken")

const imagekit=new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req,res){
        console.log(req.body,req.file)

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

        //file ko server se cloudstorage tk pahuchata h
 const file=await imagekit.files.upload({
            file:await toFile(Buffer.from(req.file.buffer), 'file'),
            fileName:"test",
            folder:"cohort-2-insta-clone-posts"

                })

                const post=await postModel.create({
                    caption:req.body.caption,
                    imgUrl:file.url,
                    user:decoded.id
                })

                res.status(201).json({
                    message:"post created succesfully",
                    post
                })
}

async function getPostController(req,res){
    const token=req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"Unauthorized Acess"
        })
    }

    let decoded;
    try{
    decoded=  jwt.verify(token, process.env,JWT_SECRET)
    }catch(err){
    return res.status(401).json({
        message :"token invalid"
    })
 }
 const userId= decoded.id
 const post= await postModel.find({
    user:userId
 })
 res.status(200).json({
    message:"post fetch",posts
 })
}

async function getPostDetailsController(req,res){
    const token=req.cookies.token

     if(!token){
        return res.status(401).json({
            message:"Unauthorized Acess"
        })
    }
    let decoded;
    try{
            decoded=jwt.verify(token,process.env.JWT_SECRET)
    }catch(err){
        return res.status(401).json({
            message:"Invalid Token"
        })
    }
    const userId=decoded.id
    const postId=req.params.postId
    const post=await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message:"post not found"
        })
    }
    const isValidUser=post.user.toString()===userId
    if(!isValidUser){
        return res.status(403).json({
            message:"fORBIDDEN CONTENT"
        })
    }

   res.status(200).json({
        message:"Post fetched succesfuly",
        post
    })
}
module.exports={
    createPostController,
    getPostController,
    getPostDetailsController
}