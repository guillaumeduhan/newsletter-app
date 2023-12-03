'use client';
import MainTemplate from '@/components/Template/Main';
import { useAppContext } from '@/context';
import { useCampaigns } from '@/hooks/useCampaigns';
import { useEmails } from '@/hooks/useEmails';
import { toast } from 'sonner';
import Button from '../Button';

export default function NewCampaign({
  onClose
}: {
  onClose: () => void
}) {
  const { newCampaign, setNewCampaign, loading, saveCampaign } = useCampaigns();
  const { email, setEmail } = useEmails();
  const { user } = useAppContext()

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setNewCampaign((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveDraft = async () => {
    try {
      const response = await saveCampaign({ ...newCampaign, user_id: user.id }, email);

      if (response) {
        return toast.success(`Campaign successfully saved`)
      }

      toast.error(`Campaign could not be saved.`)
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return <div>
    <header className='border-b flex items-center justify-between px-8 py-6'>
      <h2>New campaign</h2>
      <div className="flex gap-2">
        <Button label="Close" onClick={onClose} />
        <Button loading={loading} label="Save draft" onClick={() => saveDraft()} />
        <Button loading={loading} color="primary" label="Send" onClick={onClose} />
      </div>
    </header>
    <div className='flex items-start justify-between w-full h-full'>
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
  </div>


}