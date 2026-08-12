import express from "express";
import path from "path";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple in-memory rate limiting store for spam protection
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();
const MAX_REQUESTS_PER_WINDOW = 5; // max 5 messages per 15 mins
const WINDOW_MS = 15 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userRecord = ipRequestCounts.get(ip);

  if (!userRecord || now > userRecord.resetTime) {
    ipRequestCounts.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    return true;
  }

  if (userRecord.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  userRecord.count += 1;
  return true;
}

// Health Check API
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", school: "AKHEVILLE SCHOOL", year: 2026 });
});

// Contact Form Endpoint
app.post("/api/contact", async (req, res) => {
  try {
    const ip = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "unknown";

    if (!checkRateLimit(ip)) {
      return res.status(429).json({
        success: false,
        message: "Too many messages sent from your IP. Please wait a few minutes before trying again.",
      });
    }

    const { fullName, parentName, email, phone, subject, classOfInterest, message, websiteUrl } = req.body;

    // Spam Honeypot Check (websiteUrl should be empty for humans)
    if (websiteUrl && websiteUrl.trim().length > 0) {
      console.warn(`Spam detected via honeypot from IP ${ip}`);
      return res.status(200).json({
        success: true,
        message: "Thank you for reaching out to Akheville School!",
      });
    }

    // Validation
    const errors: string[] = [];
    if (!fullName || fullName.trim().length < 2) errors.push("Full Name is required (minimum 2 characters).");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.push("A valid email address is required.");
    if (!phone || phone.trim().length < 7) errors.push("A valid phone number is required.");
    if (!subject || subject.trim().length < 2) errors.push("Subject is required.");
    if (!classOfInterest || !["Creche", "Nursery", "Primary"].includes(classOfInterest)) {
      errors.push("Please select a valid Class of Interest (Creche, Nursery, or Primary).");
    }
    if (!message || message.trim().length < 5) errors.push("Message must be at least 5 characters long.");

    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors, message: errors.join(" ") });
    }

    // Input Sanitization
    const sanitizedData = {
      fullName: String(fullName).trim().replace(/[<>]/g, ""),
      parentName: parentName ? String(parentName).trim().replace(/[<>]/g, "") : "N/A",
      email: String(email).trim().toLowerCase(),
      phone: String(phone).trim(),
      subject: String(subject).trim().replace(/[<>]/g, ""),
      classOfInterest: String(classOfInterest).trim(),
      message: String(message).trim().replace(/[<>]/g, ""),
      receivedAt: new Date().toISOString(),
      referenceId: `AKH-MSG-${Date.now().toString(36).toUpperCase()}`,
    };

    const targetEmail = process.env.SCHOOL_CONTACT_EMAIL || "info@akhevilleschool.com";

    // Build Email Body
    const htmlEmailContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
            .header { background: #1e3a8a; color: #ffffff; padding: 24px; text-align: center; }
            .header h1 { margin: 0; font-size: 22px; font-weight: bold; }
            .header p { margin: 4px 0 0 0; color: #93c5fd; font-size: 14px; }
            .body { padding: 24px; }
            .badge { display: inline-block; background: #eff6ff; color: #1e40af; border: 1px solid #bfdbfe; font-weight: bold; padding: 4px 10px; border-radius: 9999px; font-size: 13px; }
            .field-row { margin-bottom: 16px; border-bottom: 1px dashed #e2e8f0; padding-bottom: 12px; }
            .field-label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; font-weight: bold; }
            .field-value { font-size: 15px; color: #0f172a; font-weight: 500; margin-top: 4px; }
            .message-box { background: #f1f5f9; border-left: 4px solid #1e3a8a; padding: 16px; border-radius: 4px; font-size: 14px; color: #334155; white-space: pre-line; }
            .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px; text-align: center; font-size: 12px; color: #64748b; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>AKHEVILLE SCHOOL</h1>
              <p>Website Contact Inquiry — ${sanitizedData.referenceId}</p>
            </div>
            <div class="body">
              <div style="margin-bottom: 20px;">
                <span class="badge">Class of Interest: ${sanitizedData.classOfInterest}</span>
              </div>
              
              <div class="field-row">
                <div class="field-label">Sender / Full Name</div>
                <div class="field-value">${sanitizedData.fullName}</div>
              </div>

              <div class="field-row">
                <div class="field-label">Parent / Guardian Name</div>
                <div class="field-value">${sanitizedData.parentName}</div>
              </div>

              <div class="field-row">
                <div class="field-label">Email Address</div>
                <div class="field-value"><a href="mailto:${sanitizedData.email}">${sanitizedData.email}</a></div>
              </div>

              <div class="field-row">
                <div class="field-label">Phone Number</div>
                <div class="field-value"><a href="tel:${sanitizedData.phone}">${sanitizedData.phone}</a></div>
              </div>

              <div class="field-row">
                <div class="field-label">Subject</div>
                <div class="field-value">${sanitizedData.subject}</div>
              </div>

              <div style="margin-top: 20px;">
                <div class="field-label">Message Content</div>
                <div class="message-box">${sanitizedData.message}</div>
              </div>
            </div>
            <div class="footer">
              <p>Received on ${new Date().toLocaleString('en-US', { timeZone: 'Africa/Lagos' })} (WAT)</p>
              <p>House 3, Road 3, Phase II, Aco/AMAC Estate, Airport Road, Lugbe, Abuja</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send to Formspree endpoint (https://formspree.io/f/xljrngyy)
    const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT || "https://formspree.io/f/xljrngyy";
    let formspreeSent = false;
    try {
      const fsRes = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          _subject: `[Website Inquiry] ${sanitizedData.subject} - ${sanitizedData.fullName}`,
          _replyto: sanitizedData.email,
          "Form Type": "Website Contact Inquiry",
          "Full Name": sanitizedData.fullName,
          "Parent/Guardian Name": sanitizedData.parentName,
          "Email Address": sanitizedData.email,
          "Phone Number": sanitizedData.phone,
          "Class of Interest": sanitizedData.classOfInterest,
          "Subject": sanitizedData.subject,
          "Message": sanitizedData.message,
          "Reference ID": sanitizedData.referenceId,
        }),
      });
      formspreeSent = fsRes.ok;
      console.log(`[FORMSPREE DISPATCH] Contact form submitted to ${formspreeEndpoint} - Status: ${fsRes.status}`);
    } catch (fsErr) {
      console.error("Formspree dispatch error for contact form:", fsErr);
    }

    // Send via Nodemailer if SMTP configured, or log fallback
    let emailSent = false;
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: Number(process.env.SMTP_PORT) === 465,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"Akheville Website Contact" <${process.env.SMTP_USER}>`,
          to: targetEmail,
          replyTo: sanitizedData.email,
          subject: `[Website Inquiry] ${sanitizedData.subject} - ${sanitizedData.fullName}`,
          html: htmlEmailContent,
        });
        emailSent = true;
      } catch (mailError) {
        console.error("Failed to dispatch via SMTP transporter:", mailError);
      }
    } else {
      console.log(`[SIMULATED EMAIL DISPATCH TO ${targetEmail}]`);
      console.log(`Reference: ${sanitizedData.referenceId}`);
      console.log(`From: ${sanitizedData.fullName} <${sanitizedData.email}> (${sanitizedData.phone})`);
      console.log(`Class: ${sanitizedData.classOfInterest} | Subject: ${sanitizedData.subject}`);
      console.log(`Message:\n${sanitizedData.message}`);
    }

    return res.status(200).json({
      success: true,
      message: `Thank you, ${sanitizedData.fullName}! Your message has been received and forwarded to our team. Reference: ${sanitizedData.referenceId}.`,
      referenceId: sanitizedData.referenceId,
      emailSent: emailSent || formspreeSent,
    });
  } catch (error) {
    console.error("Error processing contact submission:", error);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred while sending your message. Please try again or call us directly at 0802 5675 379.",
    });
  }
});

// Online Application Form Endpoint
app.post("/api/admission", async (req, res) => {
  try {
    const { childName, dateOfBirth, gender, targetClass, parentName, parentPhone, parentEmail, homeAddress, medicalNotes } = req.body;

    if (!childName || !targetClass || !parentName || !parentPhone || !parentEmail) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields (Child Name, Class, Parent Name, Phone, and Email).",
      });
    }

    const applicationRef = `AKH-ADM-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    console.log(`[ADMISSION REGISTRATION RECEIVED] Ref: ${applicationRef}`);
    console.log(`Child: ${childName} (${gender}, DOB: ${dateOfBirth}) -> ${targetClass}`);
    console.log(`Parent: ${parentName} | Phone: ${parentPhone} | Email: ${parentEmail}`);

    // Forward to Formspree endpoint
    const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT || "https://formspree.io/f/xljrngyy";
    let formspreeSent = false;
    try {
      const fsRes = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          _subject: `[New Admission Registration] ${childName} - ${targetClass} (Ref: ${applicationRef})`,
          _replyto: parentEmail,
          "Form Type": "Online Admission Registration",
          "Application Ref": applicationRef,
          "Child Full Name": childName,
          "Date of Birth": dateOfBirth || "N/A",
          "Gender": gender,
          "Target Class": targetClass,
          "Parent/Guardian Name": parentName,
          "Parent Phone Number": parentPhone,
          "Parent Email Address": parentEmail,
          "Home Address": homeAddress || "N/A",
          "Medical Notes": medicalNotes || "None",
        }),
      });
      formspreeSent = fsRes.ok;
      console.log(`[FORMSPREE DISPATCH] Admission form submitted to ${formspreeEndpoint} - Status: ${fsRes.status}`);
    } catch (fsErr) {
      console.error("Formspree dispatch error for admission form:", fsErr);
    }

    return res.status(200).json({
      success: true,
      applicationRef,
      formspreeSent,
      message: `Registration application submitted successfully for ${childName}! Your Application Reference is ${applicationRef}. Our admissions team will contact ${parentPhone} with next steps.`,
    });
  } catch (error) {
    console.error("Error processing admission application:", error);
    return res.status(500).json({
      success: false,
      message: "Could not submit admission registration. Please call 0802 5675 379.",
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
