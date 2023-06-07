

function GET(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
}


document.getElementById('card').innerHTML += '<a  href="bon_de_reception.html" class=" btn btn-primary text-white me-0" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false" ><i class="mdi mdi-reply"></i>Retour</a>'
document.getElementById('card').innerHTML += '<a  href="modif_bon_R.html?id='+GET('id')+'" class=" btn btn-warning text-white me-0" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false" ><i class="mdi mdi-pencil"></i>Modifier</a><button onclick="actualiser()" type="submit" class="btn btn-success text-white me-2"><i class="mdi mdi-refresh"></i>Actualiser</button>'

window.electron.voir_reception_BC(GET('id'));




var n = document.getElementById("myTable").rows.length-1;
var c=0


    function enreg_BR() {


    	for (var i = 1; i <=(document.getElementById("myTable").rows.length-1); i++) {

				if (document.getElementById("qteR"+i).value != 0  ) {



						c++
				}
			}

    	window.electron.insert_BR((document.getElementById("myTable").rows.length-1),c)

    }



function actualiser() { window.location.reload()}
