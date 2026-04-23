import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { idea } = await req.json();
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "Responde siempre en JSON con: titulo, score (numero), analisis, pivote."
          },
          { role: "user", content: idea }
        ],
        response_format: { type: "json_object" }
      })
    });
    const data = await response.json();
    return NextResponse.json(JSON.parse(data.choices[0].message.content));
  } catch (error) {
    return NextResponse.json({ error: "Error de API" }, { status: 500 });
  }
}
