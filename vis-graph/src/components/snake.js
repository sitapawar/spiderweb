import React from 'react'
import GraphManager from './GraphManager';
import '../style/snake.css'

class Snake extends React.Component {
    constructor(props) {
      super(props);
      this.state = {apiResponse: ""};
    }

    callAPI() {
        fetch("http://127.0.0.1:5000")
          .then(res => {
            console.log('Response status:', res.status);
            return res.text().then(text => ({
              status: res.status,
              text
            }));
          })
          .then(res => {
            console.log('API response:', res.text);
            this.setState({ apiResponse: res.text });
          })
          .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            this.setState({ apiResponse: 'Error: ' + error.message });
          });
      }
      
      
    componentDidMount() {
      this.callAPI();
    }
    render() {
      return (
        <div className="Snake">
            <p>{this.state.apiResponse}</p>
            <GraphManager />
        </div>
      );
    }
  }
  export default Snake;