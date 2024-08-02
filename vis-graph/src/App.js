import './App.css';
import Navbar from './components/navbar';
import GraphManager from './components/GraphManager';
import Snake from './components/snake';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="Main"><Snake />
      </div>
    </div>
  );
}
export default App;

// function App() {
//   const [fileUploaded, setFileUploaded] = useState(false);
//   const handleUploadClick = () => {
//     setFileUploaded(false); // Set fileUploaded to false
//   };

//   return (
//     <div className="App">
//       <Navbar onUploadClick={handleUploadClick} />
//       <div className="Main"><Snake />
//       </div>
//     </div>

//   );
// }
