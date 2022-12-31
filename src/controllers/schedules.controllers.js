import schedulesService from "../services/schedules.service.js";
import employeeService from "../services/employee.service.js";
import costumersService from "../services/costumers.service.js";
import moment from "moment-timezone";

const create = async (req, res) => {
  try {
    let { date } = req.body;
    const { service, hours } = req.body;
    const { costumer } = req.params;

    if (!date || !costumer) {
      return res
        .status(400)
        .send({ message: "Preencha todos os campos para marcar o horário" });
    }

    const employee = await employeeService.findByIdService(req.employeeId);

    if (!employee) {
      return res
        .status(400)
        .send({ message: "Não foi possível encontrar a funcionaria" });
    }

    const constumerFind = await costumersService.findByIdService(costumer);

    if (!constumerFind) {
      return res
        .status(400)
        .send({ message: "Não foi possível encontrar a cliente" });
    }

    date = moment(date).format("YYYY-MM-DD");

    const schedule = await schedulesService.createService({
      date,
      hours,
      costumer,
      service,
      employee: employee.id,
    });

    if (!schedule) {
      return res
        .status(400)
        .send({ message: "Não foi possível marcar o horário" });
    }

    const scheduleFind = await schedulesService.findByIdService(schedule._id);

    if (!scheduleFind) {
      return res
        .status(400)
        .send({ message: "Não foi possível marcar o horário" });
    }

    const day = moment(date).format("DD");
    const month = moment(date).format("MM");
    const year = moment(date).format("YYYY");

    const parts = hours.split(":");
    const [hour, minute] = parts;

    schedulesService.sendEmailService(
      year,
      month,
      day,
      hour,
      minute,
      employee.name,
      constumerFind.name,
      constumerFind.email,
      service
    );
    schedulesService.sendEmailServiceSchedule(
      year,
      month,
      day,
      hour,
      minute,
      employee.name,
      constumerFind.name,
      constumerFind.email,
      service
    );

    res.send(schedule);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAll = async (req, res) => {
  try {
    let { limit, offset } = req.query;

    limit = Number(limit);
    offset = Number(offset);

    if (!limit) {
      limit = 5;
    }

    if (!offset) {
      offset = 0;
    }

    const schedules = await schedulesService.findAllService(offset, limit);
    const total = await schedulesService.countSchedules();
    const currentUrl = req.baseUrl;

    const next = offset + limit;
    const nextUrl =
      next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl =
      previous != null
        ? `${currentUrl}?limit=${limit}&offset=${offset - 5}`
        : null;

    if (schedules.lenght === 0) {
      return res.status(400).send({ message: "Não há nenhum horário marcado" });
    }

    res.send({
      nextUrl,
      previousUrl,
      limit,
      offset,
      total,

      results: schedules.map((item) => ({
        id: item._id,
        date: item.date,
        costumer: item.costumer.name,
        employee: item.employee.name,
        service: item.service,
      })),
    });
   
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findByEmployee = async (req, res) => {
  const id = req.employeeId;

  const schedules = await schedulesService.findByEmployeeService(id);

  if (!schedules || schedules === 0) {
    return res.status(400).send({ message: "Horário não encontrado" });
  }

  return res.send({
    results: schedules.map((item) => ({
      id: item._id,
      date: item.date,
      hour: item.hours,
      costumer: item.costumer.name,
      employee: item.employee.name,
      service: item.service,
    })),
  });
};

const findByDay = async (req, res) => {
  const id = req.employeeId;

  var date = new Date();

  var date = moment(date).format("YYYY-MM-DD");

  const schedules = await schedulesService.findByDayService(id, date);

  if (!schedules || schedules === 0) {
    return res.status(400).send({ message: "Horário não encontrado" });
  }

  return res.send({
    results: schedules.map((item) => ({
      id: item._id,
      date: item.date,
      hour: item.hours,
      costumer: item.costumer.name,
      employee: item.employee.name,
      service: item.service,
    })),
  });
};
export default { create, findAll, findByEmployee, findByDay };
