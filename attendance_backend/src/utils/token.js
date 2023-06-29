import jwt from "jsonwebtoken";
import { SECRETKEY } from "../config/constant.js";

export let verifyToken = async (token) => {
  let infoObj = await jwt.verify(token, SECRETKEY);
  return infoObj;
};

export let generateToken = async (infoObj, expireInfo) => {
  let token = await jwt.sign(infoObj, SECRETKEY, expireInfo);

  return token;
};


