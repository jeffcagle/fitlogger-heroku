import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import * as http from '../services/http';
import capitalize from '../utils/capitalize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faFaceSmile,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { convertSecondsToMinutes } from '../utils/convertSecondsToMinutes';
import { isNew } from '../utils/isNew';

export default function ExerciseTable({ token }) {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  // State
  const [exercises, setExercises] = useState([]);
  const [cardio, setCardio] = useState([]);
  const [newAlert, setNewAlert] = useState({
    showAlert: false,
    newExerciseName: '',
  });
  const [loading, setLoading] = useState(true);

  // Populate the exercise table
  useEffect(() => {
    async function loadExercises() {
      try {
        setLoading(true);
        const { data: exercises } = await http.getExercises(token);
        setExercises(exercises);
        setCardio([]);

        if (exercises.length && isNew(exercises.at(-1))) {
          setTimeout(() => {
            setNewAlert({
              showAlert: true,
              newExerciseName: exercises.at(-1).name,
            });
          }, 1000);
          setTimeout(() => {
            setNewAlert(prevState => ({ ...prevState, showAlert: false }));
          }, 6000);
        }

        setLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    }
    loadExercises();
  }, [token]);

  // Delete exercise function
  const handleDelete = async id => {
    try {
      const res = await http.deleteExercise(id, auth.token);

      if (res.success) {
        navigate(0);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleWeight = weight => {
    const bodyweight = weight === '0';

    if (bodyweight) {
      return 'Bodyweight';
    } else {
      return (
        <>
          {weight} <span>lbs</span>
        </>
      );
    }
  };

  const handleRest = rest => {
    const noRest = rest === '0';

    return noRest ? 'No Rest' : convertSecondsToMinutes(rest);
  };

  return (
    <>
      {!loading && (
        <div>
          <div
            className={`absolute z-20 flex flex-col w-auto top-4 bg-sky-500 text-white py-4 px-6 left-full whitespace-nowrap rounded-md max-w-[20rem] ${
              newAlert.showAlert
                ? 'opacity-100 translate-x-[-120%] transition duration-400'
                : 'opacity-0 translate-x-[100%] transition duration-400'
            }`}
          >
            <div className="mb-1">
              You now have <span className="font-bold">{exercises.length}</span>{' '}
              exercise{exercises.length === 1 ? '' : 's'}!
            </div>
            <div className="font-bold">
              Keep it going! <FontAwesomeIcon icon={faFaceSmile} />
            </div>
          </div>
          <div className="mb-8">
            <h2>Resistance</h2>
            {exercises.length > 0 && (
              <div className="exercise-table w-full mb-8">
                <div className="head">
                  <div className="titles grid grid-cols-7 gap-2">
                    <div className="col-span-3">Exercise Name</div>
                    <div>Sets</div>
                    <div>Reps</div>
                    <div>Weight</div>
                    <div>Rest</div>
                  </div>
                </div>
                <div className="body">
                  {exercises.map(exercise => {
                    const weight = exercise.weightLogs.at(-1).value;
                    const sets = exercise.setLogs.at(-1).value;
                    const repsMethod = exercise.repLogs.method;
                    const repsValue = exercise.repLogs.values.at(-1).value;
                    const rest = exercise.restLogs.at(-1).value;

                    return (
                      <div className="row relative" key={exercise._id}>
                        <Link
                          to={`/exercise/${exercise._id}`}
                          className="row-item"
                        >
                          {isNew(exercise) && (
                            <div className="new-badge">New</div>
                          )}
                          <div className="exercise-name">
                            {capitalize(exercise.name)}
                          </div>
                          <div>{sets}</div>
                          <div className="reps">
                            {repsValue} <span>{repsMethod}</span>
                          </div>
                          <div className="weight">{handleWeight(weight)}</div>
                          <div>{handleRest(rest)}</div>
                        </Link>
                        <div
                          onClick={() => handleDelete(exercise._id)}
                          title="Delete this exercise."
                          className="delete-row"
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {exercises.length === 0 && (
              <p className="text-gray-600 dark:text-neutral-300 mb-8 font-medium">
                You have no resistance exercises in your log.
              </p>
            )}

            <Link className="button button-secondary" to="/exercise/new">
              <FontAwesomeIcon icon={faPlus} className="mr-1" /> New Exercise
            </Link>
          </div>

          <div className="mb-8">
            <h2>Cardio</h2>

            {cardio.length === 0 && (
              <p className="text-gray-600 dark:text-neutral-300 mb-8 font-medium">
                You have no cardio exercises in your log.
              </p>
            )}

            <Link
              disabled
              className="button button-disabled pointer-events-none"
              to="/exercise/new"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-1" /> New Cardio
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
