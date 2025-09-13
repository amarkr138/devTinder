import axios from 'axios';
import loginBg from './bg-login.png';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const res = await axios.post(
        BASE_URL + '/login',
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      navigate('/');
    } catch (err) {
      setError(err?.response?.data || 'Something went wrong');
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + '/signup',
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate('/profile');
    } catch (err) {
      setError(err?.response?.data || 'Something went wrong');
    }
  };
  return (
    <div
      className="h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      {
        <div className="flex justify-center ">
          <div className="card  bg-[rgba(17,24,39,0.8)] backdrop-blur-md w-85 rounded-2xl mt-20">
            <div className="card-body  ">
              <h2 className="card-title text-2xl font-semibold justify-center mb-2">
                {isLoginForm ? 'devTinder' : 'SignUp'}
              </h2>
              <h1 className="text-3xl text-center font-semibold mb-4">
                {isLoginForm ? 'Welcome back !' : null}
              </h1>
              {!isLoginForm && (
                <>
                  <div>
                    <fieldset className="fieldset my-1">
                      {/* <legend className="fieldset-legend">First Name</legend> */}
                      <input
                        type="text"
                        className="input rounded-lg"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </fieldset>
                  </div>
                  <div>
                    <fieldset className="fieldset my-1">
                      {/* <legend className="fieldset-legend">Last Name</legend> */}
                      <input
                        type="text"
                        className="input rounded-lg"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </fieldset>
                  </div>
                </>
              )}
              <div>
                <fieldset className="fieldset my-1 ">
                  {/* <legend className="fieldset-legend">Email Id</legend> */}
                  <input
                    type="text"
                    className="input rounded-lg"
                    placeholder="Email"
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                  />
                </fieldset>
              </div>
              <div>
                <fieldset className="fieldset my-1">
                  {/* <legend className="fieldset-legend">Password</legend> */}
                  <input
                    type="password"
                    className="input rounded-lg"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </fieldset>
              </div>
              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center my-1">
                <button
                  className="btn btn-primary w-full rounded-lg text-lg"
                  onClick={isLoginForm ? handleClick : handleSignUp}
                >
                  {isLoginForm ? 'Log in' : 'Sign Up'}
                </button>
              </div>
              <p
                className="cursor-pointer py-2 text-center hover:text-gray-400"
                onClick={() => setIsLoginForm((value) => !value)}
              >
                {isLoginForm
                  ? "Don't have an account? Sign up"
                  : 'Existing User! Login Here'}
              </p>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default Login;
