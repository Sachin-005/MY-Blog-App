import { FaUserAstronaut, FaLaptopCode, FaRegComments, FaRocket } from 'react-icons/fa';
import { BsStars } from 'react-icons/bs';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-[rgb(16,23,42)] dark:via-slate-900 dark:to-indigo-950 transition-colors duration-500">
      {/* Hero Section */}
      <div className="relative w-full flex flex-col items-center pt-16 pb-8">
        <BsStars className="absolute top-8 left-8 text-indigo-300 dark:text-indigo-700 animate-pulse text-4xl" />
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-fadeIn mb-4 text-center drop-shadow-lg">
          About Sachin's Blog
        </h1>
        <br/>
        <p className="max-w-xl text-lg text-gray-600 dark:text-gray-300 text-center mb-8 animate-fadeIn delay-100">
          Welcome to Sachin's Blog! Created by <span className="font-semibold text-indigo-600 dark:text-indigo-400">Sachin</span>, this is a space for passionate developers and curious minds to explore technology, coding, and creative ideas together.
        </p>
        {/* Floating Card */}
        <div className="relative z-10 bg-white/80 dark:bg-slate-800/80 rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto backdrop-blur-md border border-indigo-100 dark:border-slate-700 animate-floatUp">
          <div className="flex flex-col gap-6 text-gray-700 dark:text-gray-200 text-md">
            <div className="flex items-center gap-3">
              <FaUserAstronaut className="text-2xl text-pink-500 animate-bounce" />
              <span>
                <b>Sachin</b> is a passionate developer who loves to share knowledge and inspire others through writing.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <FaLaptopCode className="text-2xl text-indigo-500 animate-pulse" />
              <span>
                Weekly articles & tutorials on <b>web development</b>, <b>software engineering</b>, and <b>programming languages</b>.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <FaRegComments className="text-2xl text-purple-500 animate-bounce" />
              <span>
                Join the conversation! <b>Comment</b>, <b>like</b>, and <b>reply</b> to connect with our learning community.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <FaRocket className="text-2xl text-teal-500 animate-pulse" />
              <span>
                Always exploring new tech—check back often for fresh content and innovative ideas!
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Fun Facts / Timeline Section */}
      <div className="w-full max-w-3xl mt-12 mb-8 px-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-600 dark:text-indigo-400 animate-fadeInUp">Fun Facts & Milestones</h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          <div className="flex-1 flex flex-col items-center animate-fadeInUp delay-100">
            <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-indigo-500">100+</span>
            <span className="text-gray-500 dark:text-gray-400">Articles Published</span>
          </div>
          <div className="flex-1 flex flex-col items-center animate-fadeInUp delay-200">
            <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">500+</span>
            <span className="text-gray-500 dark:text-gray-400">Community Comments</span>
          </div>
          <div className="flex-1 flex flex-col items-center animate-fadeInUp delay-300">
            <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-pink-500">∞</span>
            <span className="text-gray-500 dark:text-gray-400">Ideas Shared</span>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="flex flex-col items-center mb-16 animate-fadeInUp delay-500">
        <p className="text-lg text-center text-gray-700 dark:text-gray-200 mb-4">Ready to join the journey?</p>
        <a
          href="/sign-up"
          className="px-8 py-3 rounded-full font-bold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800 animate-glow"
        >
          Get Started
        </a>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes floatUp {
          0% { opacity: 0; transform: translateY(40px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-floatUp {
          animation: floatUp 1.1s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 1.2s both;
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 1.2s both;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-500 { animation-delay: 0.5s; }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 16px 4px #a78bfa44, 0 0 32px 8px #f472b644; }
          50% { box-shadow: 0 0 32px 8px #6366f144, 0 0 48px 12px #f472b644; }
        }
        .animate-glow {
          animation: glow 2.5s infinite alternate;
        }
      `}</style>
    </div>
  );
}