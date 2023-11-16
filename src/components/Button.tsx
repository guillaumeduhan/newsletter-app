"use client";

import Spinner from "./Spinner";

type Props = {
  color?: string;
  label?: string;
  loading?: boolean;
  small?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children?: any
}

export default function Button({ color, label, loading, small, disabled, onClick, children }: Props) {
  return <button className={color} disabled={loading || disabled} onClick={() => (onClick ? onClick() : null)}>
    {loading && <Spinner />}
    {!loading && <div className={`flex items-center justify-center gap-2 ${small ? 'text-sm' : ''}`}>
      {label}
      {children}
    </div>}
  </button>
}