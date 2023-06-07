function authenfication() {
    if (
        document.getElementById("user_login").value != "" &&
        document.getElementById("user_password").value != ""
    ) {
        try {
            window.electron.user_login(
                document.getElementById("user_login").value,
                document.getElementById("user_password").value,
            );

        } catch (error) {
            document.getElementById("message").innerHTML =
            '<strong style="color: red;">Impossible de se Connecter!!\n\nVeuillez vérifier vos informations</strong>';
        }

    } else {
        document.getElementById("message").innerHTML =
            '<strong style="color: red;">Veuillez renseigner le / les information(s) manquante(s) !!!!!!!!</strong>';
    }

}