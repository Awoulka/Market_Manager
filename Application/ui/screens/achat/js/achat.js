window.electron.chargement_articles_BC (1);
 window.electron.chargement_fseur_BC();

 function chargement_cdmnt(x) {
 	//alert(document.getElementById("frs").value)
 	window.electron.chargement_cdmnt_BC(x.value,x.id[7])
 }


function Montant(x) {
  a=parseInt(x.id.length)

  //alert("montant"+x.id[a-1])


  document.getElementById("montant"+x.id[a-1]).value=document.getElementById("pu"+x.id[a-1]).value*document.getElementById("qte"+x.id[a-1]).value

  Montant_T()
 }

function Montant_T() {
 	m=0

  for (var i = 1; i <= n; i++) {
    m += parseInt(document.getElementById("montant"+i).value);
  }

 	document.getElementById("montant_total").value = m
}

var n = 1;
var nC = 1;

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
  

  cell1.innerHTML = '<div class="row"><div class="col-md-8" ><select class="js-example-basic-single w-100" onchange=chargement_cdmnt(this) id="article'+n+'"></select></div><div class="col-md-4" ><select class="js-example-basic-single w-100" id="cdmnt'+n+'"></select></div></div>';
  cell2.innerHTML = '<input type="number" min="0" class="form-control" require id="qte'+n+'" onchange=Montant(this)>';
  cell3.innerHTML = '<input type="number" min="0" class="form-control" require id="pu'+n+'" onchange=Montant(this)>';
  cell4.innerHTML = '<input type="number" readonly class="form-control" require id="montant'+n+'">';
  cell5.innerHTML = '<i title="Retirer" style="font-size: 25px" class="mdi mdi-minus-circle text-danger icon-remove" onclick="RemoveRow(this)"></i>';

  window.electron.chargement_articles_BC (n);
}

    
function RemoveRow(x) {
  if (confirm("Confirmer la suppression ?"))
  {
    var table = document.getElementById("myTable");
    //alert(x.parentElement.rowIndex);
    table.deleteRow(x.parentElement.parentElement.rowIndex);
    n--;
  }

  Montant_T()
}
