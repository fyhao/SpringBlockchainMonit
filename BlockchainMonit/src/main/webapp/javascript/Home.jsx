import React, { Component } from "react";
import { Navbar, Nav, Form, FormControl, Button, NavItem } from 'react-bootstrap';
import ListView from './ListView';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
	  listviewdata : []
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
	var listviewdata = me.state.listviewdata;
	var found = false;
	for(var i = 0; i < listviewdata.length; i++) {
		if(listviewdata[i].name == data.name
			&& listviewdata[i].network == data.network) {
			listviewdata[i].price = data.price;
			found = true;
		}
	}
	if(!found) {
		data.id = new Date().getTime();
		listviewdata.push(data);
	}
	console.log(listviewdata);
	me.setState({listviewdata});
  }
  
  
  render() {
	var options = {};
	
	options.data = this.state.listviewdata;
	options.fields = [
		{heading:'Name',key:'name'},
		{heading:'Network',key:'network'},
		{heading:'Price',key:'price'}
	];
	
	var listviewcontent = <div>
			<ListView options={options}/>
			</div>;
			
    return (
      <div>
        <span>Home</span>
        {listviewcontent}
      </div>
    );
  }
}

export default Home