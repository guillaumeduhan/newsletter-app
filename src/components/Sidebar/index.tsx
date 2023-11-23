'use client';

import { useAppContext } from "@/context";
import { Email } from "../Icons/Email";
import { Home } from "../Icons/Home";
import { Lists } from "../Icons/Lists";
import { Subscribers } from "../Icons/Subscribers";
import UserItem from "../UserItem";
import SidebarMenu from "./Menu";

export interface MenuItem {
  icon: any;
  path: string;
  title: string;
}

export const menu: MenuItem[] = [
  {
    icon: <Home />,
    path: '/',
    title: 'Dashboard'
  },
  {
    icon: <Email />,
    path: '/campaigns',
    title: 'Campaigns'
  },
  {
    icon: <Subscribers />,
    path: '/subscribers',
    title: 'Subscribers'
  },
  {
    icon: <Lists />,
    path: '/lists',
    title: 'Lists'
  },
]

export default function Sidebar() {
  const { user } = useAppContext()

  return <div className='flex flex-col min-h-screen py-6 px-6 overflow-hidden w-[360px] border-r'>
    <div className='mb-4'>
      <UserItem />
    </div>
    <div className="w-full grow">
      <SidebarMenu menu={menu} />
    </div>
  </div>;
}