import React, { Component } from 'react';

import { Button, Form, FormGroup, Label, Input, FormText, Col, Alert} from 'reactstrap';
class StandardForm extends Component {
  componentWillMount() {
	  var me = this;
	  this.setState({options:this.props.options,selectedFile:null});
	  this.fields = {};
	  this.handleFormSubmit = this.handleFormSubmit.bind(this)
	  this.handleChange = this.handleChange.bind(this)
	  this.handleUploadChange = this.handleUploadChange.bind(this)
	  
  }
  
  
  render() {
	  var me = this;
	  this.props.options.fields.map((field,i) => {
		  if(field.type == 'selectone' && !field.value && field.options.length) {
			  field.value = field.options[0].value; // default value
		  }
		  me.fields[field.id] = field.value;
	  })
    return (
	  <div>
		<h2>{this.state.options.title}</h2>
		
			{this.state.options.errorMessage && 
				<Alert color="danger">
				{this.state.options.errorMessage}
				</Alert>}
			
		<Form>
			{this.props.options.fields.map((field,i) => (
				<FormGroup key={i}>
					
					<Label for={field.id}>{field.label}</Label>
					
					 {field.type=="text" && 
						<Input type="text" name={field.id} id={field.id} placeholder={field.id + "(" + field.label + ")"} value={field.value} onChange={this.handleChange} />}
					 {field.type=="textarea" && 
						<Input type="textarea" name={field.id} id={field.id} placeholder={field.id + "(" + field.label + ")"} value={field.value} onChange={this.handleChange} />}
					 {field.type=="label" && 
						<Input type="text" disabled={true} value={field.value} />}
					 {field.type=="fileupload" && 
						<Input type="file" name={field.id} id={field.id} onChange={this.handleUploadChange} />}	
						
						
				      {field.type=="selectone" && 
					  <Input type="select" value={field.value} name={field.id} id={field.id} onChange={this.handleChange}>
						  {field.options.map((k,i) => (
							  <option key={i} value={k.value}>{k.key}</option>
						  ))}
					  </Input>}
				</FormGroup>
			))}
			
			<FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button onClick={this.handleFormSubmit} color="success">Submit</Button>
          </Col>
        </FormGroup>
					
			
		</Form>
	  </div>
	  
    );
  }
  
  handleFormSubmit() {
	  this.props.options.onSubmit({fields:this.fields,selectedFile:this.state.selectedFile})
  }
  
  handleChange(e) {
	  // set to my own local fields for handleformsubmit
	  this.fields[e.target.id] = e.target.value;
	  
	  // to refresh react state options fields after field change, otherwise cannot change
	  this.state.options.fields.map((field,i) => {
		  if(field.id == e.target.id) {
			  field.value = e.target.value;
		  }
	  })
	  this.setState({options:this.state.options}) // <-- this line is important
  }
  handleUploadChange(e) { 
	  e.preventDefault();
      var file = e.target.files[0];
	  this.setState({selectedFile:file});
  }
}

export default StandardForm;