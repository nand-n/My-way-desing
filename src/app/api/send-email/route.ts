
import { saveMessage, sendEmail } from '@/utils/email';
import { prisma } from '@/utils/prismaDB';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { 
      to, 
      subject, 
      html , 
      fullName,
      email,
      phone,
      message  } = await req.json();
    await sendEmail({ to, subject, html ,
     });
   const response =  await saveMessage(
      {
      fullName,
      email,
      phone,
      message,
      }
     
    )
    if(!response){
      console.log(response , "response");
    }
    return NextResponse.json({ message: "Email Saved Sucessfully!" }, { status: 200 });

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}



export async function GET() {
  try {
   
    const message = await prisma.message.findMany()
    return NextResponse.json(message , { status: 200 });

  } catch (error) {
    console.error('Error fetching email:', error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
