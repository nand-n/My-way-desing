import { prisma } from "@/utils/prismaDB";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(  req: NextRequest,
  { params }: { params: { areaId: string } }) {
    try {
    
      const deleted = await prisma.area.delete({
        where:{
          id:params.areaId
        }
      })
      return NextResponse.json({deleted} , {status:200})
    } catch (error) {
      
    }
}


export async function PATCH(request: NextRequest,
  { params }: { params: { areaId: string } }) {
  try {
    const data = await request.json();
  const updatedDate = await prisma.area.update({
    where: {id:params.areaId },
    data: data,
  });
  return NextResponse.json({ ...updatedDate }, { status: 200 });
  } catch (error) {
  return NextResponse.json({message:error} , {status : 200})
    
  }
}