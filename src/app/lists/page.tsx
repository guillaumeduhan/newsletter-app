'use client';

import Button from "@/components/Button";
import NewList from "@/components/Lists/New";
import Loading from "@/components/Loading";
import Slidebar from "@/components/Slidebar";
import { useLists } from "@/hooks/useLists";
import { useNavigation } from "@/hooks/useNavigation";
import { List } from "@/types";
import { useEffect, useState } from "react";

export default function Lists() {
  const [show, setShow] = useState<boolean>(false);
  const { selected, setSelected } = useNavigation();
  const { loading, lists, getLists } = useLists();

  useEffect(() => {
    getLists()
  }, [])

  return <div>
    <header className="flex items-start justify-between mb-8">
      <h1>Lists</h1>
      <Button color="primary" label="New list" onClick={() => setShow(true)} />
    </header>
    <main className="grid grid-cols-1 w-full">
      {loading && <Loading />}
      {!loading && <div className="grid gap-4">
        {lists.length > 0 && lists.map((list: List, i: number) => <></>)}
        {lists.length === 0 && <div className="grid gap-4 items-center justify-center w-full py-24 border rounded-xl shadow-sm">
          <p>No list yet. Create one?</p>
          <Button color="primary" label="New list" onClick={() => setShow(true)} />
        </div>}
      </div>}
    </main>
    {show && <Slidebar>
      <NewList onClose={() => setShow(false)} />
    </Slidebar>}
  </div>
}