import { supabase } from "@/lib/supabase";
import { Campaign, Email } from "@/types";
import { useState } from "react";

export const useCampaigns = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [newCampaign, setNewCampaign] = useState<Campaign>({
    name: "A new campaign",
    from: "newsletter@codewithguillaume.com",
    subject: undefined,
    list_id: undefined,
    status: 'Draft',
    user_id: undefined,
    email_id: undefined
  });
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const saveEmail = async (email: Email) => {
    if (!email) return 'Missing email content!'

    try {
      setLoading(true)

      const { data, error } = await supabase
        .from('emails')
        .upsert(email)
        .select()
        .single()
      
      if (data) return data
      return false
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
        const { id } = emailSaved;
        campaign.email_id = id;

        const { data, error } = await supabase
          .from('campaigns')
          .upsert(campaign)
          .select()
        
        if (data) return data
      }
      return emailSaved
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

  return {
    loading,
    setLoading,
    newCampaign,
    setNewCampaign,
    campaigns,
    setCampaigns,
    saveCampaign,
    getCampaigns
  }
}