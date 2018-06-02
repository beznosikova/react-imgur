import React from "react";
import { Row, FormGroup, Label, Input } from 'reactstrap';

const TopicsList = ({topic, topics, onChange}) => {
	return (
		<Row>   
		  <FormGroup>
		    <Label for="topicSelect">Select topic</Label>
		    <Input 
		      type="select" 
		      name="select" 
		      id="topicSelect" 
		      placeholder="Select topic"
		      value={topic}
		      onChange={onChange}
		    >
		    {topics.map(item => <option value={item.id} key={item.id}>{item.name}</option>)}
		    </Input>
		  </FormGroup>          
		</Row>
	);
}

export default TopicsList;