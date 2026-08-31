import { NextRequest, NextResponse } from "next/server";
import { handleWebhookUpdate } from "@/lib/telegram-bot";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Verify it's a Telegram update
    if (!body.update_id) {
      return NextResponse.json(
        { error: "Invalid update format" },
        { status: 400 }
      );
    }
    
    // Handle webhook update
    await handleWebhookUpdate(body);
    
    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    console.error("Error processing webhook:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { 
        error: "Internal server error",
        message: errorMessage
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  // For webhook verification (if needed)
  return NextResponse.json({ message: "Telegram webhook endpoint" });
}
