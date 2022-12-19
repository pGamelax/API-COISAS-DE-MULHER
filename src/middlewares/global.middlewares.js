import mongoose from 'mongoose';
import employeeService from '../services/employee.service.js';

export const isValidId = (req, res, next) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: 'Invalid ID' })
    }
    
    next()
}

export const isValidEmployee = async (req, res, next) => {
    const id = req.params.id;

    const employee = await employeeService.findByIdService(id);

    if (!employee === 0 || employee === null || typeof employee === undefined) {
        return res.status(400).send({ message: 'Cliente não encontrado' });
    };

    req.id = id;
    req.employee = employee;

    next()
}
