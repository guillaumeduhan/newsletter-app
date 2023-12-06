import { Resend } from 'resend';

export const resend: any = new Resend(process.env.RESEND_API_KEY);
