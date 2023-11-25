'use client';

import Button from "./Button";

interface SlidebarProps {
  children?: React.ReactNode;
  title: string;
  onClose: () => void;
}

export default function Slidebar({ children, title, onClose }: SlidebarProps) {
  return <div className="absolute bg-white w-full h-full top-0 left-0">
    <header className="border-b flex items-center justify-between px-8 py-6">
      <h2>{title}</h2>
      <Button label="Cancel" onClick={onClose} />
    </header>
    {children}
  </div>;
}