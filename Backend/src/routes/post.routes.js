const express=require('express')
const postRouter=express.Router()
const postController=require('../controllers/post.controller')
const multer=require('multer')
const upload=multer({storage:multer.memoryStorage()})
const identifyuser=require("../middlewares/auth.middleware")



/**
 * POST/api/posts [protected api]  jiske pass token nhi hai wo cant acces api
 * 
 * req.body={caption,image-file}
 */
//FILE HANDLING

postRouter.post("/",upload.single("image"),identifyuser,postController.createPostController)

// GET/api/posts[protected]
postRouter.get("/",identifyuser,postController.getPostController)

/**
 * GET/api/posts/details/:postId
 * -return a detail about specific post with id
 * -check whteher the post belongs to user that is requesting 
 */
postRouter.get("/details/:postId",identifyuser,postController.getPostDetailsController)


/**
 * @route POST/api/posts/like/:postid
 * @description like a post with the id provided in the request params 
 */

postRouter.post("/like/:postId",identifyuser,postController.likePostController)

module.exports=postRouter