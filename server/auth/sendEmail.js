import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export const verifyEmail = async (email, key) => {
  let mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Verivy email",
    html: `
    <html>
      <body>
        <h2>Welcome to Our Service!</h2>
        <p>Thank you for signing up. Please use the following verification key to complete your registration:</p>
        <div style="padding: 10px; background-color: #f0f0f0; border-radius: 5px; font-size: 16px; font-weight: bold; text-align: center;">
          ${key}
        </div>
        <p>If you did not request this, please ignore this email.</p>
        <footer style="font-size: 12px; color: #888;">
          <p>&copy; 2025 Our Service. All rights reserved.</p>
        </footer>
      </body>
    </html>
  `,
  };

  try {
    transporter.sendMail(mailOptions, (err, data) => {
      return console.log("Email sent!!!");
    });
  } catch (err) {
    return console.log("Error occurs");
  }
};
