import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const rawIdea = body.rawIdea;

    if (typeof rawIdea !== "string" || rawIdea.trim() === "") {
      return NextResponse.json(
        { error: "rawIdea is required in the request body" },
        { status: 400 }
      );
    }

    console.log("Received rawIdea:", rawIdea);

    const prompt = `
You are a helper that converts a raw startup idea into a short title and an MVP description.
Respond with valid JSON ONLY, and nothing else. The JSON should be exactly:
{
  "title": "<few words>",
  "mvp_description": "<2-3 short sentences>"
}

Raw idea:
"${rawIdea}"
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a concise project namer & MVP writer." },
        { role: "user", content: prompt },
      ],
      temperature: 0.2,
      max_tokens: 200,
    });

    const responseText = completion.choices?.[0]?.message?.content ?? "";

    // Try parsing JSON response from the model
    try {
      const parsed = JSON.parse(responseText);
      return NextResponse.json(parsed);
    } catch {
      return NextResponse.json(
        { error: "Failed to parse OpenAI response JSON" },
        { status: 502 }
      );
    }
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? "OpenAI request failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Reject GET requests with 405
  return NextResponse.json(
    { error: "Method not allowed — use POST" },
    { status: 405 }
  );
}
