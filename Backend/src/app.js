const express=require("express")
const cookieParser=require('cookie-parser')

/**require routes */
const authRouter=require('./routes/auth.routes')
const postRouter=require('./routes/post.routes')
const userRouter=require('./routes/user.routes')

const app= express()

app.use(express.json())
app.use(cookieParser());

/**use routes */
app.use("/api/auth", authRouter); ////api fullname=== /api/auth/register
app.use("/api/posts",postRouter)
app.use("/api/users",userRouter)


module.exports=app