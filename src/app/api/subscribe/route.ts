import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { generatePromoCode } from '@/utils/generatePromoCode'; // Asumimos que crearemos esta utilidad

// Declare a global variable for PrismaClient to prevent multiple instances in development


let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export async function POST(request: Request) {
  try {
    const { email, acceptTerms } = await request.json();

    if (!email || !acceptTerms) {
      return NextResponse.json({ message: 'Email and terms acceptance are required.' }, { status: 400 });
    }

    // Verificar si el correo ya existe
    const existingSubscriber = await prisma.subscriber.findUnique({
      where: { email },
    });

    if (existingSubscriber) {
      return NextResponse.json({ message: 'Email already subscribed.', promoCode: existingSubscriber.promoCode }, { status: 200 });
    }

    // Generar código promocional único
    let promoCode = '';
    let isUnique = false;
    while (!isUnique) {
      promoCode = generatePromoCode(); // Implementar esta función
      // Verificar si el código ya ha sido usado o asignado
      const existingCode = await prisma.subscriber.findFirst({
        where: { promoCode },
      });
      if (!existingCode) {
        isUnique = true;
      }
    }

    // Guardar en la base de datos
    const newSubscriber = await prisma.subscriber.create({
      data: {
        email,
        promoCode,
        used: true, // Marcar el código como usado al asignarlo
      },
    });

    return NextResponse.json({ message: 'Subscription successful!', promoCode: newSubscriber.promoCode }, { status: 201 });

  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}