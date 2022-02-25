import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as http from '../services/http';
import { AuthContext } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning } from '@fortawesome/free-solid-svg-icons';

export default function CreateExercise() {
  // Bindings
  let navigate = useNavigate();
  const auth = useContext(AuthContext);

  // State
  const [form, setForm] = useState({
    name: '',
    sets: '',
    repsMethod: 'Reps',
    repsValue: '',
    weight: '',
    rest: '',
    error: '',
  });

  // Destructuring form state
  const { name, sets, repsMethod, repsValue, weight, rest, error } = form;

  // Update state on form field change
  const onChange = e => {
    setForm(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Form submit function
  const handleSubmit = async e => {
    e.preventDefault();

    const exercise = {
      name,
      sets: sets,
      reps: {
        method: repsMethod,
        value: repsValue,
      },
      weight: weight || '0',
      rest: rest || '0',
    };

    try {
      const res = await http.createExercise(exercise, auth.token);
      if (res.success) {
        navigate('/exercises');
      } else {
        setForm(prevState => ({ ...prevState, error: res.error }));
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <h1 className="mb-4">Create New Exercise</h1>
      <div className="mt-4 mb-16">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4 items-center">
            <div className="w-1/2">
              <label htmlFor="name">
                <span className="text-gray-600 dark:text-neutral-300 font-medium block my-2">
                  Exercise Name
                </span>
                <input
                  className="mb-6"
                  type="text"
                  id="name"
                  placeholder="Example: Bench Press"
                  name="name"
                  value={name}
                  onChange={e => onChange(e)}
                />
              </label>
            </div>
            <div className="w-1/2 text-gray-500 dark:text-neutral-400 italic text-sm">
              Create a name for your exercise. Names could be something like
              "Deadlift" or "Push Ups".
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="w-1/2">
              <label htmlFor="sets">
                <span className="text-gray-600 dark:text-neutral-300 font-medium block my-2">
                  Sets
                </span>
                <input
                  className="mb-6"
                  type="text"
                  id="sets"
                  placeholder="Example: 3"
                  name="sets"
                  value={sets}
                  onChange={e => onChange(e)}
                />
              </label>
            </div>
            <div className="w-1/2 text-gray-500 dark:text-neutral-400 italic text-sm">
              How many cycles will you perform this exercise?
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="w-1/2">
              <label className="block" htmlFor="reps">
                <span className="text-gray-600 dark:text-neutral-300 font-medium block my-2">
                  Reps
                </span>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-1/2 shrink-0">
                    <div className="relative">
                      <div className="input-icon right">{repsMethod}</div>
                      <input
                        className="with-icon-right"
                        type="text"
                        id="reps"
                        placeholder="Example: 50"
                        name="repsValue"
                        value={repsValue}
                        onChange={e => onChange(e)}
                      />
                    </div>
                  </div>
                  <div className="w-1/2 select">
                    <select
                      value={repsMethod}
                      name="repsMethod"
                      onChange={e => onChange(e)}
                    >
                      <option value="Reps">Reps</option>
                      <option value="Sec">Seconds</option>
                    </select>
                  </div>
                </div>
              </label>
            </div>
            <div className="w-1/2 text-gray-500 dark:text-neutral-400 italic text-sm">
              Select how you will measure your time under tension - by reps or
              time (in seconds), and enter the total.
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="w-1/2">
              <label className="block" htmlFor="weight">
                <span className="text-gray-600 dark:text-neutral-300 font-medium block my-2">
                  Weight
                </span>
                <div className="relative">
                  <div className="input-icon right">lbs</div>
                  <input
                    className="with-icon-right mb-6"
                    type="text"
                    id="weight"
                    placeholder="Example: 50"
                    name="weight"
                    value={weight}
                    onChange={e => onChange(e)}
                  />
                </div>
              </label>
            </div>
            <div className="w-1/2 text-gray-500 dark:text-neutral-400 italic text-sm">
              Enter the total weight or band resistance in{' '}
              <strong>pounds</strong>. Change to kilograms in{' '}
              <Link to="/settings">settings</Link>.
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="w-1/2">
              <label htmlFor="rest-duration">
                <span className="text-gray-600 dark:text-neutral-300 font-medium block my-2">
                  Rest
                </span>
                <div className="relative">
                  <div className="input-icon right">sec</div>
                  <input
                    className="mb-6"
                    type="text"
                    id="rest-duration"
                    placeholder="Example: 120"
                    name="rest"
                    value={rest}
                    onChange={e => onChange(e)}
                  />
                </div>
              </label>
            </div>
            <div className="w-1/2 text-gray-500 dark:text-neutral-400 italic text-sm">
              Choose the amount of time (in seconds) you wish to rest between
              sets.
            </div>
          </div>
          {error && (
            <div className="error mt-4">
              <span>
                <FontAwesomeIcon className="mr-2" icon={faWarning} /> {error}
              </span>
            </div>
          )}
          <div className="mt-4">
            <input
              type="submit"
              value="Create"
              className="button button-secondary"
            />
            <Link className="button button-dark ml-4" to="/exercises">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
