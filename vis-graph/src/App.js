import './App.css';
import React, { useState } from 'react';
import Navbar from './components/navbar';
import GraphManager from './components/GraphManager';
import Snake from './components/snake';

function App() {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [otherVariable, setOtherVariable] = useState(false); // Example of another state variable
  const [showTableView, setShowTableView] = useState(false);

  const handleUploadClick = () => {
    console.log('uploading');
    setFileUploaded(false); // Set fileUploaded to false
    console.log(fileUploaded);
  };

  const handleResetClick = () => {
    setOtherVariable(false); // Example function for another button
  };

  const toggleTableView = () => {
    setShowTableView(prevState => !prevState);
  };

  return (
    <div className="App">
      <Navbar
        onUploadClick={handleUploadClick}
        onResetClick={handleResetClick}
        showTableView={showTableView}
        toggleTableView={toggleTableView}
        fileUploaded={fileUploaded}
      />
      <div className="Main">
        <Snake
          fileUploaded={fileUploaded}
          setFileUploaded={setFileUploaded}
          showTableView={showTableView}
        />
      </div>
    </div>
  );
}

export default App;
