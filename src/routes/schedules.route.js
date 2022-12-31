import { Router } from "express";

import schedulesControllers from "../controllers/schedules.controllers.js";
import {
  isValidEmployee,
  isValidId,
} from "../middlewares/global.middlewares.js";
import {
  isAdminMiddleware,
  authMiddleware,
} from "../middlewares/auth.middlewares.js";

const router = Router();

router.post(
  "/:costumer",
  authMiddleware,
  isAdminMiddleware,
  schedulesControllers.create
);
router.get(
  "/",
  authMiddleware,
  isAdminMiddleware,
  schedulesControllers.findAll
);
router.get(
  "/employee",
  //authMiddleware,
  //isAdminMiddleware,
  schedulesControllers.findByEmployee
);

router.get(
  "/day",
  authMiddleware,
  isAdminMiddleware,
  schedulesControllers.findByDay
);

export default router;
