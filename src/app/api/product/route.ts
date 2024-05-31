import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import Stripe from 'stripe';
import { prisma } from '@/utils/prismaDB';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});


const productSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  category: z.string(),
  price: z.number(),
  itemCount: z.number(),
});

export async function GET(request: NextRequest) {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
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
    const productData = productSchema.parse(data);
    const newProduct = await prisma.product.create({
      data: productData,
    });

    const stripeProduct = await stripe.products.create({
      name: newProduct.title,
      description: newProduct.description,
      images: [newProduct.image],
    });

    const stripePrice = await stripe.prices.create({
      unit_amount: newProduct.price * 100,
      currency: 'usd',
      product: stripeProduct.id,
    });

    return NextResponse.json({ ...newProduct });
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
    const updatedProductData = productSchema.parse(data);

    const updatedProduct = await prisma.product.update({
      where: { id: updatedProductData.id },
      data: updatedProductData,
    });

    // Note: Updating Stripe products requires additional Stripe API calls

    return NextResponse.json(updatedProduct);
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

    await prisma.product.delete({
      where: { id },
    });

    // Note: Deleting Stripe products is not covered here, but can be done using stripe.products.del

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Unknown error occurred' }, { status: 400 });
  }
}

// export async function createCheckoutSession(request: NextRequest) {
//   try {
//     const data = await request.json();
//     const { priceId } = data;

//     const session = await stripe.checkout.sessions.create({
//       line_items: [
//         {
//           price: priceId,
//           quantity: 1,
//         },
//       ],
//       mode: 'subscription',
//       success_url: `${process.env.SITE_URL!}/success`,
//       cancel_url: `${process.env.SITE_URL!}/cancel`,
//     });

//     return NextResponse.json({ url: session.url });
//   } catch (error) {
//     if (error instanceof Error) {
//       return NextResponse.json({ error: error.message }, { status: 400 });
//     }
//     return NextResponse.json({ error: 'Unknown error occurred' }, { status: 400 });
//   }
// }