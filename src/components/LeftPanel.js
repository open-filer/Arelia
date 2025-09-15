import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

// The AreliaLogo component using your provided SVG code.
// The classes have been replaced with Tailwind CSS utilities for styling.
const AreliaLogo = () => (
    <svg className="w-10 h-10" viewBox="0 0 502 502" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M198.808 1H405.489L501 126.265V248.346L371.564 75.31H227.514L100.165 202.168L183.15 309.917H217.597L295.363 238.261L344.424 293.994L243.693 383.696H146.094L1.52192 196.329L198.808 1Z" className="fill-arelia-gold"></path>
        <path fillRule="evenodd" clipRule="evenodd" d="M209.246 262.677L287.534 191.552H321.459L403.401 299.832L275.53 426.159H133.568L1 251V372.55L97.5553 501H306.846L499.956 308.325V303.548L357.472 117.242L257.263 118.834L159.142 207.476L209.246 262.677Z" className="fill-arelia-gold"></path>
        <path fillRule="evenodd" clipRule="evenodd" d="M198.808 1H405.489L501 126.265V248.346L371.564 75.31H227.514L100.165 202.168L183.15 309.917H217.597L295.363 238.261L344.424 293.994L243.693 383.696H146.094L1.52192 196.329L198.808 1Z" className="stroke-arelia-dark" strokeWidth="4"></path>
        <path fillRule="evenodd" clipRule="evenodd" d="M209.246 262.677L287.534 191.552H321.459L403.401 299.832L275.53 426.159H133.568L1 251V372.55L97.5553 501H306.846L499.956 308.325V303.548L357.472 117.242L257.263 118.834L159.142 207.476L209.246 262.677Z" className="stroke-arelia-dark" strokeWidth="4"></path>
  </svg>
);

const LeftPanel = ({ authState, setAuthState }) => {
  const [formData, setFormData] = useState({
    name: '', gender: '', age: '', email: '', password: '', rePassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const handleInputChange = (e) => {
    setAuthError('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const signInWithGoogle = async () => {
    setLoading(true);
    setAuthError('');
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) {
      setAuthError(error.message);
      setLoading(false);
    }
  };

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
    setLoading(false);
  };

  const renderFormContent = () => {
    if (authState === 'register') {
      return (
        <form onSubmit={handleRegister} className="space-y-4">
          <input name="name" onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg focus:border-arelia-gold focus:ring-0" placeholder="Full Name" required />
          <div className="grid grid-cols-2 gap-4">
            <select name="gender" onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg focus:border-arelia-gold focus:ring-0" required>
              <option value="">Gender</option><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option>
            </select>
            <input type="number" name="age" onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg focus:border-arelia-gold focus:ring-0" placeholder="Age" required />
          </div>
          <input type="email" name="email" onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg focus:border-arelia-gold focus:ring-0" placeholder="Email Address" required />
          <input type="password" name="password" onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg focus:border-arelia-gold focus:ring-0" placeholder="Password" required />
          <input type="password" name="rePassword" onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg focus:border-arelia-gold focus:ring-0" placeholder="Re-enter Password" required />
          {authError && <p className="text-red-500 text-sm">{authError}</p>}
          <button type="submit" disabled={loading} className="w-full bg-arelia-gold text-arelia-dark font-bold py-3 rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50">
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>
      );
    }
    if (authState === 'login') {
      return (
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" name="email" onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg focus:border-arelia-gold focus:ring-0" placeholder="Email Address" required />
          <input type="password" name="password" onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg focus:border-arelia-gold focus:ring-0" placeholder="Password" required />
          {authError && <p className="text-red-500 text-sm">{authError}</p>}
          <button type="submit" disabled={loading} className="w-full bg-arelia-gold text-arelia-dark font-bold py-3 rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      );
    }
    if (authState === 'confirmation') {
      return (
        <div className="text-center">
            <h2 className="text-2xl font-bold text-arelia-dark mb-4">Check Your Inbox</h2>
            <p className="text-gray-500 mb-6">A confirmation link has been sent to your email.</p>
            <button onClick={() => setAuthState('login')} className="font-bold text-arelia-gold hover:underline">
                Proceed to Login
            </button>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="w-full max-w-md">
        <div className="flex items-center space-x-4 mb-5"> 
            <AreliaLogo />
            <span className="font-playfair text-4xl font-bold text-arelia-dark">Arelia</span>
        </div>
        
        {authState !== 'confirmation' && (
          <>
            <h1 className="text-3xl font-bold text-arelia-dark leading-tight">
                {authState === 'register' ? 'Create Your Account' : 'Welcome Back'}
            </h1>
            <p className="text-gray-500 mt-2 mb-4">
                {authState === 'register' ? 'Begin your journey with confidence.' : 'Log in to continue your journey.'}
            </p>
            <p className="text-sm text-gray-500 mb-5"> 
                {authState === 'register' ? 'Already have an account? ' : "Don't have an account? "}
                <button onClick={() => setAuthState(authState === 'register' ? 'login' : 'register')} className="font-bold text-arelia-gold hover:underline">
                    {authState === 'register' ? 'Login here' : 'Register here'}
                </button>
            </p>
          </>
        )}

        <div className="w-full bg-white p-6 rounded-2xl border border-gray-200 shadow-sm"> 
            { authState !== 'confirmation' && (
                <>
                    <button onClick={signInWithGoogle} disabled={loading} className="w-full flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-lg text-arelia-dark font-semibold hover:bg-gray-50 transition-colors mb-4 disabled:opacity-50">
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 mr-3" />
                        Continue with Google
                    </button>
                    <div className="text-center text-gray-400 my-3 text-sm">OR</div> 
                </>
            )}
            {renderFormContent()}
        </div>
    </div>
  );
};

export default LeftPanel;