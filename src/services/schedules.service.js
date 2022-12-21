import Schedule from '../models/Schedule.js'
import nodemailer from 'nodemailer'
import schedule from 'node-schedule'

const createService = (body) => {
    return Schedule.create(body)
}

const findAllService = (offset, limit) => {
    return Schedule.find().skip(offset).limit(limit).populate("employee").populate("costumer")
}
const countSchedules = () => {
    return Schedule.countDocuments();
}

const sendEmailService = (year, mouth, day, hour, minute, employeeName, constumerFindName, constumerFindEmail, service) => {
    try {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use TLS
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD_EMAIL
            }
        });

        let mailOptions = {
            from: `"Coisas de Mulher" <${process.env.EMAIL}>`,
            to: `${constumerFindEmail}`,
            subject: 'Horário agendado!',
            text: `Olá ${constumerFindName}! \nSeu horário acaba de ser agendado: \nDia: ${day}/${mouth}/${year} \nHorário: ${hour}:${minute} \nServiço: ${service}\nAtendente: ${employeeName}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email enviado: ' + info.response);
            }
        });


    }
    catch (err) {
        console.log(err.message)
    }
}


const sendEmailServiceSchedule = (year, mouth, day, hour, minute, employeeName, constumerFindName, constumerFindEmail, service) => {
    try {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use TLS
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD_EMAIL
            }
        });

        let mailOptions = {
            from: `"Coisas de Mulher" <${process.env.EMAIL}>`,
            to: `${constumerFindEmail}`,
            subject: 'Lembrete de horário!',
            text: `Olá ${constumerFindName}! \nVocê tem um  horário agendado hoje: \nDia: ${day}/${mouth}/${year} \nHorário: ${hour}:${minute} \nServiço: ${service}\nAtendente: ${employeeName}`
        };

        let scheduleDate = new Date(year, mouth - 1, day, 20, 6, 0)
        schedule.scheduleJob(scheduleDate, () => {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email enviado: ' + info.response);
                }
            });
        })


    }
    catch (err) {
        console.log(err.message)
    }
}


export default { createService, findAllService, countSchedules, sendEmailService, sendEmailServiceSchedule }