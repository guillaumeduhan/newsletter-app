'use client';
import MainTemplate from '@/components/Template/Main';
import { useCampaigns } from '@/hooks/useCampaigns';
import { useEmails } from '@/hooks/useEmails';

export default function NewCampaign() {
  const { newCampaign, setNewCampaign } = useCampaigns();
  const { email, setEmail } = useEmails()

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setNewCampaign((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  return <div className='flex items-start justify-between w-full h-full'>
    <div className='w-[400px] h-full border-r p-6 flex flex-col gap-4'>
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
          name='from'
          value={newCampaign?.from}
          onChange={handleChange}
        />
      </div>
      <div className='grid'>
        <label>Subject</label>
        <input
          type='text'
          name='subject'
          value={newCampaign?.subject}
          onChange={handleChange}
        />
      </div>
      <div className='grid'>
        <label>Select a list</label>
        <select
          name='list_id'
          value={newCampaign?.list_id}
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
    <div className='grid w-full'>
      <MainTemplate
        onContent={(content: any) =>
          setEmail((prev: any) => ({
            ...prev,
            content
          })
          )
        }
      />
    </div>
  </div>;
}