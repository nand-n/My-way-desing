import { prisma } from "@/utils/prismaDB";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const datesSchema = z.object({
  id :z.string().uuid().optional(),
  title:z.string(),
  start:z.date(),
  end:z.date()

})
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

export async function PATCH(request:NextRequest) {
    try {
      const data = await request.json();
      const dateData = datesSchema.parse(data)
      const updatedDate = await prisma.dates.update({
        where:{
          id:dateData.id,
          data: dateData
        }

      })
      return NextResponse.json({updatedDate} , {status: 200})
    } catch (error) {
    return NextResponse.json({message:error} , {status : 200})
      
    }
}

export async function DELETE(request:NextRequest) {
    try {
      const { id } = await request.json()
      const deletedDate = await prisma.dates.delete({
        where:{
          id
        }
      })
      return NextResponse.json({deletedDate} , {status:200})
    } catch (error) {
      
    }
}