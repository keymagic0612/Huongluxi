const cardsArray = [
  {
    name: "fire",
    img: "img/baby_1.jpg",
  },
  {
    name: "youtube",
    img: "img/baby_2.jpg",
  },
  {
    name: "flash",
    img: "img/baby_3.jpg",
  },


];
let count = 0;
let previousCard;
let firstGuess = "";
let secondGuess = "";
const grid = document.querySelector(".grid");
// () => 0.5 - Math.random() : random array
function generateCard() {
  grid.innerHTML = "";
  const cardsArrayMerge = cardsArray
    .concat(cardsArray)
    .sort(() => 0.5 - Math.random());
  cardsArrayMerge.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");
    // card.dataset.name = item.name;
    card.setAttribute("data-name", item.name);
    // front card
    const front = document.createElement("div");
    front.classList.add("front");
    // back card
    const back = document.createElement("div");
    back.classList.add("back");

    back.style.backgroundImage = `url(${item.img})`;
    card.appendChild(front);
    card.appendChild(back);
    grid.appendChild(card);
  });
}
generateCard();
function resetQuess() {
  count = 0;
  firstGuess = "";
  secondGuess = "";
  previousCard = null;
  const selects = document.querySelectorAll(".selected");
  const matchedAll = document.querySelectorAll(".matched");
  const cardLength = document.querySelectorAll(".card").length;
  [...selects].forEach((item) => item.classList.remove("selected"));
  if (matchedAll.length === cardLength) {
    matchedAll.forEach((el) => el.classList.remove("matched"));
    setTimeout(generateCard, 2000);
  }
}

function matchingCard() {
  const selects = document.querySelectorAll(".selected");
  [...selects].forEach((item) => item.classList.add("matched"));
}

grid.addEventListener("click", function (event) {
  const clicked = event.target;
  if (
    clicked.nodeName === "SECTION" ||
    previousCard === clicked ||
    clicked.parentNode.classList.contains("selected") ||
    clicked.parentNode.classList.contains("matched")
  ) {
    return;
  }
  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add("selected");
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add("selected");
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(matchingCard, 2000);
      }
      setTimeout(resetQuess, 2000);
    }
    previousCard = clicked;
  }
});
