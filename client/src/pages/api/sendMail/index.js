import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const data = req.body;
            
            // Create email transporter
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                }
            });

            // Create email content
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: data.emailTo,
                subject: `New Job Application for : ${data.jobTitle}`,
                html: `
                    <h2>New Job Application For ${data.jobTitle}</h2>
                    <p><strong>Position:</strong> ${data.jobTitle}</p>
                    <p><strong>Applicant Name:</strong> ${data.fullName}</p>
                    <p><strong>Email:</strong> ${data.email}</p>
                    <p><strong>Phone:</strong> ${data.phoneNumber}</p>
                `,
                attachments: [{
                    filename: data.cv.filename,
                    content: data.cv.content,
                    encoding: 'base64',
                    contentType: data.cv.contentType
                }]
            };

            // Send email
            await transporter.sendMail(mailOptions);

            res.status(200).json({
                success: true,
                message: 'Application sent successfully!'
            });

        } catch (error) {
            console.error('Email sending error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to send email. Please try again later.'
            });
        }
    }
}