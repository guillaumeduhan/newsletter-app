'use client';

import Button from "@/components/Button";
import CampaignItem from "@/components/Campaigns/Item";
import NewCampaign from "@/components/Campaigns/New";
import Loading from "@/components/Loading";
import Slidebar from "@/components/Slidebar";
import { useCampaigns } from "@/hooks/useCampaigns";
import { useNavigation } from "@/hooks/useNavigation";
import { Campaign } from "@/types";
import { useEffect, useState } from "react";

export default function CampaignsPage() {
  const [show, setShow] = useState<boolean>(false)
  const { selected, setSelected } = useNavigation();
  const { loading, campaigns, getCampaigns } = useCampaigns();

  useEffect(() => {
    getCampaigns()
  }, [])

  useEffect(() => {
    setShow(selected)
  }, [selected])

  return <div>
    <header className="flex items-start justify-between mb-8">
      <h1>Campaigns</h1>
      <Button color="primary" label="New campaign" onClick={() => setShow(true)} />
    </header>
    <main className="grid grid-cols-1 w-full">
      {loading && <Loading />}
      {!loading && <div className="grid gap-4">
        {campaigns.length > 0 && campaigns.map((campaign: Campaign, i: number) => <CampaignItem key={i} campaign={campaign} onClick={() => setSelected(campaign)} />)}
        {campaigns.length === 0 && <div className="grid gap-4 items-center justify-center w-full py-24 border rounded-xl shadow-sm">
          <p>No campaign yet. Create one?</p>
          <Button color="primary" label="New campaign" onClick={() => setShow(true)} />
        </div>}
      </div>}
    </main>
    {show && <Slidebar >
      <NewCampaign
        selected={selected}
        onClose={() => {
          getCampaigns();
          setSelected(undefined);
          setShow(false);
        }}
      />
    </Slidebar>}
  </div>
}