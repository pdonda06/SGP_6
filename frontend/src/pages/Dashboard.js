import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getHealthData } from '../features/healthData/healthDataSlice';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { healthData, isLoading } = useSelector((state) => state.healthData);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      // Fetch health data based on user role
      dispatch(getHealthData({}));
    }
  }, [user, navigate, dispatch]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  // Render dashboard based on user role
  const renderDashboard = () => {
    if (!user) return null;

    if (user.role === 'super-admin') {
      return (
        <div className="admin-dashboard">
          <h2>Super Admin Dashboard</h2>
          <div className="alert alert-info">
            <strong>Administrator Access:</strong> You have full access to all health reports across all facilities, departments, districts, and states.
          </div>
          <div className="dashboard-cards">
            <div className="card">
              <h3>Total Reports</h3>
              <p className="count">{healthData ? healthData.length : 0}</p>
            </div>
            <div className="card">
              <h3>Pending Review</h3>
              <p className="count">
                {healthData ? healthData.filter(data => data.status === 'submitted').length : 0}
              </p>
            </div>
            <div className="card">
              <h3>Approved Reports</h3>
              <p className="count">
                {healthData ? healthData.filter(data => data.status === 'approved').length : 0}
              </p>
            </div>
            <div className="card">
              <h3>Rejected Reports</h3>
              <p className="count">
                {healthData ? healthData.filter(data => data.status === 'rejected').length : 0}
              </p>
            </div>
          </div>
          <div className="action-buttons">
            <button className="btn" onClick={() => navigate('/view-reports')}>
              View All Reports
            </button>
            <button className="btn" onClick={() => navigate('/add-report')}>
              Add New Report
            </button>
            <button className="btn" onClick={() => navigate('/manage-users')}>
              Manage Users
            </button>
            <button className="btn" onClick={() => navigate('/manage-departments')}>
              Manage Departments
            </button>
          </div>
        </div>
      );
    }
    
    if (user.role === 'state-admin' || user.role === 'district-admin') {
      return (
        <div className="admin-dashboard">
          <h2>{user.role === 'state-admin' ? 'State' : 'District'} Admin Dashboard</h2>
          <div className="dashboard-cards">
            <div className="card">
              <h3>Total Reports</h3>
              <p className="count">{healthData ? healthData.length : 0}</p>
            </div>
            <div className="card">
              <h3>Pending Review</h3>
              <p className="count">
                {healthData ? healthData.filter(data => data.status === 'submitted').length : 0}
              </p>
            </div>
            <div className="card">
              <h3>Approved Reports</h3>
              <p className="count">
                {healthData ? healthData.filter(data => data.status === 'approved').length : 0}
              </p>
            </div>
          </div>
          <div className="action-buttons">
            <button className="btn" onClick={() => navigate('/view-reports')}>
              Review Reports
            </button>
            <button className="btn" onClick={() => navigate('/add-report')}>
              Add New Report
            </button>
            <button className="btn" onClick={() => navigate('/manage-users')}>
              Manage Users
            </button>
            <button className="btn" onClick={() => navigate('/manage-departments')}>
              Manage Departments
            </button>
          </div>
        </div>
      );
    }
    
    if (user.role === 'hospital-admin') {
      return (
        <div className="admin-dashboard">
          <h2>Hospital Admin Dashboard</h2>
          <div className="dashboard-cards">
            <div className="card">
              <h3>Total Reports</h3>
              <p className="count">{healthData ? healthData.length : 0}</p>
            </div>
            <div className="card">
              <h3>Draft Reports</h3>
              <p className="count">
                {healthData ? healthData.filter(data => data.status === 'draft').length : 0}
              </p>
            </div>
            <div className="card">
              <h3>Submitted Reports</h3>
              <p className="count">
                {healthData ? healthData.filter(data => data.status === 'submitted').length : 0}
              </p>
            </div>
          </div>
          <div className="action-buttons">
            <button className="btn" onClick={() => navigate('/add-report')}>
              Add New Report
            </button>
            <button className="btn" onClick={() => navigate('/view-reports')}>
              View Hospital Reports
            </button>
            <button className="btn" onClick={() => navigate('/manage-departments')}>
              Manage Departments
            </button>
            <button className="btn" onClick={() => navigate('/manage-users')}>
              Manage Users
            </button>
          </div>
        </div>
      );
    }
    
    if (user.role === 'department-user') {
      return (
        <div className="user-dashboard">
          <h2>Department User Dashboard</h2>
          <div className="dashboard-cards">
            <div className="card">
              <h3>My Reports</h3>
              <p className="count">{healthData ? healthData.length : 0}</p>
            </div>
            <div className="card">
              <h3>Draft Reports</h3>
              <p className="count">
                {healthData ? healthData.filter(data => data.status === 'draft').length : 0}
              </p>
            </div>
            <div className="card">
              <h3>Submitted Reports</h3>
              <p className="count">
                {healthData ? healthData.filter(data => data.status === 'submitted').length : 0}
              </p>
            </div>
          </div>
          <div className="action-buttons">
            <button className="btn" onClick={() => navigate('/add-report')}>
              Add New Report
            </button>
            <button className="btn" onClick={() => navigate('/view-reports')}>
              View My Reports
            </button>
          </div>
          
          <h3>Recent Reports</h3>
          <div className="recent-reports">
            {healthData && healthData.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Reporting Period</th>
                    <th>Status</th>
                    <th>Submitted On</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {healthData.slice(0, 5).map((report) => (
                    <tr key={report._id}>
                      <td>
                        {report.reportingPeriod.month}/{report.reportingPeriod.year}
                      </td>
                      <td className={`status-${report.status}`}>
                        {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                      </td>
                      <td>{formatDate(report.submittedAt)}</td>
                      <td>
                        <button
                          className="btn-sm"
                          onClick={() => navigate(`/report/${report._id}`)}
                        >
                          View
                        </button>
                        {report.status === 'draft' && (
                          <button
                            className="btn-sm"
                            onClick={() => navigate(`/report/${report._id}/edit`)}
                          >
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No reports found. Create your first report.</p>
            )}
          </div>
        </div>
      );
    }
    
    return <div>Unknown user role</div>;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <p>Welcome, {user?.name}</p>
      {renderDashboard()}
    </div>
  );
}

export default Dashboard; 