
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


document.getElementById('card').innerHTML +='<a  href="voir-bon-sortie.html?id='+GET('id')+'" class=" btn btn-primary text-white me-0" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false" ><i class="mdi mdi-reply"></i>Retour</a>'
document.getElementById('card').innerHTML += '<button onclick="actualiser()" type="submit" class="btn btn-success text-white me-2"><i class="mdi mdi-refresh"></i>Actualiser</button>'


 window.electron.chargement_entrepot_BS_modif();


function chargement_cdmnt(x) {
 	//alert(document.getElementById("frs").value)

   indice = ""
  for (var i = 7; x.id.length - 1 >= i; i++) {
    indice+=x.id[i]
  }


	if (document.getElementById("entrepot_pr").value != 'null') {

		window.electron.chargement_cdmnt_BS(x.value,indice)
    document.getElementById("qte"+indice).value = 0

	} else {

		alert("veuillez renseigner l'entrepot de provenance ")
		 window.electron.chargement_articles_BS (indice);
     document.getElementById("qte"+indice).value = 0
     
	}
 	
 }

function chargement_qt(x) {

  //alert(document.getElementById("frs").value)

   indice = ""
  for (var i = 3; x.id.length - 1 >= i; i++) {
    indice+=x.id[i]
  }

  if (document.getElementById("st"+indice).value == 0) {

    alert("Vous ne pouvez pas sortir un article dont la quantité en stock est 0. veuillez aprovisionner l'entrepot .")
    document.getElementById("qte"+indice).value = 0


  }
}

 function chargement_st(x) {
 	//alert(document.getElementById("frs").value)

   indice = ""
  for (var i = 5; x.id.length - 1 >= i; i++) {
    indice+=x.id[i]
  }


 	if (document.getElementById("entrepot_pr").value != 'null') {

		window.electron.chargement_st_BS(x.value,indice)
    document.getElementById("qte"+indice).value = 0

	} else {

		alert("veuillez renseigner l'entrepot de provenance ")
		 window.electron.chargement_articles_BS (indice);
     document.getElementById("qte"+indice).value = 0
	}

 	
 }
function modif_entrepot_pr(x) {
 	if (document.getElementById("myTable").rows.length-2 != 0) {

 		window.electron.modif_entr_pr(x.value,n)
 	}
		

 }


var n = document.getElementById("myTable").rows.length-2;
var c = 0
//alert(n)

 function AddRow() {
  n = document.getElementById("myTable").rows.length-2;
  //alert(n)
 	n++;
 
      var table = document.getElementById("myTable");
      var row = table.insertRow(n);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
     
      

      cell1.innerHTML = '<div class="row"><div class="col-md-8" ><select class="js-example-basic-single w-100" onchange=chargement_cdmnt(this) id="article'+n+'"></select></div><div class="col-md-4" ><select class="js-example-basic-single w-100" onchange=chargement_st(this) id="cdmnt'+n+'"></select></div></div>';
      cell2.innerHTML = '<input type="number" min="0" class="form-control" require id="st'+n+'" readonly>';
      cell3.innerHTML = '<input type="number" min="0" class="form-control" require id="qte'+n+'" onchange=chargement_qt(this)>';
      cell4.innerHTML = '<i title="Retirer" style="font-size: 25px" class="mdi mdi-minus-circle text-danger icon-remove" onclick="RemoveRow(this)" id="'+n+'"></i>';

      window.electron.chargement_articles_BS (n);
    }

    
    function RemoveRow(x) {
 
       if (document.getElementById("myTable").rows.length-3 != 0) {

           if (confirm("Confirmer la suppression ?"))
      {
        var table = document.getElementById("myTable");
        //alert(x.id);
        //table.deleteRow(x.parentElement.parentElement.rowIndex);
        x.parentElement.parentElement.style.display = 'none';
        
        //n--;

         c++;
      }

      document.getElementById("qte"+x.id).value = 0

  }else{

    confirm("Le bon de sortie doit contenir au moins un article")

  }

      
    }

function modif_bonS() {

  if (document.getElementById("entrepot_pr").value == "null") {

    document.getElementById("message").innerHTML =  '<strong style="color: red;">Veuillez renseigner l\'entrepot de provenance !!!!!!!!</strong>'

  }
  else{

      

      


              if (document.getElementById('entrepot_des').value != 'null' && document.getElementById('client_des').value != 'null' && document.getElementById('nom_client').value != 'null') {

                  document.getElementById("message").innerHTML =  '<strong style="color: red;">Veuillez renseigner Une destination !!!!!!!!</strong>'


              }
              else
              {
                

                         c=(document.getElementById("myTable").rows.length-2)-c
      
                         window.electron.update_bon_sortie(GET("id"),(document.getElementById("myTable").rows.length-2),c)
                       
                  
              }
          
      }

    

    }


     function delete_bons(id) {

      
      

      if (confirm("Confirmez vous la suppression de ce bon de commande ?"))
      {
       
        window.electron.delete_bon_sortie(id)
      }
      
      

    }

    function actualiser() { window.location.reload()}