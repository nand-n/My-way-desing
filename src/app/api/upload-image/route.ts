// import cloudinary from '@/utils/claudinary';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { paramsToSign: Record<string, string> };
    const { paramsToSign } = body;
    // const signature =await cloudinary.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET as string);
    // console.log(signature);
    return NextResponse.json("response");
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ error: 'Failed to upload image.' }, { status: 500 });
  }
}
