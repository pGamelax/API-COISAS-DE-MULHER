import costumersService from '../services/costumers.service.js';

const create = async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        if (!name || !email || !phone) {
            return res.status(400).send({ message: "Preencha todos os campos" });
        }

        const costumerFind = await costumersService.findAllSerivce();

        for (let i = 0; i < costumerFind.length; i++) {
            if (costumerFind[i].email == email) {
                return res.status(400).send({ message: 'Email já cadastrado' });
            }
        }
        const costumer = await costumersService.createService(req.body)

        if (!costumer) {
            return res.status(400).send({ message: 'Erro ao cadastrar a cliente' });
        }

        costumersService.sendEmail(name, email)

        res.status(201).send({
            message: "Cliente cadastrado com sucesso",

            costumer: {
                name,
                email,
                phone,
            },
        })


    } catch (err) {
        res.status(500).send(({ message: err.message }))
    }

}

const findAll = async (req, res) => {
    try {
        const costumers = await costumersService.findAllSerivce();

        if (!costumers.length === 0) {
            return res.status(400).send({ message: 'Não há clientes cadastrados' })
        }

        res.send(costumers);
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const findById = async (req, res) => {
    try {
        const { id } = req.params;

        const costumer = await costumersService.findByIdService(id);

        if (!costumer) {
            return res.status(400).send({ message: 'Cliente não encontrado' });
        }
        res.send(costumer);
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const update = async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        if (!name && !email && !phone) {
            return res.status(400).send({ message: "Preencha pelo menos um campo para atualizar" });
        };

        const { id } = req;

        const costumerFind = await costumersService.findAllSerivce();

        for (let i = 0; i < costumerFind.length; i++) {
            if (costumerFind[i].email == email) {
                return res.status(400).send({ message: 'Email já cadastrado' });
            }
        }

        await costumersService.updateService(id, name, email, phone)

        const costumer = await costumersService.findByIdService(id);
        
        costumersService.sendEmailUpdated(costumer.name, costumer.email)

        res.send({ message: "Dados atualizado com sucesso" });

    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const erase = async (req, res) => {
    try {
        const { id } = req.params

        const costumer = await costumersService.deleteService(id)

        if (!costumer) {
            return res.status(400).send({ message: 'Cliente não encontrado' })
        }

        res.send({ message: "Usuario deletado com sucesso" })

    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

export default { create, findAll, erase, findById, update }