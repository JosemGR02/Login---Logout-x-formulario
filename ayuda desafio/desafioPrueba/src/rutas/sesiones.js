import { Router } from "express";
import { SessionController } from "../../controllers/index.js";


const router = Router()

router.get('/login', SessionController.logInUser)

router.post('/login', SessionController.postLogIn)

router.get('/logout', SessionController.logOutUser)


export { router as SessionRouter }





