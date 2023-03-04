// Load all informations about article

const documentUrl = window.location.search;

const urlParams = new URLSearchParams(documentUrl);

function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}

const article_id = GetURLParameter("article_id")
const article_name = GetURLParameter("article_name")
const article_prix_unitaire = GetURLParameter("article_prix_unitaire")
const article_quantity = GetURLParameter("article_quantity")

// window.electron.show_article_details(urlParams.get("article").value)

document.getElementById("article_name").value = article_name;
document.getElementById("article_name1").innerHTML = article_name;
document.getElementById("article_unit_price").value = article_prix_unitaire;
document.getElementById("article_quantity").value = article_quantity;

// Load data about article conditionment into order to add a new article

window.electron.load_conditionment_items();


//// Function to get informations from form and register a new article

function update_article(){

	if (document.getElementById("article_name").value != "" && document.getElementById("article_unit_price").value != "" && document.getElementById("article_quantity").value != "") {

		window.electron.update_article(document.getElementById("article_name").value,document.getElementById("article_unit_price").value,document.getElementById("article_quantity").value,document.getElementById("conditionment_items").value);

		document.getElementById("message").innerHTML =  '<strong style="color: green;">Enregistrement réussi. Veuillez actualiser la page pour voir affiché l\'article modifié.</strong>'
	}
	else{

		document.getElementById("message").innerHTML =  '<strong style="color: red;">Veuillez renseigner le / les information(s) manquante(s) !!!!!!!!</strong>'
	}
}
