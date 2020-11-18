import React, {Component} from 'react';
import { withStyles } from "@material-ui/core/styles"
import CommSettings from './pages/ComSettings';
import CanTest from './settings/CanTest';
import Parameters from './pages/Parameters';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from './components/NavBar';
import styled from 'styled-components';

import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom";

import {
  Drawer, List, ListItem,
  ListItemIcon
} from "@material-ui/core";

const useStyles = (theme) => ({
    drawerPaper: { width: 'inherit' },
    link: {
      textDecoration: 'none',
      color: theme.palette.text.primary
    },
    nested1: {
      paddingLeft: theme.spacing(4),
    },
    nested2: {
      paddingLeft: theme.spacing(8),
    }
})

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
    width: 220px;
    display: inline-block;
  }
  .button {
    padding: 0;
    width: 220px;
    border: 0;
    background-color: #fff;
    color: #333;
    cursor: pointer;
    outline: 0;
    font-size: 16px;
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

//Side Bar
class App extends Component{
    container = React.createRef();
    state = {
        open: false,
        messageOpen: false,
      };
      
      /*
        To provide open/close the dropdown
      */
      handleButtonClick = () => {
        this.setState(state => {
          return {
            open: !state.open,
          };
        });
      };
      /*
        To provide open/close the dropdown
      */
      handleMessageButtonClick = () => {
        this.setState(state => {
          return {
            messageOpen: !state.messageOpen,
          };
        });
      };
      
  render(){
    const { classes } = this.props;
    return(
      <Styles>
        <NavBar />
      <Router>
      
      
      <div style={{ display: 'flex' }}>
        <Drawer
          style={{ width: '220px' }}
          variant="persistent"
          anchor="left"
          open={true}
          classes={{ paper: classes.drawerPaper }}>
                <Link to="/" className={classes.link}>
                <ListItem button >
                  SKY1-SIM
                </ListItem>
              </Link>
              <List>
                
              <hr/>
              <button type="button" className="button" onClick={this.handleButtonClick}>
                        <div style={{marginRight: '100px'}}>⯆ Herkül-1</div>                           
                    </button>  

              {this.state.open && (
                <Link to="/settings" className={classes.link}>
                
                  <ListItem class={classes.nested1} button style={{ height: '30px' }}>
                    Communication Settings
                  </ListItem>
                </Link>
              )}

              {this.state.open && (
                  <button type="button" className="button" onClick={this.handleMessageButtonClick} >
                      <div style={{marginRight: '50px'}}>⯆ Message Traffic</div>                           
                  </button>  
              )} 

              {this.state.open && this.state.messageOpen && (
                  <Link to="/traffic/serial"  className={classes.link}>
                    <ListItem class={classes.nested2} button style={{ height: '30px' }}>
                      Serial
                    </ListItem>
                  </Link>          
              )}
              {this.state.open && this.state.messageOpen && (
                  <Link to="/traffic/can"  className={classes.link}>
                    <ListItem class={classes.nested2} button style={{ height: '30px' }}>
                      CAN
                    </ListItem>
                  </Link>
              )}
              {this.state.open && (
                  <Link to="/parameters"  className={classes.link}>
                    <ListItem class={classes.nested1} button style={{ height: '30px' }}>
                      Parameters
                    </ListItem>
                  </Link>
              )}
              {this.state.open && (
                  <Link to="/emergency"  className={classes.link}>
                    <ListItem class={classes.nested1} button style={{ height: '30px' }}>
                      Emergency
                    </ListItem>
                  </Link>
              )}
              </List>

              <hr style={{position: 'fixed', width: '220px', bottom:'30px'}}/>
              <p style={{position: 'fixed', left:'10px', bottom:'0px'}}>Herkül-1</p>
              <p style={{position: 'fixed', left:'110px', bottom:'0px'}}>Can Mode: Init</p>
        </Drawer>
        <Switch>
          <Route exact path="/settings">
              <CommSettings />
          </Route>
          <Route  exact path="/traffic">
            <CanTest />
          </Route>
          <Route  exact path="/traffic/serial">
            Memory Traffic - Serial
          </Route>
          <Route  exact path="/traffic/can">
            Memory Traffic - CAN
          </Route>
          <Route  exact path="/parameters">
            <Parameters />
          </Route>
          <Route  exact path="/emergency">
            Emergency
          </Route>
        </Switch>
      </div>
    </Router>
    </Styles>
    )
  }
}


export default withStyles(useStyles)(App);
