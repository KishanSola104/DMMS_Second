const otpTemplate = ({
    name,
    otp,
}) => {

    return `
        <h2>OTP Verification</h2>

        <p>Hello ${name},</p>

        <p>
            Your OTP is:
        </p>

        <h1>${otp}</h1>

        <p>
            This OTP will expire shortly.
        </p>
    `;
};

module.exports = otpTemplate;