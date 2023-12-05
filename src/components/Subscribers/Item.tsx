'use client';
import { useSubscribers } from '@/hooks/useSubscribers';
import { Subscriber } from '@/types';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import Button from '../Button';

export default function SubscriberItem({
  subscriber,
  onUpdate,
  select = false
}:
  {
    subscriber: Subscriber,
    onUpdate?: () => void,
    select?: boolean,
  }) {
  const { unsubscribeToNewsletter, loading, setLoading } = useSubscribers();

  useEffect(() => {
    setLoading(false);
  }, [])

  return <div className={`item text-sm items-center grid grid-cols-3 cursor-pointer transition ${select ? 'border-none' : 'px-3 py-2 hover:bg-gray-50'}`}>
    <div className='grid gap-2 col-span-1'>
      <p>{subscriber.email}</p>
      {!select && <p className='text-gray-500'>{dayjs(subscriber.created_at).format('MM-DD-YYYY')}</p>}
    </div>
    {!select && <div className='col-span-1'>
      <span className='bg-primary-200 text-primary-600 rounded-full px-4 py-2'>{subscriber.status || 'Subscribed'}</span>
    </div>}
    {!select && <div className="col-span-1 flex gap-3 justify-end">
      <Button loading={loading} label={'Remove'} onClick={async () => {
        await unsubscribeToNewsletter(subscriber.email);
        if (onUpdate) onUpdate();
      }} />
    </div>}
  </div>;
}