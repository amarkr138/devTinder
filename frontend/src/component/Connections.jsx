import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/connectionSlice';

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
        const {_id, firstName, lastName, photoUrl, age, gender, about } =
          connection;
        return (
          <div key = {_id} className="flex flex-col sm:flex-row justify-between m-4 mx-auto p-4 
             rounded-lg bg-base-300 items-center w-full max-w-md shadow">
            <div>
              <img alt="photo" className="w-24 h-24 sm:w-20 sm:h-20 rounded-full object-cover" src={photoUrl} />
            </div>
            <div className='text-center sm:text-left sm:mx-6 mt-2 sm:mt-0 '>
              {' '}
              <h2 className='font-bold text-lg'>{firstName + ' ' + lastName}</h2>
             {age && gender && <h2 >{age+ ","+gender}</h2>
}              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
