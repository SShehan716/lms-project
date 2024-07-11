const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: "claudia7@ethereal.email",
    pass: "9Bd9rEs7Dbvx76Fns5",
  },
});

exports.sendVerificationEmail = async (to, verificationUrl) => {
    const mailOptions = {
        from: 'test@gmail.com',
        to,
        subject: 'Account Verification',
        html: `<h2>Email Verification</h2>
        <p>Please click on the link below to verify your email:</p>
        <a href="${verificationUrl}">Verify Email</a>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error);
        }else{
            console.log(`Email sent: ${info.response}`);
        }
    });

}