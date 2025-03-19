import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to={user ? "/dashboard" : "/"}>Health Data Management System</Link>
      </div>
      <ul>
        {user ? (
          <>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/add-report">Add Report</Link>
            </li>
            <li>
              <Link to="/view-reports">View Reports</Link>
            </li>
            {(user.role === 'super-admin' || user.role === 'state-admin' || 
              user.role === 'district-admin' || user.role === 'hospital-admin') && (
              <>
                <li>
                  <Link to="/manage-departments">Manage Departments</Link>
                </li>
                <li>
                  <Link to="/manage-users">Manage Users</Link>
                </li>
              </>
            )}
            <li>
              <button className="btn" onClick={onLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/create-facility">Create Facility</Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header; 