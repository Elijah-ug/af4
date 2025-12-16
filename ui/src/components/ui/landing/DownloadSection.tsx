import type React from "react";

export const DownloadSection: React.FC = () => {
  return (
    <div>
      <section id="download" className="py-20 bg-linear-to-r from-pink-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Dive In?</h2>
          <p className="text-xl mb-12">Download AF4 now and start connecting today!</p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <a href="#" className="bg-black px-8 py-4 rounded-lg text-white font-semibold hover:bg-gray-800 transition">
              <span className="block text-sm">Download on</span>
              <span className="block text-2xl">App Store</span>
            </a>
            <a href="#" className="bg-black px-8 py-4 rounded-lg text-white font-semibold hover:bg-gray-800 transition">
              <span className="block text-sm">Get it on</span>
              <span className="block text-2xl">Google Play</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
