
const userModel = require('../models/user.model');
const crypto=require ('crypto')
const jwt= require('jsonwebtoken') 


async function registerController(req,res){
        console.log("Register API called");

    const{email,username,password,profileImage,bio}=req.body;
    
    //check
    
    // const isUserExistsByEmail=await userModel.findOne({email})
    // if(isUserExistsByEmail){
    //     return res.status(409).json({
    //         message:"User already exists with same Email"
    //     })
    // }

    // const  isUserExistsByUsername=await userModel/userModel.findOne({username})
    // if(isUserExistsByUsername){
    //   return  res.status(409).json({
    //     message:"User already exists with same Username"
    //   })
    // }

     const  isUserAlreadyExists=await userModel.findOne({
       $or:[{username},{email}]
     })
      if(isUserAlreadyExists){
        return res.status(409).json({
            message: (isUserAlreadyExists.email==email?"Email already exists":"User already exists")
        })
       }

//convert password into hash
    const hash=   crypto.createHash('sha256').update(password).digest('hex')

    const user =await userModel.create({
        username,
        email,
        bio,
        profileImage,
        password:hash
    })

//create token on base of id
    const token=jwt.sign({
        id:user._id
    },
    process.env.JWT_SECRET,{expiresIn:'1d'}
)
//now save this token in cookies
//cookie name==token

res.cookie("token",token)
res.status(201).json({
    message:"User registers succesfully",
    user:{
        email:user.email,
        username:user.username,
        bio:user.bio,
       profileImage:user.profileImage
    }

}
)
}

async function loginController(req,res) {
    const{username,email,password}=req.body;
    /**
     * ya toh username or password se login
     * OR
     * ya email or password
     */
    const user=await userModel.findOne({
    //      $or:[{condition},{condition}]
            $or:[{
                username:username
            },
        {
            email:email
        }
    ]
    })
     if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }
    const hash=crypto.createHash('sha256').update(password).digest('hex')
   
    const isPasswordValid=hash===user.password
    if(!isPasswordValid){
        return res.status(401).json({
            message:"Password invalid"
        })
    }
    //agar login ho gya toh send token

    const token= jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )
res.cookie("token", token)

res.status(200).json({
    message:"User LoggedIn successfully",
    user:{
        username:user.username,
        email:user.email,
        bio:user.bio,
        profileImage:user.profileImage
    }
})

}
module.exports={
    //object
    registerController,
    loginController
}