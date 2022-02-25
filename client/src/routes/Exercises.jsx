import { useContext } from 'react';
import ExerciseTable from '../components/ExerciseTable';
import { AuthContext } from '../context/AuthContext';

export default function Exercises() {
  const auth = useContext(AuthContext);

  return (
    <>
      <h1 className="mb-4">My Exercises</h1>
      <p>
        Your list of exercises. Click on any exercise to log progress, view
        training history, or delete.
      </p>
      <ExerciseTable token={auth.token} />
    </>
  );
}
