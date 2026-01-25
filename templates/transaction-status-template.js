
export const transactionFailedEmailTemplate = `
<mjml>
  <mj-body background-color="#f9f9f9">
    <mj-section padding="20px">
      <mj-column>
        <!-- Logo -->
        <mj-image 
          src="https://i.imgur.com/nyiZaFs.jpeg" 
          width="100px" 
          height="100px" 
          alt="Logo"
          align="center"
        />

        <!-- Greeting -->
        <mj-text font-size="32px" font-family="Helvetica, Arial, sans-serif" align="center" color="#333333" padding="10px 0">
          Hello {{name}},
        </mj-text>

        <!-- Main Message -->
        <mj-text font-size="18px" font-family="Helvetica, Arial, sans-serif" align="center" color="#d9534f" padding="10px 0">
          Unfortunately, your recent transaction (ID: {{transactionId}}) could not be processed successfully.
        </mj-text>

        <!-- Details -->
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#555555" padding="10px 20px">
          <strong>Reason:</strong> {{reason}}<br/><br/>
          We understand that failed transactions can be frustrating. Please review the details below and consider the recommended next steps to resolve the issue.
        </mj-text>

        <!-- Transaction Info Table -->
        <mj-table font-size="14px" color="#333333" cellpadding="6" cellspacing="0" width="100%">
          <tr style="background-color:#f0f0f0;">
            <td><strong>Transaction ID</strong></td>
            <td>{{transactionId}}</td>
          </tr>
          <tr>
            <td><strong>Amount</strong></td>
            <td>{{amount}}</td>
          </tr>
          <tr style="background-color:#f0f0f0;">
            <td><strong>Payment Method</strong></td>
            <td>{{paymentMethod}}</td>
          </tr>
          <tr>
            <td><strong>Date</strong></td>
            <td>{{date}}</td>
          </tr>
          <tr style="background-color:#f0f0f0;">
            <td><strong>Status</strong></td>
            <td style="color:#d9534f; font-weight:bold;">Failed</td>
          </tr>
        </mj-table>

        <!-- Next Steps -->
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#555555" padding="20px">
          <strong>Recommended Actions:</strong>
          <ul style="margin:10px 0; padding-left:20px;">
            <li>Verify that your payment details (card number, expiry date, CVV) are correct.</li>
            <li>Ensure that your account has sufficient funds or credit available.</li>
            <li>Try using an alternative payment method if available.</li>
            <li>Contact your bank or card issuer to confirm that the transaction was not blocked.</li>
          </ul>
        </mj-text>

        <!-- Support Button -->
        <mj-button background-color="#002560ff" color="#ffffff" href="{{supportLink}}" align="center" padding="20px">
          Contact Support
        </mj-button>

        <!-- Closing -->
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#555555" padding="20px">
          If you continue to experience issues, please don’t hesitate to reach out to our support team. We are committed to helping you complete your investment successfully.<br/><br/>
          Thank you for choosing <strong>2Zero Investment</strong>. We value your trust and look forward to assisting you further.
        </mj-text>

        <!-- Signature -->
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="10px 20px">
          Warm regards,<br/>
          <strong>The 2Zero Investment Team</strong>
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Footer -->
    <mj-section background-color="#f0f0f0" padding="15px">
      <mj-column>
        <mj-text font-size="12px" font-family="Helvetica, Arial, sans-serif" align="center" color="#666666">
          © 2026 2Zero Investment. All rights reserved.<br/>
          This is an automated message, please do not reply directly.
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;

export const transactionCanceledEmailTemplate = `
<mjml>
  <mj-body background-color="#f9f9f9">
    <mj-section padding="20px">
      <mj-column>
        <!-- Logo -->
        <mj-image 
          src="https://i.imgur.com/nyiZaFs.jpeg" 
          width="100px" 
          height="100px" 
          alt="Logo"
          align="center"
        />

        <!-- Greeting -->
        <mj-text font-size="32px" font-family="Helvetica, Arial, sans-serif" align="center" color="#333333" padding="10px 0">
          Hello {{name}},
        </mj-text>

        <!-- Main Message -->
        <mj-text font-size="18px" font-family="Helvetica, Arial, sans-serif" align="center" color="#d9534f" padding="10px 0">
          Your recent transaction (ID: {{transactionId}}) has been canceled.
        </mj-text>

        <!-- Explanation -->
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#555555" padding="10px 20px">
          This cancellation may have occurred due to one of the following reasons:
          <ul style="margin:10px 0; padding-left:20px;">
            <li>The payment method was declined or unavailable.</li>
            <li>The transaction was manually canceled by you or our system.</li>
            <li>The payment authorization expired before capture.</li>
          </ul>
          Please review the details below and consider retrying your transaction if you still wish to proceed.
        </mj-text>

        <!-- Transaction Info Table -->
        <mj-table font-size="14px" color="#333333" cellpadding="6" cellspacing="0" width="100%">
          <tr style="background-color:#f0f0f0;">
            <td><strong>Transaction ID</strong></td>
            <td>{{transactionId}}</td>
          </tr>
          <tr>
            <td><strong>Amount</strong></td>
            <td>{{amount}}</td>
          </tr>
          <tr style="background-color:#f0f0f0;">
            <td><strong>Payment Method</strong></td>
            <td>{{paymentMethod}}</td>
          </tr>
          <tr>
            <td><strong>Date</strong></td>
            <td>{{date}}</td>
          </tr>
          <tr style="background-color:#f0f0f0;">
            <td><strong>Status</strong></td>
            <td style="color:#d9534f; font-weight:bold;">Canceled</td>
          </tr>
        </mj-table>

        <!-- Next Steps -->
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#555555" padding="20px">
          <strong>Recommended Actions:</strong>
          <ul style="margin:10px 0; padding-left:20px;">
            <li>Check your payment details and ensure they are up to date.</li>
            <li>Try initiating the transaction again with a valid payment method.</li>
            <li>If you did not intend to cancel, please contact our support team for assistance.</li>
          </ul>
        </mj-text>

        <!-- Support Button -->
        <mj-button background-color="#002560ff" color="#ffffff" href="{{supportLink}}" align="center" padding="20px">
          Contact Support
        </mj-button>

        <!-- Closing -->
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#555555" padding="20px">
          We apologize for any inconvenience caused by this cancellation. Our team is here to help you complete your investment smoothly.<br/><br/>
          Thank you for choosing <strong>2Zero Investment</strong>. We value your trust and look forward to assisting you further.
        </mj-text>

        <!-- Signature -->
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="10px 20px">
          Warm regards,<br/>
          <strong>The 2Zero Investment Team</strong>
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Footer -->
    <mj-section background-color="#f0f0f0" padding="15px">
      <mj-column>
        <mj-text font-size="12px" font-family="Helvetica, Arial, sans-serif" align="center" color="#666666">
          © 2026 2Zero Investment. All rights reserved.<br/>
          This is an automated message, please do not reply directly.
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;

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
