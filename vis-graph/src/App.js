import logo from './logo.svg';
import './App.css';
import GraphView from './components/graph';
import Navbar from './components/navbar';
import WorldCup from './components/worldcup';

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <GraphView /> */}
      <WorldCup />
    </div>
  );
}
export default App;
