import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/MainLayout';
import Home from './routes/Home';
import Register from './routes/Register';
import Login from './routes/Login';
import Dashboard from './routes/Dashboard';
import ProtectedRoutes from './routes/ProtectedRoutes';
import CreateExercise from './routes/CreateExercise';
import Routines from './routes/Routines';
import Routine from './routes/Routine';
import CreateRoutine from './routes/CreateRoutine';
import Exercises from './routes/Exercises';
import Exercise from './routes/Exercise';
import Settings from './routes/Settings';
import { AuthContext } from './context/AuthContext';
import { ThemeContext } from './context/ThemeContext';
import * as http from './services/http';

function App() {
  // Bindings
  const activeToken = localStorage.getItem('token');
  const activeTheme = localStorage.getItem('theme');

  // State
  const setToken = token => {
    setAuth(state => ({ ...state, token: token }));
  };

  const toggleTheme = style => {
    setTheme(state => ({ ...state, style }));
  };

  const [auth, setAuth] = useState({
    user: {
      email: '',
      id: '',
      name: '',
    },
    token: '',
    setToken,
  });
  const [loading, setLoading] = useState(true);

  const [theme, setTheme] = useState({
    style: activeTheme,
    toggleTheme,
  });

  useEffect(() => {
    localStorage.setItem('theme', theme.style);
  }, [theme.style]);

  // If active token, get user data
  useEffect(() => {
    if (activeToken) {
      setAuth(prevState => ({ ...prevState, token: activeToken }));

      const getUser = async () => {
        try {
          setLoading(true);
          const { data: user } = await http.getMe(activeToken);
          if (!user) localStorage.removeItem('token');
          setAuth(prevState => ({ ...prevState, user, token: activeToken }));
          setLoading(false);
        } catch (error) {
          console.log(error.message);
        }
      };
      getUser();
    } else {
      setLoading(false);
    }
  }, [auth.token, activeToken]);

  return (
    <>
      {!loading && (
        <AuthContext.Provider value={auth}>
          <ThemeContext.Provider value={theme}>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
                <Route element={<ProtectedRoutes />}>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="exercises" element={<Exercises />} />
                  <Route path="exercise/new" element={<CreateExercise />} />
                  <Route path="exercise/:id" element={<Exercise />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="routines" element={<Routines />} />
                  <Route path="routine/:id" element={<Routine />} />
                  <Route path="routine/new" element={<CreateRoutine />} />
                </Route>
              </Routes>
            </Layout>
          </ThemeContext.Provider>
        </AuthContext.Provider>
      )}
    </>
  );
}

export default App;
