

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

window.electron.detail_fseur();


// fonction de chargement de la section Echanges fournisseurs 

function Etats_echanges(param) {

	var R = " <div class='card'><div class='card-header'><h4>Etats des échanges Fournisseur</h4> </div><div class='card-body'><ul class='nav nav-pills mb-3' id='pills-tab' role='tablist'><li class='nav-item'><button class='nav-link active' id='pills-contact-tab' data-toggle='pill' href='#pills-contact' role='tab' aria-controls='pills-contact' aria-selected='false' onclick=Etats_echanges('R')>Réglements</button></li><li class='nav-item'><button class='nav-link ' id='pills-home-tab' data-toggle='pill' href='#pills-home' role='tab' aria-controls='pills-home' aria-selected='true' onclick=Etats_echanges('CP')>Commandes Passées</button></li><li class='nav-item'><button class='nav-link' id='pills-profile-tab' data-toggle='pill' href='#pills-profile' role='tab' aria-controls='pills-profile' aria-selected='false' onclick=Etats_echanges('CL')>Commandes Livrées</button></li></ul> <h4 class='card-title'>Liste des diferents payements</h4> </div></div> "
	
	var CP = " <div class='card'><div class='card-header'><h4>Etats des échanges Fournisseur</h4> </div><div class='card-body'><ul class='nav nav-pills mb-3' id='pills-tab' role='tablist'><li class='nav-item'><button class='nav-link ' id='pills-contact-tab' data-toggle='pill' href='#pills-contact' role='tab' aria-controls='pills-contact' aria-selected='false' onclick=Etats_echanges('R')>Réglements</button></li><li class='nav-item'><button class='nav-link active' id='pills-home-tab' data-toggle='pill' href='#pills-home' role='tab' aria-controls='pills-home' aria-selected='true' onclick=Etats_echanges('CP')>Commandes Passées</button></li><li class='nav-item'><button class='nav-link' id='pills-profile-tab' data-toggle='pill' href='#pills-profile' role='tab' aria-controls='pills-profile' aria-selected='false' onclick=Etats_echanges('CL')>Commandes Livrées</button></li></ul>  <h4 class='card-title'>Liste des Commandes Passées</h4> </div></div>"
	

	var CL = " <div class='card'><div class='card-header'><h4>Etats des échanges Fournisseur</h4> </div><div class='card-body'><ul class='nav nav-pills mb-3' id='pills-tab' role='tablist'><li class='nav-item'><button class='nav-link ' id='pills-contact-tab' data-toggle='pill' href='#pills-contact' role='tab' aria-controls='pills-contact' aria-selected='false' onclick=Etats_echanges('R')>Réglements</button></li><li class='nav-item'><button class='nav-link ' id='pills-home-tab' data-toggle='pill' href='#pills-home' role='tab' aria-controls='pills-home' aria-selected='true' onclick=Etats_ehanges('CP')>Commandes Passées</button></li><li class='nav-item'><button class='nav-link active' id='pills-profile-tab' data-toggle='pill' href='#pills-profile' role='tab' aria-controls='pills-profile' aria-selected='false' onclick=Etats_echanges('CL')>Commandes Livrées</button></li></ul> <h4 class='card-title'>Liste des  Commandes Livrées</h4></div></div> "
	
	if ( param == 'R' ) {
		document.getElementById('etats_ech').innerHTML = R

	}
	if ( param == 'CP' ) {
		document.getElementById('etats_ech').innerHTML = CP

	}
	if ( param == 'CL' ) {
		document.getElementById('etats_ech').innerHTML = CL

	}
	
}


function modif_fseur() {
	

	 document.getElementById('modif-div').innerHTML = '<div class="row"><div class="col-md-5"><div class="form-group row"><label class="col-sm-2 col-form-label">Nom</label><div class="col-sm-9"><input type="text" name="cli_name" id="cli_name" class="form-control" value="'+document.getElementById("nom-fseur").value+'" /></div></div></div><div class="col-md-3"><div class="form-group row"><label class="col-sm-4 col-form-label">Téléphone</label><div class="col-sm-8"><input type="text" value="'+document.getElementById("tel-fseur").value+'" name="cli_phone" id="cli_phone" class="form-control" /></div></div></div><div class="col-md-3"><div class="form-group row"><label class="col-sm-3 col-form-label">Adresse</label><div class="col-sm-9"><input type="text" value="'+document.getElementById("adresse-fseur").value+'" name="cli_adresse" id="cli_adresse" class="form-control" /></div></div></div></div><div class="row"><div class="col-md-9"><div class="form-group row"><div class="col-sm-9" id="message"></div></div></div><div class="col-md-3"><div class="col-sm-9" id="message"></div><button onclick=update_fseur("V") type="submit" class="btn btn-primary text-white me-2">Valider</button><button onclick=update_fseur("A") class="btn btn-light">Annuler</button></div></div>'
}

function update_fseur(arg) {
	
	if (arg=="V") {

		up_fseur();



	} else {

		document.getElementById('modif-div').innerHTML = '<button onclick="modif_fseur()" class="btn btn-success text-white me-0" data-toggle="modal" data-target="#largeModal">Modifier</button>'
	}
}


function up_fseur(){

	//alert(document.getElementById("jour_c").value+"-"+document.getElementById("mois_c").value+"-"+document.getElementById("annee_c").value)
	
	

	if (document.getElementById("cli_name").value == "") {

		document.getElementById("message").innerHTML =  '<strong style="color: red;">Veuillez renseigner le nom !!!!!!!!</strong>'

	}
	else{

			

				if (document.getElementById("cli_phone").value == "") {

					document.getElementById("message").innerHTML =  '<strong style="color: red;">Veuillez renseigner le numéro de téléphone !!!!!!!!</strong>'


					}
					else
					{

							if (document.getElementById("cli_adresse").value == "") {

									document.getElementById("message").innerHTML =  '<strong style="color: red;">Veuillez renseigner l\'adresse !!!!!!!!</strong>'


							}
							else
							{

							
												//alert(document.getElementById("nom_c").value+"--"+document.getElementById("prenom_c").value+"--"+document.getElementById("categorie_c").value+"--"+document.getElementById("lieu_n_c").value+"--"+document.getElementById("ecole_c").value+"--"+document.getElementById("no_permis_c").value+"--"+document.getElementById("categorie_c").value)
												//alert(document.getElementById("id").value)
												window.electron.update_fseur(document.getElementById("cli_name").value,document.getElementById("cli_phone").value,document.getElementById("cli_adresse").value,document.getElementById("id").value);

												document.getElementById("message").innerHTML =  '<strong style="color: green;">Enregistrement réussi. Veuillez actualiser la page pour voir affiché le fournisseur enregistré.</strong>'
										
												
												document.getElementById('modif-div').innerHTML = '<button onclick="modif_fseur()" class="btn btn-success text-white me-0" data-toggle="modal" data-target="#largeModal">Modifier</button>'


									
							}
					}
			}
window.electron.detail_fseur();
}



function actualiser() { window.location.reload()}
