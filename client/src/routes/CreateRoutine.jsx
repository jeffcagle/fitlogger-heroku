import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as http from '../services/http';
import { AuthContext } from '../context/AuthContext';
import capitalize from '../utils/capitalize';

export default function CreateRoutine() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [routine, setRoutine] = useState({
    name: '',
    goal: '',
  });

  const handleSubmit = async e => {
    e.preventDefault();

    const newRoutine = {
      name: capitalize(routine.name),
      goal: routine.goal,
    };

    try {
      const res = await http.createRoutine(newRoutine, auth.token);

      if (res.success) {
        navigate('/routines');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <h1 className="mb-4">Create New Routine</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-4 items-center">
          <div className="w-1/2">
            <label htmlFor="name">
              <span className="text-gray-600 dark:text-neutral-300 font-medium block my-2">
                Name
              </span>
              <input
                className="mb-6"
                type="text"
                name="name"
                id="name"
                placeholder="Example: Push, Pull, Legs"
                value={routine.name}
                onChange={e =>
                  setRoutine(state => ({ ...state, name: e.target.value }))
                }
              />
            </label>
          </div>
          <div className="w-1/2 text-gray-500 dark:text-neutral-400 italic text-sm">
            Name your new routine anything you like.
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="w-1/2">
            <label htmlFor="name">
              <span className="text-gray-600 dark:text-neutral-300 font-medium block my-2">
                Goal (Optional)
              </span>
              <input
                className="mb-6"
                type="text"
                name="goal"
                id="goal"
                placeholder="Example: Get stronger"
                value={routine.goal}
                onChange={e =>
                  setRoutine(state => ({ ...state, goal: e.target.value }))
                }
              />
            </label>
          </div>
          <div className="w-1/2 text-gray-500 dark:text-neutral-400 italic text-sm">
            Optionally add a short goal to your routine. Goals help distinguish
            one routine from another.
          </div>
        </div>
        <div className="mt-4">
          <input
            type="submit"
            value="Create"
            className="button button-secondary"
          />
          <Link className="button button-dark ml-4" to="/routines">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
