const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // or your preferred service
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS  // Use an App Password here
  }
});

const sendNotificationEmail = async (contactData) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Send it to yourself
    subject: `New Portfolio Message from ${contactData.name}`,
    text: `You have a new message!\n\nName: ${contactData.name}\nEmail: ${contactData.email}\nMessage: ${contactData.message}`
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendNotificationEmail };