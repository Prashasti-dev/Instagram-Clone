const express=require('express')
const postRouter=express.Router()

const postController=require('../controllers/post.controller')
const multer=require('multer')
const upload=multer({storage:multer.memoryStorage()})
/**
 * POST/api/posts [protected api]
 * req.body={caption,image-file}
 */
//FILE HANDLING

postRouter.post("/",upload.single("image"),postController.createPostController)


module.exports=postRouter