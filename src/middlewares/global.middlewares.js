import mongoose from 'mongoose';
import costumersService from '../services/costumers.service.js';

export const isValidId = (req, res, next) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: 'Invalid ID' })
    }
    
    next()
}

export const isValidCostumer = async (req, res, next) => {
    const id = req.params.id;

    const costumer = await costumersService.findByIdService(id);

    if (!costumer === 0 || costumer === null || typeof costumer === undefined) {
        return res.status(400).send({ message: 'Cliente não encontrado' });
    };

    req.id = id;
    req.costumer = costumer;

    next()
}
