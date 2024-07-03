import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AuthForm from './pages/Authform';
import { createContext, useState, useEffect } from 'react';
import { lookInSession } from './common/Session';

export const UserContext = createContext();

const App = () => {
  const [userAuth, setUserAuth] = useState({});

  useEffect(() => {
    let userInSession = lookInSession('user');
    // console.log(userInSession);
    userInSession
      ? setUserAuth(JSON.parse(userInSession))
      : setUserAuth({ access_token: null });
  }, []);

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      <Routes>
        <Route path='/' element={<Navbar />}>
          <Route path='signin' element={<AuthForm type='signin' />}></Route>
          <Route path='signup' element={<AuthForm type='signup' />}></Route>
        </Route>
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
