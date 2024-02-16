//récupérer le formulaire
let connexionForm = document.getElementById("connexion")
//récupérer la phrase cachée
let howToConnect = document.getElementById("howToConnect")
//Récupérer le bouton
let ConnectButton = document.getElementById("ConnectC")
//récupérer l'input password
let passwordC = document.getElementById("passwordC")
//récuprérer l'input email
let emailC = document.getElementById("emailC")
//rendre le bouton accessible
connexionForm.addEventListener("input", () => {
    if ((emailC.value !== '') && (passwordC.value !== '')) {
        howToConnect.style.visibility = "visible"
        howToConnect.textContent = "Vous pouvez vous connecter"
        ConnectButton.disabled = false;
    } else {
        howToConnect.style.visibility = "visible"
        howToConnect.textContent = "Veuillez renseigner les champs pour vous connecter"
        ConnectButton.disabled = true;
    }
})
//messages concernant la connexion quand click sur le bouton
connexionForm.addEventListener("submit", connecting)
function connecting(event) {
    event.preventDefault()
    if (isLoggedIn) {
        alert("Vous êtes déjà connecté");
        window.location.replace("http://127.0.0.1:5501/Memory-Game/profil.html");
    } else {
        if ((isPasswordExists(passwordC.value)) && (isEmailExists(emailC.value))) {
            alert("Connection validée");
            localStorage.setItem('isLoggedIn', 'true');
            window.location.replace("http://127.0.0.1:5501/Memory-Game/profil.html");
        }
        if (!(isPasswordExists(passwordC.value))) {
            alert("Veuillez vérifier votre mot de passe");
        }
        if (!(isEmailExists(emailC.value))) {
            alert("Veuillez vérifier votre adresse mail");
        }
    }
}

// Check if the password already exists in localStorage
function isPasswordExists(password) {
    const storedData = localStorage.getItem("users");
    if (storedData) {
        const existingUsers = JSON.parse(storedData);
        for (let i = 0; i < existingUsers.length; i++) {
            if (existingUsers[i].password === password) {
                return true;
            }
        }
    }
    return false;
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

