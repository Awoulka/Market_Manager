/// Displaying all articles in a list on page loading
window.electron.show_users();
window.electron.show_fonction()


function createPersonnel() {
    if (
        document.getElementById("cli_name").value != "" &&
        document.getElementById("cli_phone").value != "" &&
        document.getElementById("cli_pass").value != ""
    ) {
        try {
            window.electron.insert_personnel(
                document.getElementById("cli_name").value,
                document.getElementById("cli_phone").value,
                document.getElementById("fonction_options").value,
                document.getElementById("cli_pass").value
            );

        } catch (error) {
            console.log(error)
            document.getElementById("message").innerHTML = '<strong style="color: red;">Erreur lors de la création du personnel!!\n\nVeuillez vérifier vos informations</strong>'
        }

    } else {
        document.getElementById("message").innerHTML =
            '<strong style="color: red;">Veuillez renseigner le / les information(s) manquante(s) !!!!!!!!</strong>';
    }

}

function deletePersonnel(personnel_id) {
    window.electron.delete_personnel(personnel_id)
}