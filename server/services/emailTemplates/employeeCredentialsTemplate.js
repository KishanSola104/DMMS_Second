const employeeCredentialsTemplate = ({
    employeeName,
    employeeId,
    userId,
    password,
    designation,
}) => {

    return `
        <div style="font-family: Arial, sans-serif;">

            <h2>Welcome to Digital Marksheet Management System</h2>

            <p>Hello <strong>${employeeName}</strong>,</p>

            <p>
                Your employee account has been created successfully.
                Below are your login credentials.
            </p>

            <table
                cellpadding="10"
                cellspacing="0"
                border="1"
                style="border-collapse: collapse;"
            >

                <tr>
                    <td><strong>Employee ID</strong></td>
                    <td>${employeeId}</td>
                </tr>

                <tr>
                    <td><strong>User ID</strong></td>
                    <td>${userId}</td>
                </tr>

                <tr>
                    <td><strong>Designation</strong></td>
                    <td>${designation}</td>
                </tr>

                <tr>
                    <td><strong>Password</strong></td>
                    <td>${password}</td>
                </tr>

            </table>

            <br>

            <br>

            <p>
                Please change your password after your first login.
            </p>

            <br>

            <p>
                Regards,<br>
                <strong>DMMS ERP Team</strong>
            </p>

        </div>
    `;

};

module.exports = employeeCredentialsTemplate;