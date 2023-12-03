'use client';

import Loading from "@/components/Loading";
import SubscriberItem from "@/components/Subscribers/Item";
import { useNavigation } from "@/hooks/useNavigation";
import { useSubscribers } from "@/hooks/useSubscribers";
import { Subscriber } from "@/types";
import { useEffect } from "react";

export default function Subscribers() {
  const { selected, setSelected } = useNavigation();
  const { loading, subscribers, getSubscribers } = useSubscribers();

  useEffect(() => {
    getSubscribers()
  }, [])

  return <div>
    <header className="flex items-start justify-between mb-8">
      <h1>Subscribers</h1>
    </header>
    <main className="grid grid-cols-1 w-full">
      {loading && <Loading />}
      {!loading && <div className="grid gap-4">
        {subscribers.length > 0 && subscribers.map((subscriber: Subscriber, i: number) => <SubscriberItem
          key={i}
          subscriber={subscriber}
          onUpdate={() => getSubscribers()}
        />)}
        {subscribers.length === 0 && <div className="grid gap-4 items-center justify-center w-full py-24 border rounded-xl shadow-sm">
          <p>No subscribers yet.</p>
        </div>}
      </div>}
    </main>
  </div>
}