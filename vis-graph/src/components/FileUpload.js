import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import ColumnSelector from './ColumnSelector';

const FileUpload = ({ onFileProcessed }) => {
  const [file, setFile] = useState(null);
  const [columns, setColumns] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  //turns the excel sheet into json data, just takes sheet 0 for now, could add in something to change this
  const handleFileUpload = () => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const columns = jsonData[0]; // First row as columns
      setColumns(columns);
      onFileProcessed(jsonData, columns);
    };
    reader.readAsArrayBuffer(file);
  };
  //columns decided by the user
  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
      {columns.length > 0 && (
        <ColumnSelector columns={columns} onColumnSelected={onFileProcessed} />
      )}
    </div>
  );
};

export default FileUpload;