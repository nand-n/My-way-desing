import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../../utils/prismaDB';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const newStockItem = await prisma.area.create({
      data: data,
    });

    return NextResponse.json({ ...newStockItem });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Unknown error occurred' }, { status: 400 });
  }
}