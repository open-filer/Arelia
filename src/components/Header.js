// src/components/Header.js

import React from 'react';
// We use a popular icon library called Lucide React.
// If you don't have it, install it by running: npm install lucide-react
import { Bell, User } from 'lucide-react';

const Header = ({ user }) => {
  // We get the 'user' object from the session, passed down as a prop.
  // This line safely gets the user's full name if they provided it,
  // otherwise, it falls back to their email address.
  const displayName = user.user_metadata?.name || user.email;

  return (
    <header className="flex items-center justify-end p-4 border-b border-gray-200 bg-white/30 backdrop-blur-sm">
      <div className="flex items-center space-x-4">
        {/* Notification Icon */}
        <button className="p-2 rounded-full hover:bg-gray-200 transition-colors">
          <Bell size={20} />
        </button>
        
        {/* User Profile Bubble */}
        <div className="flex items-center space-x-2 p-2 rounded-full border border-gray-200">
          <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
             <User size={16} />
          </div>
          <span className="text-sm font-medium pr-2">{displayName}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;```

---

### **Step 2: The Sidebar (`Sidebar.js`)**

**Purpose:** This is the main navigation panel on the left. It displays the "Arelia" brand name and contains the buttons that allow the user to switch between different views (like "Embassy contact", "Medical facility", etc.).

Create a new file at `src/components/Sidebar.js`:

```javascript
// src/components/Sidebar.js

import React from 'react';
import { supabase } from '../supabaseClient'; // Import supabase for the sign out button

const Sidebar = ({ setActiveView }) => {
  // This is a list of our navigation items. It makes the code clean and easy to update.
  const navItems = [
    { id: 'embassy', label: 'Embassy contact' },
    { id: 'medical', label: 'Medical facility' },
    { id: 'currency', label: 'Currency exchange' },
    { id: 'trip', label: 'Trip detail' },
  ];

  return (
    <aside className="w-64 p-6 border-r border-gray-200 bg-white/30 backdrop-blur-sm flex-shrink-0 flex flex-col">
      <div className="font-serif text-3xl font-bold mb-12">Arelia</div>
      <nav className="flex-grow">
        <ul>
          {/* We add a main link for the checklist/dashboard home */}
          <li>
            <button
              // When clicked, it calls the function passed from the parent component
              // to change the view to 'checklist'.
              onClick={() => setActiveView('checklist')}
              className="w-full text-left py-2 px-3 mb-2 text-gray-700 hover:bg-gray-200 rounded-md transition-colors"
            >
              Pre-Trip Checklist
            </button>
          </li>

          {/* We loop over our navItems array to create a button for each one */}
          {navItems.map(item => (
            <li key={item.id}>
              <button
                onClick={() => setActiveView(item.id)}
                className="w-full text-left py-2 px-3 mb-2 text-gray-700 hover:bg-gray-200 rounded-md transition-colors"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* This div pushes the sign out button to the bottom */}
      <div className="mt-auto">
        <button 
            onClick={() => supabase.auth.signOut()}
            className="w-full text-left py-2 px-3 text-gray-700 hover:bg-red-100 hover:text-red-600 rounded-md transition-colors"
        >
            Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;