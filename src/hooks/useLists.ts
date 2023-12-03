import { supabase } from "@/lib/supabase";
import { List } from "@/types";
import { useState } from "react";

export const useLists = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [lists, setLists] = useState<List[]>([]);

  const getLists = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('lists')
        .select('*, lists_relations(*)')
      
      if (data) setLists(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  
  return {
    loading,
    setLoading,
    lists,
    setLists,
    getLists,
  }
}