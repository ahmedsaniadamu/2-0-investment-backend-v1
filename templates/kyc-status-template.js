export const kycPendingEmailTemplate = `
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
          Thank you for submitting your KYC documents!
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0 0 15px 0" line-height="1.5">
          We're currently reviewing your information to verify your account. This usually takes 24-48 hours, but we'll do our best to get it done sooner.
        </mj-text>
        <mj-text font-size="16px" font-weight="bold" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="10px 0 5px 0" line-height="1.5">
          What happens next?
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0 0 20px 0" line-height="1.5">
          Once approved, you'll be able to initiate withdrawal right away. We'll send you an email as soon as your verification is complete.
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0 0 20px 0" line-height="1.5">
          Thanks for your patience!
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0 0 5px 0">
          Best regards,
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0" line-height="1.5">
          The 2zero Team
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;

export const kycApprovedEmailTemplate = `
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
          Great news! Your KYC verification is complete, and your account is now fully activated.
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0 0 10px 0" line-height="1.5">
          You're all set to:
          <ul style="margin: 10px 0; padding-left: 20px;">
            <li>Browse investment plans</li>
            <li>Make investments</li>
            <li>Track your portfolio growth</li>
          </ul>
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="10px 0 20px 0" line-height="1.5">
          Ready to get started? Log in now: <a href="{{loginUrl}}" style="color: #002560; text-decoration: none;">{{loginUrl}}</a>
        </mj-text>
        <mj-text font-size="14px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0 0 20px 0" line-height="1.5">
          If you have any questions, we're here to help at <a href="mailto:{{supportEmail}}" style="color: #002560; text-decoration: none;">{{supportEmail}}</a>.
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0 0 5px 0">
          Happy investing!
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

export const kycRejectedEmailTemplate = `
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
          Thank you for submitting your KYC documents. Unfortunately, we weren't able to verify your account at this time.
        </mj-text>
        <mj-text font-size="16px" font-weight="bold" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="10px 0 5px 0" line-height="1.5">
          Reason for rejection:
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#d9534f" padding="0 0 20px 0" line-height="1.5">
          {{{reason}}}
        </mj-text>
        <mj-text font-size="14px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0 0 15px 0" line-height="1.5">
          Need help? Contact us at <a href="mailto:{{supportEmail}}" style="color: #002560; text-decoration: none;">{{supportEmail}}</a> and we'll guide you through the process.
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="10px 0 20px 0" line-height="1.5">
          We're here to help you get verified!
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0 0 5px 0">
          Best regards,
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0" line-height="1.5">
          The 2zero Team
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;
