// src/components/LeftPanel.js
import React, { useState } from 'react';
import { supabase } from '../supabaseClient'; // NEW: Import the Supabase client
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
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false); // NEW: Add loading state for buttons

  // ... (handleInputChange is the same)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  // NEW: Function to handle Google Sign-In
  async function signInWithGoogle() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) {
      alert(error.message);
      setLoading(false);
    }
  }

  // UPDATED: Function to handle Email/Password Sign-Up
  const handleRegister = async (e) => {
    e.preventDefault();
    setPasswordError('');

    if (formData.password !== formData.rePassword) {
      setPasswordError('Passwords do not match.');
      return;
    }
    
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        // You can store extra data here in the user's metadata
        data: {
          name: formData.name,
          gender: formData.gender,
          age: formData.age,
        }
      }
    });

    if (error) {
      alert(error.message);
    } else {
      // If sign up is successful, Supabase sends a confirmation email.
      // We can switch the view to the confirmation message.
      setAuthState('confirmation');
    }
    setLoading(false);
  };

  // ... (handleLogin can be updated later if needed)
  const handleLogin = (e) => { e.preventDefault(); };

  // ... (The renderContent function is mostly the same, just adding the onClick and disabled states)
  const renderContent = () => {
    switch (authState) {
      case 'register':
        return (
          <>
            <div className="mb-10 text-center">
              <h1 className="font-serif text-4xl md:text-5xl text-brand-text mb-2">
                Begin. <br /> Belong.
              </h1>
              <p className="text-base text-brand-text">The AI for creative explorers</p>
            </div>
            
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-md">
              {/* UPDATED: Added onClick and disabled props */}
              <button 
                onClick={signInWithGoogle} 
                disabled={loading}
                className="w-full flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-lg text-brand-text font-semibold hover:bg-gray-50 transition-colors mb-4 disabled:opacity-50"
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 mr-3" />
                Continue with Google
              </button>
              <div className="text-center text-gray-400 my-3">OR</div>
              <form onSubmit={handleRegister}>
                {/* ... (all your input fields are the same) ... */}
                <input type="text" name="name" placeholder="Enter your name" onChange={handleInputChange} className="w-full p-3 mb-3 border border-gray-300 rounded-lg" required />
                <div className="grid grid-cols-2 gap-3 mb-3" >
                    <select name="gender" onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg" required>
                        <option value="male">Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    <input type="number" name="age" placeholder="Age" onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg" required />
                </div>
                <input type="email" name="email" placeholder="Enter your work email" onChange={handleInputChange} className="w-full p-3 mb-3 border border-gray-300 rounded-lg" required />
                <input type="password" name="password" placeholder="Password" onChange={handleInputChange} className="w-full p-3 mb-3 border border-gray-300 rounded-lg" required />
                <input type="password" name="rePassword" placeholder="Re-enter password" onChange={handleInputChange} className="w-full p-3 mb-3 border border-gray-300 rounded-lg" required />
                
                {passwordError && <p className="text-red-500 text-sm mb-3">{passwordError}</p>}
                
                {/* UPDATED: Added disabled prop */}
                <button type="submit" disabled={loading} className="w-full bg-brand-primary text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors mt-1 disabled:opacity-50">
                  {loading ? 'Creating...' : 'Create Account'}
                </button>
              </form>
            </div>
          </>
        );
      // ... other cases are unchanged ...
      case 'confirmation':
        return (
          <div className="text-center w-full max-w-md">
            <h2 className="font-serif text-4xl mb-4">Check Your Inbox</h2>
            <p className="text-lg text-brand-muted mb-6">A confirmation link has been sent to your email.</p>
            <button
              onClick={() => setAuthState('login')} // You might want to build out the login page next
              className="text-blue-600 hover:underline font-semibold"
            >
              Proceed to Login Page
            </button>
          </div>
        );
      case 'login':
        return ( <div>Login Form Here...</div> ) // Placeholder for your login UI
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