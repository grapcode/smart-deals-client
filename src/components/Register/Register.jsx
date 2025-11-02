import React, { use } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { Link } from 'react-router';

const Register = () => {
  const { signInWithGoogleFunc } = use(AuthContext);

  const handleGoogleSignIn = () => {
    signInWithGoogleFunc()
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success('Google sign-in successful.', user);

        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        };
        // create user in the database
        fetch('http://localhost:5000/users', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log('data after user  save', data);
          });
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };
  return (
    <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl mt-25">
      <h1 className="text-3xl text-center py-8 font-bold">Register now!</h1>
      <form className="card-body">
        <fieldset className="fieldset">
          {/* name */}
          <label className="label">Name</label>
          <input
            type="text"
            name="name"
            className="input"
            placeholder="Your Name"
          />
          {/* name */}
          <label className="label">Photo </label>
          <input
            type="text"
            name="photo"
            className="input"
            placeholder="Photo url"
          />

          {/* email */}
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Email"
          />
          {/* password */}
          <label className="label">Password</label>
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Password"
          />

          <button className="btn btn-neutral mt-4">Resister</button>
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
        <p className="text-sm text-black/60">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-pink-500 hover:text-indigo-500 font-medium underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
