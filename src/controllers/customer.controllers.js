import costumerService from '../services/costumers.service.js'

const create = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send({ message: "Preencha todos os campos para se registrar" });
        }

        if (password.length < 8) {
            return res.status(400).send({ message: "Digite uma senha maior que 8 digitos" });
        }

        const costumersFind = await costumerService.findAllService();

        for (let i = 0; i < costumersFind.length; i++) {
            if (costumersFind[i].email == email) {
                return res.status(400).send({ message: "E-mail já cadastrado" });
            }
        }

        const costumer = await costumerService.createService(req.body)

        if (!costumer) {
            return res.status(400).send({ message: 'Erro ao cadastrar a cliente' });
        }

        res.status(201).send({
            message: "Cadastrado com sucesso",

            costumer: {
                id: costumer._id,
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
        const costumers = await costumerService.findAllService();

        if (!costumers.length === 0) {
            return res.status(400).send({ message: 'Não há clientes cadastrados' })
        }

        res.send(costumers);
    } catch (err) {
        return res.status(500).send(({ message: err.message }))
    }
}

const findById = async (req, res) => {
    try {
        const costumer = req.costumer
        res.send(costumer)
    } catch (err) {
        res.status(500).send(({ message: err.message }))
    }
}

const update = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name, !email, !password) {
            return res.status(400).send({ message: "Preencha pelo menos um campo para atualizar" });
        };

        const { id, costumer } = req;

        await costumerService.updateService(id, name, email, password)

        res.send({ message: "Dados atualizado com sucesso" });

    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
}

const erase = async (req, res) => {
    try {
        const { id } = req;

        await costumerService.deleteService(id)

        res.send({message: "Cliente deletado com sucesso"})
        
    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
}
export default { create, findAll, findById, update, erase }