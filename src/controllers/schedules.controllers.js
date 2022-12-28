import schedulesService from "../services/schedules.service.js";
import employeeService from "../services/employee.service.js";
import costumersService from "../services/costumers.service.js";
import axios from 'axios';
import moment from "moment-timezone";

const create = async (req, res) => {
  try {
    var { date } = req.body;
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

    var date = moment(date).format("YYYY-MM-DD");

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
    const mouth = moment(date).format("MM");
    const year = moment(date).format("YYYY");

    const parts = hours.split(":");
    const [hour, minute] = parts;

    schedulesService.sendEmailService(
      year,
      mouth,
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
      mouth,
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
    /*let { limit, offset } = req.query;

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
    });*/
    
    const url = "https://api.clashroyale.com/v1/players/%23UYG0JUYCG"
    
    const options = {
      headers: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImNiMTk3OWRkLTBlNTQtNDQ2MS1iNTk0LTk3ZDlhN2RmZDUwNSIsImlhdCI6MTY3MjI1NTQ1Niwic3ViIjoiZGV2ZWxvcGVyL2NiYzRmNjg0LTg4ZTQtNTZjOC1kMTU1LWJjNDFjZWFmNjBlNyIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIzNS4xNjAuMTIwLjEyNiJdLCJ0eXBlIjoiY2xpZW50In1dfQ.6zS8gUzfk3Nlvb-ibk3x5CAAv0755vjBX6YCbX_ZsB2FRF4FC_wKhGKJSmYbfISVwKI-fSL5NyjUjzhlKSopmA'
      }
    }
      await axios.get(url, options).then((resp) => {
        res.send(resp.data)
      })
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
