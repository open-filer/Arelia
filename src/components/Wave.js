import React from 'react';

const Wave = () => (
  <div className="absolute bottom-0 left-0 w-full h-[320px] overflow-hidden pointer-events-none">
    
    <div className="absolute bottom-0 left-0 w-[200%] h-full flex animate-wave-slow">
      <svg className="w-1/2 h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 320">
        <path fill="#FFD200" fillOpacity="0.3" d="M0,160L48,181.3C96,203,192,245,288,240C384,235,480,181,576,149.3C672,117,768,107,864,128C960,149,1056,203,1152,208C1248,213,1344,171,1392,149.3L1440,128L1440,320L0,320Z"></path>
      </svg>
      <svg className="w-1/2 h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 320">
        <path fill="#FFD200" fillOpacity="0.3" d="M0,160L48,181.3C96,203,192,245,288,240C384,235,480,181,576,149.3C672,117,768,107,864,128C960,149,1056,203,1152,208C1248,213,1344,171,1392,149.3L1440,128L1440,320L0,320Z"></path>
      </svg>
    </div>

    <div className="absolute bottom-0 left-0 w-[200%] h-full flex animate-wave-fast">
      <svg className="w-1/2 h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 320">
        <path fill="#FFD200" fillOpacity="0.5" d="M0,224L60,208C120,192,240,160,360,170.7C480,181,600,235,720,229.3C840,224,960,160,1080,149.3C1200,139,1320,181,1380,202.7L1440,224L1440,320L0,320Z"></path>
      </svg>
      <svg className="w-1/2 h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 320">
        <path fill="#FFD200" fillOpacity="0.5" d="M0,224L60,208C120,192,240,160,360,170.7C480,181,600,235,720,229.3C840,224,960,160,1080,149.3C1200,139,1320,181,1380,202.7L1440,224L1440,320L0,320Z"></path>
      </svg>
    </div>

  </div>
);

export default Wave;