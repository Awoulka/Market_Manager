

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


document.getElementById('card').innerHTML += '<a  href="bon_de_reception.html" class=" btn btn-primary text-white me-0" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false" ><i class="mdi mdi-reply"></i>Retour</a>'
document.getElementById('card').innerHTML += '<a  href="modif_bon_R.html?id='+GET('id')+'" class=" btn btn-warning text-white me-0" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false" ><i class="mdi mdi-pencil"></i>Modifier</a><button onclick="actualiser()" type="submit" class="btn btn-success text-white me-2"><i class="mdi mdi-refresh"></i>Actualiser</button>'

window.electron.voir_reception_BC(GET('id'));




var n = document.getElementById("myTable").rows.length-1;
var c=0


    function enreg_BR() {


    	for (var i = 1; i <=(document.getElementById("myTable").rows.length-1); i++) {

				if (document.getElementById("qteR"+i).value != 0  ) {



						c++
				}
			}

    	window.electron.insert_BR((document.getElementById("myTable").rows.length-1),c)

    }



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
  
				if (j == 0 || j == 1 || j == 2 || j == 3 ) {
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
  

var js_ = document.createElement("script");
js_.type = "text/javascript";
js_.src = "../../vendors/select2/select2.min.js";
document.body.appendChild(js_);
var js = document.createElement("script");
js.type = "text/javascript";
js.src = "../../js/select2.js";
document.body.appendChild(js);