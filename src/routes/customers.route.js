import { Router } from 'express';
import costumersController from '../controllers/customer.controllers.js'
import { isValidId, isValidCostumer } from '../middlewares/global.middlewares.js';
const router = Router();

router.post('/', costumersController.create);
router.get('/', costumersController.findAll);
router.get('/:id', isValidId, isValidCostumer, costumersController.findById);
router.patch('/:id', isValidId, costumersController.update);
router.delete('/:id', isValidId, costumersController.erase)


export default router;