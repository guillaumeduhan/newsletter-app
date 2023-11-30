'use client';

import { User } from "@/types";

interface AvatarProps {
  children?: React.ReactNode;
  user: User | undefined;
  small?: boolean;
}

export default function Avatar({
  user = undefined, small = false
}: AvatarProps) {
  const getSize = () => small ? '28px' : '36px'

  return <div className={`flex items-center justify-center overflow-hidden rounded-full bg-slate-900`} style={{ minWidth: getSize(), minHeight: getSize() }}>
    <span className="font-bold text-white capitalize">{user && user.email[0]}</span>
  </div>;
}