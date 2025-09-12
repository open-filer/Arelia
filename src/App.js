import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import LeftPanel from './components/LeftPanel';
import DemoPanel from './components/DemoPanel';

function Dashboard({ session }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Arelia!</h1>
      <p className="mb-6">You are logged in as: {session.user.email}</p>
      <button 
        onClick={() => supabase.auth.signOut()}
        className="bg-gray-800 text-white font-bold py-2 px-6 rounded hover:bg-gray-600 transition-colors"
      >
        Sign Out
      </button>
    </div>
  );
}

function App() {
  const [session, setSession] = useState(null);
  const [authState, setAuthState] = useState('register'); 
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen">
      {!session ? (
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          <div className="flex items-center justify-center p-4">
            <LeftPanel authState={authState} setAuthState={setAuthState} />
          </div>
          <div className="hidden lg:flex items-center justify-center bg-brand-secondary p-8">
            <DemoPanel />
          </div>
        </div>
      ) : (
        <Dashboard session={session} />
      )}
    </div>
  );
}

export default App;