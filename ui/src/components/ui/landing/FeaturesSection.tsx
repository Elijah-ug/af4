import React from "react";

export const FeaturesSection: React.FC = () => {
  return (
    <div>
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">Why Choose AF4?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-pink-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                🔥
              </div>
              <h3 className="text-2xl font-semibold mb-4">Real Connections</h3>
              <p className="text-gray-600">
                Meet genuine adults looking for casual fun, hookups, or meaningful relationships.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-red-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                💬
              </div>
              <h3 className="text-2xl font-semibold mb-4">Private Chats</h3>
              <p className="text-gray-600">Secure messaging and live chats to spark chemistry instantly.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                🌍
              </div>
              <h3 className="text-2xl font-semibold mb-4">Local & Global</h3>
              <p className="text-gray-600">Find matches nearby or connect with people worldwide.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
