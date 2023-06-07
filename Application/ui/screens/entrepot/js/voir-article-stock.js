
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

window.electron.detail_entrepot_article(GET("id_e"));


 document.getElementById('header').innerHTML= '<a  href="voir-entrepot.html?id='+GET('id_e')+'" class=" btn btn-primary text-white me-0" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false" ><i class="mdi mdi-reply"></i>Retour</a>'
document.getElementById('header').innerHTML += '<button onclick="actualiser()" type="submit" class="btn btn-success text-white me-2"><i class="mdi mdi-refresh"></i>Actualiser</button>'

Etats_echanges('S');


// fonction de chargement de la section Echanges fournisseurs 

function Etats_echanges(param) {

	



	window.electron.detail_entrepot_mvnt(param);
	
}

function modif_st(param) {

	



	window.electron.modif_stock();
	
}

function enreg_modif_st(param) {

	



	window.electron.enreg_modif_stock();
	
}

function actualiser() { window.location.reload()}

function Annuler() { window.electron.detail_entrepot_mvnt('S');}
