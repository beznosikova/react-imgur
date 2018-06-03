import React, { Component } from "react";
import { connect } from "react-redux";
import { Container } from 'reactstrap';
import { Link, withRouter } from "react-router-dom";
import ImageDetail from "../components/imageDetail";

class GalleryDetail extends Component {


  render(){
    const { image } = this.props;
    const link = <Link to="/"><h1>Home</h1></Link>;
    if (image.length<1)
      return  link
    else 
      return(
            <div className="row gallery-list">
              <Container>
                {link}
                <ImageDetail item={image[0]} />
              </Container>
            </div>
      );
    }
}

const mapStateToProps = (state, { match }) => {
return {
  image: state.galleriesList.list.filter(item => item.id === match.params.imageId),
}
};

export default connect(mapStateToProps)(
  withRouter(GalleryDetail)
);
