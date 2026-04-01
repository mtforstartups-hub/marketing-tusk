// lib/email-template.ts

type TemplateData = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  role: "founder" | "investor" | "enabler";
  message?: string;
  [key: string]: any;
};

function getRoleSpecificHtml(data: TemplateData) {
  let rows = "";
  const formatRow = (label: string, value: string) => `
    <tr>
      <td width="35%" style="padding: 8px 0; font-weight: 600; color: #555555; font-size: 15px;">${label}:</td>
      <td width="65%" style="padding: 8px 0; font-size: 15px;">${value || "N/A"}</td>
    </tr>
  `;

  if (data.role === "founder") {
    rows += formatRow("Funding Stage", data.fundingStage);
    rows += formatRow("Team Size", data.teamSize);
    rows += formatRow("Industry Sector", data.sector);
  } else if (data.role === "investor") {
    rows += formatRow("Investment Range", data.investmentRange);
    rows += formatRow("Preferred Stage", data.investmentStage);
    rows += formatRow("Sectors of Interest", data.sectorsOfInterest);
  } else if (data.role === "enabler") {
    rows += formatRow("Organization Type", data.organizationType);
    rows += formatRow("Program Type", data.programType);
    rows += formatRow("Support Services", data.supportServices);
  }

  return rows;
}

export function generateAdminEmailHtml(data: TemplateData) {
  const roleSpecificRows = getRoleSpecificHtml(data);

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f4f7f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #333333; line-height: 1.6;">
  
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f7f9; padding: 40px 20px;">
      <tr>
        <td align="center">
          <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; max-width: 600px; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
            
            <tr>
              <td style="padding: 30px 40px; text-align: center; border-bottom: 3px solid #217fff;">
                <img src="https://www.marketingtusk.com/images/logo.svg" alt="Marketing Tusk" width="250" style="max-width: 100%; height: auto; display: block; margin: 0 auto;" />
              </td>
            </tr>
  
            <tr>
              <td style="background-color: #217fff; padding: 15px 40px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 600; letter-spacing: 0.5px;">New Form Submission</h1>
              </td>
            </tr>
  
            <tr>
              <td style="padding: 40px;">
                <p style="margin-top: 0; margin-bottom: 24px; font-size: 16px;">Hello Admin,</p>
                <p style="margin-top: 0; margin-bottom: 32px; font-size: 16px;">A new inquiry has been submitted through the Marketing Tusk website. Here are the details:</p>
  
                <h2 style="font-size: 18px; color: #217fff; border-bottom: 2px solid #f0f0f0; padding-bottom: 8px; margin-top: 0; margin-bottom: 16px;">Basic Information</h2>
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 32px;">
                  <tr>
                    <td width="35%" style="padding: 8px 0; font-weight: 600; color: #555555; font-size: 15px;">Name:</td>
                    <td width="65%" style="padding: 8px 0; font-size: 15px;">${data.name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: 600; color: #555555; font-size: 15px;">Email:</td>
                    <td style="padding: 8px 0; font-size: 15px;"><a href="mailto:${data.email}" style="color: #217fff; text-decoration: none;">${data.email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: 600; color: #555555; font-size: 15px;">Phone:</td>
                    <td style="padding: 8px 0; font-size: 15px;">${data.phone || "N/A"}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: 600; color: #555555; font-size: 15px;">Company:</td>
                    <td style="padding: 8px 0; font-size: 15px;">${data.company}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: 600; color: #555555; font-size: 15px;">Role:</td>
                    <td style="padding: 8px 0; font-size: 15px; text-transform: capitalize;">${data.role}</td>
                  </tr>
                </table>
  
                <h2 style="font-size: 18px; color: #217fff; border-bottom: 2px solid #f0f0f0; padding-bottom: 8px; margin-top: 0; margin-bottom: 16px;">Additional Details</h2>
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 32px;">
                  ${roleSpecificRows}
                </table>
  
                ${
                  data.message
                    ? `
                <h2 style="font-size: 18px; color: #217fff; border-bottom: 2px solid #f0f0f0; padding-bottom: 8px; margin-top: 0; margin-bottom: 16px;">Message</h2>
                <div style="background-color: #f8faff; border-left: 4px solid #217fff; padding: 16px; border-radius: 0 4px 4px 0; font-style: italic; color: #444444; font-size: 15px;">
                  ${data.message.replace(/\n/g, "<br>")}
                </div>
                `
                    : ""
                }
  
              </td>
            </tr>
  
            <tr>
              <td style="background-color: #f9f9f9; padding: 24px; text-align: center; border-top: 1px solid #eeeeee;">
                <p style="margin: 0; font-size: 13px; color: #888888;">
                  This email was generated automatically from the Marketing Tusk website.
                </p>
              </td>
            </tr>
  
          </table>
        </td>
      </tr>
    </table>
  
  </body>
  </html>
  `;
}
