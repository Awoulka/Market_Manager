/// Displaying all customers in a list on page loading
window.electron.show_customer();

//// Function to get informations from form and register a new customer

function new_customer() {
  if (
    document.getElementById("customer_name").value != "" &&
    document.getElementById("customer_phone").value != ""
  ) {
    window.electron.insert_customer(
      document.getElementById("customer_name").value,
      document.getElementById("customer_phone").value
    );

    document.getElementById("message").innerHTML =
      '<strong style="color: green;">Enregistrement réussi. Veuillez actualiser la page pour voir le client enregistré.</strong>';

    // window.electron.show_customer();
    window.location.reload();
  } else {
    document.getElementById("message").innerHTML =
      '<strong style="color: red;">Veuillez renseigner le / les information(s) manquante(s) !!!!!!!!</strong>';
  }
}

function delete_customer_from_database(customer_id) {
  window.electron.delete_customer(customer_id);
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