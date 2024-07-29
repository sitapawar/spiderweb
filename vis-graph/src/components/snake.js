import React from 'react'


class Snake extends React.Component {
    constructor(props) {
      super(props);
      this.state = {apiResponse: ""};
    }

    // callAPI() {
    //     fetch("http://127.0.0.1:5000", { mode: 'no-cors' })
    //       .then(res => res.text())
    //       .then(res => console.log(res))
    //       .then(res => this.setState({ apiResponse: res }))
    //       .catch(error => {
    //         console.error('There has been a problem with your fetch operation:', error);
    //         this.setState({ apiResponse: 'Error: ' + error.message });
    //       });
    //   }
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
          <header className="Snake-text">
            <p>{this.state.apiResponse}</p>
          </header>
        </div>
      );
    }
  }
  export default Snake;