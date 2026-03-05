export const subAdminOnboardingEmailTemplate = `
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
          Welcome to the 2zero admin team! We're glad to have you on board as {{role}}.
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0 0 15px 0" line-height="1.5">
          This marks the beginning of your journey with us, where you will play an important role in managing and supporting our platform.
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0 0 10px 0" line-height="1.5">
          Here are your login credentials:
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0 0 5px 0" line-height="1.5">
          <strong>Email:</strong> {{email}}
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0 0 5px 0" line-height="1.5">
          <strong>Password:</strong> {{password}}
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0 0 20px 0" line-height="1.5">
          <strong>Admin Portal:</strong> <a href="{{admin_portal_url}}" style="color: #002560; text-decoration: none;">{{admin_portal_url}}</a>
        </mj-text>
        <mj-text font-size="14px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0 0 20px 0" line-height="1.5">
          If you have any questions about your admin access or responsibilities, reach out to us at <a href="mailto:{{supportEmail}}" style="color: #002560; text-decoration: none;">{{supportEmail}}</a>.
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="left" color="#333333" padding="0 0 5px 0">
          Welcome aboard!
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
