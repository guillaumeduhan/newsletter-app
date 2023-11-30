import { supabase } from "@/lib/supabase";
import { Campaign, Email } from "@/types";
import { useState } from "react";
import { toast } from "sonner";

export const useCampaigns = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [newCampaign, setNewCampaign] = useState<Campaign>({
    name: "A new campaign",
    from: "newsletter@codewithguillaume.com",
    subject: undefined,
    list_id: undefined,
    status: 'Inactive',
    user_id: undefined,
    email_id: undefined
  });
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const saveEmail = async (email: Email) => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('emails')
        .insert(email)
        .select()
        .single()
      
      if (data) return data
      return false
    } catch (error) {
      return toast.error('Error saving email!')
    } finally {
      setLoading(false)
    }
  }

  const saveCampaign = async (campaign: Campaign, email: Email) => {
    if (!email || !email.content) return toast.error('Missing email content!');

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
        
        if (data) toast.success('Successfully saved campaign!')
      }
      return toast.error('Email could not be saved!')
    } catch (error) {
      toast.error('Error saving campaign!')
    } finally {
     setLoading(false)
    }
  }

  const getCampaigns = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
      
      if (data) setCampaigns(data)
    } catch (error) {
      console.log(error)
    } finally {
     setLoading(false)
    }
  }

  return {
    loading,
    newCampaign,
    setNewCampaign,
    campaigns,
    setCampaigns,
    saveCampaign,
    getCampaigns
  }
}