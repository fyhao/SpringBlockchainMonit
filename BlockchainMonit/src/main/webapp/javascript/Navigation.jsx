import React, { Component } from "react";
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
import ee from './EventManager';
import { NavLink,NavItem,Alert } from 'reactstrap';
import * as MyConstants from './MyConstants';
class Navigation extends Component {
	
  constructor(props) {
    super(props);
    this.state = {
		currentPage:<Home />,
		roles : [],
		username:'na',
		infomsg : ''
    };
	
  }
  componentDidMount() {
	  // get loaded user roles
	this.getUserRoles();
  }
  componentWillMount() {
	ee.on('navigatePage', this.onNavigatePage, this);
	ee.on('infomsg', this.onInfomsg, this);
  }
  componentWillUnmount() {
	ee.off('navigatePage', this.onNavigatePage);
	ee.off('infomsg', this.onInfomsg);
  }
  onNavigatePage(opts) {
	var me = this;
	me.setState({currentPage:opts.page})
  }
  onInfomsg(opts) {
	var me = this;
	var infocolor = 'success';
	if(opts.infocolor) infocolor = opts.infocolor;
	me.setState({infomsg:opts.msg,infocolor:infocolor});
  }
  handleDismissInfomsg() {
	var me = this;
	ee.emit('infomsg', {msg:''});
  }
  getUserRoles() {
	if(MyConstants.DevMode) {
		this.setState({
			roles : ['admin'],
			username : 'superadmin'
		});
	}
	else {
		const url = "api/getroles";
		const options = {
		  method: "GET"
		};
		fetch(url, options)
		  .then(results => results.json())
		  .then(
			data => {
			  this.setState({roles:data.data.roles,username:data.data.username});
			},
			error => {
			  console.log(error)
			}
		  );
	}
    
	  
  }
  
  isInRole(roles, targetRoles) {
	  for(var i = 0; i < roles.length; i++) {
		  if(targetRoles.indexOf(roles[i]) > -1) {
			  return true;
		  }
	  }
	  return false;
  }
  handleLogoutClick() {
	  window.location = 'logout';
  }
  render() {
    return (
      <div>
        <div>
          <Navbar className="navbar navbar-expand-lg navbar-dark bg-primary">
            <Navbar.Brand as={Link} to="/" >Blockchain Monit</Navbar.Brand>
            <Navbar.Collapse>
              <Nav className="mr-auto" style={{ width: "50%" }}>
			   
				<NavItem>
				  <NavLink onClick={() => {ee.emit('navigatePage',{page:<Home />})}} href="#">User Role</NavLink>
				</NavItem>
              </Nav>
			  <Nav className="ml-auto justify-content-end" style={{ width: "50%" }}>
	 		    <NavItem>
				  <Button variant="outline-success" onClick={this.handleLogoutClick}>Logout</Button>
				</NavItem>
			  </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
		<p>Welcome {this.state.username}</p>
		{this.state.infomsg != '' &&
			<div>
				<Alert color={this.state.infocolor} onClick={this.handleDismissInfomsg}>
					{this.state.infomsg}
				</Alert>
			</div>
		}
        <div style={{margin:"10px"}}>
			{this.state.currentPage}
        </div>
      </div>
    );
  }
}

export default Navigation