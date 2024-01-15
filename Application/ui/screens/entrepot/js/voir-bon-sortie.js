
function GET(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
}

document.getElementById('card').innerHTML +='<a  href="bon_de_sortie.html" class=" btn btn-primary text-white me-0" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false" ><i class="mdi mdi-reply"></i>Retour</a>'
document.getElementById('card').innerHTML += '<a  href="modif_bon_sortie.html?id='+GET('id')+'" class=" btn btn-warning text-white me-0" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false" ><i class="mdi mdi-pencil"></i>Modifier</a><button onclick="actualiser()" type="submit" class="btn btn-success text-white me-2"><i class="mdi mdi-refresh"></i>Actualiser</button><button onclick="Imprimer()" type="submit" class="btn btn-warning text-white me-2"><i class="mdi mdi-print"></i>Imprimer</button><button onclick="supp(1)" type="submit" class="btn btn-danger text-white me-2"><i class="mdi mdi-been"></i>suprimer en gardant le meme état des stocks</button><button onclick="supp(2)" type="submit" class="btn btn-danger text-white me-2"><i class="mdi mdi-been"></i>suprimer sans garder le meme état des stocks</button>'

window.electron.afiche_detaille_BS(GET('id'));


function actualiser() { window.location.reload()}

function filtrer() {

	//alert(document.getElementById("select_f").options[document.getElementById("select_f").options.selectedIndex].value)
	var filtre, tableau, ligne, cellule, i, texte;
  
	filtre = document.getElementById("maRecherche").value.toUpperCase();
	tableau = document.getElementById("myTable");
	ligne = tableau.getElementsByTagName("tr");
	//alert(ligne.length)
	for (i = 1; i < ligne.length; i++) {
		  let t = false;
		  for (j = 0; j <= 5; j++) {
  
				if ( j == 1 || j == 2 || j == 3 ) {
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


function supp(i) {


	if (i==1) {
		if (confirm("Confirmez vous la suppression de ce bon de sortie en gardant les états de stock actuelles ?")) {
	
			window.electron.delete_bon_sortie(i,GET("id"))
		  }
	} else {
	
		if (confirm("Confirmez vous la suppression de ce bon de sortie ainsi que de la réinitialisation des états de stocks  ?")) {
	
			window.electron.delete_bon_sortie(i,GET("id"))
		  }
	}
	}
	function Imprimer() {
	
	
		
				window.electron.findBonSortiePdfToPrint(GET("id"))
			
		
	
	
	
	}
	

var js_ = document.createElement("script");
js_.type = "text/javascript";
js_.src = "../../vendors/select2/select2.min.js";
document.body.appendChild(js_);
var js = document.createElement("script");
js.type = "text/javascript";
js.src = "../../js/select2.js";
document.body.appendChild(js);