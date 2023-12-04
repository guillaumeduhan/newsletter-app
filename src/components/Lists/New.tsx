'use client';
import { useLists } from '@/hooks/useLists';
import { List } from '@/types';
import { useEffect } from 'react';
import Button from '../Button';
import SubscribersList from '../Subscribers/List';

export default function NewList({
  selected,
  onClose
}: {
  selected?: List,
  onClose?: () => void
}) {
  const { loading, setLoading, newList, setNewList, saveList } = useLists();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setNewList((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  }

  useEffect(() => {
    setLoading(false)
  }, [])

  return <div>
    <header className='border-b flex items-center justify-between px-8 py-6'>
      <h2>New list</h2>
      <div className="flex gap-2">
        <Button label="Close" onClick={onClose} />
      </div>
    </header>
    <div className='w-[600px] grid mx-auto my-12 gap-4'>
      <div className='grid'>
        <label>List name</label>
        <input
          type='text'
          name='name'
          value={newList?.name}
          onChange={handleChange}
        />
      </div>
      <div className='grid'>
        <label>Subscribers</label>
        <SubscribersList />
      </div>
      <div className="flex my-4">
        <Button disabled={!newList.name || newList.name.length === 0} loading={loading} color="primary" label="Save" onClick={onClose} />
      </div>
    </div>
  </div>
}