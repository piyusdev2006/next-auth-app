// 1- on way to doing it : using server component
// domain.com/verifytoken/<token>

// 2- on way to doing it using client-side component: window.location.search
// domain.com/verifytoken?token=<token>


import dotenv from "dotenv";
import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { Html } from "next/document";

dotenv.config();

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        

        if(emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000 // 1 hour
            });
        } else if(emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000 // 1 hour
            });
        }

        // create a transporter

        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT as unknown as number,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

      const mailOptions = {
         from: "Private Person <from@example.com>",
         to: email,
         subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
         
         html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
          or copy and paste the following link in your browser: ${process.env.DOMAIN}/verifyemail?token=${hashedToken} </p>
          <p>If you did not request this, please ignore this email.</p>
          <p>Thank you!</p>
         </p>`,
       }

      
      const mailResult = await transporter.sendMail(mailOptions);

      return mailResult;

    }
    catch (error: any) {
        throw new Error(error.message);
    }
};