// /// Displaying all sells in a list on page loading
window.electron.load_customer_items();
window.electron.load_caisser_items();
window.electron.load_articles_items_entrepot(1);
window.electron.load_articles_items(1);
window.electron.show_sells();

function load_conditionment_for_sells(x) {
  //alert(document.getElementById("frs").value)

  window.electron.load_conditionment_items_for_sells(x.value, x.id[14]);

  setTimeout(() => {
    load_articles_unit_price_for_sells(x, 0);
  }, 100);
}

function load_articles_unit_price_for_sells(article, conditionment) {
  //alert(document.getElementById("frs").value)

  if (article == 0) {
    var articleElement = document.getElementById(
      "articles_items" + conditionment.id[13]
    ).value;

    window.electron.load_article_items_unit_price_for_sells(
      conditionment.id[13],
      articleElement,
      conditionment.value
    );

    Montant(conditionment);
  } else {
    var conditionmentElement = document.getElementById(
      "conditionment" + article.id[14]
    ).value;
    // alert(document.getElementById("conditionment"+article.id[14]).value)

    window.electron.load_article_items_unit_price_for_sells(
      article.id[14],
      article.value,
      conditionmentElement
    );

    Montant(article);
  }
}

function Montant(x) {
  a = parseInt(x.id.length);

  var getQuantityState = document.getElementById(
    "article_quantity" + x.id[a - 1]
  );
  // if (parseInt(getQuantityState.getAttribute("max")) < getQuantityState.value) {
    // document.getElementById("message").innerHTML =
    //   '<strong style="color: red;">La Quantité entré pour le produit de la ligne ' +
    //   x.id[a - 1] +
    //   " excède la limite!!!\nVeuillez enter une nouvelle quantité!!!</strong>";
    // getQuantityState.value = 0;
  // } else {
    // alert(document.getElementById("article_quantity"+x.id[a-1]).value)
    document.getElementById("article_total_price" + x.id[a - 1]).value =
      document.getElementById("article_quantity" + x.id[a - 1]).value *
      (document.getElementById("article_unit_price" + x.id[a - 1]).value -
        document.getElementById("reduction" + x.id[a - 1]).value);

    Montant_T();
 // }
}

function Montant_T() {
  m = 0;
  for (var i = 1; i <= n; i++) {
    m += parseInt(document.getElementById("article_total_price" + i).value);
  }

  document.getElementById("sell_total_price").value = m;

  Montant_TF();
}

function Montant_TF() {
  document.getElementById("sell_total_final").value =
    document.getElementById("sell_total_price").value -
    document.getElementById("sell_total_reduction").value;
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
  var cell6 = row.insertCell(5);
  var cell7 = row.insertCell(6);
  var cell8 = row.insertCell(7);

  cell1.innerHTML =
    '<select class="js-example-basic-single w-100" onchange=load_conditionment_for_sells(this) id="articles_items' +
    n +
    '"></select>';
  cell2.innerHTML =
    '<select class="js-example-basic-single w-100" id="conditionment' +
    n +
    '" onchange="load_articles_unit_price_for_sells(0, this)"></select>';
  cell3.innerHTML =
    '<input type="number" min="0" class="form-control" require id="article_quantity' +
    n +
    '" value="0" onchange=Montant(this)>';
  cell4.innerHTML =
    '<input type="number" min="0" value="0" readonly class="form-control" require id="article_unit_price' +
    n +
    '" onchange=Montant(this)>';
  cell5.innerHTML =
    '<input type="number" id="reduction' +
    n +
    '" class="form-control" value="0" require onchange=Montant(this)>';
  cell6.innerHTML =
    '<input type="number" readonly class="form-control" value="0" require id="article_total_price' +
    n +
    '">';
  cell7.innerHTML =
    '<select class="form-control" id="entrepot' + n + '"></select>';
  cell8.innerHTML =
    '<i title="Retirer" style="font-size: 25px" class="mdi mdi-minus-circle text-danger icon-remove" onclick="RemoveRow(this)"></i>';

  window.electron.load_articles_items(n);
  window.electron.load_articles_items_entrepot(n);
}

function RemoveRow(x) {
  // if (confirm("Confirmer la suppression ?")) {
  var table = document.getElementById("myTable");
  //alert(x.parentElement.rowIndex);
  table.deleteRow(x.parentElement.parentElement.rowIndex);
  n--;
  // }

  Montant_T();

  Montant_TF();
}

function generateBill() {
  var bill_article_from_boutique = [];
  var exist_value = true;
  var registered_data = 0;

  let bill_article_list_per_entrepot = [];

  // Pushing the first line of our table

  bill_article_list_per_entrepot.push({
    entrepot_id: document.getElementById("entrepot" + 1).value,
    entrepot_name: document.getElementById("entrepot" + 1).options[
      document.getElementById("entrepot" + 1).selectedIndex
    ].text,
    article_infos: [
      {
        articles_items: document.getElementById("articles_items" + 1).value,
        conditionment: document.getElementById("conditionment" + 1).value,
        article_quantity: document.getElementById("article_quantity" + 1).value,
        article_unit_price: document.getElementById("article_unit_price" + 1)
          .value,
        reduction: document.getElementById("reduction" + 1).value,
        article_total_price: document.getElementById("article_total_price" + 1)
          .value,
        entrepot: document.getElementById("entrepot" + 1).value,
      },
    ],
  });

  // Pushing remaining line of our table

  for (let index = 2; index <= n; index++) {
    while (
      registered_data < bill_article_list_per_entrepot.length &&
      exist_value
    ) {
      if (
        document.getElementById("entrepot" + index).value ==
        bill_article_list_per_entrepot[registered_data].entrepot_id
      ) {
        console.log("yaya");
        bill_article_list_per_entrepot[registered_data].article_infos.push({
          articles_items: document.getElementById("articles_items" + index)
            .value,
          conditionment: document.getElementById("conditionment" + index).value,
          article_quantity: document.getElementById("article_quantity" + index)
            .value,
          article_unit_price: document.getElementById(
            "article_unit_price" + index
          ).value,
          reduction: document.getElementById("reduction" + index).value,
          article_total_price: document.getElementById(
            "article_total_price" + index
          ).value,
          entrepot: document.getElementById("entrepot" + index).value,
        });

        exist_value = false;
      }

      registered_data++;
    }

    registered_data = 0;

    if (exist_value) {
      bill_article_list_per_entrepot.push({
        entrepot_id: document.getElementById("entrepot" + index).value,
        entrepot_name: document.getElementById("entrepot" + index).options[
          document.getElementById("entrepot" + index).selectedIndex
        ].text,
        article_infos: [
          {
            articles_items: document.getElementById("articles_items" + index)
              .value,
            conditionment: document.getElementById("conditionment" + index)
              .value,
            article_quantity: document.getElementById(
              "article_quantity" + index
            ).value,
            article_unit_price: document.getElementById(
              "article_unit_price" + index
            ).value,
            reduction: document.getElementById("reduction" + index).value,
            article_total_price: document.getElementById(
              "article_total_price" + index
            ).value,
            entrepot: document.getElementById("entrepot" + index).value,
          },
        ],
      });
    }

    exist_value = true;
  }

  registered_data = 0;

  var selectedRadioButton = document.getElementsByName("membershipRadios");
  for (var element of selectedRadioButton) {
    if (element.checked) {
      var payment_method = element.value;
    }
  }

  while (registered_data < bill_article_list_per_entrepot.length) {
    if (
      bill_article_list_per_entrepot[registered_data].entrepot_name ==
      "Boutique"
    ) {
      // alert(registered_data);
      var bill_article_from_boutique =
        bill_article_list_per_entrepot[registered_data];
      bill_article_list_per_entrepot =
        bill_article_list_per_entrepot.slice(registered_data);
      break;
    }
    registered_data++;
  }

  var globalBillInfo = {
    customer_name:
      payment_method !== "Comptant"
        ? document.getElementById("customer_name").value
        : document.getElementById("customer_name1").value,
    customer_phone: document.getElementById("customer_phone").value,
    customer_article_items: bill_article_from_boutique,
    // customer_article_items_entrepot: bill_article_list_per_entrepot,
    customer_article_items_entrepot: {},
    customer_payement_method: payment_method,
    customer_total_reduction: document.getElementById("sell_total_reduction")
      .value,
    customer_total_sell_price:
      document.getElementById("sell_total_final").value,
    customer_caissier: document.getElementById("caissier").value,
  };

  console.log(globalBillInfo);

  window.electron.insert_sell(globalBillInfo);
  // window.location.reload()
}

function getBillPdfToPrint(id_facture) {
  window.electron.getBillPdfFileToPrint(id_facture);
}

function delete_sell_from_database(facture_id) {
  window.electron.delete_sell(facture_id);
}

// Other functions

function DisableOtherInput(selectedInput) {
  if (selectedInput.id[14] == 1) {
    document.getElementById("customer_name").disabled = true;
    document.getElementById("customer_name1").disabled = false;
  } else {
    document.getElementById("customer_name").disabled = false;
    document.getElementById("customer_name1").disabled = true;
    document.getElementById("message1").innerHTML =
      "<strong style=\"color: red;\">Veuillez sélectionner un client\nSi le client n'existe psa dans la liste, veuillez le créer à partir de l'onglet COMPTE CLIENT -> NOUVEAU CLIENT</strong>";
  }
}

var js_ = document.createElement("script");
js_.type = "text/javascript";
js_.src = "../../vendors/select2/select2.min.js";
//document.body.removeChild(js_)
document.body.appendChild(js_);
var js = document.createElement("script");
js.type = "text/javascript";
js.src = "../../js/select2.js";
//document.body.removeChild(js)
document.body.appendChild(js);