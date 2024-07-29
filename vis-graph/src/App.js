import './App.css';
import Navbar from './components/navbar';
import GraphManager from './components/GraphManager';
import Snake from './components/snake';

function App() {
  return (
    <div className="App">
      <Navbar />
<br></br><br></br><br></br><br></br><br></br>
      <Snake />
      <GraphManager />

    </div>

  );
}

export default App;
