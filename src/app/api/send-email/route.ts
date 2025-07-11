import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

// Inicializa Resend con tu API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { to, subject, text } = await req.json();

    if (!to || !subject || !text) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: 'Festival Dora <consultas@dora.com.ar>',
      to: [to],
      subject,
      text,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error al enviar email:', error);
    return NextResponse.json(
      { error: 'Error al enviar el email' },
      { status: 500 }
    );
  }
}