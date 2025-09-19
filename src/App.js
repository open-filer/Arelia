import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

import LeftPanel from './components/LeftPanel';
import DemoPanel from './components/DemoPanel';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import Wave from './components/Wave';


function App() {
  const [session, setSession] = useState(null);
  const [authState, setAuthState] = useState('register');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessionAndProfile = async () => {
      setLoading(false);
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        const { data } = await supabase.from('profiles').select('onboarded').eq('id', session.user.id).single();
        setProfile(data);
      }
      setLoading(false);
    };
    
    fetchSessionAndProfile();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session) {
        setLoading(false);
        const { data } = await supabase.from('profiles').select('onboarded').eq('id', session.user.id).single();
        setProfile(data);
        setLoading(false);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleOnboardingComplete = async () => {
    setLoading(false);
    const { error } = await supabase.from('profiles').update({ onboarded: true }).eq('id', session.user.id);
    if (error) {
      alert(error.message);
    } else {
      setProfile({ ...profile, onboarded: true });
    }
    setLoading(false);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (!session) {
    return (
      <div className="flex flex-col lg:flex-row h-screen overflow-hidden bg-white font-poppins">
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
          <LeftPanel authState={authState} setAuthState={setAuthState} />
        </div>
        <div className="hidden lg:flex w-1/2 relative">
          <DemoPanel />
          <Wave />
        </div>
      </div>
    );
  }  else if (profile && !profile.onboarded) {
    return <Onboarding onNext={handleOnboardingComplete} />;
  } else {
    return <Dashboard session={session} />;
  }
}

export default App;
