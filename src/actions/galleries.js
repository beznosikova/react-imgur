const API_URL = "https://api.imgur.com/3/";

export const asyncGetGalleries = ({
  topic,
  page,
  newTopic
  // sort,
  // window,
}) => dispatch => {
  
  console.log("asyncGetGalleries");
  // console.log("page", page);

  // const url = `${API_URL}/${section}/${sort}/${window}/${page}?album_previews=true`;
  // const url = `${API_URL}/${section}/${sort}/${window}/?page=${page}&perPage=${perPage}`;
  
  // const url = `https://api.imgur.com/3/gallery/album/mku0E`; // один альбом
  // const url = `https://api.imgur.com/3/gallery/image/BaqrF2I`;  // Одна картинка з альбому можна отримати по айді
  // const url = `https://api.imgur.com/3/gallery/t/Awesome`; // вибір всіх картинок по тегу
  // const url = `https://api.imgur.com/3/topics/defaults`; // топіки - в них можна снайти теги
  
  const url = `${API_URL}topics/${topic}?page=${page}`; // картинки для данного топіка

  console.log(url);
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
        data =>{
          console.log("data", data);
          if (data.status != 200){
            (data.status != 404) ? 
            dispatch({ type: "GALLERIES_HAS_MORE", payload: data.status })
            : dispatch({ type: "GALLERIES_NOT_FOUND", payload: data.error })
          } else {
              (newTopic) ? 
              dispatch({ type: "GALLERIES_NEW_TOPIC", payload: data.data })
              :dispatch({ type: "GALLERIES_NEXT_PAGE", payload: data.data })
          }
        }
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