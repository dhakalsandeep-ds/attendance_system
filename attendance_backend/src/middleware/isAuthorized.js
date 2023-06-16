import expressAsyncHandler from "express-async-handler";

export let isAuthorizedAdmin =expressAsyncHandler((req,res,next)=>{
    let role=req.body.info.role
    
    if(role==="admin")
    {
        next()
    }
    else{
        let error=new Error("Access Not granted")
        error.statusCode=403
        throw error
    }
})