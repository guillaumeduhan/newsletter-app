"use client";

import Button from "@/components/Button";
import { useAppContext } from "@/context";
import { useNavigation } from "@/hooks/useNavigation";
import { supabase } from "@/lib/supabase";
import { isValidEmail } from "@/lib/utils";
import { useState } from "react";

export default function Login() {
  const { router } = useNavigation()
  const { setUser } = useAppContext()
  const [data, setData] = useState<{ email: string, password: string }>({
    email: 'codewithguillaume@gmail.com',
    password: '86327417Gdu!'
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>(undefined)

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  }

  const login = async () => {
    const { email, password } = data;
    if (email.length < 4 || password.length < 4) return alert("Please enter a valid email address & password length must be at least 4 characters.")
    if (!isValidEmail(email)) return alert("Please enter a valid email address");
    try {
      setLoading(true);

      const { data, error } = await supabase
        .auth
        .signInWithPassword({
          email,
          password
        })

      if (error) return setError('Sorry impossible to login.');

      if (data) {
        const { user } = data
        const { access_token, refresh_token } = data.session
        await supabase.auth.setSession({
          access_token,
          refresh_token
        })
        setUser(user)
        router.refresh()
      }

    } catch (error: any) {
      throw new Error(error)
    } finally {
      setLoading(false);
    }
  }

  return <div className="bg-gray-100 w-full h-screen py-8">
    <div className="bg-white rounded-lg shadow-sm border w-[300px] mx-auto px-6 py-4 grid gap-4">
      <div className='grid'>
        <label>E-mail</label>
        <input
          type='text'
          name='email'
          value={data?.email}
          onChange={handleChange}
        />
      </div>
      <div className='grid'>
        <label>Password</label>
        <input
          type='password'
          name='password'
          value={data?.password}
          onChange={handleChange}
        />
      </div>
      {error && <div className="notification error">
        {error}
      </div>}
      <div>
        <Button loading={loading} label="Login" onClick={login} />
      </div>
    </div>
  </div>
}