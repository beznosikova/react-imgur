import PARAMS from '../Constants';

export const asyncGetGalleries = ({
  topic,
  page,
  newTopic
}) => dispatch => {
  
  const url = `${PARAMS.API_URL}topics/${topic}?page=${page}`; // images for one topic

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
          if (data.status !== 200){
            (data.status !== 404) ? 
            dispatch({ type: "GALLERIES_HAS_MORE", payload: data.status, page})
            : dispatch({ type: "GALLERIES_NOT_FOUND", payload: data.error, page })
          } else {
              (newTopic) ? 
              dispatch({ type: "GALLERIES_NEW_TOPIC", payload: data.data, page })
              :dispatch({ type: "GALLERIES_NEXT_PAGE", payload: data.data, page })
          }
        }
      );
    })
    .catch(function(error) {
      console.log("Request failed", error);
    });
};
