//appuyer sur ESPACE pour recommancer une partie
document.addEventListener("keypress", (e) => {
    if (e.key === " ") {
        restart();
    }
});
//les variables nécessaires pour jouer:
//le container où apparaissent les cartes
const gridContainer = document.querySelector(".grid-container");
//le talbeau de cartes issues du json
let cards = [];
//les variables pour comparer
let firstCard, secondCard;
//rendre le click impossible pendant le checkForMatch
let lockBoard = false;
//compter le score
let score = 0;
//compter les cartes retournées
let matchedCards = 0
let numberOfCards;
document.querySelector(".score").textContent = score;
//changer le set de cartes et la taille selon le choix utilisateur
//récupérer les images du json (qui nous donne un tableau dont la taille varie selon les éléments stored)
const isLoggedIn = localStorage.getItem('isLoggedIn');
if (isLoggedIn) {
    let JSONinls = localStorage.getItem("choixJSON");
    fetch(JSONinls)
        .then((res) => res.json())
        .then((data) => {
            numberOfCards = data.length;
            cards = [...data, ...data];
            shuffleCards();
            generateCards();
        });
} else {
    fetch("data/looney-cards.json")
        .then((res) => res.json())
        .then((data) => {
            //savoir combien j'ai de cartes (pour compter quand la partie est gagnée)
            numberOfCards = data.length;
            //dupliquer le contenu du tableau de cartes
            cards = [...data, ...data];
            shuffleCards();
            generateCards();
        });
}

//mélanger les cartes (avec random)
function shuffleCards() {
    let currentIndex = cards.length,
        randomIndex,
        temporaryValue;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }
}
//Afficher les cartes
//pour charque cardElement, créer une div pour front et une div pour back, avec un attribut portant son nom, ajouté dans le container
function generateCards() {
    for (let card of cards) {
        //la carte
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.setAttribute("data-name", card.name);
        // le front
        const frontElement = document.createElement("div");
        frontElement.classList.add("front");
        //l'image du front
        const frontImageElement = document.createElement("img");
        frontImageElement.classList.add("front-image");
        frontImageElement.src = card.image;
        //ajouter l'image au front
        frontElement.appendChild(frontImageElement);
        //le back
        const backElement = document.createElement("div");
        backElement.classList.add("back");
        //ajouter ces élément à la carte
        cardElement.appendChild(frontElement);
        cardElement.appendChild(backElement);
        //ajouter les cartes dans la grid
        gridContainer.appendChild(cardElement);
        //mettre en place l'event click
        cardElement.addEventListener("click", flipCard);
    }
}
//retourner une card quand on click dessus et compter le nombre de coups joués
function flipCard() {
    //si déjà des cartes en comparaison, on ne retourne pas plus de cartes
    if (lockBoard) return;
    //ne pas recliquer sur la même carte
    if (this === firstCard) return;
    this.classList.add("flipped");
    if (!firstCard) {
        firstCard = this;
        return;
    }
    secondCard = this;
    score++;
    document.querySelector(".score").textContent = score;
    //bloquer le click sur les autres cartes
    lockBoard = true;
    checkForMatch();
}

//vérifier l'identité entre deux cartes
function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    if (isMatch) {
        //laisser les cartes visibles si match
        disableCards()
    }
    else {
        //reretourner les cartes si pas match
        unflipCards();
    }
}

//laisser les cards face visible si identiques et interdire le click
function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    //compter le nb de couples faits
    matchedCards++
    //rendre le reste du jeu clickable à nouveau
    resetBoard();
}

//retourner les cards face cachée pour continuer le jeu
function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetBoard();
    }, 1000);
}

//permettre de RE-comparer deux cartes quand on a déjà un/+ couple (reinitialiser les valeurs)
function resetBoard() {
    //Verifier l'avancement du jeu à chaque coup
    checkGameStatus();
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

//relancer une partie (triggered par spacebar, en haut)
function restart() {
    resetBoard();
    shuffleCards();
    score = 0;
    document.querySelector(".score").textContent = score;
    gridContainer.innerHTML = "";
    generateCards();
}

//vérifier l'état de la partie et afficher un message quand la partie est gagnée
function checkGameStatus() {
    //nb de couples faits vs nombre de couples initial
    if (matchedCards === numberOfCards) {
        setTimeout(function () {
            alert('Félicitations ! Vous avez gagné la partie en ' + score + ' tentatives !');
        }, 500)
        return true
    }
}