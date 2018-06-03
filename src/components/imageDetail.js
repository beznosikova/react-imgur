import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardImg, CardText, CardBody,
  CardTitle, Col } from 'reactstrap';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';

import PARAMS from '../Constants';

class ImageDetail extends Component {
  state = {
    comments: []
  }

  componentWillMount() {
    this.asyncGetComments(this.props.item.id);
  }

  asyncGetComments(id){
    const url = `${PARAMS.API_URL}gallery/${id}/comments/best`;
    
    fetch(url, {
      async: true,
      crossDomain: true,
      method: "GET",
      headers: {
        authorization: `Client-ID ${PARAMS.CLIENT_ID}`
      }
    })
      .then(response => {
        response.json().then(
          data =>{
            this.setState({comments:data.data})
          }
        );
      })
      .catch(function(error) {
        console.log("Request failed", error);
      });
  };  

  getDateString(datetime){
    let atDate = new Date(datetime * 1000);
    return atDate.toLocaleString();
  }

  recursionPrintComments(comment){
    if (!comment.children.length){
      return (  
        <ListGroupItem key={comment.id}>
          <ListGroupItemHeading>{comment.comment}</ListGroupItemHeading>
          <ListGroupItemText>by {comment.author} at {this.getDateString(comment.datetime)}</ListGroupItemText>
        </ListGroupItem>        
      )
    } else {
      return (
        <ListGroupItem key={comment.id}>
          <ListGroupItemHeading>{comment.comment}</ListGroupItemHeading>
          <ListGroupItemText>by {comment.author} at {this.getDateString(comment.datetime)}</ListGroupItemText>
          <ListGroup flush>
            {comment.children.map(comment => (this.recursionPrintComments(comment)))}
          </ListGroup>          
        </ListGroupItem>  
        )
    }
  }

  render(){
    const {item} = this.props;
    const {comments} = this.state;
    let atDateString = this.getDateString(item.datetime);

    return(
      <Col >
        <Card>
          <Link to={item.link} target="_blank"><h1>{item.title}</h1></Link>
          <CardTitle>by {item.account_url} at {atDateString}</CardTitle>
          <CardText>Topic: {item.topic}</CardText>        
          {
            (item.images)?
              item.images.map(img => (
              <CardImg 
                top 
                width="100%" 
                key={img.id}
                src={img.link}
                alt={img.title} 
                title={img.title}
              />))
              : 
              <CardImg top width="100%" src={item.link} alt={item.title} />              
          }
          <CardBody>
            <CardTitle>Coments: {item.comment_count}</CardTitle>
          </CardBody>
          <ListGroup flush>
            {comments.map(comment => (
              this.recursionPrintComments(comment)
              )
              )}              
          </ListGroup>     
        </Card>

      </Col>
    );
}}

export default ImageDetail;
