import React, { useContext } from 'react';
import InputBox from '../components/InputBox';
import googleIcon from '../images/google.png';
import { Link, Navigate } from 'react-router-dom';
import PageAnimation from '../common/PageAnimation';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { storeInSession } from '../common/Session';
import { UserContext } from '../App';
import { signInWithGoogle } from '../common/firebase';

export default function Authform({ type }) {
  let {
    userAuth: { access_token },
    setUserAuth,
  } = useContext(UserContext);

  const userAuthfromSever = (serverRoute, data) => {
    axios
      .post(import.meta.env.VITE_FRONTEND_URL + serverRoute, data)
      .then(({ data }) => {
        storeInSession('user', JSON.stringify(data));
        setUserAuth(data);
      })

      .catch(({ response }) => {
        toast.error(response.data.error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let serverRoute = type == 'signin' ? '/signin' : '/signup';
    let form = new FormData(formElement);
    let data = {};
    for (let [key, value] of form.entries()) {
      data[key] = value;
    }

    const { fullname, email, password } = data;
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    if (fullname) {
      if (fullname.length < 3) {
        return toast.error('Fullname should be atleast 3 characters long');
      }
    }
    if (!email.length) {
      return toast.error('Email is required');
    }
    if (!emailRegex.test(email)) {
      return toast.error('Invalid email');
    }
    if (type != 'signin') {
      if (!passwordRegex.test(password)) {
        return toast.error(
          'Password should contain atleast 1 uppercase, 1 lowercase, 1 digit and should be 6-20 characters long'
        );
      }
    }

    userAuthfromSever(serverRoute, data);
  };

  const handleGoogleAuth = (e) => {
    e.preventDefault();
    signInWithGoogle()
      .then((user) => {
        let serverRoute = '/google-auth';
        let data = {
          access_token: user.accessToken,
        };
        userAuthfromSever(serverRoute, data);
      })
      .catch((error) => {
        toast.error('Trouble sign-in with Google');
        return console.log(error);
      });
  };

  return access_token ? (
    <Navigate to='/' />
  ) : (
    <PageAnimation keyvalue={type}>
      <div>
        <section className='h-cover flex items-center justify-center'>
          <Toaster />
          <form
            id='formElement'
            action=''
            className='w-[80%] max-w-[400px]'
            onSubmit={handleSubmit}
          >
            <h1 className='text-4xl font-gelasio capitalize text-center mb-24 text-primary'>
              {type == 'signin' ? 'Welcome Back' : 'Join us today'}
            </h1>
            {type !== 'signin' ? (
              <InputBox
                name='fullname'
                type='text'
                placeholder='Full Name'
                icon='fi-rr-user'
                autoComplete='off'
              />
            ) : (
              ''
            )}

            <InputBox
              name='email'
              type='email'
              placeholder='Email'
              icon='fi-rr-envelope'
              autoComplete='off'
            />

            <InputBox
              name='password'
              type='password'
              placeholder='Password'
              icon='fi-rr-key'
              autoComplete='off'
            />

            <button className='btn-dark center mt-14 bg-primary' type='submit'>
              Sign Up
            </button>

            <div className='relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-primary font-bold'>
              <hr className='w-1/2 border-primary' />
              <p>OR</p>
              <hr className='w-1/2 border-primary' />
            </div>

            <button
              className='btn-dark bg-primary flex items-center justify-center gap-4 w-[90%] center'
              onClick={handleGoogleAuth}
            >
              <img src={googleIcon} alt='google icon' className='w-5' />
              Continue with Google
            </button>

            {type == 'signin' ? (
              <p className='mt-6 text-dark-grey text-xl text-center'>
                Don't have an account ?
                <Link
                  to='/signup'
                  className='underline text-black text-xl ml-1'
                >
                  Join Us Today
                </Link>
              </p>
            ) : (
              <p className='mt-6 text-dark-grey text-xl text-center'>
                Already a member ?
                <Link
                  to='/signin'
                  className='underline text-black text-xl ml-1'
                >
                  Sign in here
                </Link>
              </p>
            )}
          </form>
        </section>
      </div>
    </PageAnimation>
  );
}
