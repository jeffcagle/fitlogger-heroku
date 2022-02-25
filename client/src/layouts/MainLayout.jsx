import { useContext } from 'react';
import Footer from './ui/Footer';
import Header from './ui/Header';
// import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

export default function Layout({ children }) {
  // const auth = useContext(AuthContext);
  const theme = useContext(ThemeContext);

  // useEffect(() => {
  //   console.log('MAIN LAYOUT, AUTH OBJ: ', auth);
  // }, [auth]);

  return (
    <div className={`${theme.style}`}>
      <div className="bg-white dark:bg-neutral-800 min-h-screen flex flex-col relative">
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
}
