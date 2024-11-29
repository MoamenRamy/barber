const nodemailer = require("nodemailer");
const sendEmail = async (options) => {
   const transporter = nodemailer.createTransport({
    // host: "smtp-mail.outlook.com", // Outlook SMTP server
    // port: 587, // Outlook SMTP port
    host: "smtp.gmail.com", // Outlook SMTP server
    port: 465, // Outlook SMTP port
    secure: true,
    // tls:{
    //   ciphers:"SSLv3",
    //   rejectUnauthorized:false  
    // },
    // auth: {
    //     user: "salon.barber@outlook.com",
    //     pass: "crekdlqohdusnbmo",
    // },
    auth: {
        user: "salon.barber11@gmail.com",
        pass: "wivwbkkohnjhgkqo",
    },
   
});
    const mailOptions = {
        from: 'Salon <salon.barber11@gmail.com>', 
        to: options.email, 
        subject: options.subject, 
        text: options.message, 
     
    };
    await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;