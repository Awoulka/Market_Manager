
window.electron.chargement_articles_BC(1);
window.electron.chargement_fseur_BC();
window.electron.afiche_BC();


function getBonCommandePdfToPrint(id_boncommande) {
  window.electron.findBonCommandePdfToPrint(id_boncommande)
}



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


  //alert(i)


  document.getElementById("montant" + i).value = document.getElementById("pu" + i).value * document.getElementById("qte" + i).value

  Montant_T()
}

function Montant_T() {
  //a=parseInt(x.id.length)

  //alert(document.getElementById("article1").value)

  //document.getElementById("montant"+x.id[a-1]).value=document.getElementById("pu"+x.id[a-1]).value*document.getElementById("qte"+x.id[a-1]).value

  m = 0

  for (var i = 1; i <= n; i++) {
    m += parseInt(document.getElementById("montant" + i).value);
  }

  document.getElementById("montant_total").value = m

}

var n = 1;
var nC = 1;
var c = 0

function AddRow() {
  n++;
  nC++;
  var table = document.getElementById("myTable");
  var row = table.insertRow(n);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);

  cell1.innerHTML = '<div class="row"><div class="col-md-8" ><select class="js-example-basic-single w-100" onchange=chargement_cdmnt(this) id="article' + nC + '"></select></div><div class="col-md-4" ><select class="js-example-basic-single w-100" id="cdmnt' + nC + '"></select></div></div>';
  cell2.innerHTML = '<input type="number" min="0" class="form-control" require id="qte' + nC + '" onchange=Montant(this,"qt")>';
  cell3.innerHTML = '<input type="number" min="0" class="form-control" require id="pu' + nC + '" onchange=Montant(this,"pu")>';
  cell4.innerHTML = '<input type="number" readonly class="form-control" require id="montant' + nC + '">';
  cell5.innerHTML = '<i title="Retirer" style="font-size: 25px" class="mdi mdi-minus-circle text-danger icon-remove" onclick="RemoveRow(this)" id="' + nC + '"></i>';

  window.electron.chargement_articles_BC(n);
}


function RemoveRow(x) {

  // if (confirm("Confirmer la suppression ?")) {

  var table = document.getElementById("myTable");

  // alert(x.id);
  // table.deleteRow(x.parentElement.parentElement.rowIndex);

  x.parentElement.parentElement.style.display = 'none';
  // n--;
  c++;

  // }

  document.getElementById("montant" + x.id).value = 0

  Montant_T()
}


function Insert_bonC() {

  c = (document.getElementById("myTable").rows.length - 3) - c


  window.electron.insertion_bon_cmd(nC, c)

}

function delete_bon(id) {



  if (confirm("Confirmez vous la suppression de ce bon de commande ?")) {

    window.electron.delete_bon_cmd(id)
  }



}

function actualiser() { window.location.reload() }

function filtrer() {

  //alert(document.getElementById("select_f").options[document.getElementById("select_f").options.selectedIndex].value)
  var filtre, tableau, ligne, cellule, i, texte;

  filtre = document.getElementById("maRecherche").value.toUpperCase();
  tableau = document.getElementById("tab-boncmd");
  ligne = tableau.getElementsByTagName("tr");
  //alert(ligne.length)
  for (i = 0; i < ligne.length; i++) {
        let t = false;
        for (j = 0; j <= 4; j++) {

              if (j == 1 || j == 2 || j == 3 ) {
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