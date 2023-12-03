'use client';

import CampaignItem from "@/components/Campaigns/Item";
import Loading from "@/components/Loading";
import { useCampaigns } from "@/hooks/useCampaigns";
import { useEffect } from "react";

export default function Campaigns() {
  const { loading, campaigns, getCampaigns } = useCampaigns();

  useEffect(() => {
    getCampaigns();
  }, [])

  return <div>
    <header className="flex items-start justify-between mb-8">
      <h1>Campaigns</h1>
      {/* <Button color="primary" label="New campaign" onClick={() => setShow(true)} /> */}
    </header>
    <main>
      {loading && <Loading />}
      {!loading && <div>
        {campaigns.length === 0 && <p>No campaign found.</p>}
        {campaigns.length > 0 && campaigns.map((campaign: any, index: number) => <CampaignItem key={index} campaign={campaign} />)}
      </div>}
    </main>
  </div>;
}