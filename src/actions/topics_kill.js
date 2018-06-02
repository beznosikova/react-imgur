const API_URL = "https://api.imgur.com/3/";

export const asyncGetTopics = () => {
  
  console.log("asyncGetTopics");
  const url = `https://api.imgur.com/3/topics/defaults`; // топіки - в них можна снайти теги
  
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
            return false;
          } else {
            return data.data;
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