

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


document.getElementById('card').innerHTML += '<a  href="voir-boncmd.html?id='+GET('id')+'" class=" btn btn-primary text-white me-0" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false" ><i class="mdi mdi-reply"></i>Retour</a><button onclick="actualiser()" type="submit" class="btn btn-success text-white me-2"><i class="mdi mdi-refresh"></i>Actualiser</button>'
document.getElementById('annuler').innerHTML += '<a  href="voir-boncmd.html?id='+GET('id')+'" class=" btn btn-danger text-white me-0" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false" >Annuler</a>'


function chargement_cdmnt(x) {
 	//alert(document.getElementById("frs").value)
   i = ""
   for (let index = 7; index < x.id.length; index++) {
     //alert(x.id[index]) 
     i += x.id[index]
   }
   //alert(i)
   window.electron.chargement_cdmnt_BC(x.value, i)
 }


 function Montant(x, elem) {

  i = ""
  if (elem == 'qt') {
    for (let index = 3; index < x.id.length; index++) {
      //alert(x.id[index]) 
      i += x.id[index]
    }
  }else{
    for (let index = 2; index < x.id.length; index++) {
      //alert(x.id[index]) 
      i += x.id[index]
    }
  }

  document.getElementById("montant" + i).value = document.getElementById("pu" + i).value * document.getElementById("qte" + i).value

  Montant_T()
}

 function Montant_T() {

 	n = document.getElementById("myTable").rows.length-3;
 	m=0
  
 	for (var i = 1; i <= n; i++) {


 			m += parseInt(document.getElementById("montant"+i).value);
 		
 		
 		

 }
 	document.getElementById("montant_total").value = m

}




window.electron.modif_BC(GET('id'));

var n = document.getElementById("myTable").rows.length-3;
var c = 0

//alert(n)

 function AddRow() {
 	n = document.getElementById("myTable").rows.length-3;
 	n++;
 	  var table = document.getElementById("myTable");
 	 // console.log(table.rows.length-3)
      var row = table.insertRow(n);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);
      

      cell1.innerHTML = '<div class="row"><div class="col-md-8" ><select class="js-example-basic-single w-100" onchange=chargement_cdmnt(this) id="article'+n+'"></select></div><div class="col-md-4" ><select class="js-example-basic-single w-100" id="cdmnt'+n+'"></select></div></div>';
      cell2.innerHTML = '<input type="number" min="0" class="form-control" require id="qte'+n+'" onchange=Montant(this,"qt")>';
      cell3.innerHTML = '<input type="number" min="0" class="form-control" require id="pu'+n+'" onchange=Montant(this,"pu")>';
      cell4.innerHTML = '<input type="number" readonly class="form-control" require id="montant'+n+'">';
      cell5.innerHTML = '<i title="Retirer" style="font-size: 25px" class="mdi mdi-minus-circle text-danger icon-remove" onclick="RemoveRow(this)" id="'+n+'"></i>';

      window.electron.chargement_articles_BC (n);
    }

    
    function RemoveRow(x) {
      if (confirm("Confirmer la suppression ?"))
      {
        var table = document.getElementById("myTable");
        //alert(x.id);
        //table.deleteRow(x.parentElement.parentElement.rowIndex);
        x.parentElement.parentElement.style.display = 'none';
        
        //n--;
        c++;
      }

      document.getElementById("montant"+x.id).value = 0

      Montant_T()


    }


    function update_bonC() {

        c=(document.getElementById("myTable").rows.length-3)-c
    	
    	window.electron.update_bon_cmd(GET('id'),document.getElementById("myTable").rows.length-3,c)

    }



function actualiser() { window.location.reload()}

function filtrer() {

	//alert(document.getElementById("select_f").options[document.getElementById("select_f").options.selectedIndex].value)
	var filtre, tableau, ligne, cellule, i, texte;
  
	filtre = document.getElementById("maRecherche").value.toUpperCase();
	tableau = document.getElementById("myTable");
	ligne = tableau.getElementsByTagName("tr");
	//alert(ligne.length)
	for (i = 1; i < ligne.length-1; i++) {
		  let t = false;
		  //for (j = 0; j <= 5; j++) {
  
				// if (j == 0 || j == 1 || j == 2 || j == 3 ) {
				 	  //cellule = ligne[i].getElementsByTagName("td")[j];
             cellule =document.getElementById('a'+i).value
  
					  if (cellule) {
							//texte = cellule.innerText.toLocaleString();
              //alert(document.getElementById('a'+i).value)
							if (document.getElementById('a'+i).value.toUpperCase().indexOf(filtre) > -1) {
                ligne[i].style.display = "";
                t = true;
            }
  
					  }
				//}
  
  
		  // }
		  if (!t) {
				ligne[i].style.display = "none";
  
		  }
  
  
	}
  
  }
  