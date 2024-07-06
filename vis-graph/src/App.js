import logo from './logo.svg';
import './App.css';
import GraphView from './components/graph';
import Navbar from './components/navbar';
import WorldCup from './components/worldcup';
import Ariosto from './components/ariosto';


function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <GraphView /> */}
      <WorldCup/>
      {/* <Ariosto /> */}
    </div>
  );
}
export default App;
