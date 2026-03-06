export const investmentPayoutSuccessEmailTemplate = `
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
          Congratulations, {{name}}!
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0 0 15px 0" line-height="1.5">
          Your investment payout has been successfully processed!
        </mj-text>
        <mj-text font-size="16px" font-weight="bold" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="10px 0 5px 0">
          Payout Details:
        </mj-text>
        <mj-table font-size="14px" color="#333333" cellpadding="6" cellspacing="0" width="100%">
          <tr>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;"><strong>Plan Name</strong></td>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;">{{planName}}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;"><strong>Invested Amount</strong></td>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;">{{investedAmount}}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;"><strong>ROI Earned</strong></td>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;">{{roi}}%</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;"><strong>Total Payout</strong></td>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee; font-weight:bold; color:#5cb85c;">{{totalPayout}}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;"><strong>Payment Method</strong></td>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;">{{paymentMethod}}</td>
          </tr>
        </mj-table>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="20px 0 15px 0" line-height="1.5">
          Your funds have been transferred to your connected account. Please allow 1-3 business days for the funds to reflect in your bank statement.
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0 0 20px 0" line-height="1.5">
          We are thrilled to have been part of your wealth creation journey. Your trust in 2Zero Investment is what drives us to provide the best opportunities in the market.
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0 0 20px 0" line-height="1.5">
          To help us serve you better, we would love to hear about your experience. Please take a moment to share your feedback.
        </mj-text>
        <mj-button background-color="#002560" color="#ffffff" href="{{feedbackLink}}" align="left" padding="0 0 20px 0">
          Share Feedback
        </mj-button>
        <mj-text font-size="14px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0 0 20px 0" line-height="1.5">
          If you have any questions regarding this payout, please feel free to reach out to our support team at <a href="mailto:{{supportEmail}}" style="color: #002560; text-decoration: none;">{{supportEmail}}</a>.
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0 0 5px 0">
          Best regards,
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0" line-height="1.5">
          The 2Zero Investment Team
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;
