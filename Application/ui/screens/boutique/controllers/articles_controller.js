/// Displaying all articles in a list on page loading
window.electron.show_article();

// Load data about article conditionment into order to add a new article

window.electron.load_conditionment_items(1);

//// Function to get informations from form and register a new article

// function new_article() {
//   if (
//     document.getElementById("article_name").value != "" &&
//     document.getElementById("article_unit_price").value != "" &&
//     document.getElementById("article_quantity").value != ""
//   ) {
//     window.electron.insert_article(
//       document.getElementById("article_name").value,
//       document.getElementById("article_unit_price").value,
//       document.getElementById("article_quantity").value,
//       conditionment_list
//     );

//     document.getElementById("message").innerHTML =
//       '<strong style="color: green;">Enregistrement réussi. Veuillez actualiser la page pour voir affiché l\'article enregistré.</strong>';

//     window.electron.show_article();
//   } else {
//     document.getElementById("message").innerHTML =
//       '<strong style="color: red;">Veuillez renseigner le / les information(s) manquante(s) !!!!!!!!</strong>';
//   }
// }

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

  cell1.innerHTML =
    '<select class="js-example-basic-single w-100" name="conditionment_items" id="conditionment_items' +
    n +
    '" onchange="addConditionment(this)" ></select>';
  // cell2.innerHTML =
  //   '<input type="number" name="article_unit_price" id="article_unit_quantity' +
  //   n +
  //   '" min="0" class="form-control" value="0" placeholder="0 FCFA" onchange="update_article_unit_total_quantity('+n+')" />';
  cell2.innerHTML =
    '<input type="number" name="article_unit_price" id="article_unit_price' +
    n +
    '" min="0" class="form-control" value="0" placeholder="0 FCFA" />';
  // cell4.innerHTML =
  //   '<input type="number" name="article_quantity" id="article_quantity' +
  //   n +
  //   '" min="0" class="form-control" value="0" placeholder="00" />';
  cell3.innerHTML =
    '<i title="Retirer" style="font-size: 25px" class="mdi mdi-minus-circle text-danger icon-remove" onclick="RemoveRow(this)"></i>';

  window.electron.load_conditionment_items(n);
}

function RemoveRow(x) {
  // if (confirm("Confirmer la suppression ?")) {
    var table = document.getElementById("myTable");
    //alert(x.parentElement.rowIndex);
    table.deleteRow(x.parentElement.parentElement.rowIndex);
    n--;
  // }
}

function generateArticle() {
  var article_list = [];
  var qte = 0

  for (let index = 1; index <= n; index++) {
    var article_map = {
      conditionment_items: document.getElementById(
        "conditionment_items" + index
      ).value,
      // article_quantity: document.getElementById("article_quantity" + index)
      //   .value,
      qte,
      article_unit_price: document.getElementById("article_unit_price" + index)
        .value,
    };

    article_list.push(article_map);
  }

  var selectedRadioButton = document.getElementsByName("membershipRadios");
  for (var element of selectedRadioButton) {
    if (element.checked) {
      var payment_method = element.value;
    }
  }

  var globalArticleInfo = {
    article_name: document.getElementById("article_name").value,
    article_items: article_list,
  };

  console.log(globalArticleInfo);

  window.electron.insert_article(globalArticleInfo);
  loadPageContent("screens/boutique/article_details.html");
}

setTimeout(() => {
  addConditionment(document.getElementById("conditionment_items1"));
}, 2000);

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

function delete_article_from_database(article_id) {
  window.electron.delete_article(article_id);
}
