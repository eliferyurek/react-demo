import React from 'react';
import Select from 'react-select'
import Type from './type'
import styled from 'styled-components';
import SockJsClient from 'react-stomp';
import {channel, baudrate, node_id, baudratetest, port, stopbits, databits, parity} from './data';

const Styles = styled.div`
  .br {margin-bottom: 25em}
`;

//CAN + Test Channel (Serial) Page
class CanTest extends React.Component {
    
      constructor(props) {
        super(props);

        this.state = {
            selectedDevice: null, selectedChannel: null, selectedBaudCan: null, selectedNode: null,
            selectedPort: null, selectedBaudTest: null, selectedParity: null, selectedStop: null, 
            selectedData: null,
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

      handleChangeBaudCan = (obj) => {          
        this.setState({selectedBaudCan: obj.label});
      }

      handleChangeNode = (obj) => {          
        this.setState({selectedNode: obj.label});
      }

      handleChangePort = obj => {
        this.setState({selectedPort: obj.label});
      }
  
      handleChangeBaudTest = obj => {
        this.setState({selectedBaudTest: obj.label});
      }
  
      handleChangeParity = obj => {
        this.setState({selectedParity: obj.label});
      }
    
      handleChangeStop = obj => {
        this.setState({selectedStop: obj.label});
      }
  
      handleChangeData = obj => {
        this.setState({selectedData: obj.label});
      }
  
      /*
        To send to Java Server with Web Socket
      */
      sendMessage = () => {
        this.clientRef.sendMessage('/app/can-test', JSON.stringify({
            device: (this.state.selectedDevice),
            channel: (this.state.selectedChannel),
            baudCan: (this.state.selectedBaudCan),
            node: (this.state.selectedNode),
            port: (this.state.selectedPort),
            baudTest: (this.state.selectedBaudTest),
            parity: (this.state.selectedParity),
            stopbit: (this.state.selectedStop),
            databit: (this.state.selectedData)
        }));
      };

      render(){
          return(
            <Styles>
            
            <div>
              <Type name="CAN Settings" />

              <hr style={{
                  height: 5,
                  width: 1050,
                }}
              />
            <div className="App"  style={{width: '400px', position: 'absolute', left:'450px'}}>  
                  
              CAN Device <Select
                label="Single select"
                value = {channel.find(x => x.value === this.selectedDevice)}
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
                value = {channel.find(x => x.value === this.selectedChannel)}
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
                value = {baudrate.find(x => x.value === this.selectedBaudCan)}
                options={baudrate}
                onChange={this.handleChangeBaudCan}
            
            />  
            <hr style={{
                height: 5,
                width: 500,
                }}
            />
            Node-ID <Select
                label="Single select"
                value = {node_id.find(x => x.value === this.selectedNode)}
                options={node_id}
                onChange={this.handleChangeNode}            
            />  
            
            <br/>
            </div>
            <br />

            <p class="br"></p>
            <Type name="Serial Channel Settings" style={{width: '400px', position: 'absolute', left:'0px'}}  />
            
            <hr style={{
                  height: 5,
                  width: 1050,
                }}
            />

          <div className="App"  style={{width: '400px', position: 'absolute', left:'450px'}}>

            Port <Select
                label="Single select"
                value = {port.find(x => x.value === this.selectedPort)}
                options={port}
                onChange={this.handleChangePort}
            />  

            <hr style={{
                height: 5,
                width: 500,
            }}
            />
              
            Baud Rate <Select
                label="Single select"
                value = {baudratetest.find(x => x.value === this.selectedBaudTest)}
                options={baudratetest}
                onChange={this.handleChangeBaudTest}
            />  

            <hr style={{
                height: 5,
                width: 500,
                }}
            />
                  
            Parity <Select
                label="Single select"
                value = {parity.find(x => x.value === this.selectedParity)}
                options={parity}
                onChange={this.handleChangeParity}         
            />  
                  
            <hr style={{
                height: 5,
                width: 500,
                }}
            />
                  
            Stop Bits <Select
                label="Single select"
                value = {stopbits.find(x => x.value === this.selectedStop)}
                options={stopbits}
                onChange={this.handleChangeStop}
            />  

            <hr style={{
                height: 5,
                width: 500,
                }}
            />

            Data Bits <Select
                label="Single select"
                value = {databits.find(x => x.value === this.selectedData)}
                options={databits}
                onChange={this.handleChangeData}
            />
                  
            <br/>
            <button onClick={this.sendMessage} style={{position: 'absolute', right:'80px'}}>Apply</button>
            <button style={{position: 'absolute', right:'10px'}}>Reset</button>

            <SockJsClient url='http://localhost:8080/websocket-chat/'
                  topics={['/topic/user']}
                  onConnect={() => {
                      console.log("connected");
                  }}
                  onDisconnect={() => {
                      console.log("Disconnected");
                  }}
                  onMessage={() => {
                      console.log("CAN + Test Channel (Serial)");
                  }}
                  ref={(client) => {
                      this.clientRef = client
                  }}
            />

        </div>
                
        </div>
        </Styles>
              
        )}
}

/*  
    A WebSocket-like object was provided with SockJS. 
    SockJS provides communication between the browser and the web server.
*/

export default CanTest