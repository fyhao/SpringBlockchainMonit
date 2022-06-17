import React, { Component } from "react";
import { Navbar, Nav, Form, FormControl, Button, NavItem } from 'react-bootstrap';
import ListView from './ListView';
class TokenGridView extends Component {
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
	// data items can be 0 or more
	if(!data.items || !data.items.length) return;
	for(var j = 0; j < data.items.length; j++) {
		var item = data.items[j];
		for(var i = 0; i < listviewdata.length; i++) {
			if(listviewdata[i].name == item.name
				&& listviewdata[i].network == item.network) {
				listviewdata[i].price = item.price;
				found = true;
			}
		}
		if(!found) {
			item.id = new Date().getTime();
			listviewdata.push(item);
		}
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
        {listviewcontent}
        {!this.state.listviewdata.length ? <p>Loading...</p> : ''}
      </div>
    );
  }
}

export default TokenGridView