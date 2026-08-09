import React, { Component } from "react";
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
import ee from './EventManager';
import { NavLink,NavItem,Alert } from 'reactstrap';
import * as MyConstants from './MyConstants';
import { useI18n } from './i18n';

function LanguageSwitcher() {
  const { locale, localeNames, setLocale, t } = useI18n();
  return <label className="text-light mb-0 mr-3">
    <span className="sr-only">{t('language')}</span>
    <select aria-label={t('language')} value={locale} onChange={event => setLocale(event.target.value)}>
      {Object.entries(localeNames).map(([code, name]) => <option key={code} value={code}>{name}</option>)}
    </select>
  </label>;
}
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
  
  render() {
    const LocalizedNavigation = () => {
      const { t } = useI18n();
      return <>
        <NavItem><NavLink onClick={() => {ee.emit('navigatePage',{page:<Home />})}} href="#">{t('home')}</NavLink></NavItem>
        <div className="ml-auto d-flex align-items-center">
          <LanguageSwitcher />
          <NavItem><Button variant="outline-light" onClick={this.handleLogoutClick}>{t('logout')}</Button></NavItem>
        </div>
      </>;
    };
    return (
      <div>
        <div>
          <Navbar className="navbar navbar-expand-lg navbar-dark bg-primary">
            <Navbar.Brand as={Link} to="/" >Blockchain Monit</Navbar.Brand>
            <Navbar.Collapse>
              <Nav className="mr-auto align-items-center" style={{ width: "100%" }}>
				<LocalizedNavigation />
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
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
