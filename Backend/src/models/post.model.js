const mongoose= require('mongoose')

/**
 * caption
 * imgUrl
 * userId
 */

const postSchema=new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imgUrl:{
        type:String,
        required:[true,"imgUrl is required for creating a post "]
    },
    user:{
        ref:"users" ,//ref users collection se lo
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"user id is required"]
    }
})
//create model

const postModel=mongoose.model("post",postSchema)
module.exports=postModel