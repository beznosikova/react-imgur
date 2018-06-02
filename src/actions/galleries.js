const API_URL = "https://api.imgur.com/3/gallery/";

export const asyncGetGalleries = ({
  section,
  sort,
  window,
  page
}) => dispatch => {
  const url = `${API_URL}/${section}/${sort}/${window}/${page}?album_previews=true`;
  fetch(url, {
    async: true,
    crossDomain: true,
    method: "GET",
    headers: {
      authorization: "Client-ID d2167eddae8bbc8"
    }
  })
    .then(response => {
      response.json().then(
        data =>
          page > 0
            ? dispatch({ type: "GALLERIES_NEXT_PAGE", payload: data.data })
            : dispatch({
                type: "FETCH_GALLERIES_SUCCESS",
                payload: data.data
              })
      );
    })
    .catch(function(error) {
      console.log("Request failed", error);
    });
};

/*
axios.get(`${REMOTE_URL+cryptoCurency}/?convert=${curency}`)
      .then(res => {
        const convertData = res.data.data;
        let rezult = Number.parseFloat(value * convertData['quotes'][curency]['price']).toFixed(2);
        let convertRezult = rezult + " " +curency;
        this.setState({
          convertRezult
        });        
      })    */