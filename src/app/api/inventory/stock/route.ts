import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/utils/prismaDB';

const stockItemSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  category: z.string(),
  quantity: z.number(),
  price: z.number(),
  area: z.string(),
});

export async function GET(request: NextRequest) {
  try {
    const stockItems = await prisma.stockItem.findMany();
    return NextResponse.json(stockItems);
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
    const stockItemData = stockItemSchema.parse(data);
    const newStockItem = await prisma.stockItem.create({
      data: stockItemData,
    });

    return NextResponse.json({ ...newStockItem });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Unknown error occurred' }, { status: 400 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const data = await request.json();
    const updatedStockItemData = stockItemSchema.parse(data);

    const updatedStockItem = await prisma.stockItem.update({
      where: { id: updatedStockItemData.id },
      data: updatedStockItemData,
    });

    // Note: Updating Stripe products requires additional Stripe API calls

    return NextResponse.json(updatedStockItem);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Unknown error occurred' }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    if (!id || typeof id !== 'string') throw new Error('Invalid ID');

    await prisma.stockItem.delete({
      where: { id },
    });

    // Note: Deleting Stripe products is not covered here, but can be done using stripe.products.del

    return NextResponse.json({ message: 'Stock Item deleted successfully' });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Unknown error occurred' }, { status: 400 });
  }
}
