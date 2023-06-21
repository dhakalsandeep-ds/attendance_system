import jwt from "jsonwebtoken";
import { secretKey } from "../config/constant.js";

export let verifyToken = async (token) => {
  let infoObj = await jwt.verify(token, secretKey);
  return infoObj;
};

export let generateToken = async (infoObj, expireInfo) => {
  let token = await jwt.sign(infoObj, secretKey, expireInfo);

  return token;
};


