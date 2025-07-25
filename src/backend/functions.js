// backend/http-functions.js
import { ok, badRequest, forbidden } from 'wix-http-functions';
import { getSecret } from 'wix-secrets-backend';
import { fetch } from 'wix-fetch';

export async function post_askOpenAI(request) {
  try {
    const body = await request.body.json();
    const messages = body.messages;

    if (!messages || !Array.isArray(messages)) {
      return badRequest({ body: { error: "Missing or invalid messages array" } });
    }

    const OPENAI_KEY = await getSecret("OPENAI_API_KEY");

    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: messages,
        temperature: 0.7
      })
    });

    const result = await openaiResponse.json();

    if (!openaiResponse.ok) {
      return badRequest({ body: { error: result } });
    }

    return ok({ body: { reply: result.choices[0].message.content } });

  } catch (err) {
    console.error("שגיאה בפונקציית askOpenAI:", err);
    return badRequest({ body: { error: err.message } });
  }
}
