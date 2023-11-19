"use client";

import Button from "@/components/Button";
import { useAppContext } from "@/context";
import { isValidEmail } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import banner from '../../../public/banner.png';

export default function Subscribe() {
  const { supabase } = useAppContext();
  const [email, setEmail] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean | undefined>(undefined)
  const [message, setMessage] = useState<string>('')

  const subscribeToNewsletter = async () => {
    if (!isValidEmail(email)) return alert(`Please enter your email address`);
    try {
      setLoading(true) 
      
      const { data, error } = await supabase
        .from('subscribers')
        .insert({ email })
        .select()
      
      if (data) {
        return setSuccess(true)
      }

      if (error) {
        return setMessage('You are already subscribed.')
      }

    } catch (error: any) {
      setSuccess(false)
      throw new Error(error)
    } finally {
     setLoading(false) 
    }
  }

  return <div className="bg-gray-200 min-h-screen py-8 text-[20px]">
    <div className="container mx-auto grid gap-4 rounded-lg shadow-sm max-w-[600px] overflow-hidden bg-white">
      <Image
        src={banner}
        alt={'newsletter'}
      />
      <div className="grid gap-4 px-8 pb-6 text-center">
        {!success && <>
          <p>Top 5 links of the week about coding.</p>
          <div className='grid'>
            <input
              type='email'
              name='email'
              placeholder="me@mail.com"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />
          </div>
          {message && <>
            <div className="notification">{message}</div>
          </>}
          {success === false && <>
            <div className="notification error">Sorry your subscription has failed.</div>
          </>}
          <div>
            <Button label={'Subscribe 👉'} loading={loading} color="primary" onClick={subscribeToNewsletter} />
          </div>
        </>}
        {success && <>
          <div className="notification success">You have successfully subscribed.</div>
        </>}
      </div>
    </div>
  </div>
}
