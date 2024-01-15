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


var js_ = document.createElement("script");
js_.type = "text/javascript";
js_.src = "../../vendors/select2/select2.min.js";
document.body.appendChild(js_);
var js = document.createElement("script");
js.type = "text/javascript";
js.src = "../../js/select2.js";
document.body.appendChild(js);