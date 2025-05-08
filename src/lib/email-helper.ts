import nodemailer from "nodemailer";

type Payload = {
  to: string;
  subject: string;
  html: string;
};

const smtpConfig = {
  host: process.env.SMTP_HOST || '',
  port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 0,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASSWORD || '',
  },
};

export const handleEmailFire = async (data: Payload) => {
  const transporter = nodemailer.createTransport({
    ...smtpConfig,
  });

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      ...data,
    });
    console.log('E-mail enviado com sucesso!');
    transporter.close();
    return true;
  } catch (error) {
    console.log('Erro ao enviar e-mail');
    console.log(error);
    transporter.close();
    return false;
  }

  return false;
};