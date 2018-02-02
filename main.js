window.onload = function() {
    const db = firebase.database();

    const loginGithub = document.getElementById("loginGithub");
    const loginGoogle = document.getElementById("loginGoogle");
    const loginFacebook = document.getElementById("loginFacebook");

    const logout = document.getElementById("logout");

    const errorMessage = document.getElementById("errorMessage");

    const loggedInContent = document.getElementById("loggedIn");
    const username = document.getElementById("username");
    const profilePicture = document.getElementById("profilePicture");

    let provider;
    let user = {
        name: null,
        profilePicture: null
    }

    function authError(msg) {
        errorMessage.classList.remove("hidden");
        errorMessage.innerText = "Error while authenticating: " + msg;
    }

    function redirectSignIn(provider) {
        firebase.auth().signInWithRedirect(provider);
    }

    firebase.auth().getRedirectResult()
    .then(function(result) {
        if(result.user) {
            user.name = firebase.auth().currentUser.displayName;
            user.profilePicture = firebase.auth().currentUser.photoURL;

            logout.disabled = false;
            loginGithub.disabled = true;
            loginGoogle.disabled = true;
            loginFacebook.disabled = true;

            loggedInContent.classList.remove("hidden");
            username.innerText = user.name;
            profilePicture.src = user.profilePicture;
        }
        else {
            logout.disabled = true;
        }
    })
    .catch(function(error) {
        authError(error.message);
    });

    loginGithub.addEventListener("click", function() {
        provider = new firebase.auth.GithubAuthProvider();

        redirectSignIn(provider);
    });

    loginFacebook.addEventListener("click", function(){
        provider = new firebase.auth.FacebookAuthProvider();

        redirectSignIn(provider);
    });

    loginGoogle.addEventListener("click", function() {
        provider = new firebase.auth.GoogleAuthProvider();

        redirectSignIn(provider);
    });

    logout.addEventListener("click", function() {
        firebase.auth().signOut()
        .then(function(result) {
            logout.disabled = true;
            loggedInContent.classList.add("hidden");
            loginGithub.disabled = false;
            loginGoogle.disabled = false;
            loginFacebook.disabled = false;
        })
        .catch(function(error) {
            console.log("Sign out failed");
        });
    });

}
