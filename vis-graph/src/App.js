import './App.css';
import React, { useState } from 'react';
import Navbar from './components/navbar';
import GraphManager from './components/GraphManager';
import Snake from './components/snake';

function App() {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [otherVariable, setOtherVariable] = useState(false); // Example of another state variable

  const handleUploadClick = () => {
    setFileUploaded(false); // Set fileUploaded to false
  };

  const handleResetClick = () => {
    setOtherVariable(false); // Example function for another button
  };

  return (
    <div className="App">
      <Navbar onUploadClick={handleUploadClick} onResetClick={handleResetClick} />
      <div className="Main">
      <Snake fileUploaded={fileUploaded} setFileUploaded={setFileUploaded} />
      </div>
    </div>
  );
}
export default App;

