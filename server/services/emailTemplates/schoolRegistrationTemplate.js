const schoolRegistrationTemplate = ({
    schoolName,
    schoolId,
    password,
}) => {
    return `
        <div style="font-family: Arial, sans-serif;">

            <h2>Welcome to Digital Marksheet Management System</h2>

            <p>Dear <strong>${schoolName}</strong>,</p>

            <p>
                Your school has been successfully registered in the
                Digital Marksheet Management System.
            </p>

            <table
                cellpadding="10"
                cellspacing="0"
                border="1"
                style="border-collapse: collapse;"
            >
                <tr>
                    <td><strong>School ID</strong></td>
                    <td>${schoolId}</td>
                </tr>

                <tr>
                    <td><strong>Password</strong></td>
                    <td>${password}</td>
                </tr>
            </table>

            <br>


            <br>

            <p>
                Regards,<br>
                DMMS ERP Team
            </p>

        </div>
    `;
};

module.exports = schoolRegistrationTemplate;