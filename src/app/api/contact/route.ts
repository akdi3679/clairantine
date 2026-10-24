import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Here you can process the form data, save to a database, or send an email.
    // For now, we just log it and return a success response.
    console.log("Contact form submitted:", body);
    
    return NextResponse.json(
      { message: "Message envoyé avec succès ! Nous vous répondrons très bientôt." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { message: "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer." },
      { status: 500 }
    );
  }
}

// Optional: Add a GET handler if you ever want to test the endpoint in the browser
export async function GET() {
  return NextResponse.json({ message: "Contact API is working!" }, { status: 200 });
}