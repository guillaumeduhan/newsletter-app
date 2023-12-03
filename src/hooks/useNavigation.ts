import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const useNavigation = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [active, setActive] = useState<string>('');
  const [selected, setSelected] = useState<any>('');
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  return {
    open,
    setOpen,
    active,
    setActive,
    pathname,
    params,
    router,
    searchParams,
    selected,
    setSelected
  }
}