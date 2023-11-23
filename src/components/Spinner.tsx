"use client";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-4 h-4 border-color-[3px] rounded-full border-4 border-slate-300 border-t-black animate-spin"></div>
    </div>
  );
};

export default Spinner;
