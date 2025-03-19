import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';

function ManageUsers() {
  const { user } = useSelector((state) => state.auth);
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [departments, setDepartments] = useState([]);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'department-user',
    facility: '',
    department: '',
    district: '',
    state: ''
  });
  
  const [filters, setFilters] = useState({
    role: '',
    facility: '',
    district: '',
    state: ''
  });
  
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  useEffect(() => {
    fetchUsers();
    if (user.role !== 'department-user') {
      fetchFacilities();
    }
  }, [pagination.page, filters]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };

      // Build query parameters based on filters
      let queryParams = `page=${pagination.page}&limit=${pagination.limit}`;
      if (filters.role) queryParams += `&role=${filters.role}`;
      if (filters.facility) queryParams += `&facility=${filters.facility}`;
      if (filters.district) queryParams += `&district=${filters.district}`;
      if (filters.state) queryParams += `&state=${filters.state}`;

      const response = await axios.get(`/api/users?${queryParams}`, config);
      
      setUsers(response.data.data);
      setPagination({
        page: response.data.pagination.page,
        limit: response.data.pagination.limit,
        total: response.data.total,
        pages: response.data.pagination.pages
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const fetchFacilities = async () => {
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

  const handleEdit = (userData) => {
    setSelectedUser(userData);
    setFormData({
      name: userData.name || '',
      email: userData.email || '',
      password: '', // Don't populate password for security
      role: userData.role || 'department-user',
      facility: userData.facility?._id || userData.facility || '',
      department: userData.department || '',
      district: userData.district || '',
      state: userData.state || ''
    });
    
    if (userData.facility) {
      fetchDepartmentsForFacility(userData.facility._id || userData.facility);
    }
    
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        };

        await axios.delete(`/api/users/${id}`, config);
        toast.success('User deleted successfully');
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
        toast.error('Failed to delete user');
      }
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
  };

  const resetFilters = () => {
    setFilters({
      role: '',
      facility: '',
      district: '',
      state: ''
    });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // If facility changes, fetch departments
    if (name === 'facility') {
      fetchDepartmentsForFacility(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // Validation
      if (!formData.name || !formData.email) {
        toast.error('Name and email are required');
        setLoading(false);
        return;
      }
      
      if (!selectedUser && !formData.password) {
        toast.error('Password is required for new users');
        setLoading(false);
        return;
      }
      
      const userData = {
        name: formData.name,
        email: formData.email,
        role: formData.role
      };
      
      // Only include password if it's provided (or required for new user)
      if (formData.password) {
        userData.password = formData.password;
      }
      
      // Add role-specific fields
      if (['hospital-admin', 'department-user'].includes(formData.role)) {
        if (!formData.facility) {
          toast.error('Facility is required for this role');
          setLoading(false);
          return;
        }
        userData.facility = formData.facility;
      }
      
      if (formData.role === 'department-user' && formData.department) {
        userData.department = formData.department;
      }
      
      if (['district-admin', 'hospital-admin', 'department-user'].includes(formData.role)) {
        if (!formData.district) {
          toast.error('District is required for this role');
          setLoading(false);
          return;
        }
        userData.district = formData.district;
      }
      
      if (['state-admin', 'district-admin', 'hospital-admin', 'department-user'].includes(formData.role)) {
        if (!formData.state) {
          toast.error('State is required for this role');
          setLoading(false);
          return;
        }
        userData.state = formData.state;
      }
      
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };
      
      let response;
      
      if (selectedUser) {
        // Update existing user
        response = await axios.put(`/api/users/${selectedUser._id}`, userData, config);
        toast.success('User updated successfully');
      } else {
        // Create new user
        response = await axios.post('/api/users', userData, config);
        toast.success('User created successfully');
      }
      
      // Reset form and fetch updated users
      setShowForm(false);
      setSelectedUser(null);
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'department-user',
        facility: '',
        department: '',
        district: '',
        state: ''
      });
      fetchUsers();
    } catch (error) {
      console.error('Error saving user:', error);
      const message = error.response?.data?.message || 'Failed to save user';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const getAvailableRoles = () => {
    const roles = [];
    
    if (user.role === 'super-admin') {
      roles.push(
        { value: 'department-user', label: 'Department User' },
        { value: 'hospital-admin', label: 'Hospital Admin' },
        { value: 'district-admin', label: 'District Admin' },
        { value: 'state-admin', label: 'State Admin' },
        { value: 'super-admin', label: 'Super Admin' }
      );
    } else if (user.role === 'state-admin') {
      roles.push(
        { value: 'department-user', label: 'Department User' },
        { value: 'hospital-admin', label: 'Hospital Admin' },
        { value: 'district-admin', label: 'District Admin' }
      );
    } else if (user.role === 'district-admin') {
      roles.push(
        { value: 'department-user', label: 'Department User' },
        { value: 'hospital-admin', label: 'Hospital Admin' }
      );
    } else if (user.role === 'hospital-admin') {
      roles.push(
        { value: 'department-user', label: 'Department User' }
      );
    }
    
    return roles;
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.pages) return;
    
    setPagination(prev => ({
      ...prev,
      page: newPage
    }));
  };

  return (
    <div className="dashboard-container">
      <h1>Manage Users</h1>
      
      {user.role !== 'department-user' && (
        <div className="action-buttons">
          <button className="btn" onClick={() => {
            setSelectedUser(null);
            setFormData({
              name: '',
              email: '',
              password: '',
              role: 'department-user',
              facility: user.facility || '',
              department: '',
              district: user.district || '',
              state: user.state || ''
            });
            setShowForm(!showForm);
          }}>
            {showForm && !selectedUser ? 'Cancel' : 'Add New User'}
          </button>
        </div>
      )}
      
      {showForm && (
        <div className="card">
          <h2>{selectedUser ? 'Edit User' : 'Add New User'}</h2>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name*</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={onChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">{selectedUser ? 'New Password (leave blank to keep current)' : 'Password*'}</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={onChange}
                required={!selectedUser}
                minLength="6"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="role">Role*</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={onChange}
                required
              >
                {getAvailableRoles().map(role => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>
            
            {['hospital-admin', 'department-user'].includes(formData.role) && (
              <div className="form-group">
                <label htmlFor="facility">Facility*</label>
                <select
                  id="facility"
                  name="facility"
                  value={formData.facility}
                  onChange={onChange}
                  required
                >
                  <option value="">Select Facility</option>
                  {facilities.map(facility => (
                    <option key={facility._id} value={facility._id}>
                      {facility.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            {formData.role === 'department-user' && formData.facility && (
              <div className="form-group">
                <label htmlFor="department">Department</label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={onChange}
                >
                  <option value="">Select Department</option>
                  {departments.map(department => (
                    <option key={department._id} value={department._id}>
                      {department.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            {['state-admin', 'district-admin', 'hospital-admin', 'department-user'].includes(formData.role) && (
              <div className="form-group">
                <label htmlFor="state">State*</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={onChange}
                  required
                  disabled={user.role !== 'super-admin'}
                />
              </div>
            )}
            
            {['district-admin', 'hospital-admin', 'department-user'].includes(formData.role) && (
              <div className="form-group">
                <label htmlFor="district">District*</label>
                <input
                  type="text"
                  id="district"
                  name="district"
                  onChange={onChange}
                  value={formData.district}
                  required
                  disabled={user.role !== 'super-admin' && user.role !== 'state-admin'}
                />
              </div>
            )}
            
            <div className="form-group">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {selectedUser ? 'Update User' : 'Create User'}
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="card">
        <h3>Filter Users</h3>
        <div className="filter-container">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="role-filter">Role</label>
              <select
                id="role-filter"
                name="role"
                value={filters.role}
                onChange={handleFilterChange}
              >
                <option value="">All Roles</option>
                {getAvailableRoles().map(role => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>
            
            {user.role === 'super-admin' && (
              <>
                <div className="form-group">
                  <label htmlFor="state-filter">State</label>
                  <input
                    type="text"
                    id="state-filter"
                    name="state"
                    value={filters.state}
                    onChange={handleFilterChange}
                    placeholder="Filter by state"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="district-filter">District</label>
                  <input
                    type="text"
                    id="district-filter"
                    name="district"
                    value={filters.district}
                    onChange={handleFilterChange}
                    placeholder="Filter by district"
                  />
                </div>
              </>
            )}
            
            <div className="form-group" style={{ alignSelf: 'flex-end' }}>
              <button className="btn" onClick={resetFilters}>
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {loading ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
        <p>No users found matching your criteria.</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Facility</th>
                <th>District</th>
                <th>State</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(userData => (
                <tr key={userData._id}>
                  <td>{userData.name}</td>
                  <td>{userData.email}</td>
                  <td>{userData.role}</td>
                  <td>{userData.facility?.name || 'N/A'}</td>
                  <td>{userData.district || 'N/A'}</td>
                  <td>{userData.state || 'N/A'}</td>
                  <td>
                    <button 
                      className="btn btn-sm" 
                      onClick={() => handleEdit(userData)}
                    >
                      Edit
                    </button>
                    
                    {user.role === 'super-admin' && userData._id !== user._id && (
                      <button 
                        className="btn btn-sm" 
                        onClick={() => handleDelete(userData._id)}
                        style={{ backgroundColor: '#dc3545' }}
                      >
                        Delete
                      </button>
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

export default ManageUsers; 