import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail", // Replace with your email service
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password
  },
});

export const sendClearanceEmail = async (
  studentEmail: string,
  semester: string
) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: studentEmail,
    subject: `Clearance Available for ${semester}`,
    text: `Dear student, the clearance process for ${semester} is now available. Please log in to the system to start the process.`,
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
