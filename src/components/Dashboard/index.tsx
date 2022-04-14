import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { supabase } from '../../config/supabase';

export default function Dashboard() {
  const { user, signout } = useAuth();
  const navigate = useNavigate();

  async function handleSignout() {
    await signout();
    navigate('/signin', { replace: true });
  }

  async function handleFunction() {
    const { data, error } = await supabase.functions.invoke('hello', {
      body: JSON.stringify({
        name: 'Bruno Rossini'
      })
    });
  }

  return (
    <div>
      Welcome, {user?.id}!<button onClick={handleSignout}>Signout</button>
      <button onClick={handleFunction}>Call function</button>
    </div>
  );
}
