'use client';
import { useAppContext } from '@/context';

import { limitString } from '@/lib/utils';
import Avatar from './Avatar';
export default function UserItem() {
  const { user } = useAppContext()
  return <div className='flex items-center justify-start w-full gap-3 px-2 py-2 text-black transition shadow-sm cursor-pointer border rounded-xl hover:bg-gray-50 overflow-hidden'>
    <div>
      <Avatar user={user} />
    </div>
    <div className='grid grow w-full'>
      <div className="text-sm antialiased font-semibold whitespace-nowrap">
        {user && <span>{user && limitString(user.email, 18)}</span>}
      </div>
      <div className='flex gap-1'>
        {user && <span className='text-xs antialiased'>{limitString(user.email, 20)}</span>}
      </div>
    </div>
  </div>;
}