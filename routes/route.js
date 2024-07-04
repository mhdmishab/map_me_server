import { Router } from "express";
import { login, register, verifyEmail} from "../controllers/authController.js";


const route=Router();

route.post('/auth/register',register)
route.post('/auth/login',login)
route.get('/auth/verifyemail',verifyEmail)



export default route;