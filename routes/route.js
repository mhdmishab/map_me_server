import { Router } from "express";
import { login, register, resendMail, verifyEmail} from "../controllers/authController.js";
import authorization from "../middlewares/authorization.js";
import { deleteKeyword, searchHistory, searchKeyword } from "../controllers/userController.js";


const route=Router();

route.post('/auth/register',register)
route.post('/auth/login',login)
route.get('/auth/verifyemail',verifyEmail)
route.get('/auth/resend-mail',resendMail)

route.get('/user/search',authorization,searchKeyword)
route.get('/user/search-history',authorization,searchHistory);
route.delete('/user/search-history/:term',authorization,deleteKeyword)



export default route;