export const registrationEmailTemplate = `
<mjml>
  <mj-body background-color="#f9f9f9">
    <mj-section padding="20px">
      <mj-column background-color="#ffffff" padding="40px">
        <mj-image 
          src="https://i.imgur.com/XA6xh1o.png"
          width="80px" 
          height="80px"
          alt="2Zero Investment Logo"
          align="left"
          padding="0"
          border-radius="50%"
        />
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="30px 0 10px 0">
          Hi {{name}},
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0 0 15px 0" line-height="1.5">
          Welcome to 2zero! We're excited to have you on board.
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0 0 10px 0" line-height="1.5">
          To complete your registration and secure your account, please use this One-Time Password (OTP):
        </mj-text> 
        <mj-text font-size="32px" font-weight="bold" align="left" color="#002560" padding="10px 0">
          {{otp}}
        </mj-text>
        <mj-text font-size="14px" font-family="Helvetica, Arial, sans-serif" align="left" color="#666666" padding="0 0 20px 0">
          This code will expire in 10 minutes.
        </mj-text>
        <mj-text font-size="14px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0 0 20px 0" line-height="1.5">
          If you didn't create an account with 2zero, please ignore this email or contact us immediately at <a href="mailto:{{supportEmail}}" style="color: #002560; text-decoration: none;">{{supportEmail}}</a>.
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0 0 5px 0">
          Looking forward to helping you grow your wealth!
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0" line-height="1.5">
          Best regards,<br />
          The 2zero Team
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
      <mj-column background-color="#ffffff" padding="40px">
        <mj-image 
          src="https://i.imgur.com/XA6xh1o.png"
          width="80px" 
          height="80px"
          alt="2Zero Investment Logo"
          align="left"
          padding="0"
          border-radius="50%"
        />
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="30px 0 10px 0">
          Hi {{name}},
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0 0 15px 0" line-height="1.5">
          Here's your new verification code:
        </mj-text>
        <mj-text font-size="32px" font-weight="bold" align="left" color="#002560" padding="10px 0">
          {{otp}}
        </mj-text>
        <mj-text font-size="14px" font-family="Helvetica, Arial, sans-serif" align="left" color="#666666" padding="0 0 20px 0">
          This code will expire in 10 minutes.
        </mj-text>
        <mj-text font-size="14px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0 0 20px 0" line-height="1.5">
          Having trouble? Reach out to us at <a href="mailto:{{supportEmail}}" style="color: #002560; text-decoration: none;">{{supportEmail}}</a>, and we'll get you sorted.
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0" line-height="1.5">
          Best regards,<br />
          The 2zero Team
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
      <mj-column background-color="#ffffff" padding="40px">
        <mj-image 
          src="https://i.imgur.com/XA6xh1o.png"
          width="80px" 
          height="80px"
          alt="2Zero Investment Logo"
          align="left"
          padding="0"
          border-radius="50%"
        />
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="30px 0 10px 0">
          Hi {{name}},
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0 0 15px 0" line-height="1.5">
          We received a request to reset your password. Use this One-Time Password (OTP) to create a new one:
        </mj-text>
        <mj-text font-size="32px" font-weight="bold" align="left" color="#002560" padding="10px 0">
          {{otp}}
        </mj-text>
        <mj-text font-size="14px" font-family="Helvetica, Arial, sans-serif" align="left" color="#666666" padding="0 0 20px 0">
          This code will expire in 10 minutes.
        </mj-text>
        <mj-text font-size="14px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0 0 15px 0" line-height="1.5">
          Didn't request a password reset? You can safely ignore this email. Your account remains secure.
        </mj-text>
        <mj-text font-size="14px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0 0 20px 0" line-height="1.5">
          Need help? Contact us at <a href="mailto:{{supportEmail}}" style="color: #002560; text-decoration: none;">{{supportEmail}}</a>.
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0" line-height="1.5">
          Best regards,<br />
          The 2zero Team
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;

