import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import UserAuthForm from './pages/Authform';
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
import Notification from './pages/Notifications';
import ManageBlog from './pages/ManageBlog';

export const UserContext = createContext({});

export const ThemeContext = createContext({});

const darkThemePreference = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches;

const App = () => {
  const [userAuth, setUserAuth] = useState({});

  const [theme, setTheme] = useState(() =>
    darkThemePreference() ? 'dark' : 'light'
  );

  useEffect(() => {
    let userInSession = lookInSession('user');
    let themeInSession = lookInSession('theme');
    // console.log(JSON.parse(userInSession))
    userInSession
      ? setUserAuth(JSON.parse(userInSession))
      : setUserAuth({ access_token: null });

    if (themeInSession) {
      setTheme(() => {
        document.body.setAttribute('data-theme', themeInSession);

        return themeInSession;
      });
    } else document.body.setAttribute('data-theme', theme);
  }, []);
  // console.log(userAuth)
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <UserContext.Provider value={{ userAuth, setUserAuth }}>
        <Routes>
          <Route path='/editor' element={<Editor />} />
          <Route path='/editor/:blog_id' element={<Editor />} />
          <Route path='/' element={<Navbar />}>
            <Route index element={<Home />} />

            <Route path='dashboard' element={<SideNav />}>
              <Route path='notifications' element={<Notification />} />
              <Route path='blogs' element={<ManageBlog />} />
            </Route>

            <Route path='settings' element={<SideNav />}>
              <Route path='edit-profile' element={<EditProfile />} />
              <Route path='change-password' element={<ChangePassword />} />
            </Route>
            <Route path='signin' element={<UserAuthForm type='signin' />} />
            <Route path='signup' element={<UserAuthForm type='signup' />} />
            <Route path='search/:query' element={<SearchPage />} />
            <Route path='user/:id' element={<ProfilePage />} />
            <Route path='blog/:blog_id' element={<BlogPage />} />
            <Route path='*' element={<PageNotFound />} />
          </Route>
        </Routes>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;