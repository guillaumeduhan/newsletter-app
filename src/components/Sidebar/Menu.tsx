'use client';

import { MenuItem } from '@/components/Sidebar';
import { useNavigation } from '@/hooks/useNavigation';
import Link from 'next/link';

export default function SidebarMenu({ menu = [] }: {
  menu: MenuItem[]
}) {

  const { pathname } = useNavigation()
  return <div className='grid w-full gap-2'>
    {menu.map((item: MenuItem, index: number) => (
      <Link key={index} href={item.path}
        className={`flex items-center justify-start px-3 py-1 rounded-lg gap-2 hover:bg-gray-100 ${pathname === item.path ? "bg-gray-100" : ""} transition w-full`}
      >
        {item.icon}
        {item.title}
      </Link>
    ))}
  </div>;
}