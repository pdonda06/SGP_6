# <div align="center">🏥 MediCare</div>

<div align="center">
  <h3>A Modern Health Data Management System</h3>

  [![MERN Stack](https://img.shields.io/badge/MERN-Stack-green.svg)](https://www.mongodb.com/mern-stack)
  [![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
  [![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
  [![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
  [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
  [![Material UI](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)](https://mui.com/)
  [![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
  
  <a href="#demo">View Demo</a> •
  <a href="#features">Features</a> •
  <a href="#installation">Installation</a> •
  <a href="#api">API</a> •
  <a href="#contributing">Contributing</a>
  
  <br/>
  
  <img src="https://via.placeholder.com/1200x600?text=MediCare+Dashboard" alt="MediCare Dashboard" width="80%">
</div>

<br/>

## ✨ Overview

**MediCare** is a comprehensive health data management platform that seamlessly connects healthcare facilities across regions. Built on the robust MERN stack, it delivers a fluid experience for collecting, analyzing, and managing critical health data through a sophisticated hierarchical workflow.

<table>
  <tr>
    <td>
      <h3>🔐 Secure</h3>
      Role-based permissions with JWT authentication and encrypted password storage
    </td>
    <td>
      <h3>📱 Responsive</h3>
      Optimized experience across all devices with mobile-first design
    </td>
    <td>
      <h3>⚡ Fast</h3>
      Performance-optimized with modern React patterns and efficient data fetching
    </td>
  </tr>
  <tr>
    <td>
      <h3>🔄 Real-time</h3>
      Instant updates and notifications for critical data changes
    </td>
    <td>
      <h3>📊 Analytics</h3>
      Powerful visualization tools for data-driven insights
    </td>
    <td>
      <h3>🌐 Offline-ready</h3>
      Progressive Web App capabilities for working without internet
    </td>
  </tr>
</table>

<hr>

<a id="features"></a>
## 🌟 Features

<details open>
<summary><h3>🔐 User Management</h3></summary>

- **Multi-level Access Control**
  - Super-admin: System-wide administration
  - State-admin: State-level oversight
  - District-admin: District-level management
  - Hospital-admin: Facility management
  - Department-user: Data entry and reporting

- **Secure Authentication**
  - JWT-based auth flow
  - Password encryption
  - Session management

- **User Administration**
  - User provisioning and deactivation
  - Permission management
  - Profile customization
</details>

<details>
<summary><h3>🏢 Healthcare Facility Management</h3></summary>

- **Comprehensive Facility Profiles**
  - Detailed facility information
  - Resource tracking
  - Service capabilities

- **Department Structure**
  - Department categorization
  - Staff assignment
  - Specialized reporting templates

- **Hierarchical Organization**
  - Geographic mapping (State → District)
  - Administrative hierarchy
  - Reporting relationships
</details>

<details>
<summary><h3>📝 Health Data Reporting</h3></summary>

- **Intelligent Forms**
  - Context-aware data collection
  - Field validation
  - Intelligent defaults

- **Sophisticated Workflow**
  - Draft creation and saving
  - Submission protocol
  - Multi-stage review process
  - Approval/rejection handling

- **Data Quality Assurance**
  - Validation rules
  - Consistency checks
  - Historical comparison

- **Report Lifecycle**
  - Versioning and history
  - Audit trails
  - Notification system
</details>

<details>
<summary><h3>📊 Visualization & Analytics</h3></summary>

- **Executive Dashboard**
  - Performance indicators
  - Trend spotting
  - Resource utilization

- **Advanced Visualizations**
  - Interactive charts
  - Comparative analysis
  - Geographic mapping

- **Data Export**
  - Multiple formats (CSV, PDF, Excel)
  - Custom report generation
  - Scheduled exports
</details>

<details>
<summary><h3>📱 Progressive Web App</h3></summary>

- **Offline Capability**
  - Data caching
  - Background sync
  - Offline form submission

- **Cross-platform Installation**
  - Add to home screen
  - Native-like experience
  - Push notifications

- **Responsive Design**
  - Fluid layouts
  - Touch optimization
  - Adaptive content
</details>

<hr>

<a id="tech-stack"></a>
## 🚀 Technology Stack

<div style="display: flex; flex-wrap: wrap; gap: 20px;">
  <div style="flex: 1; min-width: 300px;">
    <h3>🖥️ Frontend</h3>
    <ul>
      <li><strong>React 18</strong> - Component-based UI</li>
      <li><strong>Material UI v6</strong> - Design system</li>
      <li><strong>Redux Toolkit</strong> - State management</li>
      <li><strong>React Router v7</strong> - Navigation</li>
      <li><strong>Axios</strong> - API communication</li>
      <li><strong>Lucide React</strong> - Vector icons</li>
      <li><strong>Recharts</strong> - Interactive charts</li>
      <li><strong>React Toastify</strong> - User notifications</li>
    </ul>
  </div>
  
  <div style="flex: 1; min-width: 300px;">
    <h3>⚙️ Backend</h3>
    <ul>
      <li><strong>Node.js</strong> - JavaScript runtime</li>
      <li><strong>Express</strong> - Web framework</li>
      <li><strong>MongoDB</strong> - NoSQL database</li>
      <li><strong>Mongoose</strong> - Data modeling</li>
      <li><strong>JWT</strong> - Authentication</li>
      <li><strong>Bcrypt</strong> - Password security</li>
    </ul>
  </div>

  <div style="flex: 1; min-width: 300px;">
    <h3>🔧 Development Tools</h3>
    <ul>
      <li><strong>Webpack</strong> - Asset bundling</li>
      <li><strong>ESLint</strong> - Code quality</li>
      <li><strong>Concurrently</strong> - Dev workflow</li>
    </ul>
  </div>
</div>

<hr>

<a id="mobile"></a>
## 📱 Mobile Experience

<div style="display: flex; align-items: center; margin: 20px 0;">
  <div style="flex: 1;">
    <h3>Expertly Crafted for Mobile Devices</h3>
    <p>MediCare delivers an exceptional mobile experience through:</p>
    <ul>
      <li><strong>Adaptive Layouts</strong> - Fluid design across all screen sizes</li>
      <li><strong>Touch Optimization</strong> - Gesture support and larger touch targets</li>
      <li><strong>Virtual Keyboard Handling</strong> - Smart field focus and scrolling</li>
      <li><strong>Performance Optimization</strong> - Fast loading and smooth animations</li>
      <li><strong>Offline-First Architecture</strong> - Resilient to network issues</li>
    </ul>
  </div>
  <div style="flex: 1; text-align: center;">
    <img src="https://via.placeholder.com/300x600?text=Mobile+View" alt="Mobile View" width="200">
  </div>
</div>

<hr>

<a id="structure"></a>
## 🏗️ Project Architecture

```mermaid
graph TD
    Client[Frontend React App]
    Server[Backend Express]
    Database[(MongoDB)]
    
    Client --> |HTTP Requests| Server
    Server --> |Queries| Database
    Database --> |Results| Server
    Server --> |JSON Responses| Client
    
    subgraph Frontend
    Components[UI Components]
    Pages[Pages/Views]
    Hooks[Custom Hooks]
    Utils[Utilities]
    State[Redux Store]
    
    Components --> Pages
    Hooks --> Pages
    Hooks --> Components
    Utils --> Components
    Utils --> Pages
    State --> Pages
    State --> Components
    end
    
    subgraph Backend
    Routes[API Routes]
    Controllers[Controllers]
    Models[Mongoose Models]
    Middleware[Middleware]
    
    Routes --> Controllers
    Controllers --> Models
    Middleware --> Routes
    end
```

<div style="background-color: #f6f8fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
<h3>Project Structure</h3>

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
```
</div>

<hr>

<a id="installation"></a>
## 🛠️ Installation

<table>
<tr>
<td>

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm or yarn

</td>
<td>

### Quick Start
```bash
# Clone repository
git clone https://github.com/yourusername/medicare.git
cd medicare

# Install dependencies & start
npm run setup
npm run dev
```

</td>
</tr>
</table>

<details>
<summary><h3>Detailed Setup Instructions</h3></summary>

#### Backend Setup
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

#### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

#### Run both concurrently
```bash
# From the backend directory
npm run dev
```
</details>

<hr>

<a id="api"></a>
## 📊 API Documentation

<div style="background-color: #f6f8fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
<h3>Base URL</h3>
<code>http://localhost:5001/api</code> (Development)
</div>

<details>
<summary><h3>Authentication</h3></summary>

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| `POST` | `/auth/register` | Register a new user | No |
| `POST` | `/auth/login` | Login existing user | No |
| `GET`  | `/auth/me` | Get current user | Yes |
| `POST` | `/auth/logout` | Logout user | Yes |

</details>

<details>
<summary><h3>Users</h3></summary>

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| `GET` | `/users` | Get all users | Yes (Admin) |
| `GET` | `/users/:id` | Get single user | Yes |
| `PUT` | `/users/:id` | Update user | Yes |
| `DELETE` | `/users/:id` | Delete user | Yes (Admin) |

</details>

<details>
<summary><h3>Facilities</h3></summary>

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| `GET` | `/facilities` | Get all facilities | Yes |
| `POST` | `/facilities` | Create facility | Yes (Admin) |
| `GET` | `/facilities/:id` | Get single facility | Yes |
| `PUT` | `/facilities/:id` | Update facility | Yes (Admin) |
| `DELETE` | `/facilities/:id` | Delete facility | Yes (Admin) |

</details>

<details>
<summary><h3>Departments</h3></summary>

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| `GET` | `/departments` | Get all departments | Yes |
| `POST` | `/departments` | Create department | Yes (Admin) |
| `GET` | `/departments/:id` | Get single department | Yes |
| `PUT` | `/departments/:id` | Update department | Yes (Admin) |
| `DELETE` | `/departments/:id` | Delete department | Yes (Admin) |

</details>

<details>
<summary><h3>Health Data</h3></summary>

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| `GET` | `/health-data` | Get all reports | Yes |
| `POST` | `/health-data` | Create report | Yes |
| `GET` | `/health-data/:id` | Get single report | Yes |
| `PUT` | `/health-data/:id` | Update report | Yes |
| `DELETE` | `/health-data/:id` | Delete report | Yes (Admin) |

</details>

<hr>

<a id="contributing"></a>
## 👥 Contributing

We welcome contributions from the community! Follow these steps to contribute:

<ol>
  <li>Fork the repository</li>
  <li>Create a feature branch: <code>git checkout -b feature/amazing-feature</code></li>
  <li>Commit your changes: <code>git commit -m 'Add some amazing feature'</code></li>
  <li>Push to the branch: <code>git push origin feature/amazing-feature</code></li>
  <li>Open a Pull Request</li>
</ol>

<p>Please make sure to update tests as appropriate and adhere to the existing coding style.</p>

<hr>

<a id="demo"></a>
## 🌐 Live Demo

<p align="center">
  <a href="#demo">
    <img src="https://via.placeholder.com/800x400?text=MediCare+Live+Demo" alt="Demo Banner" width="80%">
  </a>
  <br>
  <em>Coming Soon</em>
</p>

<hr>

<div align="center">
  <h3>📄 License</h3>
  <p>This project is licensed under the MIT License - see the <a href="LICENSE">LICENSE</a> file for details.</p>
  
  <h3>🙏 Acknowledgements</h3>
  <p>
    <a href="https://mui.com/"><img src="https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white" alt="Material UI"></a>
    <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"></a>
    <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"></a>
    <a href="https://www.mongodb.com/"><img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"></a>
    <a href="https://expressjs.com/"><img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"></a>
    <a href="https://lucide.dev/"><img src="https://img.shields.io/badge/Lucide-000000?style=for-the-badge&logo=lucide&logoColor=white" alt="Lucide"></a>
  </p>
  
  <p>Made with ❤️ by Your Team</p>
</div>
