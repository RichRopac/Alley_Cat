// API call for the movie cards, cards are generated with innerHTML calls

const requestURL = "https://imdb-top-100-movies.p.rapidapi.com/";
const host = "imdb-top-100-movies.p.rapidapi.com";
const key = "b1d649dcc3msh61f49baa8dbd5adp11761bjsnd7b14d4f4458";

let moviesCard = "";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": key,
    "X-RapidAPI-Host": host,
  },
};
fetch(requestURL, options)
  .then((data) => data.json())
  .then((articles) => {
    articles.map((article) => {
      moviesCard += `<div class = "movies-card">
         <div class="movies-card-image">
           <img src="${article.image}" alt=""/>
         </div>
         <div class="movies-content">
           <div class="movie-title">
             <h3>${article.title}</h3>
           </div>
           <div class="movies-description">
             <p>${article.description}</p>
           </div>
           <div class = "view-button">
            <a href="${article.trailer}" target="_blank" class="view-button">View Trailer</a>
           </div>
          </div>
       </div>`;
    });
    const theMovies = document.querySelector(".movies");
    theMovies.innerHTML = moviesCard;
  })
  .catch((err) => console.error(err));
