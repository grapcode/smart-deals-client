import React, { use } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
  const { signInWithGoogleFunc } = use(AuthContext);

  const handleGoogleSignIn = () => {
    signInWithGoogleFunc()
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success('Google sign-in successful.', user);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };
  return (
    <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl mt-25">
      <h1 className="text-3xl text-center py-8 font-bold">Login now!</h1>
      <form className="card-body">
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email" className="input" placeholder="Email" />
          <label className="label">Password</label>
          <input type="password" className="input" placeholder="Password" />
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
        {/* Google */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="btn bg-white text-black border-[#e5e5e5]"
        >
          <FcGoogle />
          Login with Google
        </button>
        <p>
          Don't have a account?{' '}
          <Link
            to="/register"
            className="text-pink-500 hover:text-indigo-500 font-medium underline"
          >
            Register
          </Link>{' '}
        </p>
      </form>
    </div>
  );
};

export default Login;
