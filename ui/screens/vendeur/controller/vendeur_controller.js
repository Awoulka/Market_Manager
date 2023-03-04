/// Displaying all sells in a list on page loading
// window.electron.show_sell();

// Load data about articles and conditionment into order to add a new sell

var listArticles = []

window.electron.load_articles_items();



window.electron.load_conditionment_items_for_sells();

console.log(listArticles)

function ChangeFields(index) {
    alert(document.getElementById("unit_price[]").value[index])

    document.getElementById("unit_price[]").value[index] = 1
    document.getElementById("total_price[]").value[index] = 2
}


//// Function to get informations from form and register a new sell
function new_sell(){

	if (document.getElementById("customer_name").value != "" && document.getElementById("customer_phone").value != "" && document.getElementById("articles_items[]").length != 0 && document.getElementById("article_quantity[]").length != 0 && document.getElementById("article_unit_price[]").length != 0 && document.getElementById("article_total_price[]").length != 0) {

		window.electron.insert_sell(document.getElementById("sell_name").value,document.getElementById("sell_unit_price").value,document.getElementById("sell_quantity").value,document.getElementById("conditionment_items").value);        

		document.getElementById("message").innerHTML =  '<strong style="color: green;">Enregistrement réussi. Veuillez actualiser la page pour voir affiché l\'sell enregistré.</strong>'

		window.electron.show_sell();
	}
	else{

		document.getElementById("message").innerHTML =  '<strong style="color: red;">Veuillez renseigner le / les information(s) manquante(s) !!!!!!!!</strong>'
	}
}


var n = 2;

function AddRow() {
    var table = document.getElementById("myTable");
    var row = table.insertRow(n);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    n++;

    cell1.innerHTML = "<select class='form-control' id='articles_items[]'></select>";
    cell2.innerHTML = "<select class='form-control' id='articles_conditionment[]' onchange='ChangeFields("+n+")'></select>";
    cell3.innerHTML = "<input type='number' id='article_quantity[]' min='0' class='form-control'>";
    cell4.innerHTML = "<input type='number' id='article_unit_price[]' readonly class='form-control'>";
    cell5.innerHTML = "<input type='number' id='article_total_price[]' readonly class='form-control'>";
    cell6.innerHTML = '<i title="Retirer" style="font-size: 25px" class="mdi mdi-minus-circle text-danger icon-remove" onclick="RemoveRow(this)"></i>';

}

function RemoveRow(x) {
    if (confirm("Confirmer la suppression ?"))
    {
    var table = document.getElementById("myTable");
    //alert(x.parentElement.rowIndex);
    table.deleteRow(x.parentElement.parentElement.rowIndex);
    n--;
    }

}
