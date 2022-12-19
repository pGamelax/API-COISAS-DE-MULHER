import { Router } from 'express';
import employeeController from '../controllers/employee.controllers.js'
import { isValidId, isValidEmployee } from '../middlewares/global.middlewares.js';
const router = Router();

router.post('/', employeeController.create);
router.get('/', employeeController.findAll);
router.get('/:id', isValidId, isValidEmployee, employeeController.findById);
router.patch('/:id', isValidId, employeeController.update);
router.delete('/:id', isValidEmployee, employeeController.erase)


export default router;