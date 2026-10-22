const transporter = require("../config/mailer");

const sendEmail = async ({ to, subject, html }) => {
    try {
        await transporter.sendMail({
            from: `"DMMS ERP" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });

        return {
            success: true,
            message: "Email sent successfully.",
        };
    } catch (error) {

    console.error("========== EMAIL ERROR ==========");
    console.error(error);
    console.error("================================");

    throw error;

    }
};

module.exports = {
    sendEmail,
};