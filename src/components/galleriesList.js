import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container, Row } from 'reactstrap';
import InfiniteScroll from 'react-infinite-scroller';  

import ImageCard from "../components/imageCard";
import { asyncGetGalleries } from "../actions/galleries";

class GalleriesList extends Component {

  componentDidMount() {
    this.props.getGalleries(this.props.filter);
  }

  getNext(page){
    const {topic} = this.props.filter
    this.props.getGalleries({page, topic});
  }

  render() {
    console.log("gallery-list props", this.props);

    const { list, hasMore } = this.props.list;
    const { topic } = this.props.filter

    let items = [];
    if (list.length){
      list.map(item => {
        items.push(<ImageCard key={item.id} item={item} />);
      })
    }

    return (
      <div className="row gallery-list">
        <Container>
          <h1>Topic: {topic}</h1>
          {
            list.length ? (
              <InfiniteScroll
                  pageStart={0}
                  loadMore={this.getNext.bind(this)}
                  hasMore={hasMore}
                  loader={<div className="loader" key="loading-div">Loading ...</div>}
                  key={0}           
                  >   
                  <Row>
                    {items}
                  </Row> 
              </InfiniteScroll>
            ) : (
              <p>Please wait, while galleries are loading...</p>
            )
          }
        </Container> 
      </div>
    );
  }
}

const mapStateToProps = state => ({
  list: state.galleriesList,
  filter: state.galleriesFilter
});

const mapDispatchToProps = dispatch => ({
  getGalleries: params => {
    console.log("params", params);
    dispatch(asyncGetGalleries(params));
  },
  // changeFilter: (name, newValue) => {
  //   dispatch(changeFilter(name, newValue));
  // }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(GalleriesList)
);
