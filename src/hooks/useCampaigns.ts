import { supabase } from "@/lib/supabase";
import { Campaign } from "@/types";
import { useState } from "react";
import { toast } from "sonner";

export const useCampaigns = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [newCampaign, setNewCampaign] = useState<Campaign>({
    name: 'A new campaign',
    from: 'newsletter@codewithguillaume.com',
    subject: undefined,
    list_id: undefined,
    status: undefined,
    user_id: undefined
  });

  const saveCampaign = async (campaign: Campaign) => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('campaigns')
        .upsert(campaign)
      
      if (data) toast.success('Successfully saved campaign!')
    } catch (error) {
      toast.error('Error saving campaign!')
    } finally {
      setLoading(false)
    }
  };

  const sendCampaign = async () => {
    // later
  }

  return {
    loading,
    setLoading,
    newCampaign,
    setNewCampaign,
    saveCampaign,
    sendCampaign
  }
}