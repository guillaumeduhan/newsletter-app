"use client";

import Button from "@/components/Button";
import { useAppContext } from "@/context";
import { isValidEmail } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import banner from '../../../public/banner.png';

export default function Unsubscribe() {
  const { supabase } = useAppContext();
  const [email, setEmail] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean | undefined>(undefined)
  const [message, setMessage] = useState<string>('')

  const unsubscribeToNewsletter = async () => {
    if (!isValidEmail(email)) return alert(`Please enter your email address`);
    try {
      setLoading(true) 
      
      const response = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email})
      })

      if (response) {
        const { status } = response;

        if (status === 200) return setSuccess(true)
        setSuccess(false)
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
          <p>We are sorry to see you leaving...</p>
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
            <div className="notification error">Sorry your unsubscription has failed.</div>
          </>}
          <div>
            <Button label={'Unsubscribe 👉'} loading={loading} color="primary" onClick={unsubscribeToNewsletter} />
          </div>
        </>}
        {success && <>
          <div className="notification success">You are successfully unsubscribed.</div>
        </>}
      </div>
    </div>
  </div>
}
