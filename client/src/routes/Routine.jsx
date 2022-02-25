import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import * as http from '../services/http';
import capitalize from '../utils/capitalize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowTrendUp,
  faArrowTrendDown,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import RenameAndDelete from '../components/RenameAndDelete';

export default function Routine() {
  // Initialize
  const auth = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  // State
  const [routine, setRoutine] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [form, setForm] = useState({
    day: '',
    exerciseId: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRoutines() {
      try {
        setLoading(true);
        const { data: routine } = await http.getRoutine(id, auth.token);
        const { data: exercises } = await http.getExercises(auth.token);
        setRoutine(routine);
        setExercises(exercises);
        if (exercises.length !== 0) {
          setForm({ day: 0, exerciseId: exercises[0]._id });
        }
        setLoading(false);
      } catch (error) {}
    }
    loadRoutines();
  }, [auth.token, id]);

  const handleAddExercise = async e => {
    e.preventDefault();

    const data = {
      exerciseId: form.exerciseId,
      day: form.day,
      routineId: id,
    };

    const res = await http.addExerciseToRoutine(data, auth.token);
    if (res.success) {
      navigate(0);
    }
  };

  const handleProgress = logs => {
    if (logs.length > 1) {
      const progressUp = logs.at(-1).value > logs.at(-2).value;

      return (
        <div className="flex gap-1 items-center">
          {logs.at(-1).value}

          {progressUp ? (
            <FontAwesomeIcon
              icon={faArrowTrendUp}
              className="text-emerald-600 group-hover:text-emerald-400"
            />
          ) : (
            <FontAwesomeIcon
              icon={faArrowTrendDown}
              className="text-red-400 dark:group-hover:text-red-300"
            />
          )}
        </div>
      );
    } else {
      return <div>{logs.at(-1).value}</div>;
    }
  };

  return (
    <>
      {!loading && (
        <>
          <RenameAndDelete item={routine} type={'routine'} />
          <div className="mb-4">
            {exercises.length !== 0 ? (
              <form className="flex gap-4" onSubmit={handleAddExercise}>
                <div className="select">
                  <select
                    value={form.day}
                    onChange={e =>
                      setForm(state => ({ ...state, day: e.target.value }))
                    }
                  >
                    {routine.schedule.map((item, index) => (
                      <option key={item._id} value={index}>
                        {item.day}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="select">
                  <select
                    value={form.exerciseId}
                    onChange={e =>
                      setForm(state => ({
                        ...state,
                        exerciseId: e.target.value,
                      }))
                    }
                  >
                    {exercises.map(item => (
                      <option key={item._id} value={item._id}>
                        {capitalize(item.name)}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  className="button button-secondary"
                  type="submit"
                  value="Add Exercise"
                />
              </form>
            ) : (
              <p className="mb-6">
                Oops! You have no exercises.{' '}
                <Link to="/exercises">Create exercises</Link> to add to your
                routine.
              </p>
            )}
          </div>
          <div className="flex flex-col gap-4">
            {routine.schedule.map(item => (
              <div key={item._id} className="exercise-table w-full">
                <div className="head">
                  <div className="titles grid grid-cols-7 gap-2">
                    <div className="col-span-3">{item.day}</div>
                    {item.exercises.length > 0 && (
                      <>
                        <div>Sets</div>
                        <div>Reps</div>
                        <div>Weight</div>
                        <div>Rest</div>
                      </>
                    )}
                  </div>
                </div>
                <div className="body">
                  {item.exercises.length > 0 ? (
                    item.exercises.map(exercise => (
                      <div key={exercise._id} className="row relative group">
                        <Link
                          to={`/exercise/${exercise._id}`}
                          className="row-item"
                          key={exercise._id}
                          id={exercise._id}
                        >
                          <div className="exercise-name">
                            {capitalize(exercise.name)}
                          </div>
                          <div className="flex gap-1 items-center justify-end truncate">
                            {handleProgress(exercise.setLogs)}
                          </div>
                          <div className="flex gap-1 items-center justify-end truncate">
                            {handleProgress(exercise.repLogs.values)}
                          </div>
                          <div className="flex gap-1 items-center justify-end truncate">
                            {handleProgress(exercise.weightLogs)}
                          </div>
                          <div className="flex gap-1 items-center justify-end truncate">
                            {handleProgress(exercise.restLogs)}
                          </div>
                        </Link>
                        <div
                          className="delete-row"
                          title="Remove exercise from this routine."
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="pl-8 mb-2 mt-4 text-gray-400 dark:text-neutral-500 text-sm">
                      No Exercises
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
