import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faFacebook } from '@fortawesome/free-brands-svg-icons';
import Logo from '../../components/Logo';

export default function Header() {
  return (
    <header className="w-full h-16 sticky z-20 top-0 bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-transparent">
      <div className="container h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link className="brand text-3xl" to="/">
            <Logo />
          </Link>
          <div className="bg-gray-75 text-gray-400 dark:bg-neutral-800 dark:text-neutral-400 text-sm rounded-full px-4 h-[30px] flex items-center justify-center">
            v1.0 beta
          </div>
        </div>
        <nav className="h-full flex gap-3">
          <ul className="flex h-full font-medium text-sm">
            <li>
              <Link
                className="text-gray-700 dark:text-neutral-100 hover:text-sky-500 h-full flex items-center p-4"
                to="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-700 dark:text-neutral-100 hover:text-sky-500 h-full flex items-center p-4"
                to="/"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-700 dark:text-neutral-100 hover:text-sky-500 h-full flex items-center p-4"
                to="/login"
              >
                Log In
              </Link>
            </li>
          </ul>
          <div className="flex h-full items-center text-gray-200 dark:text-neutral-700">
            |
          </div>
          <ul className="flex h-full font-bold text-xl">
            <li>
              <Link
                className="text-gray-300 dark:text-neutral-500 h-full flex items-center p-4"
                to="/"
              >
                <FontAwesomeIcon icon={faGithub} />
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-300 dark:text-neutral-500 h-full flex items-center p-4"
                to="/"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
