import React, { useState, useEffect } from 'react';
import FileUpload from './FileUpload';
import TestGraph from './graphTest';
import TableView from './TableView'; 
import '../style/graphManager.css';

const GraphManager = ({ fileUploaded, setFileUploaded, showTableView, selectedFilter }) => {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [allNodes, setAllNodes] = useState([]);
  const [viewType, setViewType] = useState('nodes'); // State to toggle between nodes and edges

  useEffect(() => {
    console.log('Nodes:', nodes);
    console.log('Links:', links);
    console.log('All Nodes:', allNodes);

  }, [nodes, links, allNodes]);

  const handleFileProcessed = (serverData) => {
    try {
      // Parse JSON strings from serverData
      const nodesData = JSON.parse(serverData.sheet1);
      const edgesData = JSON.parse(serverData.sheet2);

      // Process nodesData
      const processedNodes = nodesData.map(item => ({
        id: item.ID,
        label: item.Name,
        title: `Description: ${item.Label} Group: ${item.group1}`,
        group: item.group1
      }));
  
      // Process edgesData
      const processedEdges = edgesData.map(item => ({
        from: item.from,
        to: item.to,
        label: item.label,
        arrows: item.arrows,
      }));
  
      // Update the state with processed data
      setNodes(processedNodes);
      setLinks(processedEdges);
      setAllNodes(nodesData);

      // Set fileUploaded to true
      setFileUploaded(true);
    } catch (error) {
      console.error("Error processing file data:", error);
    }
  };

  return (
    <div className="CenteredContent">
      {!fileUploaded && <FileUpload onFileProcessed={handleFileProcessed} />}
      {fileUploaded && (
        <div className="graph-container">
          <TestGraph nodes={nodes} edges={links} />
          {showTableView && (
            <div className="table-view-overlay">
              <TableView 
                nodes={allNodes} 
                edges={links} 
                viewType={viewType}
                setViewType={setViewType} // Pass the viewType and setter to TableView
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GraphManager;
