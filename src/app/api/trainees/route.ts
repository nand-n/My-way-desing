import { NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';
import { traineeSchema } from '@/store/traineeSchema';

const prisma = new PrismaClient();

export async function GET() {
  const trainees = await prisma.trainee.findMany();
  return NextResponse.json(trainees);
}

export async function POST(req: Request) {
  const body = await req.json();
  const traineeData = traineeSchema.parse(body);
  const newTrainee = await prisma.trainee.create({
    data: traineeData as Prisma.TraineeCreateInput,
  });
  return NextResponse.json(newTrainee);
}

export async function PATCH(req: Request) {
  const body = await req.json();
  const updatedTrainee = traineeSchema.parse(body);
  const trainee = await prisma.trainee.update({
    where: { id: updatedTrainee.id },
    data: updatedTrainee as Prisma.TraineeUpdateInput,
  });
  return NextResponse.json(trainee);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await prisma.trainee.delete({
    where: { id },
  });
  return NextResponse.json({ success: true });
}
