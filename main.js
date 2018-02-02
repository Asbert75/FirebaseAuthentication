window.onload = function() {
    const db = firebase.database();

    const loginGithub = document.getElementById("loginGithub");
    const loginGoogle = document.getElementById("loginGoogle");
    const loginFacebook = document.getElementById("loginFacebook");

    const logout = document.getElementById("logout");
    logout.disabled = true;

    const errorMessage = document.getElementById("errorMessage");

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
            //user.name = firebase.auth().currentUser.displayName;
            //user.profilePicture = firebase.auth().currentUser.p
            console.log(result.user);
            logout.disabled = false;
            loginGithub.disabled = true;
            loginGoogle.disabled = true;
            loginFacebook.disabled = true;
        }
    })
    .catch(function(error) {
        authError(error.message);
    });

    loginGithub.addEventListener("click", function() {
        provider = new firebase.auth().GithubAuthProvider();

        redirectSignIn(provider);
    });

    loginFacebook.addEventListener("click", function(){
        provider = new firebase.auth().FacebookAuthProvider();

        redirectSignIn(provider);
    });

    loginGoogle.addEventListener("click", function() {
        provider = new firebase.auth().GoogleAuthProvider();

        redirectSignIn(provider);
    });

    logout.addEventListener("click", function() {
        firebase.auth.signOut()
        .then(function(result) {
            console.log("Signed out");
            logout.disabled = true;
        })
        .catch(function(error) {
            console.log("Sign out failed");
        });
    });

}
