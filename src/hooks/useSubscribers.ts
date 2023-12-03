import { supabase } from "@/lib/supabase";
import { isValidEmail } from "@/lib/utils";
import { Subscriber } from "@/types";
import { useState } from "react";

export const useSubscribers = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [success, setSuccess] = useState<boolean | undefined>(undefined)

  const getSubscribers = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('subscribers')
        .select('*')
      
      if (data) setSubscribers(data)
    } catch (error) {
      console.log(error)
    } finally {
     setLoading(false)
    }
  }

  const unsubscribeToNewsletter = async (email: string) => {
    if (!isValidEmail(email)) return alert(`Please enter your email address`);
    try {
      setLoading(true) 
      
      const response = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email})
      })

      if (response) {
        const { status } = response;

        console.log(status)

        if (status === 200) return setSuccess(true)
      }

    } catch (error: any) {
      setSuccess(false)
      throw new Error(error)
    } finally {
     setLoading(false) 
    }
  }
  
  return {
    loading,
    setLoading,
    subscribers,
    setSubscribers,
    getSubscribers,
    success,
    setSuccess,
    unsubscribeToNewsletter
  }
}