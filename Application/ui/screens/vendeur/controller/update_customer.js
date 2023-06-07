// Load all informations about article

window.electron.load_caisser_items();

function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

const id_client = GetURLParameter("id_client")
const customer_name = GetURLParameter("customer_name")
const customer_phone = GetURLParameter("customer_phone")
const show_update_space = GetURLParameter("update_parameter")
// var id_client = localStorage.getItem('id_client')
// var customer_name = localStorage.getItem('customer_name')
// var customer_phone = localStorage.getItem('customer_phone')
// var show_update_space = localStorage.getItem('update_parameter')
show_element(show_update_space);

// window.electron.show_article_details(urlParams.get("article").value)

document.getElementById("customer_name").value = customer_name;
// document.getElementById("customer_name1").innerHTML = customer_name;
document.getElementById("customer_name2").innerHTML = customer_name;
document.getElementById("customer_phone").value = customer_phone;

// Load data about article conditionment into order to add a new article

window.electron.show_customer_bills(id_client)
window.electron.show_customer_account_status(id_client)


function show_element(value) {
    document.getElementById("NewClient").hidden = value;
}

//// Function to get informations from form and register a new article

function update_customer() {

    if (document.getElementById("customer_name").value != "" && document.getElementById("customer_phone").value != "") {

        window.electron.update_customer(
            document.getElementById("customer_name").value,
            document.getElementById("customer_phone").value,
            id_client,
        );

        document.getElementById("message").innerHTML = '<strong style="color: green;">Mise à jour de l\'article réussi. Veuillez actualiser la page pour voir le client modifié.</strong>'
    }
    else {

        document.getElementById("message").innerHTML = '<strong style="color: red;">Veuillez renseigner le / les information(s) manquante(s) !!!!!!!!</strong>'
    }
}


function update_customer_account() {

    if (document.getElementById("new_paid_amount").value != "") {
        window.electron.update_customer_account(
            document.getElementById("new_paid_amount").value,
            id_client,
            document.getElementById("caissier").value,
        );

        document.getElementById("message").innerHTML = '<strong style="color: green;">Mise à jour de l\'article réussi. Veuillez actualiser la page pour voir le client modifié.</strong>'
    }
    else {

        document.getElementById("message").innerHTML = '<strong style="color: red;">Veuillez renseigner le / les information(s) manquante(s) !!!!!!!!</strong>'
    }
}