 window.electron.chargement_mag();
window.electron.liste_entrepot()
 function Insert(){

	//alert(document.getElementById("jour_c").value+"-"+document.getElementById("mois_c").value+"-"+document.getElementById("annee_c").value)
	
	

	if (document.getElementById("nom").value == "") {

		document.getElementById("message").innerHTML =  '<strong style="color: red;">Veuillez renseigner le nom !!!!!!!!</strong>'

	}
	else{

			

				if (document.getElementById("loc").value == "") {

					document.getElementById("message").innerHTML =  '<strong style="color: red;">Veuillez renseigner la localisationtion !!!!!!!!</strong>'


					}
					else
					{

						window.electron.insertion_entrepot()
						
					}
			}

}


function delete_entrepot(id) {

      

      if (confirm("Confirmez vous la suppression de ce bon de commande ?"))
      {
       
        window.electron.del_entrepot(id)
      }
      
      

    }


function actualiser() { window.location.reload()}
