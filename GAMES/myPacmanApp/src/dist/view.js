var mazeDiv = document.querySelector(".maze");
var scoreEl = document.querySelector("#score");
var winMessage = document.querySelector(".winMessage");
var loseMessage = document.querySelector(".loseMessage");
var finalScore = document.querySelectorAll(".finalScore");
var backToStartingPageBtn = document.querySelectorAll(".backToStartingPageBtn");
var tryAgainBtn = document.querySelectorAll(".tryAgainBtn");
var scoreboardBtn = document.querySelectorAll(".scoreboardBtn");
var loginPage = document.querySelector(".loginPage");
var welcomePage = document.querySelector(".welcomePage");
var userNameInput = document.querySelector("#userName");
var passwordInput = document.querySelector("#password");
var mapImgElement = document.querySelectorAll(".mapImg");
var usersList = [];
backToStartingPageBtn.forEach(function (btn) {
    btn.addEventListener("click", function () {
        window.location.href = "startPage.html";
        localStorage.removeItem("userChoice");
    });
});
