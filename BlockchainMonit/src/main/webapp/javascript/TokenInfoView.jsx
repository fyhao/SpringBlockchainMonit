import React, { Component, useState } from "react";
import { Navbar, Nav, Form, FormControl, Button, NavItem, Card } from 'react-bootstrap';

function TokenInfoView(props) {
	const token = props.token;
	//const [tokenName,setTokenName] = useState(token.name);
	const handleVisitClick = () => {
		window.open(token.url, "_blank");
	};
	return (
		<Card style={{ width: '18rem' }}>
		  <Card.Img variant="top" src={token.image} />
		  <Card.Body>
		    <Card.Title>{token.name}</Card.Title>
		    <Card.Text>
		      <p>{token.name} - {token.price}</p>
		      <p>{token.description}</p>
		    </Card.Text>
		    <Button variant="primary" onClick={handleVisitClick}>Visit Etherscan</Button>
		    <Button variant="secondary" onClick={props.handleBack}>Back</Button>
		  </Card.Body>
		</Card>
	);
}

export default TokenInfoView