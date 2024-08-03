import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import ColumnSelector from './ColumnSelector';
import '../style/fileUpload.css';

const FileUpload = ({ onFileProcessed }) => {
  const [file, setFile] = useState(null);
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState(null);
  const [nodeFile, setFileName] = useState('No file chosen'); // State for file name

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : 'No file chosen'); // Update file name
  };

  const handleFileUpload = () => {
    if (!file) return; // Prevent processing if no file is selected

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const columns = jsonData[0];
      setColumns(columns);
      setData(jsonData);

      fetch('http://127.0.0.1:5000/recieve_data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      })
        .then((response) => response.json())
        .then((serverData) => {
          console.log(serverData);
          onFileProcessed(serverData, columns);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };
    reader.readAsArrayBuffer(file);
  };

  const handleColumnSelection = ({ id, title, label, group, to, from, relationshipLabel }) => {
    onFileProcessed(data, columns, id, title, label, group, to, from, relationshipLabel);
  };

  return (
    <div className="file-upload-container">
      <div>
<div className="file-input-wrapper">
        <input
          type="file"
          onChange={handleFileChange}
          className="file-input"
        />
        <button className="custom-file-button">
          Choose File
        </button>
        <p>{nodeFile}</p>
      </div>
      </div>
      
      <button onClick={handleFileUpload} className="upload-button">
        Upload
      </button>
    </div>
    
    // <div className="file-upload-container">
    //   <input
    //     type="file"
    //     onChange={handleFileChange}
    //     className="file-input"
    //   />
    //   <p className="file-name">{fileName}</p> {/* Display the file name */}
    //   <button onClick={handleFileUpload} className="upload-button">
    //     Upload
    //   </button>
    // </div>
  );
};

export default FileUpload;
