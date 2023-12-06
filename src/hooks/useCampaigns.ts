import { supabase } from "@/lib/supabase";
import { Campaign, Email } from "@/types";
import { useState } from "react";

const MODEL = {
  name: "A new campaign",
  from: "newsletter@codewithguillaume.com",
  subject: undefined,
  list_id: undefined,
  status: 'Draft',
  user_id: undefined,
  email_id: undefined
};

export const useCampaigns = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [newCampaign, setNewCampaign] = useState<Campaign>(MODEL);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const startNewCampaign = () => setNewCampaign(MODEL);

  const saveEmail = async (email: Email) => {
    if (!email) return 'Missing email content!'

    try {
      setLoading(true)

      if (email.id) {
        const { data: existingEmail, error } = await supabase
          .from("emails")
          .upsert({ id: email.id, ...email })
          .select()
          .single()
        
        return existingEmail;
      }

      const { data: newEmail, error} = await supabase
        .from("emails")
        .insert(email)
        .select()
        .single()
      
      return newEmail;
    } catch (error: any) {
      throw new Error(error)
    } finally {
      setLoading(false)
    }
  }

  const saveCampaign = async (campaign: Campaign, email: Email) => {
    try {
      setLoading(true);

      const emailSaved = await saveEmail(email)

      if (emailSaved) {
        const { id: emailId } = emailSaved;
        campaign.email_id = emailId;

        if (campaign.id) {
          const { data: campaignSaved, error } = await supabase
            .from("campaigns")
            .upsert({ id: campaign.id, ...campaign })
            .select()
            .single()

          return {
            campaignSaved,
            emailSaved
          }
        }

        const { data: campaignSaved, error } = await supabase
          .from("campaigns")
          .insert(campaign)
          .select()
          .single()

        return {
          campaignSaved,
          emailSaved
        }
      }

      return undefined
    } catch (error: any) {
      throw new Error(error)
    } finally {
      setLoading(false)
    }
  }

  const getCampaigns = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('campaigns')
        .select('*, email_id(*)')
      
      if (data) setCampaigns(data)
    } catch (error) {
      console.log(error)
    } finally {
     setLoading(false)
    }
  }

  const sendCampaign = async (campaign: Campaign, email: Email) => {
    try {
      setLoading(true);

      const response = await fetch('/api/campaigns/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ campaign, email })
      })

      if (response) {
        const data = await response.json();
        console.log(data);
        return response
      }

      return undefined
    } catch (error: any) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    setLoading,
    newCampaign,
    setNewCampaign,
    campaigns,
    setCampaigns,
    saveCampaign,
    getCampaigns,
    startNewCampaign,
    sendCampaign
  }
}