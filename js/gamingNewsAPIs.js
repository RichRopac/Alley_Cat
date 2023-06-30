// API call to pull the news articles and cards are created with innerHTML

const requestURL =
  "https://videogames-news2.p.rapidapi.com/videogames_news/search_news?query=GTA";
const host = "videogames-news2.p.rapidapi.com";
const key = "b1d649dcc3msh61f49baa8dbd5adp11761bjsnd7b14d4f4458";

let newsCard = "";

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
      newsCard += `<div class = "news-card">
         <div class="news-card-image">
           <img src="${article.image}" alt=""/>
         </div>
         <div class="news-content">
           <div class="news-title">
             <h3>${article.title}</h3>
           </div>
           <div class="news-description">
             <p>${article.description}</p>
           </div>
           <div class = "view-button">
            <a href="${article.link}" target="_blank" class="view-button">Read More</a>
           </div>
          </div>
       </div>`;
    });
    console.log(newsCard);
    const theCards = document.querySelector(".cards");
    theCards.innerHTML = newsCard;
  })
  .catch((err) => console.error(err));
