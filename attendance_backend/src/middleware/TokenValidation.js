
import { Token } from "../schema/model.js"
import { HttpStatus } from "../config/constant.js"
import expressAsyncHandler from "express-async-handler"
import { verifyToken } from "../utils/token.js"
import { successResponse } from "../helper/successResponse.js"

export let TokenVerification=expressAsyncHandler(async (req,res,next)=>{
    let bearerTokenStr=req.headers.authorization
    let tokenArr=bearerTokenStr.split(" ")
      let token = tokenArr[1]
      
      let tokenAtDatabase = await Token.findOne({token})
      if (!tokenAtDatabase) {
        let error = new Error("Token is not valid")
        error.statusCode = 401;
        throw error;
      } 
      let info = await verifyToken(token)
     
      if(!info)
      {
        let error = new Error("Token is not valid");
        error.statusCode = 401;
        throw error;
      }
          
        let response={
          res,
          message:"Token is valid",
          result:{role:info.role},
          statusCode: HttpStatus.OK,
        }
        successResponse(response)
      }
  )

