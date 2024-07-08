import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import GraphView from './components/graph';
import Navbar from './components/navbar';
import WorldCup from './components/worldcup';
import Ariosto from './components/ariosto';
import jackApp  from './JackApp';
import FileUpload from './components/FileUpload';
import GraphComponent from './components/d3Graph';

function App() {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [fileUploaded, setFileUploaded] = useState(false);

  const handleFileProcessed = (jsonData, columns, nodeColumn, relationshipColumn) => {
    const data = jsonData.slice(1); // Skip the header row
    const nodes = data.map(row => ({ id: row[columns.indexOf(nodeColumn)] }));
    const links = data.map(row => ({
      source: row[columns.indexOf(nodeColumn)],
      target: row[columns.indexOf(relationshipColumn)],
    }));
    setNodes(nodes);
    setLinks(links);
    setFileUploaded(true); // Mark file as uploaded
  };

  return (
    <div className="App">
      <h1>Excel to Graph Network</h1>
      
      {!fileUploaded && <FileUpload onFileProcessed={handleFileProcessed} />}
      {fileUploaded && <GraphComponent nodes={nodes} links={links} />}
    </div>
  );
}

export default App;



// function App() {
//   // Example data
//   const exampleNodes = [
//     { id: 'Alice' },
//     { id: 'Bob' },
//     { id: 'Charlie' },
//     { id: 'David' },
//     { id: 'Eve' }
//   ];

//   const exampleLinks = [
//     { source: 'Alice', target: 'Bob' },
//     { source: 'Alice', target: 'Charlie' },
//     { source: 'Bob', target: 'David' },
//     { source: 'Charlie', target: 'David' },
//     { source: 'David', target: 'Eve' }
//   ];

//   return (
//     <div className="App">
//       <h1>Excel to Graph Network</h1>
//       <GraphComponent nodes={exampleNodes} links={exampleLinks} />
//     </div>
//   );
// }

// export default App;