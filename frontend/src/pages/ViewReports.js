import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function ViewReports() {
  const { user } = useSelector((state) => state.auth);
  
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    year: new Date().getFullYear(),
    month: '',
    quarter: '',
    facility: '',
    department: '',
    status: ''
  });
  const [facilities, setFacilities] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  useEffect(() => {
    fetchReports();
    fetchFacilities();
    fetchDepartments();
  }, [pagination.page, filters]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };

      // Build query string from filters
      let queryParams = `page=${pagination.page}&limit=${pagination.limit}`;
      
      if (filters.year) queryParams += `&year=${filters.year}`;
      if (filters.month) queryParams += `&month=${filters.month}`;
      if (filters.quarter) queryParams += `&quarter=${filters.quarter}`;
      if (filters.facility) queryParams += `&facility=${filters.facility}`;
      if (filters.department) queryParams += `&department=${filters.department}`;
      if (filters.status) queryParams += `&status=${filters.status}`;
      
      const response = await axios.get(`/api/health-data?${queryParams}`, config);
      
      setReports(response.data.data);
      setPagination({
        page: response.data.pagination.page,
        limit: response.data.pagination.limit,
        total: response.data.total,
        pages: response.data.pagination.pages
      });
    } catch (error) {
      console.error('Error fetching reports:', error);
      toast.error('Failed to fetch reports');
    } finally {
      setLoading(false);
    }
  };

  const fetchFacilities = async () => {
    if (user.role === 'department-user') return;
    
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };

      // Filter facilities based on user role
      let url = '/api/facilities';
      if (user.role === 'hospital-admin') {
        url += `?_id=${user.facility}`;
      } else if (user.role === 'district-admin') {
        url += `?district=${user.district}`;
      } else if (user.role === 'state-admin') {
        url += `?state=${user.state}`;
      }

      const response = await axios.get(url, config);
      setFacilities(response.data.data);
    } catch (error) {
      console.error('Error fetching facilities:', error);
    }
  };

  const fetchDepartments = async () => {
    if (user.role === 'department-user') return;
    
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };

      // Filter departments based on user role and selected facility
      let url = '/api/departments';
      if (user.role === 'hospital-admin') {
        url += `?facility=${user.facility}`;
      } else if (filters.facility) {
        url += `?facility=${filters.facility}`;
      }

      const response = await axios.get(url, config);
      setDepartments(response.data.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Reset to first page when filters change
    setPagination(prev => ({
      ...prev,
      page: 1
    }));
    
    // If facility changes, fetch departments for that facility
    if (name === 'facility') {
      fetchDepartmentsForFacility(value);
    }
  };

  const fetchDepartmentsForFacility = async (facilityId) => {
    if (!facilityId) {
      setDepartments([]);
      return;
    }
    
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };
      
      const response = await axios.get(`/api/departments?facility=${facilityId}`, config);
      setDepartments(response.data.data);
    } catch (error) {
      console.error('Error fetching departments for facility:', error);
    }
  };

  const resetFilters = () => {
    setFilters({
      year: new Date().getFullYear(),
      month: '',
      quarter: '',
      facility: '',
      department: '',
      status: ''
    });
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.pages) return;
    
    setPagination(prev => ({
      ...prev,
      page: newPage
    }));
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'draft': return 'status-draft';
      case 'submitted': return 'status-submitted';
      case 'reviewed': return 'status-reviewed';
      case 'approved': return 'status-approved';
      case 'rejected': return 'status-rejected';
      default: return '';
    }
  };

  const getFormattedPeriod = (report) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const year = report.reportingPeriod?.year;
    const month = report.reportingPeriod?.month;
    
    if (year && month) {
      return `${months[month - 1]} ${year}`;
    } else if (year) {
      return `${year}`;
    }
    
    return 'Not specified';
  };

  return (
    <div className="dashboard-container">
      <h1>View Hospital Reports</h1>
      
      {user.role === 'super-admin' && (
        <div className="alert alert-info">
          <strong>Super Admin Access:</strong> You have access to all reports across all facilities, departments, districts, and states.
        </div>
      )}
      
      <div className="action-buttons">
        <Link to="/add-report" className="btn">
          Add New Report
        </Link>
      </div>
      
      <div className="card">
        <h3>Filter Reports</h3>
        <div className="filter-container">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="year">Year</label>
              <select
                id="year"
                name="year"
                value={filters.year}
                onChange={handleFilterChange}
              >
                <option value="">All Years</option>
                {[...Array(10)].map((_, i) => {
                  const year = new Date().getFullYear() - i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="month">Month</label>
              <select
                id="month"
                name="month"
                value={filters.month}
                onChange={handleFilterChange}
              >
                <option value="">All Months</option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="quarter">Quarter</label>
              <select
                id="quarter"
                name="quarter"
                value={filters.quarter}
                onChange={handleFilterChange}
              >
                <option value="">All Quarters</option>
                <option value="1">Q1 (Jan-Mar)</option>
                <option value="2">Q2 (Apr-Jun)</option>
                <option value="3">Q3 (Jul-Sep)</option>
                <option value="4">Q4 (Oct-Dec)</option>
              </select>
            </div>
          </div>
          
          <div className="form-row">
            {(user.role !== 'hospital-admin' && user.role !== 'department-user') && (
              <div className="form-group">
                <label htmlFor="facility">Facility</label>
                <select
                  id="facility"
                  name="facility"
                  value={filters.facility}
                  onChange={handleFilterChange}
                >
                  <option value="">All Facilities</option>
                  {facilities.map(facility => (
                    <option key={facility._id} value={facility._id}>
                      {facility.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            {user.role !== 'department-user' && (
              <div className="form-group">
                <label htmlFor="department">Department</label>
                <select
                  id="department"
                  name="department"
                  value={filters.department}
                  onChange={handleFilterChange}
                  disabled={departments.length === 0}
                >
                  <option value="">All Departments</option>
                  {departments.map(department => (
                    <option key={department._id} value={department._id}>
                      {department.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
              >
                <option value="">All Statuses</option>
                <option value="draft">Draft</option>
                <option value="submitted">Submitted</option>
                <option value="reviewed">Reviewed</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            
            <div className="form-group" style={{ alignSelf: 'flex-end' }}>
              <button className="btn" onClick={resetFilters}>
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {loading ? (
        <p>Loading reports...</p>
      ) : reports.length === 0 ? (
        <div className="card">
          <p>No reports found matching your criteria.</p>
          <Link to="/add-report" className="btn">
            Create New Report
          </Link>
        </div>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Period</th>
                <th>Facility</th>
                <th>Department</th>
                <th>Status</th>
                <th>Submitted By</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map(report => (
                <tr key={report._id}>
                  <td>{getFormattedPeriod(report)}</td>
                  <td>{report.facility?.name || 'N/A'}</td>
                  <td>{report.department?.name || 'N/A'}</td>
                  <td>
                    <span className={getStatusClass(report.status)}>
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </span>
                  </td>
                  <td>{report.submittedBy?.name || 'N/A'}</td>
                  <td>{new Date(report.submittedAt).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/report/${report._id}`} className="btn btn-sm">
                      View
                    </Link>
                    {(report.status === 'draft' || ['super-admin', 'state-admin', 'district-admin'].includes(user.role)) && (
                      <Link to={`/report/${report._id}/edit`} className="btn btn-sm">
                        Edit
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="pagination">
              <button 
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="btn btn-sm"
              >
                Previous
              </button>
              <span>
                Page {pagination.page} of {pagination.pages}
              </span>
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.pages}
                className="btn btn-sm"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ViewReports; 