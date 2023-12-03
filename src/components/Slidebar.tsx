'use client';

interface SlidebarProps {
  children?: React.ReactNode;
};

export default function Slidebar({
  children,
}: SlidebarProps) {
  (true);
  return <div className='absolute bg-white w-full h-full top-0 left-0'>
    {children}
  </div>;
};