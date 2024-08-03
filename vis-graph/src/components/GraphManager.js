import React, { useState } from 'react';
import FileUpload from './FileUpload';
import TestGraph from './graphTest';
import '../style/graphManager.css';

const GraphManager = () => {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [fileUploaded, setFileUploaded] = useState(false);

  // Function to handle the processed file data
  const handleFileProcessed = (serverData) => {
    try {
      // Parse JSON strings from serverData
      const nodesData = JSON.parse(serverData.sheet1);
      const edgesData = JSON.parse(serverData.sheet2);

      // Process nodesData to ensure only the relevant columns are used
      const processedNodes = nodesData.map(item => ({
        id: item.ID,        // Adjust these keys based on your actual data structure
        title: item.Title,
        label: item.Label,
      }));
  
      // Process edgesData to ensure only the relevant columns are used
      const processedEdges = edgesData.map(item => ({
        from: item.from,    // Adjust these keys based on your actual data structure
        to: item.to,
        label: item.label
      }));
      // Update the state with processed data
      setNodes(processedNodes);
      setLinks(processedEdges);
      console.log(nodes)
      console.log(links)
  
      // Set fileUploaded to true
      setFileUploaded(true);
    } catch (error) {
      console.error("Error processing file data:", error);
    }
  };

  return (
    <div className="CenteredContent">
      {!fileUploaded && <FileUpload onFileProcessed={handleFileProcessed} />}
      {fileUploaded && <TestGraph nodes={nodes} edges={links} />}
    </div>
  );
};

export default GraphManager;
