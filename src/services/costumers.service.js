import Costumers from '../models/Costumers.js';
import nodemailer from 'nodemailer'
import schedule from 'node-schedule'

const createService = (body) => {
    return Costumers.create(body)
}

const findAllSerivce = () => {
    return Costumers.find();
}

const findByIdService = (id) => {
    return Costumers.findById(id)
}

const findByNameService = (name) => {
    return Costumers.find({
        name: { $regex: `${name || ""}`, $options: "i" }
    })
}
const updateService = (id, name, email, phone) => {
    return Costumers.findOneAndUpdate({ _id: id }, { name, email, phone });
}

const deleteService = (id) => {
    return Costumers.findOneAndDelete({ _id: id })
}

const sendEmail = (name, email) => {
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
            text: `Olá ${name}, tudo bom? \nSeu e-mail foi cadastrado com sucesso em coisasdemulher.com`
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

const sendEmailUpdated = (name, email) => {
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
            subject: 'Dados Atualizados!',
            text: `Olá ${name}, tudo bom? \nSeus dados foram atualizados com sucesso em coisasdemulher.com`
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
export default { createService, sendEmail, findAllSerivce, findByIdService, sendEmailUpdated, deleteService, updateService, findByNameService }