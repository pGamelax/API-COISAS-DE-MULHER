import schedulesService from '../services/schedules.service.js'
import employeeService from '../services/employee.service.js'

const create = async (req, res) => {
    try {
        const { date, service } = req.body
        const { costumer } = req.params

        if (!date || !costumer) {
            return res.status(400).send({ message: "Preencha todos os campos para marcar o horário" })
        }

        const employee = req.employeeId

        if (!employee) {
            return res.status(400).send({ message: "Não foi possível encontrar a funcionaria" });
        }

        const schedule = await schedulesService.createService({ date, costumer, service, employee: employee })

        /* const parts = date.split(" ");
    
        const [year, mouth, day, hour, minute] = parts
    
        await schedulesService.sendEmailService(year,mouth,day,hour,minute) */
        res.send(schedule)
    } catch (err) {
        res.status(500).send(({ message: err.message }))
    }
}

const findAll = async (req, res) => {
    try {

        let { limit, offset } = req.query

        limit = Number(limit)
        offset = Number(offset)

        if (!limit) {
            limit = 5;
        }

        if (!offset) {
            offset = 0;
        }

        const schedules = await schedulesService.findAllService(offset, limit)
        const total = await schedulesService.countSchedules();
        const currentUrl = req.baseUrl

        const next = offset + limit;
        const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null

        const previous = offset - limit < 0 ? null : offset - limit;
        const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${offset-5}` : null


        if (schedules.lenght === 0) {
            return res.status(400).send({ message: "Não há nenhum horário marcado" });
        }

        res.send({
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,

            results: schedules.map(item => ({
                id: item._id,
                date: item.date,
                costumer: item.costumer.name,
                employee: item.employee.name,
                service: item.service,
            }))
        })

    } catch (err) {
        res.status(500).send(({ message: err.message }))
    }
}

export default { create, findAll }