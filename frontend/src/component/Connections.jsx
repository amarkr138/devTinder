import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/connectionSlice';
import { Link } from 'react-router-dom';

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/connections', {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchConnection();
  }, []);

  if (!connections) return;
  if (connections.length === 0) {
    return <h1>No Connections found!</h1>;
  }

  return (
    <div className="text-center my-10">
      <h1 className="text-2xl font-bold text-white ">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;
        return (
          <div
            key={_id}
            className="flex flex-col sm:flex-row justify-between m-4 mx-auto p-4 
             rounded-lg bg-base-300 items-center w-full max-w-lg shadow"
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
            <Link to={'/chat/' + _id}>
              <button className=" items-center cursor-pointer hover:text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                  />
                </svg>
              </button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
