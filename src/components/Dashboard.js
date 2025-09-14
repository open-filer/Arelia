import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Bell, User, } from 'lucide-react';

const Header = ({ user }) => {
  const displayName = user.user_metadata?.name || user.email;
  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-200 bg-white/30 backdrop-blur-sm">
      <div></div>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-200 transition-colors"><Bell size={20} /></button>
        <div className="flex items-center space-x-2 p-2 rounded-full border border-gray-200">
          <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center"><User size={16} /></div>
          <span className="text-sm font-medium pr-2">{displayName}</span>
        </div>
      </div>
    </header>
  );
};

const Sidebar = ({ setActiveView }) => {
  const navItems = [
    { id: 'embassy', label: 'Embassy contact' },
    { id: 'medical', label: 'Medical facility' },
    { id: 'currency', label: 'Currency exchange' },
    { id: 'trip', label: 'Trip detail' },
  ];
  return (
    <aside className="w-64 p-6 border-r border-gray-200 bg-white/30 backdrop-blur-sm flex-shrink-0">
      <div className="font-serif text-3xl font-bold mb-12">Arelia</div>
      <nav>
        <ul>
          <li><button onClick={() => setActiveView('checklist')} className="w-full text-left py-2 px-3 mb-2 text-gray-700 hover:bg-gray-200 rounded-md transition-colors">Pre-Trip Checklist</button></li>
          {navItems.map(item => (
            <li key={item.id}><button onClick={() => setActiveView(item.id)} className="w-full text-left py-2 px-3 mb-2 text-gray-700 hover:bg-gray-200 rounded-md transition-colors">{item.label}</button></li>
          ))}
        </ul>
      </nav>
       <div className="mt-auto">
         <button onClick={() => supabase.auth.signOut()} className="w-full text-left py-2 px-3 mt-12 text-red-500 hover:bg-red-100 rounded-md transition-colors">Sign Out</button>
       </div>
    </aside>
  );
};

const Checklist = () => {
    return <div className="p-6">Pre-Trip Checklist Content...</div>
};

const MainContent = ({ activeView }) => {
  const renderView = () => {
    switch (activeView) {
      case 'checklist': return <Checklist />;
      case 'embassy': return <div>Embassy Contact Information...</div>;
      // ... other cases
      default: return <Checklist />;
    }
  };
  return <main className="flex-grow p-10 overflow-auto">{renderView()}</main>;
};

function Dashboard({ session }) {
  const [activeView, setActiveView] = useState('checklist'); 

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute w-96 h-96 bg-yellow-300 rounded-full filter blur-3xl opacity-30 animate-pulse" style={{ top: '10%', left: '40%' }}></div>
        <div className="absolute w-96 h-96 bg-orange-300 rounded-full filter blur-3xl opacity-30 animate-pulse animation-delay-4000" style={{ bottom: '10%', left: '20%' }}></div>
      </div>
      
      <div className="relative flex flex-grow z-10">
        <Sidebar setActiveView={setActiveView} />
        <div className="flex flex-col flex-grow">
          <Header user={session.user} />
          <MainContent activeView={activeView} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;