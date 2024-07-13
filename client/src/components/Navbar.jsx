import React from 'react';
import { useContext, useEffect, useState } from 'react';
import logo from '../images/logo.png';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import UserNavigation from './UserNavigation';
import axios from 'axios';

export default function Navbar() {
   const navigate = useNavigate();
  const [searchVisible, setsearchVisible] = React.useState(false);
  const [UserNavigationPanel, setUserNavigationPanel] = React.useState(false);
  const {
    userAuth,
    userAuth: { access_token, profile_img },
  } = React.useContext(UserContext);
  const handleBlur = () => {
    setTimeout(() => {
      setUserNavigationPanel(false);
    }, 200);
  };
  const handleChange = (e) => {
    let query = e.target.value;
    if (e.keyCode === 13 && query.length) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <>
      <nav className='navbar z-50'>
        <Link to='/' className='flex-none'>
          <img src={logo} alt='logo img' className='h-30 w-36' />
        </Link>

        <div
          className={
            'absolute bg-white w-full left-0 top-full mt-0 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show ' +
            (searchVisible ? 'show' : 'hide')
          }
        >
          <input
            type='text'
            placeholder='Search'
            className='w-full md:w-auto bg-grey p-4 pl-16 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12'
            onKeyDown={handleChange}
          />
          <i className='fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey' />
        </div>

        <div className='flex items-center gap-3 md:gap-6 ml-auto'>
          <button
            className='md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center'
            onClick={() => setsearchVisible((currval) => !currval)}
          >
            <i className='fi fi-rr-search text-xl'></i>
          </button>
          <Link to='/editor' className='hidden md:flex gap-2 link'>
            <i className='fi fi-rr-file-edit'></i>
            <p>Write</p>
          </Link>

          {access_token ? (
            <>
              <Link to='/dashboard/notification'>
                <button className='w-12 h-12 rounded-full bg-grey relative hover:bg-black/10'>
                  <i className='fi fi-rr-bell text-2xl'></i>
                </button>
              </Link>

              <div className='relative' onBlur={handleBlur}>
                <button className='w-12 h-12 mt-1'>
                  <img
                    src={profile_img}
                    className='w-full h-full object-cover rounded-full'
                    alt='profile img'
                    onClick={() =>
                      setUserNavigationPanel((currval) => !currval)
                    }
                  />
                  {UserNavigationPanel ? <UserNavigation /> : ''}
                </button>
              </div>
            </>
          ) : (
            <>
              <Link className='btn-dark py-2 bg-primary ' to='signin'>
                Sign In
              </Link>
              <Link className='btn-light py-2 hidden md:block' to='signup'>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
}
