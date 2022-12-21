import nodemailer from 'nodemailer'
import schedule from 'node-schedule'

const date = "2022 12 21 18 45"
const parts = date.split(" ");

const [ano, mes, dia, hora, minute] = parts

const pedro = async () =>{
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

    let scheduleDate = new Date(ano, mes-1, dia, hora, minute, 0)
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

