import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Card, CardImg, CardText, CardBody,
  CardTitle, Button, Col } from 'reactstrap';
import { Link, withRouter } from "react-router-dom";
import ImageCard from "../components/imageCard";

class ImageDetail extends Component {

  render(){
    console.log("detail", this.props);
    const item = this.props.image[0];
    return(
          <div className="row gallery-list">
            <Container>
              <Link to="/">
                <h1>Images from imgur.com</h1>
              </Link>
              <ImageCard item={item} />
            </Container>
          </div>
    );
}}

const mapStateToProps = (state, { match }) => {
console.log("state",state);
return {
  image: state.galleriesList.list.filter(item => item.id === match.params.imageId),
  // comments: state.comments
}
};

const mapDispatchToProps = dispatch => ({
  // getComments: (id, clear) => {
  //   dispatch(asyncComments(id, clear));
  // }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(ImageDetail)
);
