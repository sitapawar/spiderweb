import React, { useState } from 'react';
import ColumnSelector from './ColumnSelector';

const FileUpload = ({ onFileProcessed }) => {
  const [file, setFile] = useState(null);
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (result.error) {
        alert(result.error);
      } else {
        const nodeData = JSON.parse(result.node_data);
        const edgeData = JSON.parse(result.edge_data);
        setColumns(Object.keys(nodeData[0])); // Assuming all rows have same columns
        setData({ nodeData, edgeData });
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
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
