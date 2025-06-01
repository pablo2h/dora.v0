
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'hornodebarroer@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD // Configurar en variables de entorno
    }
});

export const sendEmail = async (p0: string, p1: string, p2: string, {
  to = 'hornodebarroer@gmail.com', subject, text, html
}: {
  to?: string;
  subject: string;
  text: string;
  html: string;
}) => {
    try {
        await transporter.sendMail({
            from: 'hornodebarroer@gmail.com',
            to,
            subject,
            text,
            html
        });
        return { success: true };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error };
    }
};