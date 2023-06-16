import expressAsyncHandler from "express-async-handler"

export let loginTeacher=expressAsyncHandler(async(req,res,next)=>{
  let email=req.body.email
  let password=req.body.password
  let result = await Teacher.findOne({email});
  let jwt_token;
  if (await comparePassword(password,result.password)){
    let infoObj={
      id:result._id,
      role:"teacher"
    }
    let expireInfo={
      expiresIn:"365d"
    }
    jwt_token = await generateToken(infoObj, expireInfo);
    await Token.create({token:jwt_token})
  }
    else{
    let error= new Error("Credential didn't match")
    error.statusCode=401
    throw error
    }

  let response = {
    res: res,
    message: "success",
    result: 
      {
        token:jwt_token,
      },
    statusCode: HttpStatus.CREATED,
  };

  successResponse(response);
})

