
window.electron.chargement_articles_BC(1);
window.electron.chargement_fseur_BC();
window.electron.afiche_BC();


function getBonCommandePdfToPrint(id_boncommande) {
  window.electron.findBonCommandePdfToPrint(id_boncommande)
}


function chargement_cdmnt(x) {
  //alert(document.getElementById("frs").value)

  window.electron.chargement_cdmnt_BC(x.value, x.id[7])
}


function Montant(x) {
  a = parseInt(x.id.length)

  //alert("montant"+x.id[a-1])


  document.getElementById("montant" + x.id[a - 1]).value = document.getElementById("pu" + x.id[a - 1]).value * document.getElementById("qte" + x.id[a - 1]).value

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
  cell2.innerHTML = '<input type="number" min="0" class="form-control" require id="qte' + nC + '" onchange=Montant(this)>';
  cell3.innerHTML = '<input type="number" min="0" class="form-control" require id="pu' + nC + '" onchange=Montant(this)>';
  cell4.innerHTML = '<input type="number" readonly class="form-control" require id="montant' + nC + '">';
  cell5.innerHTML = '<i title="Retirer" style="font-size: 25px" class="mdi mdi-minus-circle text-danger icon-remove" onclick="RemoveRow(this)" id="' + nC + '"></i>';

  window.electron.chargement_articles_BC(n);
}


function RemoveRow(x) {
  // if (confirm("Confirmer la suppression ?")) {
    var table = document.getElementById("myTable");
    //alert(x.id);
    //table.deleteRow(x.parentElement.parentElement.rowIndex);
    x.parentElement.parentElement.style.display = 'none';

    //n--;
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

