import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateFacility from './pages/CreateFacility';
import AddReport from './pages/AddReport';
import ViewReports from './pages/ViewReports';
import ManageDepartments from './pages/ManageDepartments';
import ManageUsers from './pages/ManageUsers';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import ViewReport from './pages/ViewReport';

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create-facility" element={<CreateFacility />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/add-report"
              element={
                <PrivateRoute>
                  <AddReport />
                </PrivateRoute>
              }
            />
            <Route
              path="/view-reports"
              element={
                <PrivateRoute>
                  <ViewReports />
                </PrivateRoute>
              }
            />
            <Route
              path="/manage-departments"
              element={
                <PrivateRoute>
                  <ManageDepartments />
                </PrivateRoute>
              }
            />
            <Route
              path="/manage-users"
              element={
                <PrivateRoute>
                  <ManageUsers />
                </PrivateRoute>
              }
            />
            <Route path="/report/:id" element={<ViewReport />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App; 