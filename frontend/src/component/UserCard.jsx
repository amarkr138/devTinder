import axios from 'axios';
import React from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();
  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + '/request/sent/' + status + '/' + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <div className="card bg-base-300 w-80 shadow-sm">
        <figure>
          <img src={photoUrl}  alt={firstName + ' ' + lastName} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + ' ' + lastName}</h2>
          <p>{age + ', ' + gender}</p>
          <p>{about}</p>
          <div className="card-actions justify-center">
            <button
              className="btn bg-red-500"
              onClick={() => handleSendRequest('ignored', _id)}
            >
              Ignore
            </button>
            <button
              className="btn bg-green-500"
              onClick={() => handleSendRequest('interested', _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
