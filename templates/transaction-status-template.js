export const transactionRejectedEmailTemplate = `
<mjml>
  <mj-body background-color="#f9f9f9">
    <mj-section padding="20px">
      <mj-column>
        <mj-image 
          src="https://i.imgur.com/nyiZaFs.jpeg" 
          width="100px" 
          height="100px" 
          alt="Logo"
          align="center"
        />
        <mj-text font-size="32px" font-family="Helvetica, Arial, sans-serif" align="center" color="#333333" padding="10px 0">
          Hello {{name}},
        </mj-text>
        <mj-text font-size="18px" font-family="Helvetica, Arial, sans-serif" align="center" color="#d9534f" padding="10px 0">
          We regret to inform you that your recent transaction (ID: {{transactionId}}) has been rejected by our admin team.
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="center" color="#555555" padding="10px 0">
          Reason: {{reason}}<br/>
          Please review your submission and try again. If you need assistance, feel free to contact our support team.
        </mj-text>
        <mj-button background-color="#002560ff" color="#ffffff" href="{{supportLink}}" align="center">
          Contact Support
        </mj-button>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;

export const transactionApprovedEmailTemplate = `
<mjml>
  <mj-body background-color="#f9f9f9">
    <mj-section padding="20px">
      <mj-column>
        <mj-image 
          src="https://i.imgur.com/nyiZaFs.jpeg" 
          width="100px" 
          height="100px" 
          alt="Logo"
          align="center"
        />
        <mj-text font-size="32px" font-family="Helvetica, Arial, sans-serif" align="center" color="#333333" padding="10px 0">
          Hello {{name}},
        </mj-text>
        <mj-text font-size="18px" font-family="Helvetica, Arial, sans-serif" align="center" color="#5cb85c" padding="10px 0">
          Great news! Your transaction (ID: {{transactionId}}) has been successfully approved.
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="center" color="#555555" padding="10px 0">
          You can now view your updated investment portfolio and track your progress in your dashboard.
        </mj-text>
        <mj-button background-color="#002560ff" color="#ffffff" href="{{dashboardLink}}" align="center">
          Go to Dashboard
        </mj-button>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;

export const transactionPendingEmailTemplate = `
<mjml>
  <mj-body background-color="#f9f9f9">
    <mj-section padding="20px">
      <mj-column>
        <mj-image 
          src="https://i.imgur.com/nyiZaFs.jpeg" 
          width="100px" 
          height="100px" 
          alt="Logo"
          align="center"
        />
        <mj-text font-size="32px" font-family="Helvetica, Arial, sans-serif" align="center" color="#333333" padding="10px 0">
          Hello {{name}},
        </mj-text>
        <mj-text font-size="18px" font-family="Helvetica, Arial, sans-serif" align="center" color="#f0ad4e" padding="10px 0">
          Your transaction (ID: {{transactionId}}) is currently under review and pending approval.
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="center" color="#555555" padding="10px 0">
          We appreciate your patience. You will receive another update once the review is complete.
        </mj-text>
        <mj-button background-color="#002560ff" color="#ffffff" href="{{dashboardLink}}" align="center">
          View Status
        </mj-button>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;
