import bcrypt from "bcrypt"
import authService from '../services/auth.service.js'

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        console.log(email, password)
        const employee = await authService.loginService(email);

        if (!employee) {
            return res.status(404).send({ message: "Usuario ou senha está inválido" })
        }

        const passwordIsValid = bcrypt.compareSync(password, employee.password)

        if (!passwordIsValid) {
            return res.status(404).send({ message: "Usuario ou senha está inválido" })
        }
        
        const token = authService.generateToken(employee.id, employee.isAdmin)

        res.send({ token })

    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

export default { login }