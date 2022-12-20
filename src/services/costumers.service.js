import Costumers from '../models/Costumers.js';
import nodemailer from 'nodemailer'
import schedule from 'node-schedule'

const createService = (body) => {
    return Costumers.create(body)
}

const findAllSerivce = () => {
    return Costumers.find();
}

const sendEmail = (email) => {
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
            to: `${email}`,
            subject: 'E-mail cadastrado!',
            text: "Seu e-mail foi cadastrado com sucesso em coisasdemulher.com"
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email enviado: ' + info.response);
            }
        });

    } catch (err) {
        console.log(err.message)
    }

}
export default { createService, sendEmail, findAllSerivce }
