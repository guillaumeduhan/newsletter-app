"use client";

import Button from "@/components/Button";
import { useSubscribers } from "@/hooks/useSubscribers";
import Image from "next/image";
import { useState } from "react";
import banner from '../../../public/banner.png';

export default function Unsubscribe() {
  const [email, setEmail] = useState<string>('')
  const { unsubscribeToNewsletter, loading, setLoading, success, setSuccess } = useSubscribers();

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
          {success === false && <>
            <div className="notification error">Sorry your unsubscription has failed.</div>
          </>}
          <div>
            <Button label={'Unsubscribe 👉'} loading={loading} color="primary" onClick={() => unsubscribeToNewsletter(email)} />
          </div>
        </>}
        {success && <>
          <div className="notification success">You are successfully unsubscribed.</div>
        </>}
      </div>
    </div>
  </div>
}
