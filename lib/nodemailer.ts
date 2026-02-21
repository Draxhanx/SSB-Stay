import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEnquiryEmail = async (enquiryData: any) => {
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail) {
    console.error("ADMIN_EMAIL is not defined in environment variables");
    return;
  }

  const mailOptions = {
    from: `"HostelHub Enquiry" <${process.env.SMTP_USER}>`,
    to: adminEmail,
    subject: `New Enquiry from ${enquiryData.name}`,
    html: `
      <h2>New Stay Enquiry Received</h2>
      <p><strong>Name:</strong> ${enquiryData.name}</p>
      <p><strong>Phone:</strong> ${enquiryData.phone}</p>
      <p><strong>Room Preference:</strong> ${enquiryData.roomType}</p>
      <p><strong>Message:</strong> ${enquiryData.message || "No message provided"}</p>
      <p><strong>Submitted At:</strong> ${new Date().toLocaleString()}</p>
      <hr />
      <p>Manage this enquiry in the <a href="${process.env.NEXTAUTH_URL}/admin/bookings">Admin Dashboard</a></p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Enquiry notification email sent successfully");
  } catch (error) {
    console.error("Error sending enquiry email:", error);
  }
};
