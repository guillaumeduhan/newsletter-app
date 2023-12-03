'use client';
import { Campaign } from '@/types';
import dayjs from 'dayjs';
import Button from '../Button';
export default function CampaignItem({
  campaign,
  onClick
}:
  {
    campaign: Campaign,
    onClick: () => void
  }) {
  return <div className='item items-center px-5 py-4 grid grid-cols-6 cursor-pointer hover:bg-gray-50 transition' onClick={onClick}>
    <div className='grid gap-2 col-span-2'>
      <h2>{campaign.name || 'No campaign name.'}</h2>
      <p className='text-gray-500'>{dayjs(campaign.created_at).format('MM-DD-YYYY')}</p>
    </div>
    <div className='col-span-1'>
      <span className='bg-gray-200 rounded-full px-4 py-2'>{campaign.status}</span>
    </div>
    <div className='col-span-2'>
      <span>{campaign.subject || 'No subject'}</span>
    </div>
    <div className="col-span-1 flex gap-3 justify-end">
      <Button color="primary" label={'Send'} />
      <Button label={'Edit'} />
    </div>
  </div>;
}