🏢 Residential Society Management System (RSMS)
A full-stack MERN application for managing residential society operations including flat owners, complaints, and notices.

📋 Features
Admin Features
📊 Dashboard with statistics (total owners, complaints, notices)
👥 Flat Owner Management (Add, Edit, Delete, Search)
📝 Complaint Management (View all, Update status)
📢 Notice Management (Create, Edit, Delete with expiry dates)
Flat Owner Features
🏠 Personal Dashboard
📝 Register Complaints
📊 View Complaint Status
📢 View Active Notices
🛠️ Technology Stack
Frontend
React 18 with Vite
Tailwind CSS
React Router DOM v6
Axios
Context API for state management
Backend
Node.js v22.21.1
Express.js
MongoDB Atlas (Mongoose)
JWT Authentication
bcryptjs for password hashing
🎨 Theme Colors
css
Primary:   #22177A
Secondary: #605EA1
Accent:    #8EA3A6
Lite:      #E6E9AF
📁 Project Structure
rsms-project/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── ownerController.js
│   │   ├── complaintController.js
│   │   └── noticeController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Complaint.js
│   │   └── Notice.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── ownerRoutes.js
│   │   ├── complaintRoutes.js
│   │   └── noticeRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── roleCheck.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Card.jsx
│   │   │   └── Table.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── ManageOwners.jsx
│   │   │   ├── ManageComplaints.jsx
│   │   │   ├── ManageNotices.jsx
│   │   │   └── OwnerDashboard.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── utils/
│   │   │   └── axios.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
└── README.md
🚀 Installation & Setup
Prerequisites
Node.js v22.21.1
MongoDB Atlas account
Git
Step 1: Clone the Repository
bash
git clone <your-repo-url>
cd rsms-project
Step 2: Backend Setup
Navigate to backend directory:
bash
cd backend
Install dependencies:
bash
npm install
Create .env file:
env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/rsms?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here_change_this
Start backend server:
bash
npm run dev
Backend will run on http://localhost:5000

Step 3: Frontend Setup
Open new terminal and navigate to frontend:
bash
cd frontend
Install dependencies:
bash
npm install
Start frontend:
bash
npm run dev
Frontend will run on http://localhost:3000

🗄️ MongoDB Atlas Setup
Create account at MongoDB Atlas
Create a new cluster
Create database user with username and password
Whitelist your IP address (or use 0.0.0.0/0 for development)
Get connection string and add to .env file
Replace <username>, <password>, and database name in connection string
👤 Default Users
You need to manually create users in MongoDB. Here are sample users:

Admin User
json
{
  "name": "Admin User",
  "email": "admin@rsms.com",
  "password": "admin123",
  "flatNo": "A-101",
  "role": "admin"
}
Owner User
json
{
  "name": "John Doe",
  "email": "owner@rsms.com",
  "password": "owner123",
  "flatNo": "B-205",
  "role": "owner"
}
Note: Passwords will be automatically hashed when saved through the API.

Creating Initial Admin
You can use MongoDB Compass or create via API call:

bash
POST http://localhost:5000/api/owners
Content-Type: application/json
Authorization: Bearer <admin-token>

{
  "name": "Admin User",
  "email": "admin@rsms.com",
  "password": "admin123",
  "flatNo": "A-101"
}
Then manually change role to "admin" in database.

📝 API Endpoints
Authentication
POST /api/auth/login - Login user
GET /api/auth/profile - Get user profile (Protected)
Owners (Admin Only)
GET /api/owners - Get all owners
GET /api/owners/search?search=query - Search owners
POST /api/owners - Create owner
PUT /api/owners/:id - Update owner
DELETE /api/owners/:id - Delete owner
Complaints
POST /api/complaints - Register complaint (Owner)
GET /api/complaints - Get all complaints
GET /api/complaints/my - Get my complaints (Owner)
GET /api/complaints/stats - Get complaint statistics (Admin)
PUT /api/complaints/:id - Update complaint status (Admin)
Notices
GET /api/notices - Get all notices
GET /api/notices/active - Get active notices
POST /api/notices - Create notice (Admin)
PUT /api/notices/:id - Update notice (Admin)
DELETE /api/notices/:id - Delete notice (Admin)
🔐 Authentication
The application uses JWT (JSON Web Tokens) for authentication:

Token is generated on login
Stored in localStorage on frontend
Sent in Authorization header as Bearer token
Token expires in 30 days
📱 Mobile Responsive
The application is fully responsive and works on:

Desktop (1024px+)
Tablet (768px - 1023px)
Mobile (320px - 767px)
🎯 User Roles
Admin
Full access to all features
Can manage owners, complaints, and notices
Dashboard with statistics
Owner
Can register complaints
View their own complaints
View active notices
Limited dashboard
🧪 Testing the Application
Start both backend and frontend servers
Navigate to http://localhost:3000
Login with credentials:
Admin: admin@rsms.com / admin123
Owner: owner@rsms.com / owner123
Test Admin Features:
View dashboard statistics
Add/Edit/Delete flat owners
View all complaints and update status
Create/Edit/Delete notices
Test Owner Features:
Register a new complaint
View complaint status
View active notices
🐛 Troubleshooting
Backend won't start
Check if MongoDB URI is correct
Ensure MongoDB Atlas IP whitelist includes your IP
Verify Node.js version is 22.21.1
Frontend won't start
Delete node_modules and run npm install again
Clear browser cache
Check if backend is running on port 5000
Login fails
Ensure users exist in database
Check network tab for API errors
Verify JWT_SECRET in .env
CORS errors
Ensure backend has CORS enabled (already configured)
Check if frontend is making requests to correct backend URL
📦 Production Deployment
Backend (Heroku/Railway/Render)
Set environment variables
Update MongoDB Atlas IP whitelist
Deploy backend
Frontend (Vercel/Netlify)
Build frontend: npm run build
Update API URL in axios config
Deploy frontend
🔒 Security Considerations
Never commit .env file
Use strong JWT_SECRET
Keep dependencies updated
Implement rate limiting for production
Use HTTPS in production
Sanitize user inputs
📄 License
MIT License - feel free to use this project for learning or commercial purposes.

👨‍💻 Developer Notes
Code is kept simple and beginner-friendly
No complex logic or unnecessary abstractions
Clean file structure following best practices
Comments added where necessary
Mobile-first responsive design
🤝 Contributing
Feel free to fork this project and submit pull requests for any improvements.

📧 Support
For issues or questions, please create an issue in the repository.

Happy Coding! 🚀

