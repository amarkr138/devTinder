import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests } from '../utils/requestSlice';
import { removeConnection } from '../utils/connectionSlice';

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + '/request/review/' + status + '/' + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeConnection(_id));
    } catch (err) {
      console.error(err);
    }
  };
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/request/received', {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0) {
    return <h1 className='flex justify-center mt-10 '>No Request Found!</h1>;
  }

  return (
    <div className="text-center my-10">
      <h1 className="text-2xl font-bold text-white ">Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;
        return (
          <div
            key={_id}
            className="flex flex-col sm:flex-row justify-between m-4 mx-auto p-4 
             rounded-lg bg-base-300 items-center w-full max-w-md shadow"
          >
            <div>
              <img
                alt="photo"
                className="w-24 h-24 sm:w-20 sm:h-20 rounded-full object-cover"
                src={photoUrl}
              />
            </div>
            <div className="text-center sm:text-left sm:mx-6 mt-2 sm:mt-0 ">
              {' '}
              <h2 className="font-bold text-lg">
                {firstName + ' ' + lastName}
              </h2>
              {age && gender && <h2>{age + ',' + gender}</h2>} <p>{about}</p>
            </div>
            <div className="mt-3 sm:mt-0 flex gap-2">
              <button
                className="btn btn-outline text-green-600 mx-2"
                onClick={() => reviewRequest('accepted', request._id)}
              >
                Accept
              </button>
              <button
                className="btn btn-outline text-red-700 mx-2"
                onClick={() => reviewRequest('rejected', request._id)}
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
