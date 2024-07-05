import logo from './logo.svg';
import './App.css';
import GraphView from './components/graph';
import Navbar from './components/navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <GraphView />
    </div>
  );
}
export default App;
