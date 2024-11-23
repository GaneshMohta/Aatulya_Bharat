import express from 'express';
import {googleAuth, signAuth} from '../controller/authController.js';

const Router = express.Router();


Router.get("/google", googleAuth);
Router.post('/google', signAuth);


export default Router;
