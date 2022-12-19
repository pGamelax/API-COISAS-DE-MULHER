import jwt from 'jsonwebtoken';
import costumerService from '../services/costumers.service.js'

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
            
            const costumer = await costumerService.findByIdService(decoded.id)

            if (!costumer || !costumer.id) {
                return res.status(401).send({ message: "Invalid token" })
            }

            req.userId = user.id;

            return next();
        })



    } catch (err) {
        res.status(500).send(({ message: err.message }))
    }

}