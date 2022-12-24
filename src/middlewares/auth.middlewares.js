import jwt from 'jsonwebtoken';
import Employee from '../models/Employees.js';
import employeeService from '../services/employee.service.js';

export const authMiddleware = (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).send({ message: "You do not have authorization" })
        }

        const parts = authorization.split(" ");

        if (parts.length !== 2) {
            return res.status(401).send({ message: "You do not have authorization" })
        }
        const [schema, token] = parts

        if (schema !== "Bearer") {
            return res.status(401).send({ message: "You do not have authorization" })
        }

        jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
            if (error) {
                return res.status(401).send({ message: "Invalid token" })
            }

            const employee = await employeeService.findByIdService(decoded.id)

            if (!employee || !employee.id) {
                return res.status(401).send({ message: "Invalid token" })
            }

            req.employeeId = employee.id;
            req.isAdmin = employee.isAdmin

            return next();
        })



    } catch (err) {
        res.status(500).send(({ message: err.message }))
    }

}

export const isAdminMiddleware = (req, res, next) => {
    if (req.isAdmin == "false") {
        return res.status(400).send({ message: 'Você não tem permissão para isto!' });
    }
    next();
}
