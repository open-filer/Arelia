import React, { useState, useEffect } from 'react';

const slidesData = [
    {
        bubble1: "I'm thinking through our user data and want to identify any patterns.",
        bubble2: "I found some trends and started a report. Thoughts?",
        report: {
          title: "Customer Insights Report",
          description: "This report provides an analysis of customer feedback across various segments and time periods. The data presented offers insights into our current performance and customer satisfaction levels.",
          stats: { Users: "23,000", "NPS score": 80, Projects: 45, Notes: 465 },
          trend: {
            title: "Trend: Users are creating more notes",
            description: "The graph shows a clear upward trend in note creation over time. Starting from approximately 50 notes at the beginning of the observed period, it has increased to nearly 300 by the end.",
          },
        },
      },
      {
        bubble1: "Can you draft a marketing email for our new feature launch?",
        bubble2: "Here is a draft targeting enterprise customers. How does it look?",
        report: {
          title: "Q3 Marketing Campaign Draft",
          description: "This document outlines the email marketing strategy for the upcoming 'Project Phoenix' feature release. It includes target segments, key messaging, and A/B testing variables.",
          stats: { "Open Rate": "25%", "CTR": "4.5%", "Audience": "15,500", "Segments": 3 },
          trend: {
            title: "Focus: Highlighting Collaboration",
            description: "The primary angle of the campaign is to emphasize the new real-time collaboration tools, which was the most requested feature in our last user survey.",
          },
        },
      },
      {
        bubble1: "Summarize the attached quarterly earnings call transcript.",
        bubble2: "Done. The key takeaway is a 15% YoY revenue growth, driven by our new subscription model.",
        report: {
          title: "Q2 Financial Summary",
          description: "An AI-generated summary of the second quarter's financial performance, highlighting key metrics and management commentary from the public earnings call.",
          stats: { Revenue: "$5.2M", "Growth": "15% YoY", "Net Profit": "$1.2M", "MRR": "$450K" },
          trend: {
            title: "Insight: Enterprise Tier Adoption",
            description: "A significant portion of the growth is attributed to the successful adoption of our new Enterprise pricing tier, which has exceeded initial projections by 30%.",
          },
        },
      },
      {
        bubble1: "Let's brainstorm some ideas for our team offsite.",
        bubble2: "I've generated a list of potential locations and activities based on team size and budget.",
        report: {
          title: "Team Offsite Brainstorm",
          description: "A collaborative document containing suggestions for the annual team offsite event. Includes logistics, creative themes, and team-building exercise ideas.",
          stats: { Attendees: 32, Budget: "$15,000", Duration: "3 Days", "Locations": 5 },
          trend: {
            title: "Preference: Skill-building Workshops",
            description: "Initial team feedback indicates a strong preference for an offsite that includes optional skill-building workshops over purely social or relaxation activities.",
          },
        },
      },
];

const DemoPanel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true); 
      setTimeout(() => {
        setActiveSlide((prev) => (prev + 1) % slidesData.length);
        setIsFading(false); 
      }, 500); // This duration should match the transition duration
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const currentSlide = slidesData[activeSlide];
  const animationClasses = `transition-opacity duration-500 ease-in-out ${
    isFading ? 'opacity-0' : 'opacity-100'
  }`;

  return (
    <div className="w-full max-w-xl">
      <div className={animationClasses}>
        {/* Chat Bubbles */}
        <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm mb-4 max-w-md ml-auto">
          <p className="flex items-center text-sm">
            <span role="img" aria-label="user icon" className="mr-3 text-lg">🤔</span>
            {currentSlide.bubble1}
          </p>
        </div>
        <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm mb-6 max-w-md">
          <p className="text-sm">{currentSlide.bubble2}</p>
        </div>

        {/* Report Card */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h3 className="font-serif text-2xl font-semibold mb-2">{currentSlide.report.title}</h3>
          <p className="text-brand-muted text-sm mb-6">{currentSlide.report.description}</p>

          <div className="mb-6">
            <h4 className="font-bold mb-3">Overview</h4>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-center">
              {Object.entries(currentSlide.report.stats).map(([key, value]) => (
                <div className="bg-gray-100 p-3 rounded-lg" key={key}>
                  <div className="text-xs text-gray-500">{key}</div>
                  <div className="text-xl font-bold">{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-2">{currentSlide.report.trend.title}</h4>
            <p className="text-brand-muted text-sm">{currentSlide.report.trend.description}</p>
          </div>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        {slidesData.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              activeSlide === index ? 'bg-gray-700' : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default DemoPanel;