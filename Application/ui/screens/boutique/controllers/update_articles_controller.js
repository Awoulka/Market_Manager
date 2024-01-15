// Load all informations about article

function GetURLParameter(sParam) {
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split("&");
  for (var i = 0; i < sURLVariables.length; i++) {
    var sParameterName = sURLVariables[i].split("=");
    if (sParameterName[0] == sParam) {
      return sParameterName[1];
    }
  }
}

const article_id = GetURLParameter("article_id");
const article_name = GetURLParameter("article_name");

// var article_id = localStorage.getItem('article_id')
// var article_name = localStorage.getItem('article_name')

window.electron.show_article_details(article_id);
window.electron.load_conditionment_items(1);

// document.getElementById("article_name").value = article_name;
// document.getElementById("article_name1").innerHTML = article_name;
document.getElementById("article_name2").innerHTML = article_name;

//// Function to get informations from form and register a new article

function update_article() {
  if (
    document.getElementById("article_name").value != "" &&
    document.getElementById("article_unit_price").value != "" &&
    document.getElementById("article_quantity").value != ""
  ) {
    window.electron.update_article(
      document.getElementById("article_name").value,
      document.getElementById("article_unit_price").value,
      document.getElementById("article_quantity").value,
      article_id,
      GetURLParameter("article_conditionment"),
      GetURLParameter("article_entrepot")
    );

    document.getElementById("message").innerHTML =
      "<strong style=\"color: green;\">Mise à jour de l'article réussi. Veuillez actualiser la page pour voir affiché l'article modifié.</strong>";
  } else {
    document.getElementById("message").innerHTML =
      '<strong style="color: red;">Veuillez renseigner le / les information(s) manquante(s) !!!!!!!!</strong>';
  }
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

  cell1.innerHTML =
    '<select class="js-example-basic-single w-100" name="conditionment_items" id="conditionment_items' +
    n +
    '" onchange="addConditionment(this)" ></select>';
  cell2.innerHTML =
    '<input type="number" name="article_unit_price" id="article_unit_price' +
    n +
    '" min="0" class="form-control" value="0" placeholder="0 FCFA" />';
  cell3.innerHTML =
    '<input type="number" name="article_quantity" id="article_quantity' +
    n +
    '" min="0" class="form-control" value="0" placeholder="00" />';
  cell4.innerHTML =
    '<i title="Retirer" style="font-size: 25px" class="mdi mdi-minus-circle text-danger icon-remove" onclick="RemoveRow(this)"></i>';

  window.electron.load_conditionment_items(n);
}

function RemoveRow(x) {
  if (confirm("Confirmer la suppression ?")) {
    var table = document.getElementById("myTable");
    //alert(x.parentElement.rowIndex);
    table.deleteRow(x.parentElement.parentElement.rowIndex);
    n--;
  }
}

function generateArticle() {
  var article_list = [];
  // var qte = 0;

  for (let index = 1; index <= n; index++) {
    var article_map = {
      conditionment_items: document.getElementById(
        "conditionment_items" + index
      ).value,
      article_quantity: document.getElementById("article_quantity" + index)
        .value,
      article_unit_price: document.getElementById("article_unit_price" + index)
        .value,
    };

    article_list.push(article_map);
  }

  // var selectedRadioButton = document.getElementsByName("membershipRadios");
  // for (var element of selectedRadioButton) {
  //   if (element.checked) {
  //     var payment_method = element.value;
  //   }
  // }

  var globalArticleInfo = {
    article_id: article_id,
    article_items: article_list,
  };

  console.log(globalArticleInfo);
  if (document.getElementsByName("submitButton")[0].id == "1") {
    window.electron.insert_article_details(globalArticleInfo);
  } else {
    window.electron.update_article_details(globalArticleInfo);
  }

  // loadPageContent("screens/boutique/article_details.html")
  // window.location.reload()
}

function fillElementForUpdate(index) {
  var table = document.getElementById("myTable");
  console.log(n + "ffffffffffffffffffffffffffffffff");
  while (n != 1) {
    table.deleteRow(n);
    n--;
  }

  document.getElementById("conditionment_items" + 1).innerHTML =
    "<option>" +
    document.getElementById("conditionment" + index).innerHTML +
    "</option>";
  document.getElementById("article_unit_price" + 1).value =
    document.getElementById("unit_price" + index).innerHTML;
  document.getElementById("article_quantity" + 1).value =
    document.getElementById("quantity" + index).innerHTML;

  //   n = 1;

  document.getElementById("id_Action").hidden = true;
  document.getElementById("id_button").hidden = true;
  document.getElementById("id_add_button").hidden = true;
  document.getElementById("1").setAttribute("id", "2");
}

function show_element() {
  document.getElementById("id_Action").hidden = false;
  document.getElementById("id_button").hidden = false;
  document.getElementById("id_add_button").hidden = false;
  document.getElementById("article_unit_price" + 1).value = 0;
  document.getElementById("article_quantity" + 1).value = 0;
  document.getElementById("2").setAttribute("id", "1");

  window.electron.load_conditionment_items(1);
  setTimeout(() => {
    addConditionment(document.getElementById("conditionment_items1"));
  }, 5000);
}

setTimeout(() => {
  addConditionment(document.getElementById("conditionment_items1"));
}, 5000);

var conditionment_list = [];

function addConditionment(conditionment) {
  if (conditionment_list.includes(conditionment.value)) return;

  conditionment_list.push(conditionment.value);

  let c = '<p class="card-description">Conditionnements : ';

  conditionment_list.map((conditionment) => {
    c +=
      '<span class="text-white btn btn-primary disabled">' +
      conditionment +
      "</span>";
  });
  c += "</p>";

  document.getElementById("conditionment_element").innerHTML = c;
}

function delete_article_details_from_database(
  article_id,
  conditionment_id,
  entrepot_id
) {
  window.electron.delete_article_details(
    article_id,
    conditionment_id,
    entrepot_id
  );
  // loadPageContent("screens/boutique/article_details.html");
}


var js_ = document.createElement("script");
js_.type = "text/javascript";
js_.src = "../../vendors/select2/select2.min.js";
document.body.appendChild(js_);
var js = document.createElement("script");
js.type = "text/javascript";
js.src = "../../js/select2.js";
document.body.appendChild(js);