/* import nodemailer from 'nodemailer'
import schedule from 'node-schedule'


const date = new Date(2022, 10, 21, 22, 20)



console.log(date.getMinutes())

const pedro = async () => {
    // Crie um transporte de email usando o servidor SMTP do seu provedor de email
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use TLS
        auth: {
            user: 'pedroohenriique2003@gmail.com',
            pass: 'alcfhurryfqhvqwa'
        }
    });

    // Defina as opções do email, incluindo o destinatário, assunto e corpo
    let mailOptions = {
        from: '"Pedro Gamela" <pedroohenriique2003@gmail.com>',
        to: 'pedrogamela2003@gmail.com',
        subject: 'Testando Email',
        text: 'Corpo do Email',
        // Adicione uma opção 'date' para definir a data do email
        date: '19 Dec 2022 22:51:00'
    };

    // Envie o email usando o transporte criado anteriormente

    let scheduleDate = date
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

pedro()
 */





/* import connectDatabase from './src/database/database.js';
import schedulesService from "./src/services/schedules.service.js";
import dotenv from 'dotenv';
dotenv.config();

connectDatabase();
const id = "63a3b9be5f924bc3eab37174"
const buscar = async () => {
    const schedule = await schedulesService.findByIdService(id)
    
    const data = schedule.date

    const day = data.getDate()
    const mouth = data.getMonth()
    const year = data.getFullYear()
    const hour = data.getHours()
    const minute = data.getMinutes()

    const newMinute = minute == "0" ? "00" : null
        
    console.log(day)
    console.log(mouth)
    console.log(year)
    console.log(hour)
    console.log(minute)
    console.log(newMinute)
    
}
 

buscar()*/

import moment from 'moment-timezone'



const data = new Date("2022-12-25T21:00")

var newDate = moment(data).tz("America/Campo_grande")

const nova = (newDate.format('mm'))

console.log(nova)