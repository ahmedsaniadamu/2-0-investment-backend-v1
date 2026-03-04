export const investmentCompletedFeedbackTemplate = `
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
          Your investment has been successfully completed and paid out.
        </mj-text>

        <!-- Investment Summary -->
        <mj-section background-color="#ffffff" border-radius="8px" padding="20px">
          <mj-column>
            <mj-text font-size="20px" font-weight="bold" color="#002560ff" align="center">Investment Summary</mj-text>
            <mj-table font-size="15px" color="#333333">
              <tr style="border-bottom:1px solid #ecedee;text-align:left;padding:15px 0;">
                <th style="padding: 10px 0;">Plan</th>
                <td style="padding: 10px 0; text-align:right;">{{planName}}</td>
              </tr>
              <tr style="border-bottom:1px solid #ecedee;text-align:left;padding:15px 0;">
                <th style="padding: 10px 0;">Amount Invested</th>
                <td style="padding: 10px 0; text-align:right;">{{investedAmount}}</td>
              </tr>
              <tr style="border-bottom:1px solid #ecedee;text-align:left;padding:15px 0;">
                <th style="padding: 10px 0;">Total ROI</th>
                <td style="padding: 10px 0; text-align:right;">{{roi}}%</td>
              </tr>
              <tr style="text-align:left;padding:15px 0;">
                <th style="padding: 10px 0;">Total Payout</th>
                <td style="padding: 10px 0; text-align:right; font-weight:bold; color:#5cb85c;">{{totalPayout}}</td>
              </tr>
            </mj-table>
          </mj-column>
        </mj-section>

        <!-- Feedback Section -->
        <mj-text font-size="18px" font-family="Helvetica, Arial, sans-serif" align="center" color="#333333" padding="30px 0 10px 0">
          We'd love to hear your thoughts!
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="center" color="#555555" padding="0 20px 20px 20px">
          Your feedback helps us improve <strong>2Zero Investment</strong> and provide a better experience for all our investors.
        </mj-text>
        
        <mj-button background-color="#002560ff" color="#ffffff" href="{{feedbackLink}}" align="center" border-radius="4px" padding="10px 20px">
          Share Your Feedback
        </mj-button>

        <!-- About the Platform -->
        <mj-text font-size="18px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="40px 20px 10px 20px">
          About 2Zero Investment
        </mj-text>
        <mj-text font-size="14px" font-family="Helvetica, Arial, sans-serif" align="left" color="#555555" padding="0 20px 20px 20px" line-height="1.5">
          At 2Zero Investment, we are committed to democratizing wealth creation by providing secure, transparent, and high-yield investment opportunities. Our platform uses state-of-the-art security to ensure your funds and data are always protected. 
          <br/><br/>
          Want to start another journey? Check out our latest investment plans and continue growing your wealth with us.
        </mj-text>

        <mj-button background-color="#5cb85c" color="#ffffff" href="{{dashboardLink}}" align="center" padding="10px">
          Explore New Plans
        </mj-button>

        <!-- Closing -->
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#555555" padding="20px">
          Thank you for being a valued part of our community.<br/><br/>
          Safe investing,<br/>
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
