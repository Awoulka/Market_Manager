

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

window.electron.detail_entrepot(GET("id"));
//document.getElementById('etats_ech').setAttribute('hidden','false')
//document.getElementById('etats_ech').removeAttribute('hidden')
window.electron.moov_entrepot('S');




function Etats_echanges(param) {

	



	window.electron.moov_entrepot(param);
	
}

function chargement_cdmnt(x) {
 	//alert(document.getElementById("frs").value)

	

		window.electron.chargement_cdmnt_e(x.value)


 	
 } 


 function search() {

	



	window.electron.filtre_moov();
	
}


function modif_entrepot() {
	
	window.electron.modif_entrepot();

}

function update_entrepot(arg) {
	
	if (arg=="V") {

		up_entrepot();



	} else {

		document.getElementById('modif-div').innerHTML = '<button onclick="modif_entrepot()" class="btn btn-success text-white me-0" data-toggle="modal" data-target="#largeModal">Modifier</button>'
	}
}


function up_entrepot(){

	if (document.getElementById("nom").value == "") {

		document.getElementById("message").innerHTML =  '<strong style="color: red;">Veuillez renseigner le nom !!!!!!!!</strong>'

	}
	else{

			

				if (document.getElementById("loc").value == "") {

					document.getElementById("message").innerHTML =  '<strong style="color: red;">Veuillez renseigner la localisationtion !!!!!!!!</strong>'


					}
					else
					{

						window.electron.update_entrepot(document.getElementById("id").value)
						
					}
			}



}

function chargement_qte(id_c,id_a) {

	//alert(id_c.value+"-"+id_a)
	//alert(document.getElementById(id_a).value)

	window.electron.chr_qte(id_c,id_a)

	// body...
}

function actualiser() { window.location.reload()}
