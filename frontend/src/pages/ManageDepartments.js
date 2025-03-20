import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import DepartmentForm from '../components/DepartmentForm';

function ManageDepartments() {
  const { user } = useSelector((state) => state.auth);
  
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    fetchDepartments();
    if (user.role === 'super-admin' || user.role === 'state-admin' || user.role === 'district-admin') {
      fetchFacilities();
    }
  }, [user]);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };

      // Add query params based on user role
      let url = '/api/departments';
      if (user.role === 'hospital-admin' && user.facility) {
        url += `?facility=${user.facility}`;
      }

      const response = await axios.get(url, config);
      setDepartments(response.data.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
      toast.error('Failed to fetch departments');
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

      // Add query params based on user role
      let url = '/api/facilities';
      if (user.role === 'district-admin') {
        url += `?district=${user.district}`;
      } else if (user.role === 'state-admin') {
        url += `?state=${user.state}`;
      }

      const response = await axios.get(url, config);
      setFacilities(response.data.data);
    } catch (error) {
      console.error('Error fetching facilities:', error);
      toast.error('Failed to fetch facilities');
    }
  };

  const handleEdit = (department) => {
    setSelectedDepartment(department);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        };

        await axios.delete(`/api/departments/${id}`, config);
        toast.success('Department deleted successfully');
        fetchDepartments();
      } catch (error) {
        console.error('Error deleting department:', error);
        toast.error('Failed to delete department');
      }
    }
  };

  const handleFormSuccess = (data) => {
    fetchDepartments();
    setShowForm(false);
    setSelectedDepartment(null);
  };

  return (
    <div className="dashboard-container">
      <h1>Manage Departments</h1>
      
      <div className="action-buttons">
        <button className="btn" onClick={() => {
          setSelectedDepartment(null);
          setShowForm(!showForm);
        }}>
          {showForm && !selectedDepartment ? 'Cancel' : 'Add New Department'}
        </button>
      </div>
      
      {showForm && (
        <div className="card">
          <h2>{selectedDepartment ? 'Edit Department' : 'Add New Department'}</h2>
          <DepartmentForm 
            department={selectedDepartment}
            onSuccess={handleFormSuccess}
          />
        </div>
      )}
      
      {loading ? (
        <p>Loading departments...</p>
      ) : departments.length === 0 ? (
        <p>No departments found. Create your first department.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Facility</th>
              <th>Department Head</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((department) => (
              <tr key={department._id}>
                <td>{department.name}</td>
                <td>{department.facility?.name || 'N/A'}</td>
                <td>
                  {department.head?.name ? (
                    <>
                      {department.head.name}
                      {department.head.designation && <span> ({department.head.designation})</span>}
                    </>
                  ) : (
                    'Not specified'
                  )}
                </td>
                <td>
                  {department.head?.contactNumber && <div>{department.head.contactNumber}</div>}
                  {department.head?.email && <div>{department.head.email}</div>}
                </td>
                <td>
                  <button 
                    className="btn btn-sm" 
                    onClick={() => handleEdit(department)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-sm" 
                    onClick={() => handleDelete(department._id)}
                    style={{ backgroundColor: '#dc3545' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ManageDepartments; 