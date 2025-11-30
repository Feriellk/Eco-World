const wheel = document.getElementById("wheel");
const infoTitle = document.getElementById("infoTitle");
const infoText = document.getElementById("infoText");

// Sons
const winSound = new Audio("win.wav");     // Son victoire
const errorSound = new Audio("error.mp3"); // Son erreur

// Données roue
const titles = [
"➜ Reduce, Reuse, Recycle! ♻️",
"➜ Save Water 💧",
"➜ Save Energy ⚡",
"➜ Love Nature 🌳",
"➜ Work Together 🤝",
];

const descriptions = [
"<br> ✤ Say No to plastic bags - use your own shopping bag.<br> ✤ Reuse bottles, boxes and jars instead of throwing them away.<br> ✤ Put your trash in the right bin according to the label.<br> ✤ Make fun crafts from old things instead of buying new toys.",
"<br> ✤ Take shorter showers.<br> ✤ Turn off the tap when brushing your teeth.<br> ✤ Use rainwater to water plants.<br> ✤ Help your parents check for leaky taps.",
"<br> ✤ Turn off the lights when you leave a room.<br> ✤ Unplug chargers when not in use.<br> ✤ Open curtains and use sunlight instead of lamps during the day.",
"<br> ✤ Plant a flower, a tree, or just a plant in a pot in your house!<br> ✤ Keep your school and surroundings clean.<br> ✤ Be kind to animals and insects, they're a part of nature too!<br> ✤ Consume freshly harvested fruits and veggies.",
"<br> ✤ Help your family sort waste at home.<br> ✤ Join school clean-up or recycling days.<br> ✤ Make posters to teach friends how to protect the Earth!"
];

// Événement roue
document.querySelectorAll(".item").forEach((item, index) => {
item.addEventListener("click", () => {
const angle = index * -72;
wheel.style.transform = `rotate(${angle}deg)`;


// Garder icônes à l'endroit
document.querySelectorAll(".item").forEach((el, i) => {
  el.style.transform = `rotate(${i*72}deg) translate(110px) rotate(${- (i*72 + angle)}deg)`;
});

infoTitle.textContent = titles[index];
infoText.innerHTML = descriptions[index];


});
});

// Mélanger les cartes
function shuffle(array) {
for (let i = array.length -1; i>0; i--) {
const j = Math.floor(Math.random()*(i+1));
[array[i], array[j]] = [array[j], array[i]];
}
return array;
}

const container = document.querySelector('.Game-container');
const cardsArray = Array.from(container.children);
shuffle(cardsArray);
cardsArray.forEach(card => container.appendChild(card));

// Variables jeu
let flippedCards = [];
let lockBoard = false;
let matchedPairs = 0;

const cards = document.querySelectorAll(".card");
const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");

// Clic cartes
cards.forEach(card => {
card.addEventListener("click", () => {
if(lockBoard || flippedCards.includes(card)) return;


card.classList.add("flipped");
flippedCards.push(card);

if(flippedCards.length === 2) checkForMatch();


});
});

function checkForMatch() {
const [card1, card2] = flippedCards;
const match = card1.dataset.name === card2.dataset.name;

if(match) {
matchedPairs++;
flippedCards = [];


if(matchedPairs === cards.length / 2) {
  setTimeout(() => {
    winSound.currentTime = 0;
    winSound.play().catch(err => console.log("Erreur son victoire :", err));
  }, 100);
  popup.classList.add("show");
}


} else {
lockBoard = true;
setTimeout(() => {
card1.classList.remove("flipped");
card2.classList.remove("flipped");
flippedCards = [];
lockBoard = false;


  // Son d'erreur
  errorSound.currentTime = 0;
  errorSound.play().catch(err => console.log("Erreur son erreur :", err));
}, 1000);


}
}

// Bouton restart
const restartBtn = document.getElementById("restart");
restartBtn.addEventListener("click", restartGame);

function restartGame() {
cards.forEach(card => card.classList.remove("flipped"));
flippedCards = [];
lockBoard = false;
matchedPairs = 0;
shuffle(Array.from(cards)).forEach(card => container.appendChild(card));
popup.classList.remove("show");
}

// Fermer popup
closePopup.addEventListener("click", () => {
popup.classList.remove("show");
});

// Tutoriel
const tutorialBtn = document.getElementById("tutorialBtn");
const tutorial = document.getElementById("tutorial");
tutorialBtn.addEventListener("click", () => {
tutorial.classList.toggle("show");
});

// Récupérer tous les liens
const links = document.querySelectorAll(".H-link");

// Observer le scroll pour détecter la section visible
const sections = document.querySelectorAll("#homepage, #second-page, #cardGame");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 70; // Ajuster si nav-bar fixe
    const sectionHeight = section.offsetHeight;
    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  links.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});
