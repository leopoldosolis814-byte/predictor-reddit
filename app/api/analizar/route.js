import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { idea } = await req.json();

    // Aquí llamamos a Groq
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`, // Tu llave secreta
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", // El modelo más potente de Groq
        messages: [
          {
            role: "system",
            content: "Eres un consultor de startups experto y brutalmente honesto. Analiza la idea, da un puntaje de 1 a 100 y sugiere un pivote."
          },
          {
            role: "user",
            content: `Analiza esta idea de negocio: ${idea}`
          }
        ],
        response_format: { type: "json_object" } // Para que nos devuelva datos ordenados
      })
    });

    const data = await response.json();
    
    // Devolvemos la respuesta al frontend
    return NextResponse.json(JSON.parse(data.choices[0].message.content));

  } catch (error) {
    return NextResponse.json({ error: "Error al conectar con Groq" }, { status: 500 });
  }
}
