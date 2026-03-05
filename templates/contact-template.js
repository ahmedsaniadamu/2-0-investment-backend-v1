export const contactEmailTemplate = `
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
        <mj-text font-size="20px" font-weight="bold" font-family="Helvetica, Arial, sans-serif" color="#002560" align="left" padding="30px 0 20px 0">
          New Contact Message
        </mj-text>
        <mj-divider border-color="#eeeeee" border-width="1px" padding="0 0 20px 0" />
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" color="#333333" line-height="1.6" padding="0 0 10px 0">
          <strong>From:</strong> {{name}}
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" color="#333333" line-height="1.6" padding="0 0 10px 0">
          <strong>Email:</strong> {{email}}
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" color="#333333" line-height="1.6" padding="0 0 20px 0">
          <strong>Subject:</strong> {{subject}}
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica, Arial, sans-serif" color="#333333" line-height="1.6" padding="0 0 5px 0">
          <strong>Message:</strong>
        </mj-text>
        <mj-text font-size="15px" font-family="Helvetica, Arial, sans-serif" color="#555555" line-height="1.6" background-color="#fcfcfc" padding="15px" border="1px solid #eeeeee" border-radius="4px">
          {{message}}
        </mj-text>
        <mj-text font-size="12px" font-family="Helvetica, Arial, sans-serif" color="#999999" align="left" padding-top="40px">
          © 2026 2Zero Investment. All rights reserved.
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;
