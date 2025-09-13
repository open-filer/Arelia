import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import DummyLogo from './DummyLogo';

const LeftPanel = ({ authState, setAuthState }) => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    age: '',
    email: '',
    password: '',
    rePassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(''); // For login and signup errors

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  async function signInWithGoogle() {
    setLoading(true);
    setAuthError('');
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) {
      setAuthError(error.message);
      setLoading(false);
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    setAuthError('');

    if (formData.password !== formData.rePassword) {
      setAuthError('Passwords do not match.');
      return;
    }
    
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: { data: { name: formData.name, gender: formData.gender, age: formData.age } }
    });

    if (error) {
      setAuthError(error.message);
    } else {
      setAuthState('confirmation');
    }
    setLoading(false);
  };

  // NEW: Function to handle Email/Password Sign-In
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAuthError('');
    
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setAuthError(error.message);
    }
    // Note: On success, the onAuthStateChange listener in App.js will handle the session
    // and automatically switch to the dashboard. We don't need to do anything else here.
    setLoading(false);
  };


  const renderContent = () => {
    switch (authState) {
      case 'register':
        return (
          <>
            <div className="mb-6 text-center"> {/* Adjusted margin */}
              <h1 className="font-serif text-4xl md:text-5xl text-brand-text mb-2">
                Begin. <br /> Belong.
              </h1>
              <p className="text-base text-brand-text">The AI for creative explorers</p>
            </div>
            
            {/* NEW: Login Link */}
            <p className="text-sm text-center text-brand-muted mb-4">
              Already have an account?{' '}
              <button onClick={() => setAuthState('login')} className="font-semibold text-blue-600 hover:underline">
                Login here
              </button>
            </p>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-md">
              <button onClick={signInWithGoogle} disabled={loading} className="w-full flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-lg text-brand-text font-semibold hover:bg-gray-50 transition-colors mb-4 disabled:opacity-50">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 mr-3" />
                Continue with Google
              </button>
              <div className="text-center text-gray-400 my-3">OR</div>
              <form onSubmit={handleRegister}>
                <input type="text" name="name" placeholder="Enter your name" onChange={handleInputChange} className="w-full p-3 mb-3 border border-gray-300 rounded-lg" required />
                <div className="grid grid-cols-2 gap-3 mb-3">
                    <select name="gender" onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg" required>
                        <option value="">Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    <input type="number" name="age" placeholder="Age" onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg" required />
                </div>
                <input type="email" name="email" placeholder="Enter your work email" onChange={handleInputChange} className="w-full p-3 mb-3 border border-gray-300 rounded-lg" required />
                <input type="password" name="password" placeholder="Password" onChange={handleInputChange} className="w-full p-3 mb-3 border border-gray-300 rounded-lg" required />
                <input type="password" name="rePassword" placeholder="Re-enter password" onChange={handleInputChange} className="w-full p-3 mb-3 border border-gray-300 rounded-lg" required />
                
                {authError && <p className="text-red-500 text-sm mb-3">{authError}</p>}
                
                <button type="submit" disabled={loading} className="w-full bg-brand-primary text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors mt-1 disabled:opacity-50">
                  {loading ? 'Creating...' : 'Create Account'}
                </button>
              </form>
            </div>
          </>
        );

      // UPDATED: The full login form UI
      case 'login':
        return (
          <>
            <div className="mb-10 text-center">
              <h1 className="font-serif text-4xl md:text-5xl text-brand-text mb-2">
                Welcome<br />Back.
              </h1>
              <p className="text-base text-brand-text">Log in to continue your journey.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                 <button onClick={signInWithGoogle} disabled={loading} className="w-full flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-lg text-brand-text font-semibold hover:bg-gray-50 transition-colors mb-4 disabled:opacity-50">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 mr-3" />
                    Continue with Google
                </button>
                <div className="text-center text-gray-400 my-4">OR</div>
                <form onSubmit={handleLogin}>
                    <input type="email" name="email" placeholder="Enter your email" onChange={handleInputChange} className="w-full p-3 mb-4 border border-gray-300 rounded-lg" required />
                    <input type="password" name="password" placeholder="Enter your password" onChange={handleInputChange} className="w-full p-3 mb-4 border border-gray-300 rounded-lg" required />
                    
                    {authError && <p className="text-red-500 text-sm mb-3">{authError}</p>}

                    <button type="submit" disabled={loading} className="w-full bg-brand-primary text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                        {loading ? 'Logging in...' : 'Continue with email'}
                    </button>
                </form>
                <p className="text-sm text-center text-brand-muted mt-6">
                  Don't have an account?{' '}
                  <button onClick={() => setAuthState('register')} className="font-semibold text-blue-600 hover:underline">
                    Register here
                  </button>
                </p>
            </div>
          </>
        );

      case 'confirmation':
        // ... (no changes needed here)
        return (
          <div className="text-center w-full max-w-md">
            <h2 className="font-serif text-4xl mb-4">Check Your Inbox</h2>
            <p className="text-lg text-brand-muted mb-6">A confirmation link has been sent to your email.</p>
            <button
              onClick={() => setAuthState('login')}
              className="text-blue-600 hover:underline font-semibold"
            >
              Proceed to Login Page
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <header className="w-full flex items-center justify-center mb-10">
        <DummyLogo />
        <span className="font-bold text-3xl ml-4 text-brand-text">Arelia</span>
      </header>
      <main className="flex flex-col items-center justify-center w-full">
        {renderContent()}
      </main>
    </div>
  );
};

export default LeftPanel;