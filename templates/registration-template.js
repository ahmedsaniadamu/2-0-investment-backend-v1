export const registrationEmailTemplate = `
<mjml>
  <mj-body background-color="#f9f9f9">
    <mj-section padding="20px">
      <mj-column>
        <mj-image 
          src="https://i.imgur.com/19FXl2n.png" 
          width="100px" 
          height="100px" 
          alt="Logo"
          align="center"
        />
        <mj-text font-size="38px" font-family="Helvetica, Arial, sans-serif" align="center" color="#333333" padding="10px 0">
          Hello {{name}},
        </mj-text>
        <mj-text font-size="20px" font-family="Helvetica, Arial, sans-serif" align="center" color="#555555" padding="10px 0">
          Thank you for registering, your next investment starts here. Your account has been successfully created.
          We request you to verify your email address using the code below:
        </mj-text>
        <mj-text font-size="20px" font-family="Helvetica, Arial, sans-serif" align="center" color="#555555" padding="10px 0">
          Your one-time password (OTP) is:
        </mj-text> 
        <mj-text font-size="40px" font-weight="bold" align="center" color="#002560ff" padding="10px 0">
          {{otp}}
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;

export const resendOtpEmailTemplate = `
<mjml>
  <mj-body background-color="#f9f9f9">
    <mj-section padding="20px">
      <mj-column>
        <mj-image 
          src="https://i.imgur.com/19FXl2n.png" 
          width="100px" 
          height="100px" 
          alt="Logo"
          align="center"
        />
        <mj-text font-size="32px" font-family="Helvetica, Arial, sans-serif" align="center" color="#333333" padding="10px 0">
          Hello {{name}},
        </mj-text>
        <mj-text font-size="18px" font-family="Helvetica, Arial, sans-serif" align="center" color="#555555" padding="10px 0">
          You requested a new one-time password (OTP). Please use the code below to continue:
        </mj-text>
        <mj-text font-size="40px" font-weight="bold" align="center" color="#002560ff" padding="10px 0">
          {{otp}}
        </mj-text>
        <mj-text font-size="14px" font-family="Helvetica, Arial, sans-serif" align="center" color="#999999" padding="10px 0">
          This OTP is valid for a limited time. Do not share it with anyone.
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;

export const forgotPasswordEmailTemplate = `
<mjml>
  <mj-body background-color="#f9f9f9">
    <mj-section padding="20px">
      <mj-column>
        <mj-image 
          src="https://i.imgur.com/19FXl2n.png" 
          width="100px" 
          height="100px" 
          alt="Logo"
          align="center"
        />
        <mj-text font-size="32px" font-family="Helvetica, Arial, sans-serif" align="center" color="#333333" padding="10px 0">
          Hello {{name}},
        </mj-text>
        <mj-text font-size="18px" font-family="Helvetica, Arial, sans-serif" align="center" color="#555555" padding="10px 0">
          We received a request to reset your password. please use the OTP below to proceed:
        </mj-text>
         <mj-text font-size="40px" font-weight="bold" align="center" color="#002560ff" padding="10px 0">
          {{otp}}
        </mj-text>
        <mj-text font-size="14px" font-family="Helvetica, Arial, sans-serif" align="center" color="#999999" padding="10px 0">
          If you didn’t request a password reset, you can safely ignore this email.
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;

