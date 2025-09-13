import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';

const Premium = () => {
  const [isPremiumUser, setIsPremiumUser] = useState(false);

  useEffect(() => {
    verifyPremiumUser();
  }, []);
  const verifyPremiumUser = async () => {
    const res = await axios.get(BASE_URL + '/premium/verify', {
      withCredentials: true,
    });
    if (res.data.isPremium) {
      setIsPremiumUser(true);
    }
  };

  const handleBuyClick = async (type) => {
    const order = await axios.post(
      BASE_URL + '/payment/create',
      { membershipType: type },
      {
        withCredentials: true,
      }
    );
    const { keyId, amount, currency, orderId, notes } = order.data;
    // Open Razorpay Checkout
    const options = {
      key: keyId,
      amount,
      currency,
      name: 'Dev Tinder',
      description: 'DevTinder connected to other developers!',
      order_id: orderId,
      prefill: {
        name: notes.firstName + ' ' + notes.lastName,
        email: notes.emailId,
      },
      theme: {
        color: '#F37254',
      },
      handler: async function (response) {
        try {
          await axios.post(`${BASE_URL}/payment/capture`, response, {
            withCredentials: true,
          });
          await verifyPremiumUser();
        } catch (err) {
          console.error('Error capturing payment:', err);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return isPremiumUser ? (
    <div>
      <p className="text-xl font-semibold flex justify-center mt-50">
        You are already a premium user!
      </p>
    </div>
  ) : (
    <div className="flex justify-between mt-25 ml-10 mr-10">
      <div className="card w-96 bg-base-300 shadow-sm ">
        <div className="card-body">
          {/* <span className="badge badge-xs badge-warning">Most Popular</span> */}
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">Silver Memembership</h2>
            {/* <span className="text-xl"></span> */}
          </div>
          <ul className="mt-6 flex flex-col gap-2 text-xs">
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>High-resolution image generation</span>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Customizable style templates</span>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Batch processing capabilities</span>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>AI-driven image enhancements</span>
            </li>
            <li className="opacity-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-base-content/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="line-through">Seamless cloud integration</span>
            </li>
            <li className="opacity-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-base-content/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="line-through">
                Real-time collaboration tools
              </span>
            </li>
          </ul>
          <div className="mt-6">
            <button
              className="btn btn-primary btn-block"
              onClick={() => handleBuyClick('silver')}
            >
              {' '}
              Buy at ₹300/mo
            </button>
          </div>
        </div>
      </div>
      <div className="card w-96 bg-base-300 shadow-sm ml-10">
        <div className="card-body">
          {/* <span className="badge badge-xs badge-warning">Most Popular</span> */}
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">Gold Memembership</h2>
            {/* <span className="text-xl"></span> */}
          </div>
          <ul className="mt-6 flex flex-col gap-2 text-xs">
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>High-resolution image generation</span>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Customizable style templates</span>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Batch processing capabilities</span>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>AI-driven image enhancements</span>
            </li>
            <li className="opacity-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-base-content/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="line-through">Seamless cloud integration</span>
            </li>
            <li className="opacity-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-base-content/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="line-through">
                Real-time collaboration tools
              </span>
            </li>
          </ul>
          <div className="mt-6">
            <button
              className="btn btn-primary btn-block"
              onClick={() => handleBuyClick('gold')}
            >
              {' '}
              Buy at ₹600/mo
            </button>
          </div>
        </div>
      </div>
      <div className="card w-96 bg-base-300 shadow-sm ml-10">
        <div className="card-body">
          <span className="badge badge-xs badge-warning">Most Popular</span>
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">Premium Memembership</h2>
            {/* <span className="text-xl"></span> */}
          </div>
          <ul className="mt-6 flex flex-col gap-2 text-xs">
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>High-resolution image generation</span>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Customizable style templates</span>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Batch processing capabilities</span>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>AI-driven image enhancements</span>
            </li>
            <li className="opacity-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-base-content/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="line-through">Seamless cloud integration</span>
            </li>
            <li className="opacity-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-base-content/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="line-through">
                Real-time collaboration tools
              </span>
            </li>
          </ul>
          <div className="mt-6">
            <button
              className="btn btn-primary btn-block"
              onClick={() => handleBuyClick('premium')}
            >
              {' '}
              Buy at ₹1000/mo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
