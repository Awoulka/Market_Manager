

function GET(param) {
	var vars = {};
	window.location.href.replace(location.hash, '').replace(
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function (m, key, value) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if (param) {
		return vars[param] ? vars[param] : null;
	}
	return vars;
}

document.getElementById('card').innerHTML += '<a  href="bon_de_reception.html" class=" btn btn-primary text-white me-0" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false" ><i class="mdi mdi-reply"></i>Retour</a>'

document.getElementById('annuler').innerHTML += '<a  href="bon_de_reception.html" class=" btn btn-danger text-white me-0" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false" >Annuler</a>'

window.electron.reception_BC(GET('id'));




var n = document.getElementById("myTable").rows.length - 1;
var c = 0


function enreg_BR() {




	if (document.getElementById("entrepot").value == "null") {

		document.getElementById("message").innerHTML = '<strong style="color: red;">Veuillez renseigner l\'entrepot de reception !!!!!!!!</strong>'

	}
	else {



		if (document.getElementById("date").value == "") {

			document.getElementById("message").innerHTML = '<strong style="color: red;">Veuillez renseigner la date de reception!!!!!!!!</strong>'


		}
		else {


			for (var i = 1; i <= (document.getElementById("myTable").rows.length - 1); i++) {

				//if (document.getElementById("qteR"+i).value != 0  ) {



				c++
				//}
			}

			window.electron.insert_BR((document.getElementById("myTable").rows.length - 1), c)


		}
	}



}



function actualiser() { window.location.reload() }

var js_ = document.createElement("script");
js_.type = "text/javascript";
js_.src = "../../vendors/select2/select2.min.js";
document.body.appendChild(js_);
var js = document.createElement("script");
js.type = "text/javascript";
js.src = "../../js/select2.js";
document.body.appendChild(js);