import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toogleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
import { useEffect, useState } from 'react';

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
    setShowMobileSearch(false);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md shadow-lg border-b border-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-colors duration-500">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
          {/* Logo */}
          <Link
            to='/'
            className='flex items-center gap-2 text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 drop-shadow-lg transition-transform duration-300 hover:scale-105 animate-fadeIn'
          >
            <span className='px-2 py-1 rounded-lg'>Sachin's</span>
            <span className='hidden sm:inline text-gray-700 dark:text-gray-200 font-bold'>Blog</span>
          </Link>

          {/* Desktop search */}
          <form onSubmit={handleSubmit} className='hidden lg:block animate-fadeInUp delay-100'>
            <TextInput
              type='text'
              placeholder='Search...'
              rightIcon={AiOutlineSearch}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='rounded-full shadow-sm focus:ring-2 focus:ring-indigo-400 transition-all duration-300'
            />
          </form>

          {/* Mobile search toggle button */}
          <Button
            className='w-12 h-10 lg:hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md hover:scale-110 transition-all duration-300'
            color='gray'
            pill
            onClick={() => setShowMobileSearch((prev) => !prev)}
          >
            <AiOutlineSearch />
          </Button>

          {/* Right side */}
          <div className='flex gap-2 md:order-2 items-center'>
            <Button
              className='w-12 h-10 hidden sm:inline bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md hover:scale-110 transition-all duration-300'
              color='gray'
              pill
              onClick={() => dispatch(toogleTheme())}
            >
              <span className='transition-transform duration-300'>{theme === 'light' ? <FaSun className="animate-spin-slow" /> : <FaMoon className="animate-spin-slow" />}</span>
            </Button>
            {currentUser ? (
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar alt='user' img={currentUser.profilePicture} rounded />
                }
              >
                <Dropdown.Header>
                  <span className='block text-sm'>@{currentUser.username}</span>
                  <span className='block text-sm font-medium truncate'>
                    {currentUser.email}
                  </span>
                </Dropdown.Header>
                <Link to={'/dashboard?tab=profile'}>
                  <Dropdown.Item>Profile</Dropdown.Item>
                </Link>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
              </Dropdown>
            ) : (
              <Link to='/sign-in'>
                <Button gradientDuoTone='purpleToBlue' outline>
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
        {/* Nav links */}
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-6 py-2 animate-fadeInUp delay-200">
          <NavLink to="/" label="Home" active={path === '/'} />
          <NavLink to="/about" label="About" active={path === '/about'} />
          {/* <NavLink to="/projects" label="Projects" active={path === '/projects'} /> */}
        </div>
        {/* Mobile search input (conditionally rendered) */}
        {showMobileSearch && (
          <form onSubmit={handleSubmit} className='px-4 py-2 lg:hidden animate-fadeInUp delay-300'>
            <TextInput
              type='text'
              placeholder='Search...'
              rightIcon={AiOutlineSearch}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='rounded-full shadow-sm focus:ring-2 focus:ring-indigo-400 transition-all duration-300'
            />
          </form>
        )}
        {/* Custom Animations */}
        <style>{`
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
          @keyframes spin-slow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 2.5s linear infinite;
          }
        `}</style>
      </nav>
    </>
  );
}

// NavLink component for animated underline
function NavLink({ to, label, active }) {
  return (
    <Link
      to={to}
      className={`relative px-3 py-1 font-semibold transition-all duration-300 text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 ${active ? 'text-indigo-600 dark:text-indigo-400' : ''}`}
    >
      <span>{label}</span>
      <span
        className={`absolute left-0 -bottom-1 w-full h-1 rounded bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-300 ${active ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}
        style={{ transformOrigin: 'left' }}
      ></span>
    </Link>
  );
}
