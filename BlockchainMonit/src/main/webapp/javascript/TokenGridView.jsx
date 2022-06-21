import React, { Component } from "react";
import { Navbar, Nav, Form, FormControl, Button, NavItem } from 'react-bootstrap';
import ListView from './ListView';
import TokenInfoView from './TokenInfoView';
class TokenGridView extends Component {
  constructor(props) {
    super(props);
    this.state = {
	  listviewdata : [],
	  filtered : '',
	  viewitem : null
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
	var me = this;
	var options = {};
	options.data = this.state.listviewdata;
	if(this.state.filtered.length) {
		var d = [];
		for(var i = 0; i < options.data.length; i++) {
			if(options.data[i].name == this.state.filtered) {
				d.push(options.data[i]);
			}
		}
		options.data = d;
	}
	var renderName = (v, row) => {
		return <span><img src={row['image']} />{' '}{v}</span>;
	};
	var renderPrice = (v, row) => {
		return <span>{v} <br />({row['lastUpdatedTime']})</span>;
	};
	options.fields = [
		{heading:'Name',key:'name',clickable:true,clickablestyle:{'fontWeight':'bold'},render:renderName},
		{heading:'Network',key:'network',clickable:true},
		{heading:'Price',key:'price',render:renderPrice,clickable:true}
	];
	
	options.handleGridCellClick = (row, fieldkey, fieldvalue) => {
		if(fieldkey == 'name') {
			if(this.state.filtered.length) {
				me.setState({filtered : ''});
			}
			else {
				me.setState({filtered : row['name']});
			}
		}
		else if(fieldkey == 'network' || fieldkey == 'price') {
			if(this.state.viewitem != null) {
				me.setState({viewitem : null});
			}
			else {
				me.setState({viewitem : row});
			}
		}
	};
	var handleBack = () => {
		me.setState({viewitem : null});
	};
	var listviewcontent = me.state.viewitem == null ? <div>
			<ListView options={options}/>
			</div> : '';
	var tokeninfocontent = me.state.viewitem != null ? 
			<TokenInfoView token={me.state.viewitem} handleBack={handleBack} />
			 : 
			'';
			
    return (
      <div>
        {listviewcontent}
        {tokeninfocontent}
        {!this.state.listviewdata.length ? <p>Loading...</p> : ''}
      </div>
    );
  }
}

export default TokenGridView