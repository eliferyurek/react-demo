import React, { Component } from 'react';
import styled from 'styled-components';

const Styles = styled.div`
  div{    
    color: #4A4646;
    left: 300px;
    width: 400px; 
    text-align: center;
  }

`;

class type extends Component {
    render() {
      return (
        <Styles>
        <div className="type">
          <h5 >{this.props.name} </h5>   
        </div>
        
        </Styles>
      );
    }
  }

  export default type