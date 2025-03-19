import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import HealthDataForm from '../components/HealthDataForm';

function AddReport() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [reportId, setReportId] = useState(null);

  const handleSuccess = (data) => {
    console.log('Report submission successful, received data:', data);
    setSubmitted(true);
    setReportId(data._id);
    toast.success('Report added successfully');
  };

  return (
    <div className="dashboard-container">
      <h1>Add New Health Report</h1>
      
      {submitted ? (
        <div className="alert alert-success">
          <h3>Report Created Successfully!</h3>
          <p>Your report has been created and saved as a {reportId ? 'draft' : ''}.</p>
          <div className="action-buttons">
            <button 
              className="btn btn-primary" 
              onClick={() => navigate('/view-reports')}
            >
              View All Reports
            </button>
            <button 
              className="btn" 
              onClick={() => {
                setSubmitted(false);
                setReportId(null);
              }}
            >
              Create Another Report
            </button>
          </div>
        </div>
      ) : (
        <div className="card">
          <p className="description">
            Fill in the form below to submit a new health report. Required fields are marked with *.
          </p>
          <HealthDataForm onSuccess={handleSuccess} />
        </div>
      )}
    </div>
  );
}

export default AddReport; 