import logo from './logo.svg';
import './style/App.css';
import Navbar from './components/navbar';
import GraphView from './components/graph';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Navbar />
      </header>
      <div className='App-Body'>
      <GraphView />
      </div>
    </div>
  );
}

export default App;
