import { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as http from '../services/http';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faLock, faWarning } from '@fortawesome/free-solid-svg-icons';
import Panel from '../components/sign-up/Panel';
import SignUpLayout from '../layouts/SignUpLayout';
import { AuthContext } from '../context/AuthContext';
import Logo from '../components/Logo';

function Login() {
  // Bindings
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  // State
  const [form, setForm] = useState({
    email: '',
    password: '',
    error: '',
  });
  const [loading, setLoading] = useState(true);

  // Destructuring form state
  const { email, password, error } = form;

  // Check if logged in -- reroute to dashboard if true
  useEffect(() => {
    if (auth.token) {
      navigate('/dashboard');
    } else {
      setLoading(false);
    }
  }, [navigate, auth.token]);

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
      const res = await http.loginUser(email, password);
      if (res.success) {
        auth.setToken(res.data);
        navigate('/dashboard');
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
            <p className="text-gray-400">Log in to your account</p>
          </div>
          <form className="login" onSubmit={handleSubmit}>
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
            <Link className="text-sm" to="/">
              Forgot Password?
            </Link>

            {error && (
              <div className="error mt-4">
                <span>
                  <FontAwesomeIcon className="mr-2" icon={faWarning} /> {error}
                </span>
              </div>
            )}
            <input
              type="submit"
              className="button button-primary button-full mt-5"
              value="Log In"
            />
          </form>
          <p className="text-gray-600 text-center mt-8">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </Panel>
      )}
    </SignUpLayout>
  );
}

export default Login;
