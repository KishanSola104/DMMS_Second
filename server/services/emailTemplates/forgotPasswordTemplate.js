const forgotPasswordTemplate = ({
    employeeName,
    password,
}) => {

    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e5e5e5; border-radius: 8px;">

            <h2 style="color: #d32f2f; text-align: center;">
                Password Reset Request
            </h2>

            <p>Dear <strong>${employeeName}</strong>,</p>

            <p>
                We have generated a temporary password for your account in the
                <strong>Digital Marksheet Management System (DMMS)</strong>.
            </p>

            <p>
                Please use the following temporary password to log in:
            </p>

            <div style="background: #f4f4f4; border: 1px solid #ddd; padding: 15px; text-align: center; border-radius: 6px; margin: 20px 0;">
                <span style="font-size: 18px; font-weight: bold; color: #1976d2;">
                    ${password}
                </span>
            </div>

            <p style="color: #d32f2f; font-weight: bold;">
                Important:
            </p>

            <ul>
                <li>Log in using the temporary password above.</li>
                <li>Immediately change your password after logging in.</li>
                <li>Do not share your password with anyone.</li>
                <li>If you did not request this password reset, please contact your School Administrator immediately.</li>
            </ul>

            <p>
                Thank you,<br>
                <strong>Digital Marksheet Management System (DMMS)</strong>
            </p>

        </div>
    `;
};

module.exports = forgotPasswordTemplate;