import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';
import InfiniteScroll from 'react-infinite-scroller';  

import ImageCard from "../components/imageCard";
import TopicsList from "../components/topicsList";

import { changeFilter } from "../actions/filter";
import { asyncGetGalleries } from "../actions/galleries";

import PARAMS from '../Constants';

class GalleriesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topics:[]
    }
    this.asyncGetTopics = this.asyncGetTopics.bind(this);
    this.changeTopic = this.changeTopic.bind(this);
  }    

  componentWillMount() {
    this.props.getGalleries(this.props.filter);
    this.asyncGetTopics();
  }

  asyncGetTopics(){
    const url = `${PARAMS.API_URL}topics/defaults`;
    
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
            console.log("data", data);
            this.setState({topics:data.data})
          }
        );
      })
      .catch(function(error) {
        console.log("Request failed", error);
      });
  };  

  getNextPage(page){
    const {topic} = this.props.filter
    this.props.getGalleries({page, topic});
  }

  changeTopic(e){
    console.log(e.target.value);
    let topic = e.target.value;
    this.props.changeFilter({topic});
    this.props.getGalleries({page:0, topic, newTopic:true});
  }

  render() {
    const loader = <div className="loader" key="loading-div">Loading ...</div>;
    const { list, hasMore } = this.props.list;
    const { topic } = this.props.filter;
    const { topics } = this.state;

    let items = [];
    if (list.length){
      list.map(item => {
        items.push(<ImageCard key={item.id} item={item} />);
      })
    }

    return (
      <div className="row gallery-list">

        <Container>
          <h1>Images from imgur.com</h1>
          <Col xs="8" sm="6">   
            <TopicsList topic={topic} topics={topics} onChange={this.changeTopic}/>
          </Col>

          {
            list.length ? (
              <InfiniteScroll
                  pageStart={0}
                  loadMore={this.getNextPage.bind(this)}
                  hasMore={hasMore}
                  loader={loader}
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
    dispatch(asyncGetGalleries(params));
  },
  changeFilter: (name, newValue) => {
    dispatch(changeFilter(name, newValue));
  }  
  // changeFilter: (name, newValue) => {
  //   dispatch(changeFilter(name, newValue));
  // }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(GalleriesList)
);
