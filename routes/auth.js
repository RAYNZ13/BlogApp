import express from 'express';
import { getAllUsers, registerUSer, loginUser } from '../controller/user.controller.js';
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route('/register').post(registerUSer);
router.route('/getAllUsers').get(verifyJWT ,getAllUsers);
router.route('/login').post(loginUser);

export default router;