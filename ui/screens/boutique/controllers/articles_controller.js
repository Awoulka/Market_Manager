/// Displaying all articles in a list on page loading
window.electron.show_article();

// Load data about article conditionment into order to add a new article

window.electron.load_conditionment_items();


//// Function to get informations from form and register a new article

function new_article(){

	if (document.getElementById("article_name").value != "" && document.getElementById("article_unit_price").value != "" && document.getElementById("article_quantity").value != "") {

		window.electron.insert_article(document.getElementById("article_name").value,document.getElementById("article_unit_price").value, document.getElementById("article_quantity").value, document.getElementById("conditionment_items").value);

		document.getElementById("message").innerHTML =  '<strong style="color: green;">Enregistrement réussi. Veuillez actualiser la page pour voir affiché l\'article enregistré.</strong>'

		window.electron.show_article();
	}
	else{

		document.getElementById("message").innerHTML =  '<strong style="color: red;">Veuillez renseigner le / les information(s) manquante(s) !!!!!!!!</strong>'
	}
}

function update_article(){

	if (document.getElementById("article_name").value != "" && document.getElementById("article_unit_price").value != "" && document.getElementById("article_quantity").value != "") {

		window.electron.update_article(document.getElementById("article_name").value,document.getElementById("article_unit_price").value,document.getElementById("article_quantity").value,document.getElementById("conditionment_items").value);

		document.getElementById("message").innerHTML =  '<strong style="color: green;">Enregistrement réussi. Veuillez actualiser la page pour voir affiché l\'article enregistré.</strong>'

		window.electron.show_article();
	}
	else{

		document.getElementById("message").innerHTML =  '<strong style="color: red;">Veuillez renseigner le / les information(s) manquante(s) !!!!!!!!</strong>'
	}
}
