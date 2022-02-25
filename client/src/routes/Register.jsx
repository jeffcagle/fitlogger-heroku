import { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as http from '../services/http';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAt,
  faUser,
  faLock,
  faRedo,
  faWarning,
} from '@fortawesome/free-solid-svg-icons';
import Panel from '../components/sign-up/Panel';
import SignUpLayout from '../layouts/SignUpLayout';
import { AuthContext } from '../context/AuthContext';
import Logo from '../components/Logo';

function App() {
  // Bindings
  const navigate = useNavigate(),
    auth = useContext(AuthContext);

  // State
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: '',
  });
  const [loading, setLoading] = useState(true);

  // Destructuring form state
  const { name, email, password, confirmPassword, error } = form;

  // Check if logged in -- reroute to dashboard if true
  useEffect(() => {
    if (auth.token) {
      navigate('/dashboard');
    } else {
      setLoading(false);
    }
  }, [navigate, auth]);

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

    try {
      const res = await http.registerUser(
        name,
        email,
        password,
        confirmPassword
      );

      if (res.success) {
        navigate('/login');
      } else {
        setForm(prevState => ({ ...prevState, error: res.error }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SignUpLayout>
      {!loading && (
        <Panel>
          <div className="text-center mb-6">
            <h1 className="text-5xl mb-2">
              <Logo dark />
            </h1>
            <p className="text-gray-400">100% free. Sign up today!</p>
          </div>
          <form className="login" onSubmit={handleSubmit}>
            <label className="block mb-4">
              <span className="hidden">Name</span>
              <div className="relative">
                <div className="input-icon">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <input
                  aria-label="Name"
                  className="with-icon"
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={e => onChange(e)}
                />
              </div>
            </label>
            <label className="block mb-4">
              <span className="hidden">Email</span>
              <div className="relative">
                <div className="input-icon">
                  <FontAwesomeIcon icon={faAt} />
                </div>
                <input
                  aria-label="Email"
                  className="with-icon"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={e => onChange(e)}
                />
              </div>
            </label>
            <label className="block mb-4">
              <span className="hidden">Password</span>
              <div className="relative">
                <div className="input-icon">
                  <FontAwesomeIcon icon={faLock} />
                </div>
                <input
                  aria-label="Password"
                  className="with-icon"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={e => onChange(e)}
                />
              </div>
            </label>
            <label className="block mb-4">
              <span className="hidden">Re-enter Password</span>
              <div className="relative">
                <div className="input-icon">
                  <FontAwesomeIcon icon={faRedo} />
                </div>
                <input
                  aria-label="Re-enter password"
                  className="with-icon"
                  type="password"
                  placeholder="Re-enter password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={e => onChange(e)}
                />
              </div>
            </label>
            {error && (
              <div className="error mt-4">
                <span>
                  <FontAwesomeIcon className="mr-2" icon={faWarning} /> {error}
                </span>
              </div>
            )}
            <input
              type="submit"
              className="button button-primary button-full mt-3"
              value="Register"
            />
          </form>
          <p className="text-gray-600 text-center mt-8">
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </Panel>
      )}
    </SignUpLayout>
  );
}

export default App;
