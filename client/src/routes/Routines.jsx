import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import * as http from '../services/http';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function Routines() {
  const [routines, setRoutines] = useState([]);

  const [loading, setLoading] = useState(true);
  const auth = useContext(AuthContext);

  useEffect(() => {
    async function loadRoutines() {
      try {
        setLoading(true);
        const { data: routines } = await http.getRoutines(auth.token);
        setRoutines(routines);
        setLoading(false);
      } catch (error) {}
    }
    loadRoutines();
  }, [auth.token]);

  const handleActiveDays = routine => {
    const schedule = routine.schedule;

    return schedule.map(day => {
      const hasExercises = day.exercises.length > 0;

      if (hasExercises) {
        return (
          <span
            key={day._id}
            className="bg-sky-600 dark:bg-sky-500 text-white text-sm w-7 h-7 rounded flex items-center justify-center"
          >
            {day.day[0]}
          </span>
        );
      } else {
        return (
          <span
            key={day._id}
            className="bg-gray-200 dark:bg-neutral-800 text-gray-500 dark:text-neutral-500 text-sm w-7 h-7 rounded flex items-center justify-center"
          >
            {day.day[0]}
          </span>
        );
      }
    });
  };

  return (
    <>
      {!loading && (
        <>
          <h1 className="mb-4">My Routines</h1>
          <p>
            Your list of exercise routines. Click on any routine to schedule
            exercises.
          </p>

          <div className="routines">
            <h2>Weekly</h2>

            {routines.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mt-4 mb-8">
                {routines.map(routine => (
                  <Link
                    className="relative text-gray-500 font-normal flex flex-col gap-2 bg-gray-75 hover:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-900 rounded-lg px-8 py-5 group transition"
                    to={`/routine/${routine._id}`}
                    key={routine._id}
                  >
                    <div className="text-xl font-bold text-gray-700 dark:text-neutral-100 group-hover:text-sky-600 dark:group-hover:text-sky-500 transition">
                      {routine.name}
                    </div>
                    <div className="text-gray-500 dark:text-neutral-300 truncate">
                      <span className="font-bold text-gray-600 dark:text-neutral-200">
                        Goal:
                      </span>{' '}
                      {routine.goal}
                    </div>
                    <div className="flex gap-1 my-2">
                      {handleActiveDays(routine)}
                    </div>
                    <div className="absolute top-0 right-0">
                      <span className="font-medium bg-emerald-500 text-white rounded-tr-lg rounded-bl-lg px-2 py-1">
                        Active
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {routines.length === 0 && (
              <p className="text-gray-600 dark:text-neutral-300 mb-8 font-medium">
                You have no routines.
              </p>
            )}

            <Link className="button button-secondary" to="/routine/new">
              <FontAwesomeIcon icon={faPlus} className="mr-1" /> New Routine
            </Link>
          </div>
        </>
      )}
    </>
  );
}
