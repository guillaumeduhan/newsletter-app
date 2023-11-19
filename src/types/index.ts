type CommonFields = {
  id?: string;
  created_at?: string;
}

export const CampaignStatusArray = ['Active', 'Inactive', 'Archived'];
export const EmailStatusArray = ['Draft', 'Completed'];
export const SubscriberStatusArray = ['Active', 'Archived', 'Inactive'];

type CampaignStatus = typeof CampaignStatusArray[number];
type EmailStatus = typeof CampaignStatusArray[number];
type SubscriberStatus = typeof SubscriberStatusArray[number];

export type Campaign = {
  name: string;
  list_id: string;
  status: CampaignStatus;
  user_id: string;
} & CommonFields;

export type Email = {
  campaign_id?: string;
  title: string;
  content: string;
  status: EmailStatus;
} & CommonFields;

export type List = {
  name: string;
} & CommonFields;

export type ListsRelations = {
  list_id: string;
  subscriber_id: string;
} & CommonFields;

export type Subscriber = {
  email: string;
  owner_id: string;
  status: SubscriberStatus;
} & CommonFields;

export type User = {
  dark_mode: boolean;
  email: string;
} & CommonFields;