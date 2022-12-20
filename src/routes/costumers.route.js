import { Router } from 'express';

import costumersControllers from '../controllers/costumers.controllers.js';

const router = Router();

router.post('/', costumersControllers.create)

router.get('/', costumersControllers.findAll)

export default router;