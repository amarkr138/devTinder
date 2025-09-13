devTinder

A MERN stack web application inspired by modern networking platforms. devTinder helps developers connect, collaborate, and explore premium features like chat, payments, and profile management.

🚀 Features

🔐 User authentication (Login/Signup)

👤 Profile creation & editing

🤝 Connection requests (accept/reject)

💬 Real-time chat using Socket.io

💎 Premium membership with Razorpay integration

📱 Responsive frontend built with React + Tailwind CSS

🛠️ Tech Stack

Frontend: React.js, Vite, Tailwind CSS, Axios
Backend: Node.js, Express.js, MongoDB, Mongoose
Authentication: JWT
Real-time: Socket.io
Payments: Razorpay API
tools : Postman , MongoDB Compass

📂 Folder Structure
devTinder/
│── backend/         # Express + MongoDB backend
│   ├── src/
│   │   ├── models/  
│   │   ├── routes/  
│   │   ├── utils/  
│   │   └── app.js  
│   ├── package.json  
│   └── config/  
│
│── frontend/        # React frontend
│   ├── src/  
│   │   ├── components/  
│   │   ├── utils/  
│   │   └── App.jsx  
│   ├── index.html  
│   ├── vite.config.js  
│   └── package.json  
│
└── README.md

⚡ Getting Started
1️⃣ Clone the repo
git clone https://github.com/amarkr138/devTinder.git
cd devTinder

2️⃣ Setup Backend
cd backend
npm install


Create a .env file in /backend with:

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
RAZORPAY_KEY_ID=your_key
RAZORPAY_SECRET=your_secret


Start the backend:

npm start

3️⃣ Setup Frontend
cd frontend
npm install
npm run dev

🌐 Deployment

Backend: Render / Railway

Frontend: Vercel / Netlify

🔮 Future Improvements

Add notifications system

Profile recommendations

Group chats

Better premium plans
