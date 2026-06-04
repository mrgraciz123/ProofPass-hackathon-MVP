import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("resume") as File;

    if (!file) {
      return NextResponse.json({ error: "No resume file provided" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    
    // If no API key is provided, we can fallback to a generated mock for demo purposes if desired, 
    // but the prompt explicitly asked for real integration.
    if (!apiKey) {
      return NextResponse.json({ 
        error: "GEMINI_API_KEY is not configured on the server. Please add it to your environment variables." 
      }, { status: 500 });
    }

    // Read the file buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Convert to base64 for Gemini payload
    const base64Data = buffer.toString("base64");
    
    const mimeType = file.type || "application/pdf";

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are a strict JSON extraction AI. Parse the attached resume document.
      Extract the following fields and return ONLY a valid JSON object. Do not include markdown code blocks or any other text.
      
      Schema:
      {
        "name": "string (Candidate's full name)",
        "skills": ["string", "string"],
        "education": "string (The primary degree, e.g., B.Tech Computer Science)",
        "college": "string (The name of the college or university)",
        "gradYear": "string (Graduation year)",
        "experience": [
           { "company": "string", "role": "string", "years": "number" }
        ],
        "projects": [
           { "name": "string", "description": "string" }
        ]
      }
    `;

    const result = await model.generateContent([
      {
        inlineData: {
          data: base64Data,
          mimeType
        }
      },
      prompt
    ]);

    const responseText = result.response.text();
    // Clean up potential markdown formatting if model didn't perfectly listen
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
       const extracted = JSON.parse(jsonMatch[0]);
       return NextResponse.json({ success: true, data: extracted });
    } else {
       throw new Error("Failed to extract JSON from Gemini response");
    }

  } catch (error) {
    console.error("Resume parsing error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to parse resume" }, { status: 500 });
  }
}
