import React from 'react';
import './App.css';


class Parent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        dataFromChild: '',
        childName: "Toto TotoLastname",
        childs: [
          {firstname: "Toto", lastname: "TotoLastname"},
          {firstname: "Titi", lastname: "TitiLastname"},
        ],
        fakeDatas: []
      };
      this.outputEvent = this.outputEvent.bind(this);
    };

    componentDidMount() {
      fetch('https://jsonplaceholder.typicode.com/todos/')
      .then(response => response.json())
      .then(json => {
        this.setState({fakeDatas: json});
      });
    }

    outputEvent(event) {
      this.setState({ dataFromChild: 'Event emitted form child' });
    }

    childNameChange(event) {
      this.setState({childName: event.target.value});
    }

    render() {
      return (
        <div>
          <p>Parent</p>
          <p>Change prefer child name :</p>
          <input value={this.state.childName} onChange={(e) => {this.childNameChange(e)}} />
          <Child fakeDatas={this.state.fakeDatas} clickHandler={this.outputEvent} name={this.state.childName} childs={this.state.childs} />
          <p>Data from child : {this.state.dataFromChild}</p>
        </div>
      )
    }
};

class Child extends React.Component {
  constructor(props) {
    super(props);
    console.log("Child props", props);
  }

  render() {
    return (
      <div>
        <p>My prefered child name is : {this.props.name}</p>
        <p>Others childs I'm not prefer :</p>
        <ul className="childs">
          {this.props.childs
          .sort((a, b) => a.lastname > b.lastname)
          .map((item, index) => (
            <li key={index}>{item.firstname} {item.lastname}</li>
          ))}
          <button onClick={this.props.clickHandler}>Pass Datas To Parent</button>
        </ul>
      </div>
    )
  }
};

function App() {
  const styleHeader = {
    backgroundColor: 'red',
    width: '100%',
    height: '100px',
  };

  return (
    <div className="App">
      <header style={styleHeader}></header>
      <p>React app</p>
      <Parent />
    </div>
  );
}

export default App;
