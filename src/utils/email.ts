import nodemailer from "nodemailer";
import { prisma } from "./prismaDB";
import { Prisma } from "@prisma/client";

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
};

type EmailSavePayload = {
  to: string;
  subject: string;
  html: string;
};

// Replace with your SMTP credentials
const smtpOptions = {
  host: process.env.EMAIL_SERVER_HOST,
  port: parseInt(process.env.EMAIL_SERVER_PORT || "2525"),
  secure: false,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
};


export const sendEmail = async (data: EmailPayload) => {
  const transporter = nodemailer.createTransport({
    ...smtpOptions,
  });

  return await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    ...data,
  });
};


type MessageData = {
  fullName:string;
  email:string;
  phone:string;
  message:string;
};

export async function saveMessage({ fullName, email, phone, message }: MessageData): Promise<Prisma.MessageCreateInput> {
  try {
    const saved = await prisma.message.create({
      data: {
        fullName,
        email,
        phone,
        message
      },
    });

    if (saved) {
      console.log(saved,"saved");
      return saved;
    } else {
      throw new Error(saved);
    }
  } catch (error) {
    console.error('Error saving message:', error);
    throw new Error('Error saving message');
  }
}