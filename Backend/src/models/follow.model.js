const mongoose= require('mongoose')

const followSchema=new mongoose.Schema({
    follower:{
        type:String},
    followee:{
         type:String
    }
},{
    timestamps:true //kb create hua tha document
})

followSchema.index({follower:1,followee:1},{unique:true})

const followModel=mongoose.model("follows", followSchema)
module.exports=followModel