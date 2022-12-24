import Schedule from "../models/Schedule.js";
import nodemailer from "nodemailer";
import schedule from "node-schedule";

const createService = (body) => {
  return Schedule.create(body);
};

const findAllService = (offset, limit) => {
  return Schedule.find()
    .skip(offset)
    .limit(limit)
    .populate("employee")
    .populate("costumer");
};

const findByIdService = (id) => {
  return Schedule.findById(id);
};
const countSchedules = () => {
  return Schedule.countDocuments();
};

const findByEmployeeService = (id) => {
  return Schedule.find({ employee: id })
    .populate("employee")
    .populate("costumer")
    .sort({ date: -1 });
};

const findByDayService = (id, date) => {
  return Schedule.find({ employee: id, date: date })
    .populate("employee")
    .populate("costumer")
    .sort({ date: -1 });
};
const sendEmailService = (
  year,
  mouth,
  day,
  hour,
  minute,
  employeeName,
  constumerFindName,
  constumerFindEmail,
  service
) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // use TLS
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD_EMAIL,
      },
      /* host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "16f9e47a2bcfe2",
                pass: "4be74953493e61"
            } */
    });

    let mailOptions = {
      from: `"Coisas de Mulher" <${process.env.EMAIL}>`,
      to: `${constumerFindEmail}`,
      subject: "Horário agendado!",
      html: `<center><h4>Olá ${constumerFindName}</h4></center><br>
            <h5>Seu horário foi agendado para:</h5><br>
            <p>Dia: ${day}/${mouth}/${year}</p><br>
            <p>Horário: ${hour}:${minute}</p><br>
            <p>Serviço: ${service}</p><br>
            <p>Atendente: ${employeeName}</p>`,
      text: `Olá ${constumerFindName}! \nSeu horário acaba de ser agendado: \nDia: ${day}/${
        mouth + 1
      }/${year} \nHorário: ${hour}:${minute} \nServiço: ${service}\nAtendente: ${employeeName}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email enviado: " + info.response);
      }
    });
  } catch (err) {
    console.log(err.message);
  }
};

const sendEmailServiceSchedule = (
  year,
  mouth,
  day,
  hour,
  minute,
  employeeName,
  constumerFindName,
  constumerFindEmail,
  service
) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // use TLS
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD_EMAIL,
      },
      /* host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "16f9e47a2bcfe2",
        pass: "4be74953493e61",
      }, */
    });

    let mailOptions = {
      from: `"Coisas de Mulher" <${process.env.EMAIL}>`,
      to: `${constumerFindEmail}`,
      subject: "Lembrete de horário!",
      text: `Olá ${constumerFindName}! \nVocê tem um  horário agendado hoje: \nDia: ${day}/${mouth}/${year} \nHorário: ${hour}:${minute} \nServiço: ${service}\nAtendente: ${employeeName}`,
    };

    let scheduleDate = new Date(year, mouth, day, 6, 0, 0);
    schedule.scheduleJob(scheduleDate, () => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email enviado: " + info.response);
        }
      });
    });
  } catch (err) {
    console.log(err.message);
  }
};

export default {
  createService,
  findAllService,
  countSchedules,
  sendEmailService,
  sendEmailServiceSchedule,
  findByIdService,
  findByEmployeeService,
  findByDayService,
};
