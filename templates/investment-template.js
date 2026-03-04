export const investmentPayoutSuccessEmailTemplate = `
<mjml>
  <mj-body background-color="#f9f9f9">
    <mj-section padding="20px">
      <mj-column>
        <!-- Logo -->
        <mj-image 
          src="https://i.imgur.com/XA6xh1o.png"
          width="100px" 
          height="100px"
          alt="2Zero Investment Logo"
          align="center"
          border-radius="50%"
        />

        <!-- Greeting -->
        <mj-text font-size="32px" font-family="Helvetica, Arial, sans-serif" align="center" color="#333333" padding="10px 0">
          Congratulations, {{name}}!
        </mj-text>

        <!-- Main Message -->
        <mj-text font-size="18px" font-family="Helvetica, Arial, sans-serif" align="center" color="#5cb85c" padding="10px 0">
          Your investment payout has been successfully processed!
        </mj-text>

        <!-- Success Details Section -->
        <mj-section background-color="#ffffff" border-radius="8px" padding="20px">
          <mj-column>
            <mj-text font-size="20px" font-weight="bold" font-family="Helvetica, Arial, sans-serif" color="#002560ff" align="center" padding-bottom="20px">
              Payout Details
            </mj-text>
            <mj-table font-size="15px" font-family="Helvetica, Arial, sans-serif" color="#333333">
              <tr style="border-bottom:1px solid #ecedee; text-align:left; padding:15px 0;">
                <th style="padding: 10px 0;">Plan Name</th>
                <td style="padding: 10px 0; text-align:right;">{{planName}}</td>
              </tr>
              <tr style="border-bottom:1px solid #ecedee; text-align:left; padding:15px 0;">
                <th style="padding: 10px 0;">Invested Amount</th>
                <td style="padding: 10px 0; text-align:right;">{{investedAmount}}</td>
              </tr>
              <tr style="border-bottom:1px solid #ecedee; text-align:left; padding:15px 0;">
                <th style="padding: 10px 0;">ROI Earned</th>
                <td style="padding: 10px 0; text-align:right;">{{roi}}%</td>
              </tr>
              <tr style="border-bottom:1px solid #ecedee; text-align:left; padding:15px 0;">
                <th style="padding: 10px 0;">Total Payout</th>
                <td style="padding: 10px 0; text-align:right; font-weight:bold; color:#5cb85c;">{{totalPayout}}</td>
              </tr>
              <tr style="text-align:left; padding:15px 0;">
                <th style="padding: 10px 0;">Payment Method</th>
                <td style="padding: 10px 0; text-align:right;">{{paymentMethod}}</td>
              </tr>
            </mj-table>
          </mj-column>
        </mj-section>

        <!-- Message -->
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#555555" padding="20px">
          Your funds have been transferred to your connected account. Please allow 1-3 business days for the funds to reflect in your bank statement, depending on your bank's processing time.
          <br/><br/>
          We are thrilled to have been part of your wealth creation journey. Your trust in 2Zero Investment is what drives us to provide the best investment opportunities in the market.
        </mj-text>

        <!-- Feedback & Next Steps -->
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#555555" padding="20px">
           We believe that your feedback will help us improve our services and provide you with a better investment experience.
           please click on the button below to share your feedback. 
        </mj-text>
        <mj-button background-color="#002560ff" color="#ffffff" href="{{feedbackLink}}" align="center" border-radius="4px" padding="10px 20px">
          Share Feedback
        </mj-button>

        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="center" color="#555555" padding-top="20px">
          Ready for your next big move?
        </mj-text>

        <!-- Closing -->
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#555555" padding="20px">
          If you have any questions regarding this payout, please feel free to reach out to our support team.<br/><br/>
          Thank you for choosing 2Zero Investment.<br/><br/>
          Best regards,<br/>
          The 2Zero Investment Team
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
