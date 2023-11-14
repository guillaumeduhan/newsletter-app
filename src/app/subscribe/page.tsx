"use client";

import { isValidEmail } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import banner from '../../../public/banner.png';

export default function Subscribe() {
  const [email, setEmail] = useState<string>('')

  const subscribeToNewsletter = () => {
    if (!isValidEmail(email)) return alert(`Please enter your email address`);
    // all the operations
  }

  return <div className="bg-gray-200 min-h-screen py-8 text-[20px]">
    <div className="container mx-auto grid gap-4 rounded-lg shadow-sm max-w-[600px] overflow-hidden bg-white">
      <Image
        src={banner}
        alt={'newsletter'}
      />
      <div className="grid gap-4 px-8 pb-6 text-center">
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
        <div>
          <button className="primary">Subscribe 👉</button>
        </div>
      </div>
    </div>
  </div>
}
