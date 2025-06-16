import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Inicializa Resend con tu API key
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: NextRequest) {
  try {
    if (!resend) {
      return NextResponse.json(
        { error: 'Servicio de email no configurado' },
        { status: 500 }
      );
    }

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