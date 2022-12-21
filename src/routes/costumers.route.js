import { Router } from 'express';

import costumersControllers from '../controllers/costumers.controllers.js';
import { authMiddleware, isAdminMiddleware } from '../middlewares/auth.middlewares.js'
import { isValidId } from '../middlewares/global.middlewares.js'

const router = Router();

router.post('/', authMiddleware, isAdminMiddleware, costumersControllers.create)

router.get('/', authMiddleware, isAdminMiddleware, costumersControllers.findAll)
router.get('/search', authMiddleware, isAdminMiddleware, costumersControllers.findByName)
router.get('/:id', authMiddleware, isAdminMiddleware, isValidId, costumersControllers.findById)
router.patch('/:id', authMiddleware, isAdminMiddleware, isValidId, costumersControllers.update)
router.delete('/:id', authMiddleware, isAdminMiddleware, isValidId, costumersControllers.erase)

export default router;