import React, { Component} from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import styled from 'styled-components';
import CanTest from '../settings/CanTest';
import CanOnly from '../settings/CanOnly';
import TestOnly from '../settings/TestOnly';
import HabOnly from '../settings/HabOnly';
import Type from '../settings/type'


import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom";


const Style = styled.div`
  .dropdown { 
    background-color: white;
    left: 10%;   
  }
  a{
    color: #4A4646;
    height: 40px;
    &:hover { color: black; }
  }
  .br {margin-bottom: 25em}
  h6{
    margin-top: 10px;
    margin-left: 10px;
    width: 400px;   
  }
  h6.groove {  
    width: 300px;
    height: 30px;
    text-align: center;
  }
  h6.grove { 
    width: 200px;
    height: 30px;
    text-align: center;
  }
  p.groove {
    
    height: 70px;
    padding: 20px 0;
  }
`;

//Communication Settings Page
class ComSettings extends Component{
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.state = {
        actions: [],
        dropDownValue: 'Select',
        dropdownOpen: false
    };
    }

    toggle(event) {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    changeValue(e) {
      this.setState({dropDownValue: e.currentTarget.textContent});
      }   


  render(){
    
    return(
      <Router>
      <Style>
      <div className="App">
        <h6 class="groove">Communication Settings </h6>
       
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} style={{position: 'relative', left:'200px', width:'500px'}}>
      <p class="groove">&emsp;&emsp;
      Communication Type&emsp;&emsp; 
      <DropdownToggle color="dark" caret style={{width:'250px'}}>
      {this.state.dropDownValue}
        </DropdownToggle></p>

      <DropdownMenu >
        <DropdownItem divider />
        <Link to="/settings/CanOnly">
            <DropdownItem onClick={this.changeValue}>CAN Only</DropdownItem>
        </Link>
        <Link to="/settings/CanTest">
            <DropdownItem onClick={this.changeValue}>CAN + Test Channel (Serial)</DropdownItem>
        </Link>
        <Link to="/settings/TestOnly">
            <DropdownItem onClick={this.changeValue}>Test Channel (Serial) Only</DropdownItem>
        </Link>
        <Link to="/settings/HabOnly">
            <DropdownItem onClick={this.changeValue}>HAB Only</DropdownItem>
        </Link>
      </DropdownMenu>
    </Dropdown>
    <br/> <br/>
    <hr
            style={{
              height: 5,
              width: 1050,                                
            }}
          />
    
    <Switch>
    <Route exact path="/settings/CanOnly">
    <Type name="CAN Settings" />
    <hr/>
        <CanOnly />
      </Route>
      
      <Route  exact path="/settings/CanTest">
      
        <CanTest />
      </Route>

      <Route  exact path="/settings/TestOnly">
      <Type name="Serial Channel Settings" />
      <hr/>
        <TestOnly />
      </Route>

      <Route  exact path="/settings/HabOnly">
      <Type name="HAB Settings" />
      <hr/>
        <HabOnly />
      </Route>
    </Switch>
          
    </div>
    </Style>
    </Router>
    )
  }
}

export default ComSettings


