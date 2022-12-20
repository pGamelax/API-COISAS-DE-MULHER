import { Router } from "express";
const router = Router();

import authController from "../controllers/auth.controllers.js";

router.post('/', authController.login);

export default router