'use client';

import Button from "@/components/Button";
import NewCampaign from "@/components/Campaigns/New";
import Card from "@/components/Card";
import { Email } from "@/components/Icons/Email";
import { Lists } from "@/components/Icons/Lists";
import { Subscribers } from "@/components/Icons/Subscribers";
import Slidebar from "@/components/Slidebar";
import { useState } from "react";

export default function Home() {
  const [show, setShow] = useState<boolean>(false);

  return <div>
    <header className="flex items-start justify-between mb-8">
      <h1>Welcome !</h1>
      <Button color="primary" label="New campaign" onClick={() => setShow(true)} />
    </header>
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card title="Campaigns" count={0}>
        <Email />
      </Card>
      <Card title="Subscribers" count={0}>
        <Subscribers />
      </Card>
      <Card title="Emails sent" count={0}>
        <Email />
      </Card >
      <Card title="Lists" count={0}>
        <Lists />
      </Card>
    </main>
    {show && <Slidebar>
      <NewCampaign onClose={() => setShow(false)} />
    </Slidebar>}
  </div>
}
