import type { NextApiRequest, NextApiResponse } from "next"
import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { rawIdea } = req.body
  if (!rawIdea || rawIdea.trim() === "") {
    return res.status(400).json({ error: "rawIdea is required" })
  }

  try {
    const prompt = `
Given this raw project idea:

"${rawIdea}"

Generate a concise project title (few words) and a short MVP description (2-3 sentences) suitable for a startup documentation app.
Respond in JSON format like this:
{
  "title": "...",
  "mvp_description": "..."
}
`

    const completion = await openai.createChatCompletion({
      model: "gpt-4o-mini", // or "gpt-4o" or "gpt-3.5-turbo"
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 200,
    })

    const responseText = completion.data.choices[0].message?.content || ""

    // Try to parse JSON from response
    const parsed = JSON.parse(responseText)

    res.status(200).json(parsed)
  } catch (error: any) {
    console.error("OpenAI error:", error)
    res.status(500).json({ error: error.message || "OpenAI request failed" })
  }
}
