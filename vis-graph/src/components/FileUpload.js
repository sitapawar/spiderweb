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

      // Send data to the server
      fetch('http://127.0.0.1:5000/recieve_data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      })
        .then((response) => response.json())
        .then((serverData) => {
          // Handle the server response
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

// import React, { useState } from 'react';
// import * as XLSX from 'xlsx';
// import ColumnSelector from './ColumnSelector';

// const FileUpload = ({ onFileProcessed }) => {
//   const [file, setFile] = useState(null);
//   const [columns, setColumns] = useState([]);
//   const [data, setData] = useState(null);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleFileUpload = () => {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const data = new Uint8Array(e.target.result);
//       const workbook = XLSX.read(data, { type: 'array' });
//       const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//       const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
//       const columns = jsonData[0]; // First row as columns
//       setColumns(columns);
//       setData(jsonData); // Save data for further processing
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   const handleColumnSelection = ({ id, title, label, group, to, from, relationshipLabel }) => {
//     onFileProcessed(data, columns, id, title, label, group, to, from, relationshipLabel);
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleFileUpload}>Upload</button>
//       {columns.length > 0 && (
//         <ColumnSelector columns={columns} onColumnSelected={handleColumnSelection} />
//       )}
//     </div>
//   );
// };

// export default FileUpload;
