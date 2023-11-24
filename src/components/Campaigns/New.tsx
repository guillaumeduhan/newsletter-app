'use client';

import { useCampaigns } from "@/hooks/useCampaigns";

export default function NewCampaign() {
  const { newCampaign, setNewCampaign } = useCampaigns()

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setNewCampaign((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  }

  return <div className='flex items-start justify-between w-full h-full'>
    <div className="w-[400px] h-full border-r p-6 flex flex-col gap-4">
      <div className='grid'>
        <label>Name</label>
        <input
          type='text'
          name='name'
          value={newCampaign?.name}
          onChange={handleChange}
        />
      </div>
      <div className='grid'>
        <label>From</label>
        <input
          type='text'
          name='object'
          className="disabled"
          value={newCampaign?.from}
          onChange={handleChange}
          disabled
        />
      </div>
      <div className='grid'>
        <label>Subject</label>
        <input
          type='text'
          name='date'
          value={newCampaign?.subject}
          onChange={handleChange}
        />
      </div>
      <div className='grid'>
        <label>Select a list</label>
        <select
          name='select'
          value={newCampaign.list_id}
          onChange={handleChange}
        >
          {[].map((i: any) => (
            <option key={i.id} value={i.id}>
              {i}
            </option>
          ))}
        </select>
      </div>
    </div>
    <div className="w-full h-full">
      Editor
    </div>
  </div>;
}