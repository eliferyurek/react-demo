import React from 'react';
import Select from 'react-select'
import SockJsClient from 'react-stomp';
import {stopbits, port, databits, parity, baudratetest} from './data';

//Test Channel (Serial) Only Page
class TestOnly extends React.Component {
    
      constructor(props) {
        super(props);

        this.state = {
            selectedPort: null,
            selectedBaud: null,
            selectedParity: null,
            selectedStop: null,
            selectedData: null,
            dropdownOpen: false,
        };
      }

        /*
            For dropdown select
        */
        handleChangePort = obj => {
            this.setState({selectedPort: obj.label});
        }
        handleChangeBaud = obj => {
            this.setState({selectedBaud: obj.label});
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
          this.clientRef.sendMessage('/app/test-only', JSON.stringify({
              port: (this.state.selectedPort),
              baud: (this.state.selectedBaud),
              parity: (this.state.selectedParity),
              stopbit: (this.state.selectedStop),
              databit: (this.state.selectedData)
          }));
      };
      render(){
        return(
            <div className="App"  style={{width: '500px', position: 'absolute', left:'450px'}}>  
                
                Port <Select
                    label="Single select"
                    value = {this.selectedPort}
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
                    value = {baudratetest.find(x => x.value === this.selectedBaud)}
                    options={baudratetest}
                    onChange={this.handleChangeBaud}
                
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
                                console.log("Test Channel (Serial) Only");
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

export default TestOnly