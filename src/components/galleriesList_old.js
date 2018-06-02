import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Container, Row, Col } from 'reactstrap';
  

import { asyncGetGalleries } from "../actions/galleries";

class GalleriesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      currentPage: 0,
      listEnd: false,
      // list: [],
      perPage: 40,
      userSelected: false,
      topSelected: false,
      load: false
    };
    this.infinityScroll = this.infinityScroll.bind(this);
  }

  componentDidMount() {
    console.log("props", this.props);
    console.log("filter", this.props.filter);
    this.props.getGalleries(this.props.filter);
    window.addEventListener("scroll", this.infinityScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.infinityScroll);
  }

  infinityScroll(e) {
// console.log("infinityScroll", "yes");
      // this.props.getGalleries({
      //   page: ++this.state.page,
      // });


    const { pageYOffset } = window;
    const { documentElement } = document;
    const { clientHeight, scrollHeight } = documentElement;
    const { load, listEnd, page, currentPage, perPage } = this.state;
    const scrollTop = pageYOffset || documentElement.scrollTop;

    if (clientHeight + scrollTop >= scrollHeight && !load && listEnd) {
            
      this.props.changeFilter({ page: ++this.state.page });
      this.setState({
        page: ++this.state.page,
        load: true,
        listEnd: false,
        currentPage: currentPage + perPage
      });
    } else if (clientHeight + scrollTop >= scrollHeight && !load && !listEnd) {
      console.log("infinityScroll");
      this.props.getGalleries({
        page: ++this.state.page, 
        // section: this.props.filter.section,
        // sort: this.props.filter.sort,
        // window: this.props.filter.window,
      });
      // this.loadNextGalleries(this.props, true);
    }
  }

/*  onFilterChange(event) {
    const select = event.target;
    const option = select.options[select.selectedIndex];
    this.setState({
      currentPage: 0,
      load: true,
      useFilter: true,
      page: 0
    });
    this.props.changeFilter({
      [select.name]: option.value,
      page: 0
    });
    if (select.name === "section") {
      option.value === "user"
        ? this.setState({ userSelected: true })
        : this.setState({ userSelected: false });
      option.value === "top"
        ? this.setState({ topSelected: true })
        : this.setState({ topSelected: false });
    }
  }*/

 /* loadNextGalleries(props, nextPage = false) {
    let currentNextPage;
    if (this.state.currentPage + this.state.perPage >= props.list.length) {
      this.setState({ listEnd: true });
      currentNextPage = this.state.currentPage;
    } else {
      currentNextPage = this.state.currentPage + this.state.perPage;
      this.setState({ listEnd: false });
    }
    if (this.state.useFilter) {
      window.scrollTo(0, 0);
      this.setState({
        list: [
          ...props.list.slice(
            this.state.currentPage,
            this.state.currentPage + this.state.perPage
          )
        ],
        currentPage: currentNextPage,
        useFilter: false
      });
    } else {
      this.setState({
        list: [
          ...this.state.list,
          ...props.list.slice(
            this.state.currentPage,
            this.state.currentPage + this.state.perPage
          )
        ],
        currentPage: currentNextPage
      });
    }
  }
*/
/*  componentWillReceiveProps(nextProps) {
    if (
      JSON.stringify(nextProps.filter) !== JSON.stringify(this.props.filter)
    ) {
      this.props.getGalleries(nextProps.filter);
    } else {
      this.setState({ load: false });
      this.loadNextGalleries(nextProps);
    }
  }
*/

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

  render() {
    console.log("gallery-list props", this.props);

    const { list } = this.props;

    return (
      <div className="row gallery-list">
      <Container>
      <Row>
{/*        <GalleryFilter
          filterOptions={this.props.filter}
          onFilterChange={this.onFilterChange.bind(this)}
          userSelected={this.state.userSelected}
          topSelected={this.state.topSelected}
        />*/}
        {list.length ? (
          list.map(item => {

            let imgItem = (item.images)? item.images[0] : item;
            let imgUrl = "";
            if (imgItem.gifv){
              imgUrl = imgItem.link;
            } else {
              imgUrl = this.getSmallImgUrl(imgItem.link,'m')
            }

            return (
              <Col xs="6" sm="4" key={item.id}>
                <Card>
                  <Link to='/'>
                  <CardImg 
                    top 
                    width="100%" 
                    src={imgUrl}
                    alt={item.title} 
                  />
                  </Link>
                  <CardBody>
                    <CardTitle>{this.textShort(item.title)}</CardTitle>
                    {/*<CardSubtitle>Topic: {item.topic}</CardSubtitle>*/}
                    <CardText>
                      Topic: {item.topic}<br/>
                      Coments: {item.comment_count}<br/>
                      Views: {item.views}<br/>
                    </CardText>
                    {/*<CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>*/}
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
            /*return <Post key={post.id} post={post} />;*/
          })
        ) : (
          <p>Please wait, while galleries are loading...</p>
        )}
        </Row> 
      </Container> 
        {this.state.load && (
          <div className="loader">
            <h3 className="loader__title">Loading...</h3>
            {/*<img
              src="http://img35.laughinggif.com/pic/HTTP2kuZ2lmdHJ1bmsuY29tLzhwbTc2di5naWYlog.gif"
              alt="loading..."
              className="loader__image"
            />*/}
          </div>
        )}
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
