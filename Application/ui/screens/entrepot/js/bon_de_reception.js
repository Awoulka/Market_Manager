 window.electron.afiche_BR();
 document.getElementById('card').innerHTML += '<button onclick="actualiser()" type="submit" class="btn btn-success text-white me-2"><i class="mdi mdi-refresh"></i>Actualiser</button>'

 document.getElementById('card').innerHTML +='<a  href="new_bon_reception.html" class=" btn btn-primary text-white me-0" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false" ><i class="mdi mdi-plus"></i>Nouvelle reception</a>'
 
 function filtrer() {

    //alert(document.getElementById("select_f").options[document.getElementById("select_f").options.selectedIndex].value)
    var filtre, tableau, ligne, cellule, i, texte;
  
    filtre = document.getElementById("maRecherche").value.toUpperCase();
    tableau = document.getElementById("tab-boncmd");
    ligne = tableau.getElementsByTagName("tr");
    //alert(ligne.length)
    for (i = 1; i < ligne.length; i++) {
          let t = false;
          for (j = 0; j <= 4; j++) {
  
                if (j == 1 || j == 2 || j == 3 ) {
                      cellule = ligne[i].getElementsByTagName("td")[j];
  
  
                      if (cellule) {
                            texte = cellule.innerText.toLocaleString();
                            //alert(texte)
                            if (texte.toUpperCase().indexOf(filtre) > -1) {
                                  ligne[i].style.display = "";
                                  t = true;
                            }
  
                      }
                }
  
  
          }
          if (!t) {
                ligne[i].style.display = "none";
  
          }
  
  
    }
  
  }


function actualiser() { window.location.reload()}


var js_ = document.createElement("script");
js_.type = "text/javascript";
js_.src = "../../vendors/select2/select2.min.js";
document.body.appendChild(js_);
var js = document.createElement("script");
js.type = "text/javascript";
js.src = "../../js/select2.js";
document.body.appendChild(js);