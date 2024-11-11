import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail", // Replace with your email service
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password
  },
});

export const sendClearanceEmail = async (
  email: string,
  semester: string,
  recipientType: "student" | "staff"
) => {
  let subject, text;

  if (recipientType === "student") {
    subject = `Clearance Available for ${semester}`;
    text = `Dear student, the clearance process for ${semester} is now available. Please log in to the system to start the process.`;
  } else if (recipientType === "staff") {
    subject = `Clearance Signing Required for ${semester}`;
    text = `Dear staff/signatory, the clearance process for ${semester} is now available. Please log in to the system to sign the clearances.`;
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    text: text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Could not send email");
  }
};
