import datesSchema from "@/store/dateSchema";
import { prisma } from "@/utils/prismaDB";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  try {
    const dates = await prisma.dates.findMany()
    return NextResponse.json(dates , { status : 200});
  } catch (error) {
    return NextResponse.json({message:error} , {status : 200})
  }
}

export async function POST(request:NextRequest) {
  try {
    const data = await request.json()
    const dateData = datesSchema.parse(data)
    const newDate = await prisma.dates.create({
      data:dateData
    })
    return NextResponse.json({newDate},{status:200})
  } catch (error) {
    return NextResponse.json({message:error} , {status : 200})
  }
}