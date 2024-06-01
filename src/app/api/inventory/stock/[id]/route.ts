import { prisma } from "@/utils/prismaDB";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(  req: NextRequest,
  { params }: { params: { id: string } }) {
    try {
    
      const deleted = await prisma.stockItem.delete({
        where:{
          id:params.id
        }
      })
      return NextResponse.json({deleted} , {status:200})
    } catch (error) {
      
    }
}


export async function PATCH(request: NextRequest,
  { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
  const updatedDate = await prisma.stockItem.update({
    where: {id:params.id },
    data: data,
  });
  return NextResponse.json({ ...updatedDate }, { status: 200 });
  } catch (error) {
  return NextResponse.json({message:error} , {status : 200})
    
  }
}