import express from 'express'
import {createUser ,getUser,login} from '../controller/userController.js'

const router = express.Router();

router.post("/sign-up",createUser);
router.post("/login",login);
router.get("/getuser", getUser);


export default router;
