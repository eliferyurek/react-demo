import React, { Component, Fragment } from 'react'
import Data from './parameters.json'
import styled from 'styled-components';
import { Table } from 'react-bootstrap';
import Select from 'react-select';
import { colourOptions } from './data';
import { Client } from '@stomp/stompjs';

const Styles = styled.div`
  h6{
    margin-top: 10px;
    margin-left: 10px;
    width: 400px;   
  }
  h6.groove {
    border-style: groove;
    width: 300px;
    height: 30px;
    text-align: center;
  }
  .container {
    position: relative;
    display: inline-block;
  }
  .button {
    padding: 0;
    width: 50px;
    border: 0;
    background-color: #fff;
    color: #333;
    cursor: pointer;
    outline: 0;
    font-size: 20px;
  }
  .dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    width: 300px;
    z-index: 2;
    border: 1px solid rgba(0, 0, 0, 0.04);
    box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14);
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  li {
    padding: 8px 12px;
  }
  
  li:hover {
    background-color: rgba(0, 0, 0, 0.14);
    cursor: pointer;
  }
`;

//Parameters page
class Parameter extends Component{
  container = React.createRef();
  state = {
      open: null,
      handleOpen: false,
      selectedOptions: [],
      currentValue: null,
    };

    /* Take values from server for current value */
    componentDidMount() {
 
      console.log('Component did mount');
      this.client = new Client();
      
      this.client.configure({
        brokerURL: 'ws://localhost:8080/stomp',
        onConnect: () => {
          console.log('onConnect');
          
          this.client.subscribe('/queue/now', message => {
            this.setState({currentValue: message.body});
          });
        },
        
        
      });
      this.client.activate();
    }
    
    componentWillUnmount() {
      document.removeEventListener("mousedown", this.handleClickOutside);
    }
    handleClickOutside = event => {
      if (this.container.current && !this.container.current.contains(event.target)) {
        this.setState({
          open: false,
        });
      }
    };

    /* To decide which dropdown will be open */
    handleButtonClick = (e) => {
      const id = parseInt(e.target?.id);
  
      if (this.state.open && this.state.open !== id)
        return;
  
      this.setState((state) => {
        return {
          open: state.open !== 0 && !state.open ? id : null
        };
      });
    };
    handleOpenButtonClick = () => {
      this.setState(state => {
        return {
          handleOpen: !state.handleOpen,
        };
      });
    };
    handleChange = (selectedOptions) => {
      this.setState({ selectedOptions });
    }
      
    render(){
      const uniqueTags = [];
      /*To determine unique parameter groupnames */
      Data.map(img => {
        if (uniqueTags.indexOf(img.groupName) === -1) {
            uniqueTags.push(img.groupName)
        }
      });

        return(
          <div>
            <Table style={{width:'100%'}}>
            <thead>
                              <tr>
                              <th>Parameter Name</th>
                              <th>Polling</th>
                              <th>Index</th>
                              <th>Sub-Index</th>
                              <th>Data Type</th>
                              <th>Attribute</th>
                              <th>Current Value</th>
                              <th>Requested Value</th>
                              <th>Fav</th>
                              </tr>
                              </thead>
                              <tbody>

                                
            {uniqueTags.map((value, index) => {
                return (
                  
                  <Fragment>
                        <tr>
                      <button type="button" className="button" id={index} onClick={this.handleButtonClick}>
                          <div id={index} style={{marginLeft: '30px'}}><td id={index}>▼{value}</td></div>                           
                      </button>
                      </tr>
                      {this.state.open === index && (  
                        Data.map(item =>
                          item.zeroBasedEnumeration != 0 && item.groupName === value &&
                        
                          <tr >

                            <td style={{paddingLeft: '80px'}}>{item.objectName}</td> 
                            <td><input style={{width: '80px'}}  type="checkbox"/></td> 
                            <td>{item.index}</td>
                            <td>{item.subIndex}</td>
                            <td>{item.dataType}</td>
                            <td>{item.attr}</td>
                            <td>{this.state.currentValue}</td>
                            <td><input style={{width: '100px'}}  type="text"/></td>
                            <td style={{width: '100px'}} >
                            <Select
                                isMulti
                                onChange={this.handleChange}
                                options={colourOptions}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                value={this.state.value}
                                
                              />
                              
                            </td>
                            </tr> 
                        
                        ))}
                        </Fragment>
                )
            })}
            
            </tbody>
          
            </Table>
            </div>
        )}
  }
  
export default Parameter