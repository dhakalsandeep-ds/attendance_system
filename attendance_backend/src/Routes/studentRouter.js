import { Router } from "express";
import { loginStudent } from "../controllers/studentController.js";

export let studentRouter=Router()
studentRouter.route("/login").post(loginStudent)