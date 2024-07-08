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

  const handleFileProcessed = (jsonData, columns, nodeColumn, relationshipColumn) => {
    // here its extracting data from jsonData based on selected columns by user
    const data = jsonData.slice(1);
    const nodes = data.map((row, index) => ({ id: row[columns.indexOf(nodeColumn)], ...row }));
    const links = data.map(row => ({
      source: row[columns.indexOf(nodeColumn)],
      target: row[columns.indexOf(relationshipColumn)]
    }));

    setNodes(nodes);
    setLinks(links);
  };

  return (
    <div className="App">
      <Navbar />
      {/* <GraphView /> */}
      {/* <WorldCup/>  */}
      {/* <Ariosto /> */}
      {/* <jackApp /> */}
      <FileUpload onFileProcessed={handleFileProcessed} />
      <GraphComponent nodes={nodes} links={links} />
    </div>
  );
}
export default App;
