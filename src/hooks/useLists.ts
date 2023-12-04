import { supabase } from "@/lib/supabase";
import { List } from "@/types";
import { useState } from "react";

export const useLists = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [lists, setLists] = useState<List[]>([]);
  const [newList, setNewList] = useState<List>({
    name: "My new list name"
  });
  const [subscribersIds, setSubscribersIds] = useState<string[]>([])

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
  const saveList = async (list: List) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('lists')
        .insert(list)
        .select();
  
      if (data) {
        const { id }: any = data

        const promises = subscribersIds
          .map((subscriber_id: string) => {
          return supabase
            .from('lists_relations')
            .insert({
              list_id: id,
              subscriber_id
            })
            .select();
        })
        
        await Promise.all(promises);

        return data;
      };
    } catch (error: any) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };
  
  return {
    saveList,
    loading,
    setLoading,
    lists,
    setLists,
    getLists,
    newList,
    setNewList
  }
}