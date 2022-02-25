import { Link } from 'react-router-dom';
import bannerImage from '../images/signup-hero.jpg';
import HomeLayout from '../layouts/HomeLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import Logo from '../components/Logo';

export default function Home() {
  return (
    <HomeLayout>
      <div className="gray-gradient h-[500px] w-full relative overflow-hidden flex items-center justify-center mb-16">
        <div className="container relative z-10 flex flex-col items-center justify-center">
          <h1 className="font-bold text-7xl mb-4">
            <Logo reverse />
          </h1>
          <p className="text-white opacity-90 text-3xl mb-3 flex items-center gap-3">
            Exercise{' '}
            <FontAwesomeIcon
              icon={faAngleDoubleRight}
              size="xs"
              className="text-orange-500"
            />{' '}
            Track your progress{' '}
            <FontAwesomeIcon
              icon={faAngleDoubleRight}
              size="xs"
              className="text-orange-500"
            />{' '}
            Get fit
          </p>
          <p className="text-white opacity-60 mb-8 text-center max-w-[60%]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.{' '}
          </p>
          <div className="flex gap-4">
            <Link
              className="button button-secondary button-fixed-width"
              to="register"
            >
              Sign Up
            </Link>
            <Link
              className="button button-light button-fixed-width"
              to="register"
            >
              Learn More
            </Link>
          </div>
        </div>
        <img
          src={bannerImage}
          className="absolute z-0 object-cover h-full min-w-full left-0 opacity-5"
          alt="banner"
        />
      </div>
      <div className="container">
        <h2 className="text-center text-gray-700 text-2xl font-bold">About</h2>
      </div>
    </HomeLayout>
  );
}
