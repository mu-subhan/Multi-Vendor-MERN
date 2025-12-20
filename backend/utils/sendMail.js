// const nodemailer = require ("nodemailer");

// const sendMail = async (options) =>{
//     const transporter = nodemailer.createTransport({
//         host:process.env.SMPT_HOST,
//         port:process.env.SMPT_PORT,
//         secureConnection: true,
//         // service:process.env.SMPT_SERVICE,
//         auth:{
//             user:process.env.SMPT_MAIL,
//             pass:process.env.SMPT_PASSWORD,
//         },
//         tls: {
//             ciphers:'SSLv3'
//         }
//     });

//     const mailOptions = {
//         from:process.env.SMPT_MAIL,
//         to:options.email,
//         subject:options.subject,
//         text:options.message,
//     };
//     await transporter.sendMail(mailOptions);
// };
// module.exports = sendMail;


const nodemailer = require ("nodemailer");

const sendMail = async (options) =>{
    console.log(process.env.SMPT_HOST,"host")
    const transporter = nodemailer.createTransport({
        host:process.env.SMPT_HOST,
        port:process.env.SMPT_PORT,
        secureConnection: true,
        // service:process.env.SMPT_SERVICE,
        auth:{
            user:process.env.SMPT_MAIL,
            pass:process.env.SMPT_PASSWORD,
        },
        tls: {
      rejectUnauthorized: false, // for development or self-signed certs; remove in prod
    },
    });

    const mailOptions = {
        from:process.env.SMPT_MAIL,
        to:options.email,
        subject:options.subject,
        text:options.message,
    };
    await transporter.sendMail(mailOptions);
};
module.exports = sendMail;