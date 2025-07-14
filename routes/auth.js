import express from 'express';
import { getAllUsers, registerUSer } from '../controller/user.controller.js';
const router = express.Router();

router.route('/register').post(registerUSer);
router.route('/getAllUsers').get(getAllUsers);
router.route('/login').post(loginUser);

export default router;