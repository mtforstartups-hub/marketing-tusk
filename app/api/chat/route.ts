import { google } from "@ai-sdk/google";
import { convertToModelMessages, streamText, UIMessage } from "ai";
import { businessKnowledgeBase } from "@/lib/business-data";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: google("gemini-2.5-flash-lite"),
    messages: await convertToModelMessages(messages),
    system: `You are a helpful and professional customer support assistant for Marketing Tusk. 
    
    CORE RULES:
    1. Your ONLY job is to answer questions related to our business based strictly on the KNOWLEDGE BASE provided below.
    2. If a user asks a question about coding, cooking, general knowledge, or anything outside of the business scope, politely decline and remind them you are a business assistant.
    3. If the user asks a valid business question but the answer is NOT in the KNOWLEDGE BASE, do not guess or make up an answer. Instead, say: "I don't have that specific information, but you can reach out to our team at connect@marketingtusk.com."
    
    KNOWLEDGE BASE:
    ${businessKnowledgeBase}`,
  });

  return result.toUIMessageStreamResponse();
}
