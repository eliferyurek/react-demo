import React from 'react';
import { Nav, Navbar} from 'react-bootstrap';
import styled from 'styled-components';


const Styles = styled.div`
  .navbar { background-color: white; }
  a, .navbar-nav, .navbar-light .nav-link {
    color: #4A4646;
    height: 40px;
    &:hover { color: black; }
  }
  .navbar-brand {
    font-size: 1.4em;
    color: #4A4646;
    &:hover { color: white; }
  }
  .form-center {
    position: absolute !important;
    left: 18%;
    right: 25%;
  }  
  .navbar
  {
      border-bottom:1px solid #ECECEC;
  }
`;




export function NavBar() {

   return(
  <Styles>
    <Navbar  bg="light" expand="lg">
  <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="form-center"> 
      <Nav.Link href="#home">Connect</Nav.Link>
      <Nav.Link href="#link">Add Device </Nav.Link>
      <Nav.Link href="#link">Remove Device</Nav.Link>

    </Nav>
  </Navbar.Collapse>
  
  <hr/>



</Navbar>

             
  </Styles>
   )
}

