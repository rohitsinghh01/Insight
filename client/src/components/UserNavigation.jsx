import React, { useContext } from 'react';
import AnimationWrapper from '../common/PageAnimation';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
import { removeFromSession } from '../common/Session';

const UserNavigationPanel = () => {
  const {
    userAuth: { username },
    setUserAuth,
  } = useContext(UserContext);
  const handleSignOut = () => {
    removeFromSession('user');
    setUserAuth({ access_token: null });
  };
  return (
    <AnimationWrapper
      transition={{ duration: 0.2 }}
      className='absolute right-0 z-50'
    >
      <div className='bg-white absolute right-0 border-grey w-60 duration-200 '>
        <Link to='/editor' className='flex gap-2 link md:hidden pl-8 py-4 '>
          <i className='fi fi-rr-file-edit'></i>
          <p>Write</p>
        </Link>
        <Link to={`/user/${username}`} className='link pl-8 py-4 '>
          Profile
        </Link>
        <Link to={`/dashboard/blogs`} className='link pl-8 py-4 '>
          Dashboard
        </Link>
        <Link to={`/settings/edit-profile`} className='link pl-8 py-4 '>
          Setting
        </Link>
        <span className='absolute border-t border-grey  w-[100%]'></span>

        <button
          className='text-left p-4 hover:bg-grey w-full pl-8 py-4'
          onClick={handleSignOut}
        >
          <h1 className='font-bol text-xl mg-1'>Sign Out</h1>
          <p className='text-dark-grey'>@{username}</p>
        </button>
      </div>
    </AnimationWrapper>
  );
};

export default UserNavigationPanel;
