import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faChevronLeft,
  faChevronRight,
  faSun,
  faMoon,
} from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

export default function AccountLayout({ children }) {
  // Bindings
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useContext(AuthContext);
  const theme = useContext(ThemeContext);

  // State
  const [historyPaths, setHistoryPaths] = useState([]);
  const [futurePaths, setFuturePaths] = useState([]);

  useEffect(() => {
    if (location.pathname !== historyPaths.at(-1)) {
      setHistoryPaths(prevState => [...prevState, location.pathname]);
    }
  }, [historyPaths, location.pathname]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    auth.setToken('');
    navigate('/login');
  };

  const handleBack = () => {
    if (historyPaths.length > 1) {
      const futurePath = historyPaths.pop();
      setFuturePaths(prevState => [...prevState, futurePath]);
      navigate(-1);
    }
  };

  const handleForward = () => {
    if (futurePaths.length > 0) {
      navigate(`${futurePaths.at(-1)}`);
      futurePaths.pop();
    }
  };

  const toggleTheme = () => {
    theme.style === 'dark'
      ? theme.toggleTheme('light')
      : theme.toggleTheme('dark');
  };

  return (
    <main className="flex-1 relative overflow-hidden">
      <div id="account-layout" className="container flex gap-8 pt-10 pb-20">
        <aside className="w-1/5 shrink-0">
          <div className="user-info flex items-center mb-8  ">
            <div className="bg-gray-75 dark:bg-neutral-900 rounded-md w-14 h-14 flex items-center justify-center mr-4 shrink-0">
              <FontAwesomeIcon
                className="text-gray-300 dark:text-neutral-700"
                icon={faUser}
                size="2xl"
              />
            </div>
            <div className="flex-1 w-auto overflow-hidden">
              <Link onClick={() => setFuturePaths([])} to="/dashboard">
                <span className="text-gray-700 dark:text-neutral-100 font-bold block truncate">
                  {auth.user?.name}
                </span>
              </Link>
              <button className="link text-sm inline" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className="inline-flex gap-2 bg-gray-75 hover:bg-gray-100 dark:bg-neutral-900 rounded-lg px-4 py-2"
          >
            <span className="text-gray-700 dark:text-neutral-200 font-bold">
              Theme:
            </span>
            <div className="text-gray-800">
              {theme.style === 'dark' ? (
                <span className="text-sky-500">
                  <FontAwesomeIcon icon={faMoon} className="text-yellow-200" />{' '}
                  Dark
                </span>
              ) : (
                <span className="text-sky-600">
                  <FontAwesomeIcon icon={faSun} className="text-yellow-500" />{' '}
                  Light
                </span>
              )}
            </div>
          </button>
          <div className="user-menu pt-6">
            <h4>Menu</h4>
            <nav className="mt-3 mb-6">
              <ul className="flex flex-col gap-2">
                <li>
                  <Link onClick={() => setFuturePaths([])} to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link onClick={() => setFuturePaths([])} to="/exercises">
                    My Exercises
                  </Link>
                </li>
                <li>
                  <Link onClick={() => setFuturePaths([])} to="/routines">
                    My Routines
                  </Link>
                </li>
                <li>
                  <Link onClick={() => setFuturePaths([])} to="/settings">
                    Settings
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div>
            <h4>Navigate</h4>
            <div className="flex gap-4 mt-4">
              <div onClick={() => handleBack()} className="group">
                <div
                  className={`${
                    historyPaths.length > 1
                      ? 'bg-gray-200 text-gray-400 dark:bg-neutral-900 dark:text-neutral-400 cursor-pointer group-hover:bg-sky-500 group-hover:text-white transition'
                      : 'bg-gray-75 text-gray-300 dark:bg-neutral-850 dark:text-neutral-700 pointer-events-none'
                  }    rounded-full w-10 h-10 flex gap-1 items-center justify-center`}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </div>
              </div>
              <div onClick={() => handleForward()} className="group">
                <div
                  className={`${
                    futurePaths.length > 0
                      ? 'bg-gray-200 text-gray-400 dark:bg-neutral-900 dark:text-neutral-400 cursor-pointer group-hover:bg-sky-500 group-hover:text-white transition'
                      : 'bg-gray-75 text-gray-300 dark:bg-neutral-850 dark:text-neutral-700 pointer-events-none'
                  }   rounded-full w-10 h-10 flex gap-1 items-center justify-center`}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </div>
              </div>
            </div>
          </div>
        </aside>
        <section className="w-4/5 flex-1">{children}</section>
      </div>
    </main>
  );
}
