'use client';

interface CardProps {
  count: number;
  children?: React.ReactNode;
  title: string;
}

export default function Card({
  count, children, title
}: CardProps) {
  return <div className='border rounded-2xl shadow-sm p-6'>
    <div className="flex items-start justify-between gap-3 mb-2">
      <h3>{title}</h3>
      <div className="text-2xl">
        {children}
      </div>
    </div>
    <div className="text-2xl font-bold">
      {count}
    </div>
  </div>;
}