# MediCare - Health Data Management System

MediCare is a comprehensive health data information and management system built using the MERN stack (MongoDB, Express, React, Node.js). It enables healthcare facilities to efficiently collect, manage, and analyze health data reports through a hierarchical approval workflow.

![MediCare Dashboard](https://via.placeholder.com/800x400?text=MediCare+Dashboard)

## 🌟 Features

### User Management
- **Role-based Access Control**: Super-admin, State-admin, District-admin, Hospital-admin, Department-user
- **User Authentication**: Secure login and registration
- **User Administration**: Create, edit, delete users with appropriate permissions

### Healthcare Facility Management
- **Facility Registration**: Register healthcare facilities with comprehensive details
- **Department Management**: Manage departments within facilities
- **Hierarchical Structure**: State → District → Facility → Department organization

### Health Data Reporting
- **Structured Reports**: Standardized forms for health data submission
- **Approval Workflow**: Draft → Submitted → Reviewed → Approved/Rejected
- **Data Validation**: Form validation to ensure data quality
- **Report Management**: View, edit, and track reports

### Data Visualization and Analytics
- **Dashboard**: Interactive dashboard with key metrics
- **Charts and Graphs**: Visual representation of health data trends
- **Export Functionality**: Download reports in various formats

### Progressive Web App Features
- **Offline Support**: Work without internet connection
- **Installable**: Add to home screen on mobile devices
- **Mobile Responsive**: Optimized for all screen sizes

## 🚀 Technology Stack

### Frontend
- **React**: UI library for building user interfaces
- **Material UI**: Component library for modern design
- **Redux Toolkit**: State management
- **React Router**: Navigation and routing
- **Axios**: API requests
- **Lucide React**: Modern icon library
- **Recharts**: Data visualization
- **React Toastify**: Notifications

### Backend
- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: ODM for MongoDB
- **JWT**: Authentication
- **Bcrypt**: Password hashing

### Development Tools
- **Webpack**: Module bundling
- **ESLint**: Code linting
- **Concurrently**: Run multiple commands

## 📱 Mobile Responsiveness

MediCare is designed to be fully responsive across all devices:

- **Adaptive Layouts**: Optimized UI components for different screen sizes
- **Touch-friendly Interface**: Larger touch targets on mobile
- **Gesture Support**: Swipe navigation and interactions
- **Keyboard Management**: Smart handling of virtual keyboards
- **Mobile-optimized Forms**: Enhanced form controls for touch input

## 🏗️ Project Structure

```
medicare/
├── backend/                # Backend Node.js server
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Authentication and error middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   └── server.js           # Server entry point
│
├── frontend/               # React frontend
│   ├── public/             # Public assets and index.html
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── hooks/          # Custom React hooks
│       ├── pages/          # Main application pages
│       ├── utils/          # Utility functions
│       ├── App.js          # Main application component
│       └── index.js        # Frontend entry point
│
└── README.md               # Project documentation
```

## 🛠️ Installation and Setup

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm or yarn

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create a .env file with the following variables
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# PORT=5001 (or preferred port)

# Start the development server
npm run server
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

### Run both concurrently
```bash
# From the backend directory
npm run dev
```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login existing user

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get single user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Facilities
- `GET /api/facilities` - Get all facilities
- `POST /api/facilities` - Create facility
- `GET /api/facilities/:id` - Get single facility
- `PUT /api/facilities/:id` - Update facility
- `DELETE /api/facilities/:id` - Delete facility

### Departments
- `GET /api/departments` - Get all departments
- `POST /api/departments` - Create department
- `GET /api/departments/:id` - Get single department
- `PUT /api/departments/:id` - Update department
- `DELETE /api/departments/:id` - Delete department

### Health Data
- `GET /api/health-data` - Get all reports
- `POST /api/health-data` - Create report
- `GET /api/health-data/:id` - Get single report
- `PUT /api/health-data/:id` - Update report
- `DELETE /api/health-data/:id` - Delete report

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Material UI](https://mui.com/)
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [Lucide Icons](https://lucide.dev/)
