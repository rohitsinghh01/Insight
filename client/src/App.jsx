import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AuthForm from './pages/Authform';
import { createContext, useState, useEffect } from 'react';
import { lookInSession } from './common/Session';
import Editor from './pages/editorPages';
import Home from './pages/Homepage';
import SearchPage from './pages/SearchPage'
import PageNotFound from './pages/404Page';
import ProfilePage from './pages/ProfilePage';
import BlogPage from './pages/BlogPage';
import SideNav from './components/SideNav';
import ChangePassword from './pages/ChangePassword';
import EditProfile from './pages/EditProfile';

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
        <Route path='/editor' element={<Editor />}></Route>
        <Route path='/editor/:blog_id' element={<Editor />} />
        <Route path='/' element={<Navbar />}>
          <Route index element={<Home />} />

          <Route path='settings' element={<SideNav />}>
            <Route path='edit-profile' element={<EditProfile />} />
            <Route path='change-password' element={<ChangePassword />} />
          </Route>

          <Route path='signin' element={<AuthForm type='signin' />}></Route>
          <Route path='signup' element={<AuthForm type='signup' />}></Route>
          <Route path='search/:query' element={<SearchPage />} />
          <Route path='user/:id' element={<ProfilePage />} />
          <Route path='blog/:blog_id' element={<BlogPage />} />
          <Route path='*' element={<PageNotFound />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
