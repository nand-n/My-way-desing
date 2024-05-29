// import { NextResponse } from 'next/server';
// import { PrismaClient, Prisma } from '@prisma/client';
// import { traineeSchema } from '@/store/traineeSchema';

// const prisma = new PrismaClient();

// export async function GET() {
//   const trainees = await prisma.trainee.findMany();
//   return NextResponse.json(trainees);
// }

// export async function POST(req: Request) {
//   const body = await req.json();
//   const traineeData = traineeSchema.parse(body);
//   const newTrainee = await prisma.trainee.create({
//     data: traineeData
//   });
//   return NextResponse.json(newTrainee);
// }

// export async function PATCH(req: Request) {
//   const body = await req.json();
//   const traineeData = traineeSchema.parse(body);
//   const { id, ...data } = traineeData;
  
//   if (!id) {
//     return NextResponse.json({ error: 'ID is required for updating a trainee' }, { status: 400 });
//   }
  
//   const updatedTrainee = await prisma.trainee.update({
//     where: { id },
//     data: data,
//   });
  
//   return NextResponse.json(updatedTrainee);
// }

// export async function DELETE(req: Request) {
//   const { id } = await req.json();
//   await prisma.trainee.delete({
//     where: { id },
//   });
//   return NextResponse.json({ success: true });
// }


import { NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';
import { traineeSchema } from '@/store/traineeSchema';

const prisma = new PrismaClient();

function handleError(error: any) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    return NextResponse.json({ error: error.message }, { status: 422 });
  } else if (error instanceof Prisma.PrismaClientRustPanicError) {
    return NextResponse.json({ error: "Internal server error. Please try again later." }, { status: 500 });
  } else {
    return NextResponse.json({ error: error.message || 'An unexpected error occurred' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const trainees = await prisma.trainee.findMany();
    return NextResponse.json(trainees);
  } catch (error) {
    console.log(error);

    return handleError(error);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const traineeData = traineeSchema.parse(body);
    const newTrainee = await prisma.trainee.create({
      data: traineeData
    });
    return NextResponse.json(newTrainee);
  } catch (error) {
    console.log(error);

    return handleError(error);
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const traineeData = traineeSchema.parse(body);
    const { id, ...data } = traineeData;

    if (!id) {
      return NextResponse.json({ error: 'ID is required for updating a trainee' }, { status: 400 });
    }

    const updatedTrainee = await prisma.trainee.update({
      where: { id },
      data: data,
    });

    return NextResponse.json(updatedTrainee);
  } catch (error) {
    console.log(error);

    return handleError(error);
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.trainee.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
}
