export const subAdminOnboardingEmailTemplate = `
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
        <mj-text font-size="36px" font-family="Helvetica, Arial, sans-serif" align="center" color="#333333" padding="10px 0">
          Welcome aboard, {{name}}!
        </mj-text>
        <mj-text font-size="18px" font-family="Helvetica, Arial, sans-serif" align="left" color="#555555" padding="10px 0">
          We are excited to let you know that an account for <strong>{{role}}</strong> role has been successfully created by the Admin team.
          This marks the beginning of your journey with us, where you will play an important role in managing and supporting our platform.
        </mj-text>
        <mj-text font-size="18px" font-family="Helvetica, Arial, sans-serif" align="left" color="#555555" padding="10px 0">
          Below are your login credentials. Please keep them safe and secure:
        </mj-text>
        <mj-text font-size="20px" font-family="Helvetica, Arial, sans-serif" align="center" color="#002560ff" padding="10px 0">
          <strong>Email:</strong> {{email}} <br/>
          <strong>Password:</strong> {{password}}
        </mj-text>
        <mj-text font-size="18px" font-family="Helvetica, Arial, sans-serif" align="left" color="#555555" padding="10px 0">
          Once logged in, we encourage you to explore the dashboard, familiarize yourself with the tools available, 
          and begin contributing to the smooth operation of our system. Your role is vital in ensuring efficiency, 
          collaboration, and growth across our platform.
        </mj-text>
        <mj-text font-size="18px" font-family="Helvetica, Arial, sans-serif" align="left" color="#555555" padding="10px 0">
          Please remember:
          <ul>
            <li>Do not share your password with anyone.</li>
            <li>Reach out to the Admin team if you encounter any issues.</li>
          </ul>
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" align="center" color="#999999" padding="20px 0">
          This is an automated message. Please do not reply directly to this email.
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;
