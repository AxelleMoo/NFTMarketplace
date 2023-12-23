const nodemailer = require("nodemailer");

const sendEmail = async options =>{

    // const transporter = nodemailer.createTransport({
    //     host: process.env.EMAIL_HOST,
    //     port: process.env.EMAIL_PORT,
    //     auth: {
    //         user: process.env.EMAIL_USERNAMER,
    //         pass: process.env.EMAIL_PASSWORD
    //     }
    // })

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'faustino.ledner76@ethereal.email',
            pass: 'eRRchjjx9XGcq1pgXM'
        }
    });

    const mailOptions = {
        from: "OnChainBunnnies <onchainbunnies@gmail.com",
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await transporter.sendMail(mailOptions)
};

module.exports = sendEmail;