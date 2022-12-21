import employeeService from '../services/employee.service.js'

const create = async (req, res) => {
    try {

        
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send({ message: "Preencha todos os campos para se registrar" });
        }

        if (password.length < 8) {
            return res.status(400).send({ message: "Digite uma senha maior que 8 digitos" });
        }

        const employeeFind = await employeeService.findAllService();

        for (let i = 0; i < employeeFind.length; i++) {
            if (employeeFind[i].email == email) {
                return res.status(400).send({ message: "E-mail já cadastrado" });
            }
        }

        const employee = await employeeService.createService(req.body)

        if (!employee) {
            return res.status(400).send({ message: 'Erro ao cadastrar a cliente' });
        }

        res.status(201).send({
            message: "Cadastrado com sucesso",

            employee: {
                id: employee._id,
                name,
                email
            }
        });
    } catch (err) {
        res.status(500).send(({ message: err.message }))
    }
}

const findAll = async (req, res) => {
    try {
        const employee = await employeeService.findAllService();

        if (!employee.length === 0) {
            return res.status(400).send({ message: 'Não há clientes cadastrados' })
        }

        res.send(employee);
    } catch (err) {
        return res.status(500).send(({ message: err.message }))
    }
}

const findById = async (req, res) => {
    try {
        const employee = req.employee
        res.send(employee)
    } catch (err) {
        res.status(500).send(({ message: err.message }))
    }
}

const update = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name && !email && !password) {
            return res.status(400).send({ message: "Preencha pelo menos um campo para atualizar" });
        };

        const { id } = req;

        await employeeService.updateService(id, name, email, password)

        
        res.send({ message: "Dados atualizado com sucesso" });

    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
}

const erase = async (req, res) => {
    try {
        const { id } = req;

        await employeeService.deleteService(id)

        res.send({ message: "Cliente deletado com sucesso" })

    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
}
export default { create, findAll, findById, update, erase }