export const contactEmailTemplate = `
<mjml>
  <mj-body background-color="#f4f7f9">
    <mj-section padding="20px 0">
      <mj-column>
        <mj-image 
          src="https://i.imgur.com/19FXl2n.png" 
          width="100px" 
          alt="2Zero Investment Logo"
          align="center"
        />
      </mj-column>
    </mj-section>
    <mj-section background-color="#ffffff" border-radius="8px" padding="40px 30px" box-shadow="0 4px 12px rgba(0,0,0,0.1)">
      <mj-column>
        <mj-text font-size="24px" font-weight="bold" font-family="Outfit, Helvetica, Arial, sans-serif" color="#002560" padding-bottom="20px">
          New Contact Message
        </mj-text>
        <mj-divider border-color="#e0e0e0" border-width="1px" padding-bottom="20px" />
        <mj-text font-size="16px" font-family="Inter, Roboto, Helvetica, Arial, sans-serif" color="#333333" line-height="1.6">
          <strong>Name:</strong> {{name}}
        </mj-text>
        <mj-text font-size="16px" font-family="Inter, Roboto, Helvetica, Arial, sans-serif" color="#333333" line-height="1.6">
          <strong>Email:</strong> {{email}}
        </mj-text>
        <mj-text font-size="16px" font-family="Inter, Roboto, Helvetica, Arial, sans-serif" color="#333333" line-height="1.6">
          <strong>Subject:</strong> {{subject}}
        </mj-text>
        <mj-text font-size="16px" font-family="Inter, Roboto, Helvetica, Arial, sans-serif" color="#333333" line-height="1.6" padding-top="20px">
          <strong>Message:</strong>
        </mj-text>
        <mj-text font-size="16px" font-family="Inter, Roboto, Helvetica, Arial, sans-serif" color="#555555" line-height="1.6" background-color="#f9f9f9" padding="15px" border-radius="4px">
          {{message}}
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section padding="20px 0">
      <mj-column>
        <mj-text font-size="12px" font-family="Inter, Roboto, Helvetica, Arial, sans-serif" color="#999999" align="center">
          © 2026 2Zero Investment. All rights reserved.
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;
