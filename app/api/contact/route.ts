import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, phone, company, role, message, ...rest } = body;

    // Basic validation
    if (!name || !email || !role) {
      return NextResponse.json(
        { error: "Name, email, and role are required" },
        { status: 400 },
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    // Extract role-specific fields safely
    const {
      fundingStage = "Not provided",
      teamSize = "Not provided",
      industry = "Not provided",
      investmentRange = "Not provided",
      investmentStage = "Not provided",
      sectorsOfInterest = "Not provided",
      organizationType = "Not provided",
      programType = "Not provided",
      supportServices = "Not provided",
    } = rest;

    // Extract role-specific data
    const roleSpecificData: Record<string, string> = {};
    const roleFields: Record<string, string[]> = {
      founder: ["fundingStage", "teamSize", "industry"],
      investor: ["investmentRange", "investmentStage", "sectorsOfInterest"],
      enabler: ["organizationType", "programType", "supportServices"],
    };

    const fields = roleFields[role] || [];
    for (const field of fields) {
      if (rest[field]) {
        roleSpecificData[field] = rest[field];
      }
    }

    console.log("User:", process.env.SMTP_USER);
    console.log("Pass length:", process.env.SMTP_PASSWORD?.length); // Should be 16

    // 1. Configure your SMTP transport
    // You can use Gmail, AWS SES, SendGrid, Mailgun, etc.
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // 2. Build the email content based on the role
    let customFieldsHtml = "";

    if (role === "founder") {
      customFieldsHtml = `
        <p><strong>Funding Stage:</strong> ${fundingStage}</p>
        <p><strong>Team Size:</strong> ${teamSize}</p>
        <p><strong>Industry:</strong> ${industry}</p>
      `;
    } else if (role === "investor") {
      customFieldsHtml = `
        <p><strong>Investment Range:</strong> ${investmentRange}</p>
        <p><strong>Preferred Stage:</strong> ${investmentStage}</p>
        <p><strong>Sectors of Interest:</strong> ${sectorsOfInterest}</p>
      `;
    } else if (role === "enabler") {
      customFieldsHtml = `
        <p><strong>Organization Type:</strong> ${organizationType}</p>
        <p><strong>Program Type:</strong> ${programType}</p>
        <p><strong>Support Services:</strong> ${supportServices}</p>
      `;
    } else {
      customFieldsHtml = `<p>No role-specific fields provided for role: ${role}</p>`;
    }

    const mailOptions = {
      from:
        process.env.SMTP_FROM_EMAIL ||
        '"Marketing Tusk Form" <noreply@marketingtusk.com>',
      to: "rajnimaster1813@gmail.com", // The destination emails pranav@marketingtusk.com, shubham@marketingtusk.com
      replyTo: email,
      subject: `New Contact Form Submission: ${name} (${role})`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Company:</strong> ${company || "Not provided"}</p>
        <p><strong>Role:</strong> <span style="text-transform: capitalize;">${role}</span></p>
        <hr />
        <h3>Role Specific Details</h3>
        ${customFieldsHtml}
        <hr />
        <h3>Message</h3>
        <p>${message || "No message provided"}</p>
      `,
    };

    // 3. Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      {
        message: "Message sent successfully!",
        data: {
          name,
          email,
          phone,
          company,
          role,
          message,
          ...roleSpecificData,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error saving contact:", error);
    return NextResponse.json(
      { error: "Failed to save your message. Please try again." },
      { status: 500 },
    );
  }
}
