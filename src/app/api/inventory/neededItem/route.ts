import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/utils/prismaDB';

const PriorityEnum = z.enum(['LOW', 'MEDIUM', 'HIGH']);

const neededItemSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  priority: PriorityEnum,
  quantity: z.number().int(),
  area: z.string(),
  price: z.number(),
});

export async function GET(request: NextRequest) {
  try {
    const neededItem = await prisma.neededItem.findMany();
    return NextResponse.json(neededItem);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const neededItemData = neededItemSchema.parse(data);
    const newneededItem = await prisma.neededItem.create({
      data: neededItemData,
    });

    return NextResponse.json(newneededItem);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Unknown error occurred' }, { status: 400 });
  }
}