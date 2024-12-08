const nodemailer = require('nodemailer');
const { authenticator } = require('otplib');

const createTransporter = () => {
  const { EMAIL_SERVICE_PROVIDER, EMAIL_USER, EMAIL_PASS } = process.env;
  if (!EMAIL_SERVICE_PROVIDER || !EMAIL_USER || !EMAIL_PASS) {
    throw new Error('Missing required environment variables for email configuration.');
  }
  return nodemailer.createTransport({
    service: EMAIL_SERVICE_PROVIDER,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });
};

const generateOTP = () => {
  const secret = authenticator.generateSecret();
  return authenticator.generate(secret);
};

const setOTPExpirationDate = () => new Date(Date.now() + 10 * 60 * 1000);

const sendOtpToEmail = async (email, OTP) => {
  try {
    const transporter = createTransporter();
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Your Email',
      text: `Your OTP is ${OTP}. It expires in 10 minutes.`,
    };
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}`);
  } catch (error) {
    console.error(`Error sending OTP to ${email}:`, error);
  }
};

const CommunicationService = {
  createTransporter,
  generateOTP,
  setOTPExpirationDate,
  sendOtpToEmail,
};

module.exports = CommunicationService;
