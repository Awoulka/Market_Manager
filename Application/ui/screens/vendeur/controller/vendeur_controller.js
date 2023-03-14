// /// Displaying all sells in a list on page loading
window.electron.load_articles_items_entrepot(1);
window.electron.load_articles_items(1);


function load_conditionment_for_sells(x) {
    //alert(document.getElementById("frs").value)

    window.electron.load_conditionment_items_for_sells(x.value,x.id[14])

    setTimeout(() => {
        load_articles_unit_price_for_sells(x, 0)
    }, 100);
}


function load_articles_unit_price_for_sells(article, conditionment) {
    //alert(document.getElementById("frs").value)

    if (article == 0) {
        var articleElement = document.getElementById("articles_items"+conditionment.id[13]).value

        window.electron.load_article_items_unit_price_for_sells(conditionment.id[13], articleElement, conditionment.value,)

        Montant(conditionment)

    } else {
        var conditionmentElement = document.getElementById("conditionment"+article.id[14]).value
        // alert(document.getElementById("conditionment"+article.id[14]).value)

        window.electron.load_article_items_unit_price_for_sells(article.id[14], article.value, conditionmentElement)

        Montant(article)
    }
}

function Montant(x) {
    a=parseInt(x.id.length)

    // alert(document.getElementById("article_quantity"+x.id[a-1]).value)
    document.getElementById("article_total_price"+x.id[a-1]).value = (document.getElementById("article_unit_price"+x.id[a-1]).value * document.getElementById("article_quantity"+x.id[a-1]).value) - document.getElementById("reduction"+x.id[a-1]).value

    Montant_T()
}

function Montant_T() {
    m=0
    for (var i = 1; i <= n; i++) {
        m += parseInt(document.getElementById("article_total_price"+i).value);
    }

    document.getElementById("sell_total_price").value = m

    Montant_TF()
}

function Montant_TF() {
    document.getElementById('sell_total_final').value = document.getElementById("sell_total_price").value - document.getElementById("sell_total_reduction").value
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

    cell1.innerHTML = '<select class="js-example-basic-single w-100" onchange=load_conditionment_for_sells(this) id="articles_items'+n+'"></select>';
    cell2.innerHTML = '<select class="js-example-basic-single w-100" id="conditionment'+n+'" onchange="load_articles_unit_price_for_sells(0, this)"></select>';
    cell3.innerHTML = '<input type="number" min="0" class="form-control" require id="article_quantity'+n+'" value="0" onchange=Montant(this)>';
    cell4.innerHTML = '<input type="number" min="0" readonly class="form-control" require id="article_unit_price'+n+'" onchange=Montant(this)>';
    cell5.innerHTML = '<input type="number" id="reduction'+n+'" class="form-control" value="0" require onchange=Montant(this)>';
    cell6.innerHTML = '<input type="number" readonly class="form-control" require id="article_total_price'+n+'">';
    cell7.innerHTML = '<select class="form-control" id="entrepot'+n+'"></select>'
    cell8.innerHTML = '<i title="Retirer" style="font-size: 25px" class="mdi mdi-minus-circle text-danger icon-remove" onclick="RemoveRow(this)"></i>';

    window.electron.load_articles_items(n);
    window.electron.load_articles_items_entrepot(n);
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

    Montant_TF()
}

function generateBill() {
    var bill_article = []

    for (let index = 1; index <= n; index++) {
        var bill_article_map = {
            'articles_items' : document.getElementById('articles_items'+index).value,
            'conditionment' : document.getElementById('conditionment'+index).value,
            'article_quantity' : document.getElementById('article_quantity'+index).value,
            'article_unit_price' : document.getElementById('article_unit_price'+index).value,
            'reduction' : document.getElementById('reduction'+index).value,
            'article_total_price' : document.getElementById('article_total_price'+index).value,
            'entrepot' : document.getElementById('entrepot'+index).value,
        }
        
        bill_article.push(bill_article_map)
    }

    var globalBillInfo = {
        'customer_name' : document.getElementById('customer_name1').value,
        'customer_phone' : document.getElementById('customer_phone').value,
        'customer_article_items' : bill_article,
        'customer_total_reduction' : document.getElementById('sell_total_reduction').value,
        'customer_total_sell_price' : document.getElementById('sell_total_final').value,
    }

    console.log(globalBillInfo)

    // window.electron.insert_sell(globalBillInfo)
}


// Other functions

function DisableOtherInput(selectedInput){
    if (selectedInput.id[14] == 1) {
        document.getElementById('customer_name').disabled = true;
        document.getElementById('customer_name1').disabled = false;
    } else {
        document.getElementById('customer_name').disabled = false;
        document.getElementById('customer_name1').disabled = true;
    }
}