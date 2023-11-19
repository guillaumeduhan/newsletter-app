import CodewithgTemplate from "@/components/Emails/Template";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from 'resend';

const resend:any = new Resend(process.env.RESEND_API_KEY);
  
export async function POST(request: NextRequest) {
  const body = await request.json();

  const { email } = body
  
  if (!email) return NextResponse.json({ status: 422, error: 'Unprocessable Entity' })

  const { data, error } = await supabase
    .from('unsubscribers')
    .insert({ email })
    .select()
    .single()
  
  if (error) return NextResponse.json({ status: 422, error: 'Unprocessable Entity' })
  
  if (data) {
    const { id } = data;
    
    try {
      await resend.emails.send({
        from: 'no-reply@codewithguillaume.com',
        to: email,
        reply_to: 'support@codewithguillaume.com',
        subject: 'Confirm your unsubscription',
        react: CodewithgTemplate({ code: id }),
      });

      return NextResponse.json({ status: 200 })
    } catch (error) {
      return NextResponse.json({ status: 422, error: 'Unprocessable Entity' })
    }
  }
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code")

  if (!code) return NextResponse.json({ status: 422, error: 'Unprocessable Entity' })

  const { data, error } = await supabase
    .from('unsubscribers')
    .select()
    .eq('id', code)
    .single()
  
  if (error) return NextResponse.json({ status: 422, error: 'Unprocessable Entity' })
  
  if (data) {
    const { email } = data

    try {
      const { data, error } = await supabase
        .from('subscribers')
        .delete()
        .eq('email', email)
      
      return NextResponse.json({ status: 200 })
    } catch (error) {
      return NextResponse.json({ status: 422, error: 'Unprocessable Entity' })
    }
  }

}