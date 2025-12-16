import React from "react";

export const HeroSection: React.FC = () => {
  return (
    <div>
      <section className="relative min-h-screen flex items-center justify-center bg-linear-to-br from-pink-500 via-red-500 to-orange-500 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Find Your Perfect Match on AF4</h1>
          <p className="text-xl md:text-2xl text-white mb-10">
            Connect with like-minded adults for fun, flings, friendships, or something more serious. Join the hottest
            dating community today!
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="#download"
              className="px-10 py-4 bg-white text-pink-600 font-semibold text-lg rounded-full shadow-lg hover:bg-gray-100 transition transform hover:scale-105"
            >
              Download the App
            </a>
            <a
              href="#signup"
              className="px-10 py-4 bg-transparent border-2 border-white text-white font-semibold text-lg rounded-full hover:bg-white hover:text-pink-600 transition transform hover:scale-105"
            >
              Sign Up Free
            </a>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-300"></div>
      </section>
    </div>
  );
};
