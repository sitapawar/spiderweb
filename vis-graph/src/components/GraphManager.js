import React, { useState } from 'react';
import FileUpload from './FileUpload';
import TestGraph from './graphTest';
import '../style/graphManager.css';

const GraphManager = ({ fileUploaded, setFileUploaded }) => {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);

  const handleFileProcessed = (jsonData, columns, id, title, label, group, to, from, Rlabel) => {
    const data = jsonData.slice(1); // Skip the header row
    const nodes = data.map(row => ({ 
      id: row[columns.indexOf(id)],
      title: row[columns.indexOf(title)],
      label: row[columns.indexOf(label)],
      group: row[columns.indexOf(group)]
    }));
    const links = data.map(row => ({
      from: row[columns.indexOf(from)],
      to: row[columns.indexOf(to)],
      label: row[columns.indexOf(Rlabel)]
    }));
    setNodes(nodes);
    setLinks(links);
    setFileUploaded(true); // Mark file as uploaded
  };

  const exampleNodes = [
    { id: 1, label: "Bradamante", title: "Christian Lady knight", group: 1 },
    { id: 2, label: "Ruggiero", title: "Bradamante's husband", group: 2 },
    { id: 3, label: "Orlando", title: "Looses his mind", group: 1 },
    { id: 4, label: "Angelica", title: "Too hot to handle", group: 3 },
    { id: 5, label: "Rinaldo", title: "Bradamante's brother", group: 1 },
    { id: 6, label: "Medoro", title: "bain of orlando's existence", group: 2 },
    { id: 7, label: "Pinabello", title: "bitch", group: 1 },
  ];

  const exampleLinks = [
    { from: 1, to: 2, label: "marriage" },
    { from: 1, to: 5, label: "siblings" },
    { from: 1, to: 7, label: "murder" },
    { from: 2, to: 4, label: "lust" },
    { from: 3, to: 4, label: "love" },
    { from: 5, to: 4, label: "love" },
    { from: 4, to: 5, label: "hate" },
    { from: 4, to: 6, label: "marriage" },
    { from: 7, to: 1, label: "attempted murder" },
  ];

  return (
    <div className="CenteredContent">
      {!fileUploaded && <FileUpload onFileProcessed={handleFileProcessed} />}
      {fileUploaded && <TestGraph nodes={nodes} edges={links} />}
    </div>
  );
};

export default GraphManager;
