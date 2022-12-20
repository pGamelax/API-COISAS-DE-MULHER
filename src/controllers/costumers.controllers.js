import costumersService from '../services/costumers.service.js';
import dates from '../../email.js'

const create = async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        if (!name || !email || !phone) {
            return res.status(400).send({ message: "Preencha todos os campos" });
        }

        const costumerFind = await costumersService.findAllSerivce();

        for(let i = 0; i< costumerFind.length; i++){
            if(costumerFind[i].email == email){
                return res.status(400).send({ message: 'Email já cadastrado' }); 
            }
        }
        const costumer = await costumersService.createService(req.body)

        if (!costumer) {
            return res.status(400).send({ message: 'Erro ao cadastrar a cliente' });
        }

        costumersService.sendEmail(email)

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
        res.status(500).send(({ message: err.message }))
    }
}

export default { create, findAll }