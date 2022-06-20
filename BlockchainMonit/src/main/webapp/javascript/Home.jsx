import React, { Component } from "react";
import { Navbar, Nav, Form, FormControl, Button, NavItem } from 'react-bootstrap';
import ListView from './ListView';
import TokenGridView from './TokenGridView';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
	   
    };
	
  }	
  
  
  
  render() {
	
    return (
      <div role="home">
        <span>Home</span>
        <TokenGridView />
      </div>
    );
  }
}

export default Home