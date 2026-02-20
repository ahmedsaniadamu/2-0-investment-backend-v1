export const kycPendingEmailTemplate = `
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
        <mj-text font-size="28px" font-family="Helvetica, Arial, sans-serif" align="center" color="#333333" padding="10px 0">
          Hello {{name}},
        </mj-text>
        <mj-text font-size="20px" font-family="Helvetica, Arial, sans-serif" align="center" color="#f0ad4e" padding="10px 0">
          Your KYC Verification Is Under Review
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" color="#555555" padding="10px 0">
          Thank you for submitting your KYC (Know Your Customer) documents. Our compliance team has received your information and is currently reviewing your submission to ensure it meets our verification standards.
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" color="#555555" padding="10px 0">
          This process typically takes <strong>24–48 hours</strong>. You’ll receive another email once your verification has been approved or if we require additional information from you.
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" color="#555555" padding="10px 0">
          While your KYC is pending, certain account features may remain restricted, such as withdrawals or new investment actions. We appreciate your patience as we complete this important step for your account security.
        </mj-text>
        <mj-button background-color="#002560ff" color="#ffffff" href="{{dashboardLink}}" align="center">
          Check KYC Status
        </mj-button>
        <mj-text font-size="14px" font-family="Helvetica, Arial, sans-serif" align="center" color="#777777" padding="20px 0">
          Need help? Our support team is always ready to assist you.<br/>
          <a href="{{supportLink}}" style="color:#002560ff; text-decoration:none;">Contact Support</a>
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
      <mj-column>
        <mj-image 
          src="https://i.imgur.com/19FXl2n.png" 
          width="100px" 
          height="100px" 
          alt="Logo"
          align="center"
        />
        <mj-text font-size="28px" font-family="Helvetica, Arial, sans-serif" align="center" color="#333333" padding="10px 0">
          Hello {{name}},
        </mj-text>
        <mj-text font-size="20px" font-family="Helvetica, Arial, sans-serif" align="center" color="#5cb85c" padding="10px 0">
          Congratulations! Your KYC Verification Is Approved
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" color="#555555" padding="10px 0">
          We’re pleased to inform you that your KYC verification has been successfully approved. Your identity and documents have been reviewed and verified by our compliance team.
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" color="#555555" padding="10px 0">
          You now have full access to all platform features, including investments withdrawals. Thank you for taking the time to complete this important security step — it helps us maintain a safe and compliant environment for all users.
        </mj-text>
        <mj-button background-color="#002560ff" color="#ffffff" href="{{dashboardLink}}" align="center">
          Go to Dashboard
        </mj-button>
        <mj-text font-size="14px" font-family="Helvetica, Arial, sans-serif" align="center" color="#777777" padding="20px 0">
          For your safety, please ensure your personal and banking details remain up to date.<br/>
          <a href="{{supportLink}}" style="color:#002560ff; text-decoration:none;">Contact Support</a> if you need assistance.
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
      <mj-column>
        <mj-image 
          src="https://i.imgur.com/19FXl2n.png" 
          width="100px" 
          height="100px" 
          alt="Logo"
          align="center"
        />
        <mj-text font-size="28px" font-family="Helvetica, Arial, sans-serif" align="center" color="#333333" padding="10px 0">
          Hello {{name}},
        </mj-text>
        <mj-text font-size="20px" font-family="Helvetica, Arial, sans-serif" align="center" color="#d9534f" padding="10px 0">
          Unfortunately, Your KYC Verification Was Not Approved
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" color="#555555" padding="10px 0">
          After reviewing your submitted documents, our compliance team was unable to verify your identity. This may be due to incomplete, unclear, or invalid information provided during your KYC submission.
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" color="#555555" padding="10px 0">
          <strong>Reason:</strong> {{reason}}<br/><br/>
          We encourage you to review the details below and resubmit your KYC with the correct or updated documents. Please ensure that all images are clear, unaltered, and that your name matches the one on your identification.
        </mj-text>
        <mj-button background-color="#002560ff" color="#ffffff" href="{{resubmitLink}}" align="center">
          Resubmit KYC Documents
        </mj-button>
        <mj-text font-size="14px" font-family="Helvetica, Arial, sans-serif" align="center" color="#777777" padding="20px 0">
          Need guidance on acceptable document types? <br/>
          Visit our <a href="{{guidelinesLink}}" style="color:#002560ff; text-decoration:none;">KYC Documentation Guide</a> or 
          <a href="{{supportLink}}" style="color:#002560ff; text-decoration:none;">contact our support team</a>.
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;
