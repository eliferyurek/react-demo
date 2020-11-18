import React from 'react';
import Select from 'react-select'
import {emulation, serial, canbus, node_id} from './data';
import SockJsClient from 'react-stomp';

//Hab Only Page
class HabOnly extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
        selectedCanBus: null,
        selectedNode: null,
        selectedEmulation: null,
        selectedSerial: null,
        formip: null,
        formport: null,
        formhabport: null,
        dropdownOpen: false,
        selected: ''
    };
  }

  /*
    For dropdown select and form value
  */      
  handleChangeCanBus = (obj) => {          
    this.setState({selectedCanBus: obj.label});
  }
  handleChangeNode = (obj) => {          
    this.setState({selectedNode: obj.label});
  }
  handleChangeEmulation = (obj) => {          
    this.setState({selectedEmulation: obj.label});
  }
  handleChangeSerial = (obj) => {          
    this.setState({selectedSerial: obj.label});
  }
  handleFormIp = (e) => {
    this.setState({formip: e.target.value});
  }
  handleFormPort = (e) => {
    this.setState({formport: e.target.value});
  }
  handleFormHabPort = (e) => {
    this.setState({formhabport: e.target.value});
  }

  /*
      To send to Java Server with Web Socket
  */
  sendMessage = () => {
    this.clientRef.sendMessage('/app/hab-only', JSON.stringify({
        canbus: (this.state.selectedCanBus),
        node: (this.state.selectedNode),
        emulation: (this.state.selectedEmulation),
        serial: (this.state.selectedSerial),
        ip: (this.state.formip),
        port: (this.state.formport),
        habport: (this.state.formhabport)
    }));
};

  /* 
    For reset button.
    Can only reset the forms.
  */
  cancelCourse = () => { 
      this.setState({
        formip: "",
        formport: "",
        formhabport: ""
      });
    }
    
  render(){
    return(
        
        <div className="App"  style={{width: '500px', position: 'absolute', left:'450px'}}>  
        Host (GUI) IP
        <form id="create-ip-form">
            <input
              type='text'
              value={this.state.formip}
              onChange={this.handleFormIp}
              style={{width: "500px"}}
            />
           
            </form>
        <hr style={{
            height: 5,
            width: 500,
            }}
        />

        Host (GUI) Port 
        <form id="create-port-form">
            <input
              type='text'
              value={this.state.formport}
              onChange={this.handleFormPort}
              style={{width: "500px"}}
            />
           
            </form>
        <hr style={{
            height: 5,
            width: 500,
            }}
        />

        HAB Listening Port
        <form id="create-hab-form">
            <input
              type='text'
              value={this.state.formhabport}
              onChange={this.handleFormHabPort}
              style={{width: "500px"}}
            />
           
        </form>
        <hr style={{
            height: 5,
            width: 500,
            }}
        />

        CAN Bus Number <Select
            label="Single select"
            value={this.selectedCanBus}
            options={canbus}
            onChange={this.handleChangeCanBus}
        
        />  
        <hr style={{
            height: 5,
            width: 500,
            }}
        />
    
        Node ID <Select
            label="Single select"
            value = {node_id.find(x => x.value === this.selectedNode)}
            options={node_id}
            onChange={this.handleChangeNode}
        
        />  
        <hr style={{
            height: 5,
            width: 500,
            }}
        />
        
        Emulation Mode <Select
            label="Single select"
            value = {emulation.find(x => x.value === this.selectedEmulation)}
            options={emulation}
            onChange={this.handleChangeEmulation}
            
            />  
        <hr style={{
            height: 5,
            width: 500,
            }}
        />

        Serial Channel Number <Select
            label="Single select"
            value = {serial.find(x => x.value === this.selectedSerial)}
            options={serial}
            onChange={this.handleChangeSerial}
        
        />
        
        <br/>

        <button onClick={this.sendMessage} style={{position: 'absolute', right:'80px'}}>Apply</button>
        <button onClick={this.cancelCourse} style={{position: 'absolute', right:'10px'}}>Reset</button>

        
        <SockJsClient url='http://localhost:8080/websocket-chat/'
              topics={['/topic/user']}
              onConnect={() => {
                console.log("connected");
              }}
              onDisconnect={() => {
                  console.log("Disconnected");
              }}
              onMessage={() => {
                  console.log("HAB Settings");
              }}
              ref={(client) => {
                  this.clientRef = client
              }}
        />
    </div>
    )}
}

/*  
    A WebSocket-like object was provided with SockJS. 
    SockJS provides communication between the browser and the web server.
*/

export default HabOnly