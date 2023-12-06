import UnsubscribeTemplate from "@/components/Emails/Unsubscribe";
import { resend } from "@/lib/resend";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { email } = body;

  if (!email) return NextResponse.json({ status: 422, error: "Unprocessable Entity" });

  const { data, error } = await supabase
    .from("unsubscribers")
    .insert({ email })
    .select()
    .single()
  
  if (error) return NextResponse.json({ status: 422, error: "Unprocessable Entity" });

  if (data) {
    const { id } = data;

    try {
      await resend.emails.send({
        from: "unsubscribe@codewithguillaume.com",
        to: email,
        reply_to: "contact@codewithguillaume.com",
        subject: "Confirm your unsubscription",
        react: UnsubscribeTemplate({ code: id })
      })

      return NextResponse.json({ status: 200 })
    } catch (error) {
      return NextResponse.json({ status: 422, error: "Unprocessable Entity" });
    }
  }

  return NextResponse.json({ status: 200 })
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code")

  if (!code) return NextResponse.json({ status: 422, error: "Unprocessable Entity" });

  const { data, error } = await supabase
    .from("unsubscribers")
    .select()
    .eq('id', code)
    .single()
  
  if (error) return NextResponse.json({ status: 422, error: "Unprocessable Entity" });

  if (data) {
    const { email } = data;

    if (!email) return NextResponse.json({ status: 422, error: "No email found" });

    try {
      const { data, error } = await supabase
        .from("subscribers")
        .delete()
        .eq('email', email)
      
      return NextResponse.json({ status: 200 })
    } catch (error) {
      return NextResponse.json({ status: 422, error: "Unprocessable Entity" });
      
    }
  }
  return NextResponse.json({ status: 200 })
}