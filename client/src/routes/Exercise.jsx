import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import * as http from '../services/http';
import ExerciseChart from '../components/exercise/ExerciseChart';
import RecentLogs from '../components/exercise/RecentLogs';
import LogProgress from '../components/exercise/LogProgress';
import RenameAndDelete from '../components/RenameAndDelete';

export default function Exercise() {
  // Bindings
  const auth = useContext(AuthContext);
  const { id } = useParams();

  // State
  const [exercise, setExercise] = useState({});
  const [loading, setLoading] = useState(true);

  // Get exercise data and pre-fill form
  useEffect(() => {
    async function getExerciseById() {
      setLoading(true);
      const { data: exercise } = await http.getExercise(id, auth.token);
      setExercise(exercise);
      setLoading(false);
    }
    getExerciseById();
  }, [id, auth.token]);

  return (
    <>
      {!loading && (
        <>
          <RenameAndDelete item={exercise} type="exercise" />
          <p>Log exercise changes here to keep record of your progress.</p>
          <LogProgress data={exercise} id={id} token={auth.token} />
          <RecentLogs data={exercise} />
          <ExerciseChart data={exercise} />
        </>
      )}
    </>
  );
}
