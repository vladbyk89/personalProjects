let copyDeck = resetCardDeck();
const cardImg: string[][] = [
  ["2d", "./PNG-cards-1.3/2_of_diamonds.png"],
  ["3d", "./PNG-cards-1.3/3_of_diamonds.png"],
  ["4d", "./PNG-cards-1.3/4_of_diamonds.png"],
  ["5d", "./PNG-cards-1.3/5_of_diamonds.png"],
  ["6d", "./PNG-cards-1.3/6_of_diamonds.png"],
  ["7d", "./PNG-cards-1.3/7_of_diamonds.png"],
  ["8d", "./PNG-cards-1.3/8_of_diamonds.png"],
  ["9d", "./PNG-cards-1.3/9_of_diamonds.png"],
  ["10d", "./PNG-cards-1.3/10_of_diamonds.png"],
  ["jd", "./PNG-cards-1.3/jack_of_diamonds2.png"],
  ["qd", "./PNG-cards-1.3/queen_of_diamonds2.png"],
  ["kd", "./PNG-cards-1.3/king_of_diamonds2.png"],
  ["ad", "./PNG-cards-1.3/ace_of_diamonds.png"],
  ["2h", "./PNG-cards-1.3/2_of_hearts.png"],
  ["3h", "./PNG-cards-1.3/3_of_hearts.png"],
  ["4h", "./PNG-cards-1.3/4_of_hearts.png"],
  ["5h", "./PNG-cards-1.3/5_of_hearts.png"],
  ["6h", "./PNG-cards-1.3/6_of_hearts.png"],
  ["7h", "./PNG-cards-1.3/7_of_hearts.png"],
  ["8h", "./PNG-cards-1.3/8_of_hearts.png"],
  ["9h", "./PNG-cards-1.3/9_of_hearts.png"],
  ["10h", "./PNG-cards-1.3/10_of_hearts.png"],
  ["jh", "./PNG-cards-1.3/jack_of_hearts2.png"],
  ["qh", "./PNG-cards-1.3/queen_of_hearts2.png"],
  ["kh", "./PNG-cards-1.3/king_of_hearts2.png"],
  ["ah", "./PNG-cards-1.3/ace_of_hearts.png"],
  ["2s", "./PNG-cards-1.3/2_of_spades.png"],
  ["3s", "./PNG-cards-1.3/3_of_spades.png"],
  ["4s", "./PNG-cards-1.3/4_of_spades.png"],
  ["5s", "./PNG-cards-1.3/5_of_spades.png"],
  ["6s", "./PNG-cards-1.3/6_of_spades.png"],
  ["7s", "./PNG-cards-1.3/7_of_spades.png"],
  ["8s", "./PNG-cards-1.3/8_of_spades.png"],
  ["9s", "./PNG-cards-1.3/9_of_spades.png"],
  ["10s", "./PNG-cards-1.3/10_of_spades.png"],
  ["js", "./PNG-cards-1.3/jack_of_spades2.png"],
  ["qs", "./PNG-cards-1.3/queen_of_spades2.png"],
  ["ks", "./PNG-cards-1.3/king_of_spades2.png"],
  ["as", "./PNG-cards-1.3/ace_of_spades.png"],
  ["2c", "./PNG-cards-1.3/2_of_clubs.png"],
  ["3c", "./PNG-cards-1.3/3_of_clubs.png"],
  ["4c", "./PNG-cards-1.3/4_of_clubs.png"],
  ["5c", "./PNG-cards-1.3/5_of_clubs.png"],
  ["6c", "./PNG-cards-1.3/6_of_clubs.png"],
  ["7c", "./PNG-cards-1.3/7_of_clubs.png"],
  ["8c", "./PNG-cards-1.3/8_of_clubs.png"],
  ["9c", "./PNG-cards-1.3/9_of_clubs.png"],
  ["10c", "./PNG-cards-1.3/10_of_clubs.png"],
  ["jc", "./PNG-cards-1.3/jack_of_clubs2.png"],
  ["qc", "./PNG-cards-1.3/queen_of_clubs2.png"],
  ["kc", "./PNG-cards-1.3/king_of_clubs2.png"],
  ["ac", "./PNG-cards-1.3/ace_of_clubs.png"],
];
// const cardIndex = Math.floor(Math.random() * copyDeck.length);
// console.log(cardIndex);
// copyDeck.splice(cardIndex, 1);
// console.log(copyDeck);
class NewCard {
  public cardName: string;
  public cardValue: number;
  public cardImageLink: string;
  constructor() {
    this.cardName = this.getRndmCard();
    this.cardValue = this.getCardValue(this.cardName);
    this.cardImageLink = this.returnImgLink(this.cardName);
  }

  getRndmCard() {
    const cardIndex = Math.floor(Math.random() * copyDeck.length);
    console.log(cardIndex);
    console.log(copyDeck[cardIndex]);
    //remove chosen card from deck
    copyDeck.splice(cardIndex, 1);
    return copyDeck[cardIndex];
  }

  getCardValue(aCard: string) {
    //checks if the drown card is a 10 (second char at card is 0)
    if (aCard[1] == "0") {
      return 10;
    } else if (aCard[0] == "j" || aCard[0] == "q" || aCard[0] == "k") {
      return 10;
    } else if (aCard[0] == "a") {
      return 11;
    } else {
      return parseInt(aCard[0]);
    }
  }
  returnImgLink(aCard: string): string {
    for (let i = 0; i < cardImg.length; i++) {
      if (aCard == cardImg[i][0]) {
        return cardImg[i][1];
      }
    }
    return "no image found";
  }
}

// const aCard = new NewCard();
// console.log(aCard);

let playerCards: NewCard[] = [];
let houseCards: NewCard[] = [];
let sumPlayer: number, sumHouse: number;

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
const userCardsDiv = document.querySelector("#userCards") as HTMLDivElement;

const houseFirstCard = document.querySelector(
  "#houseFirstCard"
) as HTMLImageElement;
const houseSecondCard = document.querySelector(
  "#houseSecondCard"
) as HTMLImageElement;
const houseCardsDiv = document.querySelector(
  ".houseCardsDiv"
) as HTMLDivElement;

function resetGame() {
  copyDeck = resetCardDeck();
  sumHouse = 0;
  houseScore.textContent = sumHouse.toString();
  sumPlayer = 0;
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

function processPlayerCard(amount: number) {
  while (amount > 0) {
    const newCard = new NewCard();
    playerCards.push(newCard);
    sumPlayer += newCard.cardValue;
    const newImg = new Image();
    newImg.src = newCard.cardImageLink;
    newImg.classList.add("displayedCard");
    userCardsDiv.append(newImg);
    amount--;
  }
}

function processHouseCard(amount: number) {
  while (amount > 0) {
    const newCard = new NewCard();
    houseCards.push(newCard);
    sumHouse += newCard.cardValue;
    const newImg = new Image();
    newImg.src = newCard.cardImageLink;
    newImg.classList.add("displayedCard");
    houseCardsDiv.append(newImg);
    amount--;
  }
}

function newGame() {
  resetGame();

  processPlayerCard(2);
  userScore.textContent = sumPlayer.toString();

  if (sumPlayer == 22) {
    sumPlayer = 12;
    playerCards[1].cardValue = 1;
  } else if (sumPlayer == 21) {
    hasBlackJack = true;
    userMessage.textContent = "BLACKJACK you win!";
    userMessage.style.backgroundColor = "blue";
    userMessage.style.textShadow = "none";
    return;
  }

  userMessage.textContent = "Get another card or Hold";

  //rendering houses first card and
  houseSecondCard.src = "./PNG-cards-1.3/card_back_red.png";
  const houseFirstDraw = new NewCard();
  houseFirstCard.src = houseFirstDraw.cardImageLink;
  houseCardsDiv.append(houseFirstCard);
  houseCardsDiv.append(houseSecondCard);
  sumHouse = houseFirstDraw.cardValue;
  houseScore.textContent = sumHouse.toString();
  houseCards.push(houseFirstDraw);
}

function compTurn() {
  if (hasBlackJack == true || isAlive == false) {
    return;
  }
  const houseSecondDraw = new NewCard();
  houseSecondCard.src = houseSecondDraw.cardImageLink;
  houseCardsDiv.append(houseSecondCard);
  houseCards.push(houseSecondDraw);
  sumHouse += houseSecondDraw.cardValue;

  while (sumHouse < sumPlayer) {
    processHouseCard(1);

    if (sumHouse > 21) {
      for (let i = 0; i < houseCards.length; i++) {
        if (houseCards[i].cardValue == 11) {
          houseCards[i].cardValue = 1;
          sumHouse -= 10;
          houseScore.textContent = sumHouse.toString();
        }
      }
    }
  }
  houseScore.textContent = sumHouse.toString();
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
  } else if (userScore.textContent == "0") {
    userMessage.textContent = "Start game first";
    return;
  }

  processPlayerCard(1);
  userScore.textContent = sumPlayer.toString();

  if (sumPlayer > 21) {
    isAlive = false;
    for (let i = 0; i < playerCards.length; i++) {
      if (playerCards[i].cardValue == 11) {
        playerCards[i].cardValue = 1;
        sumPlayer -= 10;
        userScore.textContent = sumPlayer.toString();
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
  ];
}

function cardValue(card: string) {
  //checks if the drown card is a 10 (second char at card is 0)
  if (card[1] == "0") {
    return 10;
  } else if (card[0] == "j" || card[0] == "q" || card[0] == "k") {
    return 10;
  } else if (card[0] == "a") {
    return 11;
  } else {
    return parseInt(card[0]);
  }
}

function returnImgLink(aCard) {
  for (let i = 0; i < cardImg.length; i++) {
    if (aCard == cardImg[i][0]) {
      return cardImg[i][1];
    }
  }
}

function getRndmCard() {
  const cardIndex = Math.floor(Math.random() * copyDeck.length);
  //remove chosen card from deck
  copyDeck.splice(cardIndex, 1);
  return copyDeck[cardIndex];
}
