import React from 'react';

const AreliaLogoIcon = () => (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_27_211)"><path fillRule="evenodd" clipRule="evenodd" d="M47.5238 0.239044H96.9296L119.761 30.1829V59.3656L88.82 18.0024H54.3858L23.9438 48.327L43.7808 74.0837H52.0152L70.6047 56.9548L82.3324 70.2774L58.2533 91.7202H34.9228L0.36377 46.9312L47.5238 0.239044Z" fill="url(#paint0_radial_27_211)"/><path fillRule="evenodd" clipRule="evenodd" d="M50.0192 62.7913L68.7334 45.7893H76.843L96.4307 71.673L65.864 101.871H31.9288L0.239258 60V89.0558L23.3202 119.761H73.3499L119.512 73.7032V72.5613L85.4517 28.026L61.4973 28.4065L38.0421 49.5959L50.0192 62.7913Z" fill="url(#paint1_radial_27_211)"/><path fillRule="evenodd" clipRule="evenodd" d="M47.5238 0.239044H96.9296L119.761 30.1829V59.3656L88.82 18.0024H54.3858L23.9438 48.327L43.7808 74.0837H52.0152L70.6047 56.9548L82.3324 70.2774L58.2533 91.7202H34.9228L0.36377 46.9312L47.5238 0.239044Z" stroke="black"/><path fillRule="evenodd" clipRule="evenodd" d="M50.0192 62.7913L68.7334 45.7893H76.843L96.4307 71.673L65.864 101.871H31.9288L0.239258 60V89.0558L23.3202 119.761H73.3499L119.512 73.7032V72.5613L85.4517 28.026L61.4973 28.4065L38.0421 49.5959L50.0192 62.7913Z" stroke="black"/></g>
      <defs><radialGradient id="paint0_radial_27_211" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(60.0623 45.9796) rotate(90) scale(45.7406 59.6986)"><stop stopColor="#FF7228"/><stop offset="1" stopColor="#FFC006"/></radialGradient><radialGradient id="paint1_radial_27_211" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(59.8754 73.8935) rotate(90) scale(45.8675 59.6362)"><stop stopColor="#FF7228"/><stop offset="1" stopColor="#FFC006"/></radialGradient><clipPath id="clip0_27_211"><rect width="120" height="120" fill="white"/></clipPath></defs>
    </svg>
);


const Onboarding = ({ onNext }) => {
  return (
    <div className="relative w-full h-screen bg-gray-100 overflow-hidden flex items-center justify-center">
      
      <div className="absolute w-1/2 h-1/2 bg-yellow-300 rounded-full top-0 left-0 filter blur-3xl opacity-40"></div>
      <div className="absolute w-1/2 h-1/2 bg-orange-400 rounded-full bottom-0 right-0 filter blur-3xl opacity-40"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center p-8">
        
        <div className="flex items-center justify-center mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="transition-transform duration-300 hover:rotate-6">
            <AreliaLogoIcon />
          </div>
          <h1 
            className="ml-8 font-playfair font-bold text-black text-9xl"
          >
            Arelia
          </h1>
        </div>

        <div className="bg-white/40 backdrop-blur-md rounded-3xl p-8 mb-16 text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <p className="font-poppins text-black text-2xl font-semibold">
            Welcome to Arelia!
          </p>
          <p className="font-poppins text-black/80 text-lg mt-2">
            Let's get you set up for a safe trip.
          </p>
        </div>

        <button 
          onClick={onNext}
          className="animate-pulse-slow rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-poppins font-semibold text-xl px-12 py-5 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-red-500/50"
        >
          <span className="mr-3">🚀</span>
          Start Your Journey
        </button>

      </div>
    </div>
  );
};

export default Onboarding;