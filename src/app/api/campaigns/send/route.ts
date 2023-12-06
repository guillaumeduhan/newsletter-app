import Template from "@/components/Emails/Template";
import { resend } from "@/lib/resend";
import { supabaseAdmin } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { campaign, email: emailData } = body;

  try {
    if (!campaign || !emailData) return NextResponse.json({ error: 'Missing campaign or email' })

    const { data: subscribers, error } = await supabaseAdmin
      .from('subscribers')
      .select('*')
    
    let subscribersMapped = subscribers?.map(({ email }) => email) || [];

    const promises = subscribersMapped
      .map((to: string) => {
        return resend.emails.send({
          from: campaign.from,
          to,
          subject: campaign.subject,
          react: Template({ content: emailData.content })
        })
      })
    
    const { data: campaignSaved } = await supabaseAdmin
      .from("campaigns")
      .upsert({ id: campaign.id, status: 'Sent' })
      .select()
    
    if (campaignSaved) console.log(campaignSaved)
    
    const responses = await Promise.all(promises);

    return NextResponse.json({
      status: 200,
      responses
    })
  } catch (error) {
    return NextResponse.json({ error: error, status: 400 });
  }
}