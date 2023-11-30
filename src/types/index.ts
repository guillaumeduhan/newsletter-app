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
  from: string | undefined;
  subject: string | undefined;
  list_id: string | undefined;
  status: CampaignStatus | undefined;
  user_id: string | undefined;
  email_id: string | undefined;
} & CommonFields;

export type Email = {
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