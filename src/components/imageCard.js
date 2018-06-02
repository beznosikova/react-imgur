import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardImg, CardText, CardBody,
  CardTitle, Button, Col } from 'reactstrap';

class ImageCard extends Component {
  textShort(str, maxLength = 100) {
    if (str.length > maxLength) {
        return str.slice(0, maxLength) + '...';
    }
    return str;
  }

  getSmallImgUrl(url, imgSuffix) {
    let arrUrl = url.split('/');
    let lastIndex = arrUrl.length-1;
    arrUrl[lastIndex] = arrUrl[lastIndex].replace(/\./, imgSuffix + '.');
    return arrUrl.join('/');
  }
  render(){
    const {item} = this.props;
  let imgItem = (item.images)? item.images[0] : item;
  let imgUrl = "";
  if (imgItem.gifv){
    imgUrl = imgItem.link;
  } else {
    imgUrl = this.getSmallImgUrl(imgItem.link,'m')
  }
return(
  <Col xs="6" sm="4" key={item.id}>
    <Card>
      <Link to='/'> {/*inner url!!!!!!!!!!!!!!!!!!!!!!*/}
      <CardImg 
        top 
        width="100%" 
        src={imgUrl}
        alt={item.title} 
      />
      </Link>
      <CardBody>
        <CardTitle>{this.textShort(item.title)}</CardTitle>
        <CardText>
          Topic: {item.topic}<br/>
          Coments: {item.comment_count}<br/>
          Views: {item.views}<br/>
        </CardText>
        <Button 
          href={item.link} 
          target="_blank" 
          color="secondary"
        >
          External link
        </Button>
      </CardBody>
    </Card>
  </Col>
);
}
}

export default ImageCard;
