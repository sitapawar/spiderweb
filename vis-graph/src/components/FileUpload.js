import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import ColumnSelector from './ColumnSelector';


const FileUpload = ({ onFileProcessed }) => {
  const [file, setFile] = useState(null);
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const columns = jsonData[0]; // First row as columns
      setColumns(columns);
      setData(jsonData); // Save data for further processing
    };
    reader.readAsArrayBuffer(file);
  };

  const handleColumnSelection = (nodeColumn, relationshipColumn) => {
    onFileProcessed(data, columns, nodeColumn, relationshipColumn);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
      {columns.length > 0 && (
        <ColumnSelector columns={columns} onColumnSelected={handleColumnSelection} />
      )}
    </div>
  );
};

export default FileUpload;

