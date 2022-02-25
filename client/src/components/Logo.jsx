import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';

export default function Logo({ reverse }) {
  return (
    <>
      <span className="text-orange-500">fit</span>
      <span
        className={`${
          reverse ? 'text-white' : 'text-gray-700 dark:text-white '
        }`}
      >
        logger
      </span>
      <span>
        <FontAwesomeIcon
          icon={faArrowTrendUp}
          size="xs"
          className="text-sky-500"
        />
      </span>
    </>
  );
}
