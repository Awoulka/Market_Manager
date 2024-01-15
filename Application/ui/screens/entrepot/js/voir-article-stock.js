
function GET(param) {
	var vars = {};
	window.location.href.replace(location.hash, '').replace(
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function (m, key, value) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if (param) {
		return vars[param] ? vars[param] : null;
	}
	return vars;
}

function imprimer() {
	window.electron.findInventrairePdfToPrint(GET("id_e"),GET("id_a"))
  }

window.electron.detail_entrepot_article(GET("id_e"));


document.getElementById('header').innerHTML = '<a  href="voir-entrepot.html?id=' + GET('id_e') + '" class=" btn btn-primary text-white me-0" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false" ><i class="mdi mdi-reply"></i>Retour</a>'
document.getElementById('header').innerHTML += '<button onclick="actualiser()" type="submit" class="btn btn-success text-white me-2"><i class="mdi mdi-refresh"></i>Actualiser</button>'

Etats_echanges('S');


// fonction de chargement de la section Echanges fournisseurs 

function Etats_echanges(param) {
	if (param == "E") {
		document.getElementById("search_value").value = 1

	} else {

		if (param == "SRT") {
			document.getElementById("search_value").value = 2
		} else {
			document.getElementById("search_value").value = 0

		}
	}

	window.electron.detail_entrepot_mvnt(param);

}

function modif_st(param) {





	window.electron.modif_stock();

}

function enreg_modif_st(param) {





	window.electron.enreg_modif_stock();

}

function actualiser() { window.location.reload() }

function Annuler() { window.electron.detail_entrepot_mvnt('S'); }


function filtrer() {

	//alert(document.getElementById("select_f").options[document.getElementById("select_f").options.selectedIndex].value)
	var filtre, tableau, ligne, cellule, i, texte;
	if (document.getElementById("search_value").value != 0) {


		if (document.getElementById("search_value").value == 1) {
			filtre = document.getElementById("maRecherche").value.toUpperCase();
			tableau = document.getElementById("tab_E");
			ligne = tableau.getElementsByTagName("tr");
			//alert(ligne.length)
			for (i = 1; i < ligne.length; i++) {
				let t = false;
				for (j = 0; j <= 5; j++) {

					if (j == 1 || j == 2 || j == 3 || j == 5) {
						cellule = ligne[i].getElementsByTagName("td")[j];


						if (cellule) {
							texte = cellule.innerText.toLocaleString();
							//alert(texte)
							if (texte.toUpperCase().indexOf(filtre) > -1) {
								ligne[i].style.display = "";
								t = true;
							}

						}
					}


				}
				if (!t) {
					ligne[i].style.display = "none";

				}


			}

		} else {
			filtre = document.getElementById("maRecherche").value.toUpperCase();
			tableau = document.getElementById("tab_S");
			ligne = tableau.getElementsByTagName("tr");
			//alert(ligne.length)
			for (i = 1; i < ligne.length; i++) {
				let t = false;
				for (j = 0; j <= 5; j++) {

					if (j == 1 || j == 2 || j == 3 || j == 5) {
						cellule = ligne[i].getElementsByTagName("td")[j];


						if (cellule) {
							texte = cellule.innerText.toLocaleString();
							//alert(texte)
							if (texte.toUpperCase().indexOf(filtre) > -1) {
								ligne[i].style.display = "";
								t = true;
							}

						}
					}


				}
				if (!t) {
					ligne[i].style.display = "none";

				}


			}


		}
	}

}

function search() {


	window.electron.Inventaires(GET("id_e"),GET("id_a"));

}


var js_ = document.createElement("script");
js_.type = "text/javascript";
js_.src = "../../vendors/select2/select2.min.js";
document.body.appendChild(js_);
var js = document.createElement("script");
js.type = "text/javascript";
js.src = "../../js/select2.js";
document.body.appendChild(js);