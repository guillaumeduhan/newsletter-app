'use client';
import { useSubscribers } from '@/hooks/useSubscribers';
import { Subscriber } from '@/types';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import Button from '../Button';

export default function SubscriberItem({
    subscriber,
    onUpdate
  }:
  {
    subscriber: Subscriber,
    onUpdate: () => void
  }) {
  const { unsubscribeToNewsletter, loading, setLoading } = useSubscribers();

  useEffect(() => {
    setLoading(false);
  }, [])

  return <div className='item items-center px-5 py-4 grid grid-cols-3 cursor-pointer hover:bg-gray-50 transition'>
    <div className='grid gap-2 col-span-1'>
      <h2>{subscriber.email}</h2>
      <p className='text-gray-500'>{dayjs(subscriber.created_at).format('MM-DD-YYYY')}</p>
    </div>
    <div className='col-span-1'>
      <span className='bg-primary-200 text-primary-600 rounded-full px-4 py-2'>{subscriber.status || 'Subscribed'}</span>
    </div>
    <div className="col-span-1 flex gap-3 justify-end">
      <Button loading={loading} label={'Remove'} onClick={async () => {
        await unsubscribeToNewsletter(subscriber.email);
        onUpdate();
      }} />
    </div>
  </div>;
}