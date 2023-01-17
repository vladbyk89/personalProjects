let copyDeck = resetCardDeck();

class NewCard {
  public cardName: string;
  public cardValue: number;
  public cardImage: string;
  constructor() {
    this.cardName = this.getRndmCard();
    this.cardValue = this.setCardValue(this.cardName);
  }

  getRndmCard() {
    //get rdm number from 0 to 3
    let x = Math.floor(Math.random() * 4);
    //get rdm number from 0 to 12
    let y = Math.floor(Math.random() * copyDeck[x].length);
    // set z to card chosen from deck
    let z = copyDeck[x][y];

    //remove chosen card from deck x
    copyDeck[x].splice(y, 1);
    return z;
  }

  setCardValue(card: string) {
    //checks if the drown card is a 10 (second char at card is 0)
    if (card[1] == '0') {
      return 10;
    } else if (card[0] == "j" || card[0] == "q" || card[0] == "k") {
      return 10;
    } else if (card[0] == "a") {
      return 11;
    } else {
      return parseInt(card[0]);
    }
  }
}

const aCard = new NewCard();
console.log(aCard);


let playerCards = [];
let houseCards = [];
let nextCard,
  valueNextCard,
  sumPlayer,
  sumHouse,
  houseFirstDraw,
  houseSecondDraw;

let isAlive = true;
let hasBlackJack = false;

const userScore = document.getElementById("userScore") as HTMLSpanElement;
const houseScore = document.getElementById("houseScore") as HTMLSpanElement;
const userMessage = document.querySelector(
  ".gameContainer__title__userMessage"
) as HTMLHeadElement;
const startNewGameBtn = document.querySelector(
  "#newGameBtn"
) as HTMLButtonElement;
const giveUserAnotherCardBtn = document.querySelector(
  "#getCardButton"
) as HTMLButtonElement;
const userHoldBtn = document.querySelector("#holdBtn") as HTMLButtonElement;

//Setting two jokers on the table for user as starting screen
const jokerImg1 = new Image();
jokerImg1.src = "./PNG-cards-1.3/card_back_red.png";
const jokerImg2 = new Image();
jokerImg2.src = "./PNG-cards-1.3/card_back_red.png";
let userCardsDiv = document.querySelector("#userCards") as HTMLDivElement;
userCardsDiv.append(jokerImg1);
userCardsDiv.append(jokerImg2);
jokerImg1.setAttribute("class", "displayedCard");
jokerImg2.setAttribute("class", "displayedCard");

const houseFirstCard = document.querySelector(
  "#houseFirstCard"
) as HTMLImageElement;
const houseSecondCard = document.querySelector(
  "#houseSecondCard"
) as HTMLImageElement;
let houseCardsDiv = document.querySelector(".houseCardsDiv") as HTMLDivElement;

function resetGame() {
  isAlive = true;
  hasBlackJack = false;
  while (userCardsDiv.firstChild) {
    userCardsDiv.removeChild(userCardsDiv.lastChild);
    playerCards = [];
  }

  while (houseCardsDiv.firstChild) {
    houseCardsDiv.removeChild(houseCardsDiv.lastChild);
    houseCards = [];
  }

  userMessage.style.backgroundColor = "";
}

function processPlayerCard(num) {
  while (num > 0) {
    nextCard = getRndmCard();
    valueNextCard = cardValue(nextCard);
    playerCards.push(valueNextCard);
    sumPlayer += valueNextCard;
    let newImg = document.createElement("img");
    newImg.setAttribute("src", returnImg(nextCard));
    newImg.setAttribute("class", "displayedCard");
    userCardsDiv.append(newImg);
    num--;
  }
}

function processHouseCard(num) {
  while (num > 0) {
    nextCard = getRndmCard();
    valueNextCard = cardValue(nextCard);
    houseCards.push(valueNextCard);
    sumHouse += valueNextCard;
    let newImg = document.createElement("img");
    newImg.setAttribute("src", returnImg(nextCard));
    newImg.setAttribute("class", "displayedCard");
    houseCardsDiv.append(newImg);
    num--;
  }
}

function newGame() {
  resetGame();
  copyDeck = resetCardDeck();

  sumHouse = 0;
  houseScore.textContent = sumHouse;
  sumPlayer = 0;

  processPlayerCard(2);
  userScore.textContent = sumPlayer;

  if (sumPlayer == 22) {
    sumPlayer = 12;
    playerCards[1] = 1;
  } else if (sumPlayer == 21) {
    hasBlackJack = true;
    userMessage.textContent = "BLACKJACK you win!";
    userMessage.style.backgroundColor = "blue";
    userMessage.style.textShadow = "none";
    return;
  }

  userMessage.textContent = "Get another card or Hold";

  //rendering houses first card and joker as second card
  houseSecondCard.setAttribute("src", "./PNG-cards-1.3/card_back_red.png");
  houseFirstDraw = getRndmCard();
  houseFirstCard.setAttribute("src", returnImg(houseFirstDraw));
  houseCardsDiv.append(houseFirstCard);
  houseCardsDiv.append(houseSecondCard);
  sumHouse = cardValue(houseFirstDraw);
  houseScore.textContent = sumHouse;
  houseCards.push(sumHouse);
}

function compTurn() {
  if (hasBlackJack == true || isAlive == false) {
    return;
  }
  houseSecondDraw = getRndmCard();
  houseSecondCard.setAttribute("src", returnImg(houseSecondDraw));
  houseCardsDiv.append(houseSecondCard);
  houseCards.push(cardValue(houseSecondDraw));
  sumHouse += cardValue(houseSecondDraw);

  while (sumHouse < sumPlayer) {
    processHouseCard(1);

    if (sumHouse > 21) {
      for (let i = 0; i < houseCards.length; i++) {
        if (houseCards[i] == 11) {
          houseCards[i] = 1;
          sumHouse -= 10;
          houseScore.textContent = sumHouse;
        }
      }
    }
  }
  houseScore.textContent = sumHouse;
  if (
    (sumHouse <= 21 && sumHouse > sumPlayer) ||
    (sumHouse < 21 && houseCards.length == 5)
  ) {
    isAlive = false;
    userMessage.textContent = "Game over House wins";
    userMessage.style.backgroundColor = "black";
    userMessage.style.textShadow = "none";
    return;
  } else if (sumHouse == sumPlayer) {
    isAlive = false;
    userMessage.textContent = "It's a tie";
    userMessage.style.backgroundColor = "green";
    userMessage.style.textShadow = "none";
    return;
  } else {
    hasBlackJack = true;
    userMessage.textContent = "YOU WIN!";
    userMessage.style.backgroundColor = "blue";
    userMessage.style.textShadow = "none";
    return;
  }
}

function getCard() {
  if (hasBlackJack == true || isAlive == false) {
    // userMessage.textContent = "Please start new game"
    return;
  } else if (userScore == 0) {
    userMessage.textContent = "Start game first";
    return;
  }

  processPlayerCard(1);
  console.log(playerCards);
  console.log(playerCards.length);
  userScore.textContent = sumPlayer;

  if (sumPlayer > 21) {
    isAlive = false;
    for (let i = 0; i < playerCards.length; i++) {
      if (playerCards[i] == 11) {
        playerCards[i] = 1;
        sumPlayer -= 10;
        userScore.textContent = sumPlayer;
        isAlive = true;
        if (sumPlayer == 21 || playerCards.length == 5) {
          hasBlackJack = true;
          userMessage.textContent = "YOU WIN!";
          userMessage.style.backgroundColor = "blue";
          userMessage.style.textShadow = "none";
          return;
        }
      }
    }
    if (sumPlayer > 21) {
      userMessage.textContent = "Game over House wins";
      userMessage.style.backgroundColor = "black";
      userMessage.style.textShadow = "none";
    }
  } else if (sumPlayer == 21 || playerCards.length == 5) {
    hasBlackJack = true;
    userMessage.textContent = "YOU WIN!";
    userMessage.style.backgroundColor = "blue";
    userMessage.style.textShadow = "none";
    return;
  }
}

function resetCardDeck() {
  return [
    [
      "2d",
      "3d",
      "4d",
      "5d",
      "6d",
      "7d",
      "8d",
      "9d",
      "10d",
      "jd",
      "qd",
      "kd",
      "ad",
    ],
    [
      "2s",
      "3s",
      "4s",
      "5s",
      "6s",
      "7s",
      "8s",
      "9s",
      "10s",
      "js",
      "qs",
      "ks",
      "as",
    ],
    [
      "2h",
      "3h",
      "4h",
      "5h",
      "6h",
      "7h",
      "8h",
      "9h",
      "10h",
      "jh",
      "qh",
      "kh",
      "ah",
    ],
    [
      "2c",
      "3c",
      "4c",
      "5c",
      "6c",
      "7c",
      "8c",
      "9c",
      "10c",
      "jc",
      "qc",
      "kc",
      "ac",
    ],
  ];
}

function cardValue(card: string) {
  //checks if the drown card is a 10 (second char at card is 0)
  if (card[1] == '0') {
    return 10;
  } else if (card[0] == "j" || card[0] == "q" || card[0] == "k") {
    return 10;
  } else if (card[0] == "a") {
    return 11;
  } else {
    return parseInt(card[0]);
  }
}

function returnImg(aCard) {
  for (let i = 0; i < cardImg.length; i++) {
    if (aCard == cardImg[i][0]) {
      return cardImg[i][1];
    }
  }
}

// function getRndmCard() {
//   //get rdm number from 0 to 3
//   let x = Math.floor(Math.random() * 4);
//   //get rdm number from 0 to 12
//   let y = Math.floor(Math.random() * copyDeck[x].length);
//   // set z to card chosen from deck
//   let z = copyDeck[x][y];

//   //remove chosen card from deck x
//   copyDeck[x].splice(y, 1);
//   return z;
// }
