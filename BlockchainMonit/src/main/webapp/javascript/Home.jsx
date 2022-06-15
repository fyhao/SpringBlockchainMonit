import React, { Component } from "react";
import { Navbar, Nav, Form, FormControl, Button, NavItem } from 'react-bootstrap';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
	  pricelist : {}
    };
	
  }	
  componentDidMount() {
	var me = this;
	var loc = window.location, new_uri;
	if (loc.protocol === "https:") {
	    new_uri = "wss:";
	} else {
	    new_uri = "ws:";
	}
	new_uri += "//" + loc.host;
	new_uri += "/priceservice";
	var ws = new WebSocket(new_uri);
	ws.onmessage = e => {
		var data = JSON.parse(e.data);
		me.updateAndBroadcast(data);
	}
  }	
  updateAndBroadcast(data) {
	var me = this;
	var pricelist = me.state.pricelist;
	pricelist[data.name] = data.price;
	me.setState({pricelist});
  }
  
  
  render() {
    return (
      <div>
        <span>Home</span>
        <table>
        <tbody>
        {Object.keys(this.state.pricelist).map((obj,i) => {
			return (<tr key={obj}><td>{obj}</td><td>{this.state.pricelist[obj]}</td></tr>)
		})}
		</tbody>
        </table>
      </div>
    );
  }
}

export default Home