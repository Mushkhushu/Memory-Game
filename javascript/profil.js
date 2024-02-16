//vérifier le statut de connexion pour l'affichage de la page
const isLoggedIn = localStorage.getItem('isLoggedIn');
//récupérer les deux affichages différents selon le status
let profilNotConnected = document.getElementById("profilNotConnected")
let profilConnected = document.getElementById("profilConnected")
//récupérer les infos du user pour les afficher
let affichePseudo = document.getElementById("affichePseudo")
let afficheAdressemel = document.getElementById("afficheAdressemel")
//si status= connected, alors changer l'affichage de la page
if (!isLoggedIn) {
    profilNotConnected.style.visibility = "visible"
    profilConnected.style.visibility = "hidden"
} else {
    profilNotConnected.style.visibility = "hidden"
    profilNotConnected.style.display = "none"
    profilConnected.style.visibility = "visible"
    const userInfo = getUserInfo()
    if (userInfo) {
        affichePseudo.textContent = userInfo.userName
        afficheAdressemel.textContent = userInfo.userEmail
    }
}
//récupérer dans le ls
function getUserInfo() {
    const usersString = localStorage.getItem('users')
    if (usersString) {
        const users = JSON.parse(usersString)
        const lastUser = users[users.length - 1]
        return {
            userName: lastUser.name,
            userEmail: lastUser.email
        }
    }
    return null
}

//enregistrer le choix du jeu dans le ls et changer l'image selon le choix du jeu
document.getElementById("game-select").addEventListener("click", saveGameChoice)
document.getElementById("game-select").addEventListener("click", changeImage)
//fonction pour enregistrer le choix du jeu dans ls
function saveGameChoice() {
    localStorage.setItem("choixJSON", this.value)
}

//fonction pour changer l'image affichée sur la page
function changeImage() {
    let choixImage = this.value
    let animalOption = document.getElementById("animal").value
    let looneyOption = document.getElementById("looney").value
    let scrabbleOption = document.getElementById("scrabble").value
    let imageAffichee = document.getElementById("imageAffichee")
    switch (choixImage) {
        case animalOption:
            imageAffichee.src = "assets/animal-set/chicken.png"
            imageAffichee.style.height = '200px';
            imageAffichee.style.width = '200px';
            break;
        case looneyOption:
            imageAffichee.src = "assets/looney-set/puzzle.png"
            imageAffichee.style.height = '200px';
            imageAffichee.style.width = '200px';
            break
        case scrabbleOption:
            imageAffichee.src = "assets/alphabet-scrabble/26.png"
            imageAffichee.style.height = '200px';
            imageAffichee.style.width = '200px';
            break
        default:
            imageAffichee.src = "assets/memory.png"
            break;
    }
}

//enregistrer le choix de la taille du game (ne sert pas pour le moment)
document.getElementById("size-select").addEventListener("click", saveSizeChoice)
function saveSizeChoice() {
    localStorage.setItem("size", this.value)
}