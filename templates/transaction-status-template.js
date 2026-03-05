export const transactionPendingEmailTemplate = `
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
          We've received your transaction request, and it's currently under review.
        </mj-text>
        <mj-text font-size="16px" font-weight="bold" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="10px 0 5px 0">
          Transaction Details:
        </mj-text>
        <mj-table font-size="14px" color="#333333" cellpadding="6" cellspacing="0" width="100%">
          <tr>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;"><strong>Transaction Type</strong></td>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;">{{transactionType}}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;"><strong>Amount</strong></td>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;">{{amount}}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;"><strong>Date</strong></td>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;">{{date}}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;"><strong>Transaction ID</strong></td>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;">{{transactionId}}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;"><strong>Status</strong></td>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;">Pending Review</td>
          </tr>
        </mj-table>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="20px 0 15px 0" line-height="1.5">
          We'll notify you once your transaction is processed. This typically takes 24-48 hours.
        </mj-text>
        <mj-text font-size="14px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0 0 20px 0" line-height="1.5">
          Have any questions? Reach out to us at <a href="mailto:{{supportEmail}}" style="color: #002560; text-decoration: none;">{{supportEmail}}</a>.
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

export const transactionApprovedEmailTemplate = `
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
          We are excited to announce that your transaction has been processed successfully.
        </mj-text>
        <mj-text font-size="16px" font-weight="bold" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="10px 0 5px 0">
          Transaction Details:
        </mj-text>
        <mj-table font-size="14px" color="#333333" cellpadding="6" cellspacing="0" width="100%">
          {{#if planName}}
          <tr>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;"><strong>Plan</strong></td>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;">{{planName}}</td>
          </tr>
          {{/if}}
          <tr>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;"><strong>Transaction Type</strong></td>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;">{{transactionType}}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;"><strong>Amount</strong></td>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;">{{amount}}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;"><strong>Date</strong></td>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;">{{date}}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;"><strong>Transaction ID</strong></td>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;">{{transactionId}}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;"><strong>Status</strong></td>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;">Completed</td>
          </tr>
        </mj-table>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="20px 0 15px 0" line-height="1.5">
          You can view this transaction in your account dashboard anytime.
        </mj-text>
        <mj-button background-color="#002560" color="#ffffff" href="{{dashboardUrl}}" align="left" padding="0 0 20px 0">
          View Dashboard
        </mj-button>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0 0 20px 0" line-height="1.5">
          Thank you for choosing 2zero!
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

export const transactionFailedEmailTemplate = `
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
          We weren't able to process your recent transaction. Here are the details:
        </mj-text>
        <mj-text font-size="16px" font-weight="bold" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="10px 0 5px 0">
          Transaction Details:
        </mj-text>
        <mj-table font-size="14px" color="#333333" cellpadding="6" cellspacing="0" width="100%">
          <tr>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;"><strong>Transaction Type</strong></td>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;">{{transactionType}}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;"><strong>Amount</strong></td>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;">{{amount}}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;"><strong>Date</strong></td>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;">{{date}}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;"><strong>Transaction ID</strong></td>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;">{{transactionId}}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;"><strong>Status</strong></td>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee; color: #d9534f;">Failed</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;"><strong>Reason</strong></td>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;">{{{reason}}}</td>
          </tr>
        </mj-table>
        <mj-text font-size="16px" font-weight="bold" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="20px 0 5px 0" line-height="1.5">
          What you can do:
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0 0 20px 0" line-height="1.5">
          <ul style="margin: 0; padding-left: 20px;">
            <li>Double-check your payment information</li>
            <li>Ensure you have sufficient funds</li>
            <li>Try again or contact your bank if the issue persists</li>
          </ul>
        </mj-text>
        <mj-text font-size="14px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0 0 20px 0" line-height="1.5">
          Need help? We're here: <a href="mailto:{{supportEmail}}" style="color: #002560; text-decoration: none;">{{supportEmail}}</a>
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

export const transactionCanceledEmailTemplate = `
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
          Your transaction request has been canceled by our admin team.
        </mj-text>
        <mj-text font-size="16px" font-weight="bold" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="10px 0 5px 0">
          Transaction Details:
        </mj-text>
        <mj-table font-size="14px" color="#333333" cellpadding="6" cellspacing="0" width="100%">
          <tr>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;"><strong>Transaction Type</strong></td>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;">{{transactionType}}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;"><strong>Amount</strong></td>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;">{{amount}}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;"><strong>Date</strong></td>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;">{{date}}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;"><strong>Transaction ID</strong></td>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;">{{transactionId}}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;"><strong>Status</strong></td>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;">Canceled</td>
          </tr>
        </mj-table>
        <mj-text font-size="14px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="20px 0 20px 0" line-height="1.5">
          If you canceled this by mistake or have questions, contact us at <a href="mailto:{{supportEmail}}" style="color: #002560; text-decoration: none;">{{supportEmail}}</a>.
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

export const transactionRejectedEmailTemplate = `
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
          We've reviewed your transaction request, but unfortunately, we're unable to process it at this time.
        </mj-text>
        <mj-text font-size="16px" font-weight="bold" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="10px 0 5px 0">
          Transaction Details:
        </mj-text>
        <mj-table font-size="14px" color="#333333" cellpadding="6" cellspacing="0" width="100%">
          <tr>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;"><strong>Transaction Type</strong></td>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;">{{transactionType}}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;"><strong>Amount</strong></td>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;">{{amount}}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;"><strong>Date</strong></td>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;">{{date}}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;"><strong>Transaction ID</strong></td>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;">{{transactionId}}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;"><strong>Status</strong></td>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee; color: #d9534f;">Rejected</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;"><strong>Reason</strong></td>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;">{{{reason}}}</td>
          </tr>
        </mj-table>
        <mj-text font-size="16px" font-weight="bold" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="20px 0 5px 0" line-height="1.5">
          What you can do:
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0 0 20px 0" line-height="1.5">
          {{{actionSteps}}}
        </mj-text>
        <mj-text font-size="14px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0 0 20px 0" line-height="1.5">
          If you believe this was done in error or need clarification, please contact us at <a href="mailto:{{supportEmail}}" style="color: #002560; text-decoration: none;">{{supportEmail}}</a>.
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

export const investorOnboardingEmailTemplate = `
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
          You're just one step away from completing your investor onboarding.
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0 0 15px 0" line-height="1.5">
          To ensure secure payouts and compliance, we require all investors to complete their onboarding process with our payment partner, <strong>Stripe</strong>. This process is quick and ensures your investment returns can be deposited directly into your bank account.
        </mj-text>
        <mj-button background-color="#002560" color="#ffffff" href="{{onboardingLink}}" align="left" padding="0 0 20px 0">
          Complete Onboarding
        </mj-button>
        <mj-text font-size="16px" font-weight="bold" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="10px 0 5px 0">
          What you'll need:
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0 0 20px 0" line-height="1.5">
          <ul style="margin: 0; padding-left: 20px;">
            <li>Your full legal name and contact details.</li>
            <li>Bank account information for receiving payouts.</li>
            <li>Any required identification documents for verification.</li>
          </ul>
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0 0 20px 0" line-height="1.5">
          Once completed, your account will be activated and ready to receive investment returns.
        </mj-text>
        <mj-text font-size="14px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0 0 20px 0" line-height="1.5">
          If you encounter any issues during onboarding, please reach out to our support team at <a href="mailto:{{supportEmail}}" style="color: #002560; text-decoration: none;">{{supportEmail}}</a>.
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0 0 5px 0">
          Best regards,<br />
          The 2zero Team
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;
