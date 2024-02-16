//Verification username
//récupérer l'input
let usernameI = document.getElementById("usernameI")
//récupérérer la phrase cachée
let usernameIValid = document.getElementById("usernameIValid")
usernameI.addEventListener("input", checkUsername)
function checkUsername() {
    let isEnough = usernameI.value.length >= 3
    if (usernameI.value !== "") {
        if (isEnough) {
            usernameIValid.style.visibility = "visible"
            usernameIValid.textContent = "Votre pseudo comporte bien 3 caractères"
            usernameIValid.style.color = "green"
        } else {
            usernameIValid.style.visibility = "visible"
            usernameIValid.textContent = "Veuillez entrer un pseudo d'au moins 3 caractères"
            usernameIValid.style.color = "red"
        }
    }
    return isEnough;
}

//Verification email
//récupérer l'input
let emailI = document.getElementById("emailI")
//récupérérer la phrase cachée
let emailIValid = document.getElementById("emailIValid")
emailI.addEventListener("input", checkEmail)
function checkEmail() {
    let emailREGEX = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
    let isEmail = emailREGEX.test(emailI.value)
    if (emailI.value !== "") {
        if (isEmail) {
            emailIValid.style.visibility = "visible"
            emailIValid.textContent = "Votre email est valide"
            emailIValid.style.color = "green"
        } else {
            emailIValid.style.visibility = "visible"
            emailIValid.textContent = "Veuillez entrer un email valide"
            emailIValid.style.color = "red"
        }
    }
    return isEmail;
}

//Verification password
//récupérer l'input
let passwordI = document.getElementById("passwordI")
//récupérérer la phrase cachée
let passwordIValid = document.getElementById("passwordIValid")
passwordI.addEventListener("input", checkPassword)
function checkPassword() {
    let passwordREGEX = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/)
    let isPassword = passwordREGEX.test(passwordI.value)
    if (passwordI.value !== "") {
        if (isPassword) {
            passwordIValid.style.visibility = "visible"
            passwordIValid.textContent = "Votre mot de passe est valide"
            passwordIValid.style.color = "green"
        } else {
            passwordIValid.style.visibility = "visible"
            passwordIValid.textContent = "6 caractères: au moins un chiffre, une minuscule, une majuscule"
            passwordIValid.style.color = "red"
        }
    }
    return isPassword;
}

//afficher le niveau de difficulté du mot de passe
//récupérérer la phrase cachée
let passwordIStrength = document.getElementById("passwordIStrength")
passwordI.addEventListener("input", checkStrength)
function checkStrength() {
    //vérifier si 6 caractères ou moins
    let hasLessThanSixChar = passwordI.value.length < 6
    let hasAtLeastSixChar = passwordI.value.length >= 6
    //vérifier si au moins un symbole
    let passwordREGEXSymbol = new RegExp(/[^a-zA-Z\d]/g)
    let hasOneSymbol = passwordREGEXSymbol.test(passwordI.value)
    //vérifier si au moins un chiffre
    let passwordREGEXNumber = new RegExp(/\d+/g)
    let hasOneNumber = passwordREGEXNumber.test(passwordI.value)
    //vérifier si 9 caractères
    let hasAtLeastNineChar = passwordI.value.length >= 9
    if (passwordI.value !== "") {
        if (hasLessThanSixChar) {
            passwordIStrength.style.visibility = "visible"
            passwordIStrength.style.color = "Orange"
            passwordIStrength.textContent = "mot de passe faible"
        }
        if ((hasAtLeastSixChar && hasOneSymbol) || (hasAtLeastSixChar && hasOneNumber)) {
            passwordIStrength.style.visibility = "visible"
            passwordIStrength.style.color = "yellow"
            passwordIStrength.textContent = "mot de passe moyen"
        }
        if (hasAtLeastNineChar && hasOneSymbol && hasOneNumber) {
            passwordIStrength.style.visibility = "visible"
            passwordIStrength.style.color = "green"
            passwordIStrength.textContent = "mot de passe fort"
        }
    }
}

//Confirmation password
//récupérer l'input
let confPassswordI = document.getElementById("confPassswordI")
//récupérérer la phrase cachée
let confPassswordIValid = document.getElementById("confPassswordIValid")
confPassswordI.addEventListener("input", checkConfPassword)
function checkConfPassword() {
    let isSame
    if (confPassswordI.value !== "") {
        if (passwordI.value == confPassswordI.value) {
            isSame = true
            confPassswordIValid.style.visibility = "visible"
            confPassswordIValid.textContent = "Vos mots de passe sont identiques"
            confPassswordIValid.style.color = "green"
        } else {
            isSame = false
            confPassswordIValid.style.visibility = "visible"
            confPassswordIValid.textContent = "Veuillez confirmer votre mot de passe"
            confPassswordIValid.style.color = "red"
        }
    }
    return isSame;
}

//rendre le bouton "création de compte" accessible si toutes les infos sont rentrées
//récupérer le formulaire au complet
let inscriptionForm = document.getElementById("inscription")
//récupérérer la phrase cachée
let howToSubmit = document.getElementById("howToSubmit")
//récupérer le bouton lui-même
let submitI = document.getElementById("submitI")
inscriptionForm.addEventListener("input", () => {
    let isEnough = checkUsername()
    let isEmail = checkEmail()
    let isPassword = checkPassword()
    checkStrength()
    let isSame = checkConfPassword()
    if (isEnough && isEmail && isPassword && isSame) {
        howToSubmit.style.visibility = "visible"
        howToSubmit.textContent = "Vous pouvez vous inscrire"
        submitI.disabled = false;
    } else {
        howToSubmit.style.visibility = "visible"
        howToSubmit.textContent = "Veuillez renseigner tous les champs pour vous inscrire"
        submitI.disabled = true;
    }
})

//enregistrer une inscription ET vérifier si l'email n'est pas déjà enregistré 
inscriptionForm.addEventListener("submit", submitUser)
function submitUser(event) {
    event.preventDefault()
    if (usernameI.value != '') {
        if (isEmailExists(emailI.value)) {
            alert("cet email est déja utilisé, connectez-vous ou proposez un autre email");
            return;
        }
        saveData("users", {
            name: usernameI.value,
            email: emailI.value,
            password: passwordI.value
        })
        usernameI.value = ''
        emailI.value = ''
        passwordI.value = ''
        alert("inscription enregistrée, vous allez être redirigé vers la page de connexion");
        window.location.replace("http://127.0.0.1:5501/Memory-Game/connexion-form.html");
    }
}
//enregistrer dans le ls
function saveData(key, data) {
    const old = getData(key)
    old.push(data)
    const convertData = JSON.stringify(old)
    localStorage.setItem(key, convertData)
}
//récupérer dans le ls
function getData(key) {
    return JSON.parse(localStorage.getItem(key)) ?? []
}

// Check if the email already exists in localStorage
function isEmailExists(email) {
    const storedData = localStorage.getItem("users");
    if (storedData) {
        const existingUsers = JSON.parse(storedData);
        for (let i = 0; i < existingUsers.length; i++) {
            if (existingUsers[i].email === email) {
                return true;
            }
        }
    }
    return false;
}
