'use client';
import { useSubscribers } from '@/hooks/useSubscribers';
import { Subscriber } from '@/types';
import { useEffect } from 'react';
import Loading from '../Loading';
import SubscriberItem from './Item';
export default function SubscribersList({
  list
}: {
  list?: Subscriber[]
}) {
  const { subscribers, setSubscribers, getSubscribers, loading } = useSubscribers();

  useEffect(() => {
    getSubscribers()
  }, [])

  useEffect(() => {
    if (list && list.length > 0) setSubscribers(list)
  }, [list])
  
  return <div className='item'>
    {loading && <Loading />}
    {
      !loading && <>
        {subscribers.length === 0 && <p>No subscribers yet.</p>}
        {subscribers.length > 0 && <div className='grid'>
          <header className='p-3'>
            <input type="text" placeholder="Search for a member..." />
          </header>
          {
            subscribers.map((subscriber: Subscriber, index: number) => {
              return <div className='flex gap-4 items-center justify-start w-full py-2 px-3 cursor-pointer max-h-[500px] overflow-y-auto'>
                <input type="checkbox" />
                <SubscriberItem select={true} key={index} subscriber={subscriber} />
              </div>
            })
          }
        </div>}
      </>
    }
  </div>;
}