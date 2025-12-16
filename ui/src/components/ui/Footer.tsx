// Footer.tsx
import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Column 1: About */}
          <div>
            <h3 className="text-white font-semibold mb-4">About AF4</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/about" className="hover:text-pink-500 transition">
                  Our Story
                </a>
              </li>
              <li>
                <a href="/careers" className="hover:text-pink-500 transition">
                  Careers
                </a>
              </li>
              <li>
                <a href="/press" className="hover:text-pink-500 transition">
                  Press
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-pink-500 transition">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/help" className="hover:text-pink-500 transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/safety" className="hover:text-pink-500 transition">
                  Safety Tips
                </a>
              </li>
              <li>
                <a href="/community" className="hover:text-pink-500 transition">
                  Community Guidelines
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-pink-500 transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/terms" className="hover:text-pink-500 transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-pink-500 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/cookies" className="hover:text-pink-500 transition">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="/licenses" className="hover:text-pink-500 transition">
                  Licenses
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Download */}
          <div>
            <h3 className="text-white font-semibold mb-4">Download AF4</h3>
            <p className="text-sm mb-6">Get the app and start connecting today!</p>
            <div className="flex flex-col gap-4">
              <a
                href="#"
                className="bg-black px-5 py-3 rounded-lg text-white font-medium text-center hover:bg-gray-800 transition text-sm"
              >
                App Store
              </a>
              <a
                href="#"
                className="bg-black px-5 py-3 rounded-lg text-white font-medium text-center hover:bg-gray-800 transition text-sm"
              >
                Google Play
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {new Date().getFullYear()} AF4 Dating App. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-pink-500 transition">
              Instagram
            </a>
            <a href="#" className="hover:text-pink-500 transition">
              Twitter
            </a>
            <a href="#" className="hover:text-pink-500 transition">
              Facebook
            </a>
            <a href="#" className="hover:text-pink-500 transition">
              TikTok
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
