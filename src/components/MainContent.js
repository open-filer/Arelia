// src/components/MainContent.js

import React from 'react';
import { ListChecks, CheckCircle2 } from 'lucide-react';

// This is a placeholder component for the checklist view.
// In the future, you will create similar components for each view (e.g., Embassy, Medical).
const Checklist = () => {
  const items = [
    "Verify Passport and Visa Requirements",
    "Share Trip Details with an Emergency Contact",
    "Add Embassy Contact Information",
    "Download Offline Maps",
    "Set up Panic Word Activation",
    "Review Local Laws and Customs",
  ];

  return (
    <div className="bg-white/50 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-gray-200 max-w-md">
      <div className="flex items-center mb-4">
        <ListChecks size={24} className="mr-3" />
        <h2 className="text-2xl font-semibold">Pre-Trip Checklist</h2>
      </div>
      <ul>
        {items.map((item, index) => (
          <li key={index} className="flex items-center py-2 text-gray-600">
            <CheckCircle2 size={20} className="mr-4 text-gray-300" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// This is the main component that acts as a router for our content.
const MainContent = ({ activeView }) => {
  // This function decides which component to show based on the 'activeView' prop.
  const renderView = () => {
    switch (activeView) {
      case 'checklist':
        return <Checklist />;
      case 'embassy':
        return <div className="text-xl font-semibold">Embassy Contact Page</div>;
      case 'medical':
        return <div className="text-xl font-semibold">Medical Facility Finder Page</div>;
      case 'currency':
        return <div className="text-xl font-semibold">Currency Exchange Page</div>;
      case 'trip':
        return <div className="text-xl font-semibold">Trip Details Page</div>;
      default:
        // By default, we show the checklist.
        return <Checklist />;
    }
  };

  return (
    <main className="flex-grow p-10 overflow-auto">
      {/* We call the renderView function here to display the chosen component */}
      {renderView()}
    </main>
  );
};

export default MainContent;