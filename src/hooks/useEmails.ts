import { Email, EmailStatusArray } from "@/types";
import { useState } from "react";

export const useEmails = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<Email>({
    title: 'A new email',
    content: '',
    status: EmailStatusArray[0]
  })

  return {
    email,
    setEmail,
    loading,
    setLoading
  }
}