import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as http from '../../services/http';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning } from '@fortawesome/free-solid-svg-icons';

export default function LogProgress({ data: exercise, id, token }) {
  // Set bindings
  const navigate = useNavigate();

  // State
  const [form, setForm] = useState({
    sets: '',
    // repMethod: '',
    repValue: '',
    weight: '',
    rest: '',
    error: '',
  });

  // Destructuring state
  const { sets, repMethod, repValue, weight, rest, error } = form;

  // Get exercise data and pre-fill form
  useEffect(() => {
    setForm({
      sets: exercise.setLogs.at(-1).value,
      repMethod: exercise.repLogs.method,
      repValue: exercise.repLogs.values.at(-1).value,
      weight: exercise.weightLogs.at(-1).value,
      rest: exercise.restLogs.at(-1).value,
    });
  }, [exercise]);

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

    const updatedExercise = {
      sets: sets,
      reps: {
        // method: repMethod,
        value: repValue,
      },
      weight: weight || '0',
      rest: rest || '0',
    };

    try {
      const res = await http.updateExercise(id, token, updatedExercise);
      if (res.success) {
        navigate(0);
      } else {
        setForm(prevState => ({ ...prevState, error: res.error }));
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div id="log-progress">
        <h2>Log Your Progress</h2>
        <p className="mb-6">
          Increase your resistance, rep count, or time under tension? Log it!
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4 items-center">
            <div className="w-1/4">
              <label htmlFor="sets">
                <span className="text-gray-700 dark:text-neutral-300 block mb-2 font-bold">
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
            <div className="w-1/4">
              <label className="block" htmlFor="reps">
                <span className="text-gray-700 dark:text-neutral-300 block mb-2 font-bold">
                  Reps
                </span>
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="input-icon right">{repMethod}</div>
                    <input
                      className="with-icon-right"
                      type="text"
                      id="reps"
                      placeholder="Example: 50"
                      name="repValue"
                      value={repValue}
                      onChange={e => onChange(e)}
                    />
                  </div>
                </div>
              </label>
            </div>
            <div className="w-1/4">
              <label className="block" htmlFor="weight">
                <span className="text-gray-700 dark:text-neutral-300 block mb-2 font-bold">
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
            <div className="w-1/4">
              <label htmlFor="rest">
                <span className="text-gray-700 dark:text-neutral-300 block mb-2 font-bold">
                  Rest
                </span>
                <div className="relative">
                  <div className="input-icon right">sec</div>
                  <input
                    className="mb-6"
                    type="text"
                    id="rest"
                    placeholder="Example: 120"
                    name="rest"
                    value={rest}
                    onChange={e => onChange(e)}
                  />
                </div>
              </label>
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
              value="Log Changes"
              type="submit"
              className="button button-secondary"
            />
          </div>
        </form>
      </div>
    </>
  );
}
