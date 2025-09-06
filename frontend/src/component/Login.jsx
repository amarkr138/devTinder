import axios from 'axios';
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
      dispatch(addUser(res.data))
      navigate("/profile")
    } catch (err) {
      setError(err?.response?.data || 'Something went wrong');
    }
  };
  return (
    <div className="flex justify-center mt-10">
      <div className="card card-dash bg-base-200 w-85">
        <div className="card-body ">
          <h2 className="card-title text-xl font-semibold justify-center">
            {isLoginForm ? 'Login' : 'SignUp'}
          </h2>
          {!isLoginForm && (
            <>
              <div>
                <fieldset className="fieldset my-1">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="Enter the email address"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
              </div>
              <div>
                <fieldset className="fieldset my-1">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="Enter the email address"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
              </div>
            </>
          )}
          <div>
            <fieldset className="fieldset my-1">
              <legend className="fieldset-legend">Email Id</legend>
              <input
                type="text"
                className="input"
                placeholder="Enter the email address"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>
          </div>
          <div>
            <fieldset className="fieldset my-1">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input"
                placeholder="Enter valid Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center my-1">
            <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleClick : handleSignUp}
            >
              {isLoginForm ? 'Login' : 'Sign Up'}
            </button>
          </div>
          <p className='cursor-pointer py-2 text-blue-800' onClick={()=>setIsLoginForm((value)=> !value)}>{isLoginForm? "New User? Signup Here!" : "Existing User! Login Here"}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
