import nodemailer from "nodemailer";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { name, email, subject, message } = req.body;

    // Configure your email transport
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT),
        secure: false, // true if port 465
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    try {
        await transporter.sendMail({
            from: email,
            to: process.env.MAIL_TO,
            subject: subject,
            html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
        });

        res.writeHead(302, { Location: '/index.html' });
        res.end();

    } catch (error) {
        console.error("Email error:", error);
        return res.status(500).json({ error: "Email failed to send" });
    }
}
