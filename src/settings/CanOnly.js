import React from 'react';
import Select from 'react-select'
import SockJsClient from 'react-stomp';
import {channel, baudrate, node_id} from './data';

//CAN Settings Page
class CanOnly extends React.Component{
      constructor(props) {
        super(props);

        this.state = {
            selectedDevice: null,
            selectedChannel: null,
            selectedBaud: null,
            selectedNode: null,
            dropdownOpen: false,
        };
      }
      
      /*
        For dropdown select
      */
      handleChangeDevice = (obj) => {          
          this.setState({selectedDevice: obj.label});
        }
      handleChangeChannel = (obj) => {          
        this.setState({selectedChannel: obj.label});
      }

      handleChangeBaud = (obj) => {          
        this.setState({selectedBaud: obj.label});
      }

      handleChangeNode = (obj) => {          
        this.setState({selectedNode: obj.label});
      }

      /*
        To send to Java Server with Web Socket
      */
      sendMessage = () => {
        this.clientRef.sendMessage('/app/can-only', JSON.stringify({
            device: (this.state.selectedDevice),
            channel: (this.state.selectedChannel),
            baud: (this.state.selectedBaud),
            node: (this.state.selectedNode)
        }));
        
    };


      render(){
    
        return(
          <div className="App"  style={{width: '400px', position: 'absolute', left:'450px'}}>  
                
                CAN Device <Select
                    label="Single select"
                    value = {this.selectedDevice}
                    options={channel}
                    onChange={this.handleChangeDevice}
                />  
                
                <hr style={{
                    height: 5,
                    width: 500,
                    }}
                />
            
                CAN Channel <Select
                    label="Single select"
                    value = {channel.find(x => x.value === this.selectedValue)}
                    options={channel}
                    onChange={this.handleChangeChannel}
                  />  
                   
                <hr style={{
                    height: 5,
                    width: 500,
                    }}
                />
                Baud Rate <Select
                    label="Single select"
                    value = {baudrate.find(x => x.value === this.selectedValue)}
                    options={baudrate}
                    onChange={this.handleChangeBaud}
                />  
                <hr style={{
                    height: 5,
                    width: 500,
                    }}
                />
                Node-ID <Select
                    label="Single select"
                    value = {node_id.find(x => x.value === this.selectedValue)}
                    options={node_id}
                    onChange={this.handleChangeNode}
                
                />  
                
                <br/>

                <button onClick={this.sendMessage} style={{position: 'absolute', right:'80px'}}>Apply</button>
                <button onClick={this.state.handleChangeDevice} style={{position: 'absolute', right:'10px'}}>Reset</button>

                <SockJsClient url='http://localhost:8080/websocket-chat/'
                              topics={['/topic/user']}
                              onConnect={() => {
                                  console.log("connected");
                              }}
                              onDisconnect={() => {
                                  console.log("Disconnected");
                              }}
                              onMessage={() => {
                                console.log("CAN Only");
                            }}
                              ref={(client) => {
                                  this.clientRef = client
                              }}/>
            </div>
        )}
  }

/*  
    A WebSocket-like object was provided with SockJS. 
    SockJS provides communication between the browser and the web server.
*/

export default CanOnly