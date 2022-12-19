import bcrypt from "bcrypt"
import authService from '../services/auth.service.js'

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const costumer = await authService.loginService(email);

        if (!costumer) {
            return res.status(404).send({ message: "Usuario ou senha está inválido" })
        }

        const passwordIsValid = bcrypt.compareSync(password, costumer.password)

        if (!passwordIsValid) {
            return res.status(404).send({ message: "Usuario ou senha está inválido" })
        }

        const token = authService.generateToken(costumer.id)

        res.send({ token })

    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

export default { login }