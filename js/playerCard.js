//Provides for the functionality of player avatar selection

const container = document.querySelector(".card-container"),
  player1 = document.getElementById("selectPlayer1"),
  player2 = document.getElementById("selectPlayer2"),
  closeBtn = document.querySelector(".close-btn");

player1.addEventListener("click", () => {
  localStorage.setItem("whichPlayer", "./images/players/player1.png");
  window.location.href = "./AlleyCat.html";
});
player2.addEventListener("click", () => {
  localStorage.setItem("whichPlayer", "./images/players/player2.png");
  window.location.href = "./AlleyCat.html";
});
