export const investmentCompletedFeedbackTemplate = `
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
          Your investment has been successfully completed and paid out.
        </mj-text>
        <mj-text font-size="16px" font-weight="bold" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="10px 0 5px 0">
          Investment Summary:
        </mj-text>
        <mj-table font-size="14px" color="#333333" cellpadding="6" cellspacing="0" width="100%">
          <tr>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;"><strong>Plan</strong></td>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;">{{planName}}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;"><strong>Amount Invested</strong></td>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;">{{investedAmount}}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;"><strong>Total ROI</strong></td>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;">{{roi}}%</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee;"><strong>Total Payout</strong></td>
            <td style="padding: 5px 0; border-bottom: 1px solid #eeeeee; font-weight:bold; color:#5cb85c;">{{totalPayout}}</td>
          </tr>
        </mj-table>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="20px 0 10px 0" line-height="1.5">
          We'd love to hear your thoughts!
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0 0 20px 0" line-height="1.5">
          Your feedback helps us improve <strong>2Zero Investment</strong> and provide a better experience for all our investors.
        </mj-text>
        <mj-button background-color="#002560" color="#ffffff" href="{{feedbackLink}}" align="left" padding="0 0 20px 0">
          Share Your Feedback
        </mj-button>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0 0 10px 0" line-height="1.5">
          <strong>About 2Zero Investment</strong>
        </mj-text>
        <mj-text font-size="14px" font-family="Helvetica, Arial, sans-serif" align="left" color="#555555" padding="0 0 20px 0" line-height="1.5">
          At 2Zero Investment, we are committed to democratizing wealth creation by providing secure, transparent, and high-yield investment opportunities.
        </mj-text>
        <mj-button background-color="#5cb85c" color="#ffffff" href="{{dashboardLink}}" align="left" padding="0 0 20px 0">
          Explore New Plans
        </mj-button>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0 0 5px 0">
          Safe investing,
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0" line-height="1.5">
          The 2Zero Investment Team
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;
