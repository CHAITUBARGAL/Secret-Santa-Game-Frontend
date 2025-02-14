import React, { useState } from 'react';
import axios from 'axios';

function FileUpload() {
  const [employeesFile, setEmployeesFile] = useState(null);
  const [previousAssignmentsFile, setPreviousAssignmentsFile] = useState(null);
  const [error, setError] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setDownloadUrl('');

    if (!employeesFile) {
      setError('Please upload the Employees CSV file.');
      return;
    }

    const formData = new FormData();
    formData.append('employeesFile', employeesFile);
    if (previousAssignmentsFile) {
      formData.append('previousAssignmentsFile', previousAssignmentsFile);
    }

    try {
      const response = await axios.post('https://secret-santa-game-backend4.onrender.com/api/secret-santa/assign', formData, {
        responseType: 'blob'
      });

      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      console.error(err);
      setError('Error occurred while processing files.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Employees CSV File:</label>
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setEmployeesFile(e.target.files[0])}
            required
          />
        </div>
        <div className="form-group">
          <label>Previous Assignments CSV File (optional):</label>
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setPreviousAssignmentsFile(e.target.files[0])}
          />
        </div>
        <button type="submit">Generate Assignments</button>
      </form>
      {error && <p className="error">{error}</p>}
      {downloadUrl && (
        <div className="download-link">
          <p>Download the generated assignments:</p>
          <a href={downloadUrl} download="secret_santa_assignments.csv">Download CSV</a>
        </div>
      )}
    </div>
  );
}

export default FileUpload;

