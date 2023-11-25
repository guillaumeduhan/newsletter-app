"use client";

import Image from "next/image";

import NL from '../../../public/banner.png';

import { Editor } from "novel";

interface Props {
  content: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export default function MainTemplate({ content = 'Hello world' }: Props) {
  return <div className="bg-gray-100 min-h-screen py-12">
    <div className="font-sans text-gray-400 w-full container max-w-[700px] mx-auto pb-8 bg-white text-lg">
      <div className="w-full h-auto">
        <Image
          src={NL}
          alt="Codewithguillaume's newsletter"
        />
      </div>
      <div className="mx-6 my-6">
        <Editor defaultValue="string" onUpdate={(v: any) => console.log(v)} />
        <hr />
        <div>
          <p className="py-4">
            Thanks for following this NL,<br />👋 See you next Sunday!<br />— Guillaume (@blackevilgoblin)
          </p>
          <a href="https://www.youtube.com/@codewithguillaume">👉 Subscribe to my Youtube Channel</a>
        </div>
      </div>
    </div>
  </div>
}
