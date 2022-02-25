import { useState, useEffect } from 'react';
import { isNew } from '../../utils/isNew';

export default function RecentLogs({ data: exercise }) {
  // State
  const [log, setLog] = useState({
    setLogs: [],
    repLogs: [],
    weightLogs: [],
    restLogs: [],
  });

  // Destructuring state
  const { setLogs, repLogs, weightLogs, restLogs } = log;

  // Get exercise data and pre-fill form
  useEffect(() => {
    setLog({
      setLogs: [...exercise.setLogs].slice(-10),
      repLogs: [...exercise.repLogs.values].slice(-10),
      weightLogs: [...exercise.weightLogs].slice(-10),
      restLogs: [...exercise.restLogs].slice(-10),
    });
  }, [exercise]);

  // Calculates log differences and handles styling
  const handleLogChange = (array, item, index, reverse) => {
    const diff = item.value - array[index !== 0 ? index - 1 : index].value;

    if (reverse ? diff < 0 : diff > 0) {
      return (
        <span className="text-emerald-500 block">
          {reverse ? '-' : '+'}
          {Math.abs(diff)}
        </span>
      );
    }

    if (reverse ? diff > 0 : diff < 0) {
      return <span className="text-red-500 block">{diff}</span>;
    } else {
      return (
        <span className="text-gray-600 dark:text-neutral-500 block">
          {diff}
        </span>
      );
    }
  };

  // Maps through most recent logs for an array
  const handleLogs = (array, reverse = false) => {
    return array.map((item, index) => {
      return (
        <div key={item._id} className="log-cube">
          {isNew(item) && <div className="new-badge">New</div>}
          <div className="log-cube-date">{handleDate(item.date)}</div>
          <div className="font-bold text-xl truncate">
            {handleLogChange(array, item, index, reverse)}
          </div>

          <div className="log-cube-log">
            Log: <span>{item.value}</span>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <div id="recent-logs">
        <h2>Recent Logs</h2>
        <p className="mb-6">
          Each time you log a progress update, it will create a tile in the
          corresponding row below.
        </p>
        <div className="log-cubes">
          <div className="log-cubes-row">
            <div className="log-cubes-category">Sets</div>
            <div className="log-cubes-logs">{handleLogs(setLogs)}</div>
          </div>
          <div className="log-cubes-row">
            <div className="log-cubes-category">Reps</div>
            <div className="log-cubes-logs">{handleLogs(repLogs)}</div>
          </div>
          <div className="log-cubes-row">
            <div className="log-cubes-category">Weight</div>
            <div className="log-cubes-logs">{handleLogs(weightLogs)}</div>
          </div>
          <div className="log-cubes-row">
            <div className="log-cubes-category">Rest</div>
            <div className="log-cubes-logs">{handleLogs(restLogs, true)}</div>
          </div>
        </div>
      </div>
    </>
  );

  // Format date
  function handleDate(date) {
    const _date = new Date(date);
    const month = _date.getMonth();
    const dateNum = _date.getDate();

    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    return `${months[month]} ${dateNum}`;
  }
}
