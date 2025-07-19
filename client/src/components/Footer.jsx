import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsLinkedin, BsArrowUpCircle } from 'react-icons/bs';

export default function FooterCom() {
  // Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t-4 border-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-2xl mt-10 animate-fadeInUp">
      <div className='w-full max-w-7xl mx-auto px-4 py-8'>
        <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-8'>
          {/* Logo and About */}
          <div className='flex flex-col gap-2 items-center md:items-start'>
            <Link
              to='/'
              className='text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 drop-shadow-lg transition-transform duration-300 hover:scale-105 animate-fadeIn'
            >
              <span className='px-2 py-1 rounded-lg'>Sachin's</span>
              <span className='hidden sm:inline text-gray-700 dark:text-gray-200 font-bold'>Blog</span>
            </Link>
            <span className='text-gray-500 dark:text-gray-400 text-sm'>A place to learn, share, and grow together.</span>
          </div>
          {/* Links */}
          <div className='grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-12 text-center md:text-left'>
            <div>
              <Footer.Title title='About' />
              <Footer.LinkGroup col>
                <Footer.Link href='/about'>Sachin's Blog</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Follow us' />
              <Footer.LinkGroup col>
                <Footer.Link href='https://www.github.com/Sachin-005' target='_blank' rel='noopener noreferrer'>Github</Footer.Link>
                <Footer.Link href='#'>LinkedIn</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Legal' />
              <Footer.LinkGroup col>
                <Footer.Link href='#'>Privacy Policy</Footer.Link>
                <Footer.Link href='#'>Terms & Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        {/* Divider */}
        <div className="my-6 h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full animate-fadeInUp"></div>
        {/* Copyright and Socials */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <Footer.Copyright
            href='#'
            by="Sachin's blog"
            year={new Date().getFullYear()}
            className='text-gray-500 dark:text-gray-400'
          />
          <div className="flex gap-6 sm:mt-0 mt-2 sm:justify-center">
            <Footer.Icon href='#' icon={BsFacebook} className="footer-icon" />
            <Footer.Icon href='#' icon={BsInstagram} className="footer-icon" />
            <Footer.Icon href='#' icon={BsTwitter} className="footer-icon" />
            <Footer.Icon href='https://github.com/Sachin-005' icon={BsGithub} className="footer-icon" />
            <Footer.Icon href='#' icon={BsLinkedin} className="footer-icon" />
          </div>
        </div>
        {/* Back to Top Button */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg hover:scale-110 transition-all duration-300 animate-glow"
          aria-label="Back to top"
        >
          <BsArrowUpCircle className="text-3xl" />
        </button>
      </div>
      {/* Custom Animations */}
      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 1.2s both;
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 16px 4px #a78bfa44, 0 0 32px 8px #f472b644; }
          50% { box-shadow: 0 0 32px 8px #6366f144, 0 0 48px 12px #f472b644; }
        }
        .animate-glow {
          animation: glow 2.5s infinite alternate;
        }
        .footer-icon {
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .footer-icon:hover {
          transform: scale(1.2);
          box-shadow: 0 0 16px 4px #a78bfa44, 0 0 32px 8px #f472b644;
        }
      `}</style>
    </footer>
  );
}