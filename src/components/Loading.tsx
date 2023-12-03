'use client';
export default function Loading() {
  return <div className="grid gap-4">
    {[...Array(6)].map((x: any) => <div key={x} className="bg-slate-200 w-full h-[52px] rounded animate-pulse" ></div>)}
  </div>;
}