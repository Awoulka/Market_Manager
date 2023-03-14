

/// AFFICHAGES DE TOUS LES FOURNISSEURS ENREGISTRÉ AU CHARGEMENT DE LA PAGE FOURNISSEUR 
window.electron.afiche_fseur();


//// FONCTION D'ENREGISTREMENT D'UN FOURNISSEUR

function enreg_fseur(){

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

												window.electron.insert_fseur(document.getElementById("cli_name").value,document.getElementById("cli_phone").value,document.getElementById("cli_adresse").value);

												document.getElementById("message").innerHTML =  '<strong style="color: green;">Enregistrement réussi. Veuillez actualiser la page pour voir affiché le fournisseur enregistré.</strong>'
										
												window.electron.afiche_fseur();

									
							}
					}
			}

}