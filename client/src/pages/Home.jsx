import { FaLaptopCode, FaRegNewspaper, FaUsers } from 'react-icons/fa';
import { BsStars } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-[rgb(16,23,42)] dark:via-slate-900 dark:to-indigo-950 transition-colors duration-500">
      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center pt-20 pb-10 px-4">
        <BsStars className="absolute top-8 left-8 text-indigo-300 dark:text-indigo-700 animate-pulse text-4xl" />
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-fadeIn mb-4 text-center drop-shadow-lg">
          Welcome to Sachin's Blog
        </h1>
        <p className="max-w-2xl text-lg text-gray-600 dark:text-gray-300 text-center mb-8 animate-fadeIn delay-100">
          Discover a world of <span className="font-semibold text-indigo-600 dark:text-indigo-400">technology</span>, <span className="font-semibold text-pink-500">coding</span>, and <span className="font-semibold text-purple-500">creative ideas</span>. Dive into articles, tutorials, and resources designed to help you grow as a developer and thinker.
        </p>
        {/* Floating Card */}
        <div className="relative z-10 bg-white/80 dark:bg-slate-800/80 rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto backdrop-blur-md border border-indigo-100 dark:border-slate-700 animate-floatUp mb-8">
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center text-gray-700 dark:text-gray-200 text-md">
            <div className="flex flex-col items-center gap-2 animate-fadeInUp delay-100">
              <FaLaptopCode className="text-3xl text-indigo-500 animate-pulse" />
              <span className="font-semibold">Web Dev Tutorials</span>
            </div>
            <div className="flex flex-col items-center gap-2 animate-fadeInUp delay-200">
              <FaRegNewspaper className="text-3xl text-pink-500 animate-bounce" />
              <span className="font-semibold">Latest Tech News</span>
            </div>
            <div className="flex flex-col items-center gap-2 animate-fadeInUp delay-300">
              <FaUsers className="text-3xl text-purple-500 animate-pulse" />
              <span className="font-semibold">Community Insights</span>
            </div>
          </div>
        </div>
        {/* Glowing CTA Button */}
        <Link
          to="/about"
          className="px-8 py-3 rounded-full font-bold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800 animate-glow mb-4"
        >
          Learn More About Us
        </Link>
      </div>

      {/* Recent Posts Section */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-3">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6 animate-fadeInUp delay-500">
            <h2 className="text-2xl font-semibold text-center text-indigo-600 dark:text-indigo-400">Recent Posts</h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {posts.slice(0, 6).map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className="text-lg text-teal-500 hover:underline text-center"
            >
              View all posts
            </Link>
          </div>
        )}
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