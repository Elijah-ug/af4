import React from "react";

export const Testimonials: React.FC = () => {
  return (
    <div>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-gray-100 p-8 rounded-2xl shadow-md">
              <p className="text-gray-700 italic mb-6">
                "Finally found someone who gets me! Best app for real hookups."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-pink-300 rounded-full"></div>
                <p className="ml-4 font-semibold">Alex, 28</p>
              </div>
            </div>
            <div className="bg-gray-100 p-8 rounded-2xl shadow-md">
              <p className="text-gray-700 italic mb-6">"So many fun chats and dates. Highly recommend!"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-red-300 rounded-full"></div>
                <p className="ml-4 font-semibold">Jamie, 32</p>
              </div>
            </div>
            <div className="bg-gray-100 p-8 rounded-2xl shadow-md">
              <p className="text-gray-700 italic mb-6">"Easy to use and tons of active users. Game changer!"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-300 rounded-full"></div>
                <p className="ml-4 font-semibold">Taylor, 25</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
