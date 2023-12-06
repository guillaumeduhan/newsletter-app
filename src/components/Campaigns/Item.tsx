'use client';
import { useCampaigns } from '@/hooks/useCampaigns';
import { Campaign } from '@/types';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { toast } from 'sonner';
import Button from '../Button';

export default function CampaignItem({
  campaign,
  onClick
}:
  {
    campaign: Campaign | any,
    onClick: () => void
  }) {
  const { loading, setLoading, sendCampaign } = useCampaigns();

  const sendNewCampaign = async () => {
    try {
      setLoading(true);
      const response = await sendCampaign(campaign, campaign.email);

      if (response) {
        if (response.status === 200) return toast.success(`Campaign successfully sent`);
      }
      return toast.error(`Campaign failed to be sent!`);
    } catch (error: any) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(false);
  }, [])

  return <div className='item items-center px-3 py-2 grid grid-cols-6 cursor-pointer hover:bg-gray-50 transition'>
    <div className='grid gap-1 col-span-2' onClick={onClick}>
      <p>{campaign.name || 'No campaign name.'}</p>
      <p className='text-gray-500 text-xs'>{dayjs(campaign.created_at).format('MM/DD/YYYY')}</p>
    </div>
    <div className='col-span-1' onClick={onClick}>
      <span className='bg-gray-200 rounded-full px-4 py-2 text-xs'>{campaign.status}</span>
    </div>
    <div className='col-span-2'></div>
    <div className="col-span-1 flex gap-3 justify-end">
      <Button loading={loading} onClick={() => sendNewCampaign()} color="primary" label={'Send'} />
      <Button loading={loading} label={'Edit'} onClick={onClick} />
    </div>
  </div>;
}