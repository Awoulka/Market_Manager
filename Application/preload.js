window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type]);
  }
});

const { contextBridge, ipcRenderer, BrowserWindow, app } = require("electron");

const GET = (param) => {
  var vars = {};
  window.location.href.replace(location.hash, "").replace(
    /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
    function (m, key, value) {
      // callback
      vars[key] = value !== undefined ? value : "";
    }
  );

  if (param) {
    return vars[param] ? vars[param] : null;
  }
  return vars;
};

const { jsPDF } = require("jspdf"); // will automatically load the node version
require("jspdf-autotable");
const { resolve } = require("path");

const Fs = require("fs");

var mysql = require("mysql");

function db_connect(argument) {
  // Add the credentials to access your database
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: null, // or the original password : 'apaswword'
    database: "Market_Manager_DB",
  });

  // connect to mysql
  connection.connect(function (err) {
    // in case of error
    if (err) {
      console.log(err.code);
      console.log(err.fatal);
    }
  });

  return connection;
}

// Connection to MySQL database via the package SEQUELIZE
const { Sequelize, DataTypes, QueryTypes } = require("sequelize");
const path = require("path");
const fs = require("fs");
const { execPath } = require("process");
// const { dialog } = require('electron').remote

const sequelize = new Sequelize("Market_Manager_DB", "root", null, {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    alert(
      "L'appplication n'a pas pu se connecter à la Base de Données!!\n\nVeuillez lancer l'application XAMPP et effectuer les étapes suivantes :\n1 - Cliquer sur bouton START de APACHE\n2 - Cliquer sur le bouton START de MYSQL\n3 - Actualiser l'application."
    );
    console.error("Unable to connect to the database: ", error);
  });

///////-------SECTION FOURNISSEURS----------\\\\\\\\\

//***** Fonction de remplissage du tableau des fournisseurs ***\\

const afiche_fseur = () => {
  connection = db_connect();
  $query = "SELECT * FROM `fournisseur` ";
  connection.query($query, function (err, rows, fields) {
    if (err) {
      console.log("An error ocurred performing the query.");
      console.log(err);
      return;
    }

    let c = "";
    rows
      .map((elem) => {
        c += "<tr>";
        c +=
          '<td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td><td>' +
          elem.nom_fournisseur +
          "</td><td>" +
          elem.telephone_fournisseur +
          "</td><td>" +
          elem.adresse_fournisseur +
          "</td>";
        c +=
          '<td><div class="btn-wrapper"><a href="voir-fournisseur.html?id=' +
          elem.id_fournisseur +
          '" type="button" class="btn btn-success text-white me-0" ></i>&nbsp; voir</a><button  onclick = delete_fseur(' +
          elem.id_fournisseur +
          ") id=" +
          elem.id_fournisseur +
          '  class="btn btn-danger text-white me-0" ></i>&nbsp; Supprimer</button></td>';
        c += "</tr>";
      })
      .join();

    document.getElementById("tab-fseur").innerHTML = c;
  });

  // Close the connection
  connection.end(function () {
    // The connection has been closed
  });
};

//***** Fonction d'enregistrement d'un fournisseur ***\\

const insert_fseur = (a, b, c) => {
  console.log(a, b, c);

  connection = db_connect();
  $query =
    'INSERT INTO fournisseur (nom_fournisseur,telephone_fournisseur,adresse_fournisseur) VALUES ("' +
    a +
    '","' +
    b +
    '","' +
    c +
    '")';

  connection.query($query, function (err, result) {
    if (err) {
      console.log("An error ocurred performing the query.");
      console.log(err);
      return;
    }

    console.log(result.insertId);
  });

  // Close the connection
  connection.end(function () {
    // The connection has been closed
  });
};

//***** Fonction de modification des informations fournisseur ***\\

const update_fseur = (a, b, c, id) => {
  console.log(a, b, c, id);

  connection = db_connect();

  $query =
    "UPDATE fournisseur SET  nom_fournisseur = '" +
    a +
    "' , telephone_fournisseur = '" +
    b +
    "' , adresse_fournisseur = '" +
    c +
    "'  WHERE id_fournisseur = " +
    id;
  console.log($query);

  connection.query($query, function (err, result) {
    if (err) {
      console.log("An error ocurred performing the query.");
      console.log(err);
      return;
    }

    //console.log("Query succesfully executed", rows[0].nom_fournisseur);
  });

  // Close the connection
  connection.end(function () {
    // The connection has been closed
  });
};

//***** Fonction de suppression d'un fournisseur  ***\\

const delete_fseur = (id) => {
  sequelize
    .query("DELETE FROM fournisseur WHERE id_fournisseur =" + id)
    .then((BC) => {
      alert("Fournisseur Supprimée avec success.");
      window.location.reload();
    })
    .catch((error) => {
      console.error("Failed to DELETE Fournisseur data : ", error);
    });
};

//***** Fonction de chargement des détaille fournisseur ***\\

const detail_fseur = () => {
  connection = db_connect();
  // Perform a query

  $query = "SELECT * FROM `fournisseur` WHERE id_fournisseur=" + GET("id");

  connection.query($query, function (err, rows, fields) {
    if (err) {
      console.log("An error ocurred performing the query.");
      console.log(err);
      return;
    }

    document.getElementById("info").innerHTML =
      '<!--img class="rounded-circle mx-auto d-block" src="../../images/faces/face.jpg" alt="Card image cap" style="width: 20%;"--><h2 class="text-sm-center mt-2 mb-1"><strong >' +
      rows[0].nom_fournisseur +
      '</strong></h2><div class="location text-sm-center"><i class="fa fa-map-marker"></i><spam >' +
      rows[0].adresse_fournisseur +
      '</spam>, <spam id="">' +
      rows[0].telephone_fournisseur +
      "</spam> </div>";
    document.getElementById("info").innerHTML +=
      '<input type="text" name="" id="id" hidden="true" value="' +
      rows[0].id_fournisseur +
      '"><input type="text" name="" id="nom-fseur" hidden="true" value="' +
      rows[0].nom_fournisseur +
      '"><input type="text" name="" id="adresse-fseur" hidden="true" value="' +
      rows[0].adresse_fournisseur +
      '"><input type="text" name="" id="tel-fseur" hidden="true" value="' +
      rows[0].telephone_fournisseur +
      '">';
  });

  // Close the connection
  connection.end(function () {
    // The connection has been closed
  });
};

//***** Fonction de chargement des  fournisseurs dans la page d'enregistrement d'un bon de commande ***\\

const chargement_articles_BC = (a) => {
  connection = db_connect();

  $query = "SELECT * FROM `articles` ";

  connection.query($query, function (err, rows, fields) {
    if (err) {
      console.log("An error ocurred performing the query.");
      console.log(err);
      return;
    }

    let c = "<option value=0>Veuillez choisir un Article</option>";

    rows
      .map((elem) => {
        c +=
          '<option value="' +
          elem.id_article +
          '">' +
          elem.libele_article +
          "</option>";
      })
      .join();

    document.getElementById("article" + a).innerHTML = c;

    var js_ = document.createElement("script");
    js_.type = "text/javascript";
    js_.src = "../../vendors/select2/select2.min.js";
    document.body.appendChild(js_);
    var js = document.createElement("script");
    js.type = "text/javascript";
    js.src = "../../js/select2.js";
    document.body.appendChild(js);
  });

  // Close the connection
  connection.end(function () {
    // The connection has been closed
  });
};

//***** Fonction de chargement des  conditionnements  dans la page d'enregistrement d'un bon de commande  à la selection de l'article***\\

const chargement_cdmnt_BC = (id, indice) => {
  connection = db_connect();

  $query =
    "SELECT * FROM `conditionnements` , `articles_condmnt` , `articles` WHERE conditionnements.id_condmnt = articles_condmnt.condmnt_id AND articles.id_article = articles_condmnt.article_id AND articles.id_article = " +
    id;

  connection.query($query, function (err, rows, fields) {
    if (err) {
      console.log("An error ocurred performing the query.");
      console.log(err);
      return;
    }

    let c = "";
    rows
      .map((elem) => {
        c +=
          '<option value="' +
          elem.id_condmnt +
          '">' +
          elem.abreviation_condmnt +
          "</option>";
      })
      .join();

    document.getElementById("cdmnt" + indice).innerHTML = c;

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
  });
  // Close the connection
  connection.end(function () {
    // The connection has been closed
  });
};

//***** Fonction de chargement des  Fournisseurs  dans la page d'enregistrement d'un bon de commande  ***\\

const chargement_fseur_BC = (id, indice) => {
  connection = db_connect();
  $query = "SELECT * FROM `fournisseur` ";

  connection.query($query, function (err, rows, fields) {
    if (err) {
      console.log("An error ocurred performing the query.");
      console.log(err);
      return;
    }

    let c = "";

    rows
      .map((elem) => {
        c +=
          '<option value="' +
          elem.id_fournisseur +
          '">' +
          elem.nom_fournisseur +
          "</option>";
      })
      .join();

    document.getElementById("fseur").innerHTML = c;

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
    //console.log("Query succesfully executed", rows[0].nom_fournisseur);
  });
  // Close the connection
  connection.end(function () {
    // The connection has been closed
  });
};

//***** Fonction  d'enregistrement d'un bon de commande  ***\\

const insertion_bon_cmd = (n, c) => {
  compteur = 0;

  sequelize
    .query(
      'INSERT INTO bomcommandes (date_boncmd,fournisseur_id,montant_boncmd,solde_boncmd,montant_regler,status) VALUES ("' +
        document.getElementById("date").value +
        '",' +
        document.getElementById("fseur").value +
        "," +
        document.getElementById("montant_total").value +
        "," +
        document.getElementById("montant_total").value +
        "," +
        0 +
        "," +
        0 +
        ")"
    )
    .then((BC) => {
      alert(
        "Commande enregistrée avec success vous le retrouverez dans la liste des Bon de Commandes ci dessous ."
      );

      for (var i = 1; i <= n; i++) {
        if (document.getElementById("montant" + i).value != 0) {
          sequelize
            .query(
              'INSERT INTO boncmd_article (boncmd_id,article_id,qteCmd,PU,conditionnement_id) VALUES ("' +
                BC[0] +
                '","' +
                document.getElementById("article" + i).value +
                '","' +
                document.getElementById("qte" + i).value +
                '","' +
                document.getElementById("pu" + i).value +
                '",' +
                document.getElementById("cdmnt" + i).value +
                ")"
            )
            .then((art_bc) => {
              compteur++;
              //alert(compteur+"-"+c)
              if (compteur == c) {
                window.location.reload();
              }
            })
            .catch((error) => {
              console.error("Failed to insert BonCmd_Article data : ", error);
            });
        }
      }
    })
    .catch((error) => {
      console.error("Failed to insert BomCommandes data : ", error);
    });
};

//***** Fonction de modification d'un bon de commande  ***\\

const update_bon_cmd = (id, n, c) => {
  date_bon = document.getElementById("date").value;

  if (date_bon == "") {
    date_bon = document.getElementById("date_a").value;
  }

  //alert(date_bon)

  sequelize
    .query(
      "UPDATE bomcommandes SET date_boncmd = :date_boncmd, fournisseur_id = :fourniseur_id , montant_boncmd = :montant_boncmd  , solde_boncmd = :solde_boncmd WHERE id_boncmd = :id_boncmd",
      {
        replacements: {
          date_boncmd: date_bon,
          fourniseur_id: document.getElementById("fseur").value,
          montant_boncmd: document.getElementById("montant_total").value,
          solde_boncmd: document.getElementById("montant_total").value,
          id_boncmd: id,
        },
        type: sequelize.QueryTypes.UPDATE,
      }
    )
    .then((BC) => {
      sequelize
        .query("DELETE FROM boncmd_article WHERE boncmd_id =" + id)
        .catch((error) => {
          console.error("Failed to DELETE boncmd_article data : ", error);
        });
      compteur = 0;
      for (var i = 1; i <= n; i++) {
        if (document.getElementById("montant" + i).value != 0) {
          //alert("article : "+ document.getElementById("article"+i).value+" , "+"conditionment : "+ document.getElementById("cdmnt"+i).value +" , "+"prix : "+ document.getElementById("pu"+i).value+" , "+"quantité : "+ document.getElementById("qte"+i).value )

          sequelize
            .query(
              'INSERT INTO boncmd_article (boncmd_id,article_id,qteCmd,PU,conditionnement_id) VALUES ("' +
                id +
                '","' +
                document.getElementById("article" + i).value +
                '","' +
                document.getElementById("qte" + i).value +
                '","' +
                document.getElementById("pu" + i).value +
                '",' +
                document.getElementById("cdmnt" + i).value +
                ")"
            )
            .then((art_bc) => {
              compteur++;
              //alert(compteur+"-"+c)
              if (compteur == c) {
                alert("Commande enregistrée avec success.");
                window.location.replace("voir-boncmd.html?id=" + id);
              }
            })
            .catch((error) => {
              console.error("Failed to insert BonCmd_Article data : ", error);
            });
        }
      }

      //setTimeout(,10000)
    })
    .catch((error) => {
      console.error("Failed to UPDATE bomcommandes data : ", error);
    });
};

//***** Fonction de suppression d'un bon de commande  ***\\

const delete_bon_cmd = (id) => {
  sequelize
    .query("DELETE FROM bomcommandes WHERE id_boncmd =" + id)
    .then((BC) => {
      alert("Commande Supprimée avec success.");
      window.location.reload();
    })
    .catch((error) => {
      console.error("Failed to DELETE BomCommandes data : ", error);
    });
};

//***** Fonction de chargement des bons de commandes ***\\

const afiche_BC = () => {
  let c = "";

  sequelize
    .query("SELECT * FROM `bomcommandes` ")
    .then((BC) => {
      //console.log(BC[0][1])
      BC[0].map((elem) => {
        sequelize
          .query("SELECT * FROM `fournisseur` WHERE id_fournisseur = ? ", {
            replacements: [elem.fournisseur_id],
            type: sequelize.QueryTypes.SELECT,
          })
          .then((fseur) => {
            document.getElementById("tab-boncmd").innerHTML +=
              "<tr>" +
              '<td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td><td>' +
              fseur[0].nom_fournisseur +
              "</td><td>" +
              elem.date_boncmd +
              "</td><td>" +
              elem.montant_boncmd +
              "</td>" +
              '<td><div class="btn-wrapper"><a href="voir-boncmd.html?id=' +
              elem.id_boncmd +
              '" type="button" class="btn btn-success text-white me-0" ></i>&nbsp; voir</a><button onclick="getBonCommandePdfToPrint(' +
              elem.id_boncmd +
              ')" type="button" class="btn btn-success text-white me-0" ></i>&nbsp; <i class="icon-printer"></i></button><button onclick=delete_bon(' +
              elem.id_boncmd +
              ") id=" +
              elem.id_boncmd +
              '"  class="btn btn-danger text-white me-0" ></i>&nbsp; Supprimer</button></td></tr>';
          })
          .catch((error) => {
            console.error("Failed to retrieve fournisseur data : ", error);
          });
      });
    })
    .catch((error) => {
      console.error("Failed to retrieve BomCommandes data : ", error);
    });
};

//***** Fonction de d'affichage des détailles d'un bon de commande***\\

const afiche_detaille_BC = (id) => {
  sequelize
    .query("SELECT * FROM `bomcommandes` WHERE id_boncmd = ? ", {
      replacements: [id],
      type: sequelize.QueryTypes.SELECT,
    })
    .then((BC) => {
      sequelize
        .query("SELECT * FROM `fournisseur` WHERE id_fournisseur = ? ", {
          replacements: [BC[0].fournisseur_id],
          type: sequelize.QueryTypes.SELECT,
        })
        .then((fseur) => {
          //console.log(fseur[0].nom_fournisseur)

          //alert(BC[0].date_boncmd)

          document.getElementById("fseur").value = fseur[0].nom_fournisseur;
          document.getElementById("date").value = BC[0].date_boncmd;
        })
        .catch((error) => {
          console.error("Failed to retrieve Fournisseur data : ", error);
        });

      sequelize
        .query(
          "SELECT * FROM `boncmd_article` , `articles` , `bomcommandes` , `conditionnements` WHERE conditionnements.id_condmnt = boncmd_article.conditionnement_id AND bomcommandes.id_boncmd = boncmd_article.boncmd_id  AND articles.id_article = boncmd_article.article_id AND bomcommandes.id_boncmd = " +
            id,
          {
            replacements: [],
            type: sequelize.QueryTypes.SELECT,
          }
        )
        .then((artcl) => {
          //console.log(artcl)

          n = 1;
          t = 0;
          artcl.map((elem) => {
            var table = document.getElementById("myTable");
            var row = table.insertRow(n);
            //alert(n)
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);

            cell1.innerHTML =
              '<div class="row"><div class="col-md-8" ><input  type="text" name="cli_lname" class="form-control" value="' +
              elem.libele_article +
              '" disabled></div><div class="col-md-4" ><input  type="text" name="cli_lname" class="form-control" value="' +
              elem.abreviation_condmnt +
              '" disabled></div></div>';
            cell2.innerHTML =
              '<input type="text" readonly class="form-control" require id="qte" value="' +
              elem.qteCmd +
              '">';
            cell3.innerHTML =
              '<input type="text" readonly class="form-control" require id="pu" value="' +
              elem.PU +
              '">';
            cell4.innerHTML =
              '<input type="text" readonly class="form-control" require value="' +
              elem.qteCmd * elem.PU +
              '">';

            n++;
            t += elem.qteCmd * elem.PU;
          });
          document.getElementById("montant_total").value = t;
        })
        .catch((error) => {
          console.error(
            "Failed to retrieve bomcommandes article conditionments data : ",
            error
          );
        })
        .catch((error) => {
          console.error("Failed to retrieve BomCommandes data : ", error);
        });

      //document.getElementById("tab-fseur").innerHTML = c;
    });
};

//***** Fonction de chargement de modification  des bons de commandes ***\\

const modif_BC = (id) => {
  sequelize
    .query("SELECT * FROM `fournisseur`")
    .then((fseurs) => {
      console.log(fseurs[0]);

      sequelize
        .query(
          "SELECT * FROM `fournisseur` , `bomcommandes`  WHERE fournisseur.id_fournisseur = bomcommandes.fournisseur_id AND bomcommandes.id_boncmd =" +
            id
        )
        .then((BC) => {
          console.log(BC[0][0].id_fournisseur);

          let c = "";
          fseurs[0].map((elem) => {
            if (elem.id_fournisseur == BC[0][0].id_fournisseur) {
              c +=
                '<option value="' +
                elem.id_fournisseur +
                '" selected>' +
                elem.nom_fournisseur +
                "</option>";
            } else {
              c +=
                '<option value="' +
                elem.id_fournisseur +
                '">' +
                elem.nom_fournisseur +
                "</option>";
            }
          });

          document.getElementById("fseur").innerHTML = c;
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
          //console.log("Query succesfully executed", rows[0].nom_fournisseur);

          document.getElementById("date_a").value = BC[0][0].date_boncmd;
        })
        .catch((error) => {
          console.error(
            "Failed to retrieve fournisseur BomCommandes data : ",
            error
          );
        });
    })
    .catch((error) => {
      console.error(
        "Failed to retrieve fournisseur BomCommandes data : ",
        error
      );
    });

  sequelize
    .query(
      "SELECT * FROM `boncmd_article` , `articles` , `bomcommandes` , `conditionnements` WHERE conditionnements.id_condmnt = boncmd_article.conditionnement_id AND bomcommandes.id_boncmd = boncmd_article.boncmd_id  AND articles.id_article = boncmd_article.article_id AND bomcommandes.id_boncmd = " +
        id,
      {
        replacements: [],
        type: sequelize.QueryTypes.SELECT,
      }
    )
    .then((artcl) => {
      //console.log(artcl)

      n = 0;
      t = 0;
      artcl.map((elem) => {
        sequelize.query("SELECT * FROM `articles` ").then((a) => {
          //alert(c+"aaaaa")
          sequelize
            .query(
              "SELECT * FROM `conditionnements` , `articles_condmnt` , `articles` WHERE conditionnements.id_condmnt = articles_condmnt.condmnt_id AND articles.id_article = articles_condmnt.article_id AND articles.id_article = " +
                elem.article_id
            )
            .then((cnd) => {
              c = "";

              n++;
              var table = document.getElementById("myTable");
              var row = table.insertRow(n);
              //alert(n)
              var cell1 = row.insertCell(0);
              var cell2 = row.insertCell(1);
              var cell3 = row.insertCell(2);
              var cell4 = row.insertCell(3);
              var cell5 = row.insertCell(4);

              a[0].map((e) => {
                if (e.id_article == elem.article_id) {
                  c +=
                    '<option value="' +
                    e.id_article +
                    '" selected="true">' +
                    e.libele_article +
                    "</option>";
                } else {
                  c +=
                    '<option value="' +
                    e.id_article +
                    '" >' +
                    e.libele_article +
                    "</option>";
                }
              });

              let cc = "";
              //console.log("enenenenenene"+cnd[0])

              cnd[0].map((ele) => {
                //alert(elem.conditionnement_id == ele.id_condmnt)

                if (elem.conditionnement_id == ele.id_condmnt) {
                  cc +=
                    '<option value="' +
                    ele.id_condmnt +
                    '" selected="true">' +
                    ele.abreviation_condmnt +
                    "</option>";
                } else {
                  cc +=
                    '<option value="' +
                    ele.id_condmnt +
                    '">' +
                    ele.abreviation_condmnt +
                    "</option>";
                }
              });

              //alert(c+"eeeeee")

              cell1.innerHTML =
                '<div class="row"><div class="col-md-8" ><select class="js-example-basic-single w-100" onchange=chargement_cdmnt(this) id="article' +
                n +
                '">' +
                c +
                '</select></div><div class="col-md-4" ><select class="js-example-basic-single w-100" id="cdmnt' +
                n +
                '">' +
                cc +
                "</select></div></div>";
              cell2.innerHTML =
                '<input type="number" min="0" class="form-control" require id="qte' +
                n +
                '" onchange=Montant(this) value=' +
                elem.qteCmd +
                ">";
              cell3.innerHTML =
                '<input type="number" min="0" class="form-control" require id="pu' +
                n +
                '" onchange=Montant(this) value=' +
                elem.PU +
                ">";
              cell4.innerHTML =
                '<input type="number" readonly class="form-control" require id="montant' +
                n +
                '" value=' +
                elem.qteCmd * elem.PU +
                ">";
              cell5.innerHTML =
                '<i title="Retirer" style="font-size: 25px" class="mdi mdi-minus-circle text-danger icon-remove" onclick="RemoveRow(this)" id="' +
                n +
                '"></i>';

              var js_ = document.createElement("script");
              js_.type = "text/javascript";
              js_.src = "../../vendors/select2/select2.min.js";
              document.body.appendChild(js_);
              var js = document.createElement("script");
              js.type = "text/javascript";
              js.src = "../../js/select2.js";
              document.body.appendChild(js);

              t += elem.qteCmd * elem.PU;
            })
            .catch((error) => {
              console.error(
                "Failed to retrieve BomCommandes Article conditionments data : ",
                error
              );
            });
        });
      });

      document.getElementById("montant_total").value = artcl[0].montant_boncmd;
    })
    .catch((error) => {
      console.error("Failed to retrieve BomCommandes data : ", error);
    });
};

///////-------SECTION Entrepots----------\\\\\\\\\

//***** Fonction de chargement des personnel pour la selection d'un magazinier ***\\

const chargement_mag = () => {
  let c = "";

  sequelize
    .query("SELECT * FROM `personnels` ")
    .then((P) => {
      //console.log(BC[0][1])

      P[0].map((elem) => {
        c +=
          '<option value="' +
          elem.id_personnel +
          '">' +
          elem.nom_personnel +
          "</option>";
      });

      document.getElementById("mag").innerHTML = c;
    })
    .catch((error) => {
      console.error("Failed to retrieve personnel data : ", error);
    });
};

//***** Fonction  d'enregistrement d'un entrepot  ***\\

const insertion_entrepot = () => {
  sequelize
    .query(
      'INSERT INTO entrepots (libele_entrepot,localisation_entrepot,magazinier) VALUES ("' +
        document.getElementById("nom").value +
        '","' +
        document.getElementById("loc").value +
        '",' +
        document.getElementById("mag").value +
        ")"
    )
    .then((entpr) => {
      sequelize
        .query("SELECT * FROM articles", {
          type: sequelize.QueryTypes.SELECT,
        })
        .then((articles) => {
          articles.map((elem) => {
            sequelize
              .query(
                "SELECT * FROM articles_condmnt  WHERE article_id = " +
                  elem.id_article,
                {
                  type: sequelize.QueryTypes.SELECT,
                }
              )
              .then((cond) => {
                cond.map((ele) => {
                  //alert(elem.libele_article)
                  //alert(ele.condmnt_id)

                  sequelize
                    .query(
                      "INSERT INTO entrepot_article (entrepot_id,article_id,condmnt_id,stock) VALUES (" +
                        entpr[0] +
                        "," +
                        elem.id_article +
                        "," +
                        ele.condmnt_id +
                        "," +
                        0 +
                        ")",

                      {
                        type: sequelize.QueryTypes.INSERT,
                      }
                    )
                    .then((ins) => {})
                    .catch((error) => {
                      console.error(
                        "Failed to insert in Entrepot_Article data : ",
                        error
                      );
                    });
                });
              })
              .catch((error) => {
                console.error(
                  "Failed to retrieve Conditionnements data : ",
                  error
                );
              });
          });
        })
        .catch((error) => {
          console.error("Failed to retrieve Article data : ", error);
        });

      sequelize
        .query("SELECT * FROM entrepots  WHERE id_entrepot = " + entpr[0], {
          type: sequelize.QueryTypes.SELECT,
        })
        .then((ent) => {
          let c = "";
          ent
            .map((e) => {
              c += "<tr>";
              c +=
                '<td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td><td>' +
                e.libele_entrepot +
                "</td><td>" +
                e.localisation_entrepot +
                "</td>";
              c +=
                '<td><div class="btn-wrapper"><a href="voir-entrepot.html?id=' +
                e.id_entrepot +
                '" type="button" class="btn btn-success text-white me-0" ></i>&nbsp; voir</a>&nbsp;&nbsp;<button  onclick = delete_entrepot(' +
                e.id_entrepot +
                ") id=" +
                e.id_entrepot +
                '  class="btn btn-danger text-white me-0" ></i>&nbsp; Supprimer</button></td>';
              c += "</tr>";
            })
            .join();

          document.getElementById("tab-entrepot").innerHTML += c;
          document.getElementById("message").innerHTML =
            '<strong style="color: green;">Enregistrement réussi. </strong>';
        })
        .catch((error) => {
          console.error("Failed to retrieve Conditionnements data : ", error);
        });
    })
    .catch((error) => {
      console.error("Failed to insert Entrepots data : ", error);
    });
};

//***** Fonction  d'afichage de la liste des  entrepots  ***\\

const liste_entrepot = () => {
  sequelize
    .query("SELECT * FROM entrepots ", {
      type: sequelize.QueryTypes.SELECT,
    })
    .then((ent) => {
      let c = "";
      ent
        .map((e) => {
          c += "<tr>";
          c +=
            '<td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td><td>' +
            e.libele_entrepot +
            "</td><td>" +
            e.localisation_entrepot +
            "</td>";
          c +=
            '<td><div class="btn-wrapper"><a href="voir-entrepot.html?id=' +
            e.id_entrepot +
            '" type="button" class="btn btn-success text-white me-0" ></i>&nbsp; voir</a>&nbsp;&nbsp;<button  onclick = delete_entrepot(' +
            e.id_entrepot +
            ") id=" +
            e.id_entrepot +
            '  class="btn btn-danger text-white me-0" ></i>&nbsp; Supprimer</button></td>';
          c += "</tr>";
        })
        .join();

      document.getElementById("tab-entrepot").innerHTML = c;
    })
    .catch((error) => {
      console.error("Failed to retrieve Conditionnements data : ", error);
    });
};

//***** Fonction de chargement des détaille de l'entrepot ***\\

const detail_entrepot = (id) => {
  connection = db_connect();
  // Perform a query

  $query =
    "SELECT * FROM `entrepots` , `personnels` WHERE entrepots.magazinier = personnels.id_personnel AND  entrepots.id_entrepot=" +
    id;

  connection.query($query, function (err, rows, fields) {
    if (err) {
      console.log("An error ocurred performing the query.");
      console.log(err);
      return;
    }

    console.log(id);

    document.getElementById("info").innerHTML =
      '<!--img class="rounded-circle mx-auto d-block" src="../../images/faces/face1.jpg" alt="Card image cap" style="width: 20%;"--><h2 class="text-sm-center mt-2 mb-1"><strong >' +
      rows[0].libele_entrepot +
      '</strong></h2><div class="location text-sm-center"><i class="fa fa-map-marker"></i><spam >' +
      rows[0].localisation_entrepot +
      '</spam>, <spam id="">' +
      rows[0].nom_personnel +
      "</spam> </div>";
    document.getElementById("info").innerHTML +=
      '<input type="text" name="" id="id" hidden="true" value="' +
      rows[0].id_entrepot +
      '"><input type="text" name="" id="nom-entrepot" hidden="true" value="' +
      rows[0].libele_entrepot +
      '"><input type="text" name="" id="loc-entrepot" hidden="true" value="' +
      rows[0].localisation_entrepot +
      '"><input type="text" name="" id="id-personnel" hidden="true" value="' +
      rows[0].id_personnel +
      '">';
  });

  // Close the connection
  connection.end(function () {
    // The connection has been closed
  });

  // sequelize.query(
  // 			'SELECT * FROM  `Articles`  ',
  // 			{
  // 				type: sequelize.QueryTypes.SELECT
  // 			}
  // 			).then(artcl => {

  // 						console.log(artcl)

  // 				    artcl.map((elem) => {

  // 				    			sequelize.query(

  // 										'SELECT * FROM  `Entrepots`, `Entrepot_Article` , `Articles` , `Conditionnements` WHERE  Entrepots.id_entrepot = Entrepot_Article.entrepot_id  AND Conditionnements.id_condmnt = Entrepot_Article.condmnt_id  AND Articles.id_article = Entrepot_Article.article_id AND Entrepots.id_entrepot = ' + GET('id')+ ' AND Articles.id_article = ' + elem.id_article,

  // 									{
  // 										type: sequelize.QueryTypes.SELECT
  // 									}
  // 									).then(a => {

  // 												//console.log(artcl)
  // 											let c="";
  // 								            c+="<tr>";
  // 											c+='<td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td><td>'+elem.libele_article+'</td><td><select class="js-example-basic-single w-100"  onchange=chargement_qte(this,'+elem.id_article+')>'

  // 											let st
  // 											nn = 0
  // 										    a.map((e) => {

  // 										    	c+='<option value="'+e.condmnt_id+'" >'+e.abreviation_condmnt+'</option>';

  // 										    		if ( nn == 0 ) {

  // 										    			st = e.stock
  // 										    			nn++
  // 										    		}

  // 										    }).join();

  // 										    c+='</select></td><td><input type="number" class="form-control" name="" id="'+elem.id_article+'" readonly value="'+st+'"></td><td><div class="btn-wrapper"><a href="voir-article-stock.html?id_a='+elem.id_article+'&id_e='+GET('id')+'" type="button" class="btn btn-success text-white me-0" ></i>&nbsp; Mouvement</a></td>'
  // 											 c+="</tr>"

  // 										    document.getElementById("tab-article").innerHTML += c;

  // 										    var js_ = document.createElement('script');
  // 											js_.type='text/javascript';
  // 											js_.src = '../../vendors/select2/select2.min.js';
  // 											document.body.appendChild(js_)
  // 											var js = document.createElement('script');
  // 											js.type='text/javascript';
  // 											js.src = '../../js/select2.js';
  // 											document.body.appendChild(js)

  // 								}).catch((error) => {console.error('Failed to retrieve `Entrepots`, `Entrepot_Article` , `Articles` , `Conditionnements` data : ', error);});

  // 				    })

  // 		}).catch((error) => {console.error('Failed to retrieve `Entrepots`, `Entrepot_Article` , `Articles` , `Conditionnements` data : ', error);});
};

//***** Fonction de chargement des détaille de l'entrepot ***\\

const detail_entrepot_article = (id) => {
  connection = db_connect();
  // Perform a query

  $query =
    "SELECT * FROM `entrepots` , `personnels` WHERE entrepots.magazinier = personnels.id_personnel AND  entrepots.id_entrepot=" +
    id;

  connection.query($query, function (err, rows, fields) {
    if (err) {
      console.log("An error ocurred performing the query.");
      console.log(err);
      return;
    }

    console.log(id);

    document.getElementById("info").innerHTML =
      '<!--img class="rounded-circle mx-auto d-block" src="../../images/faces/face1.jpg" alt="Card image cap" style="width: 20%;"--><h2 class="text-sm-center mt-2 mb-1"><strong >' +
      rows[0].libele_entrepot +
      '</strong></h2><div class="location text-sm-center"><i class="fa fa-map-marker"></i><spam >' +
      rows[0].localisation_entrepot +
      '</spam>, <spam id="">' +
      rows[0].nom_personnel +
      "</spam> </div>";
    document.getElementById("info").innerHTML +=
      '<input type="text" name="" id="id" hidden="true" value="' +
      rows[0].id_entrepot +
      '"><input type="text" name="" id="nom-entrepot" hidden="true" value="' +
      rows[0].libele_entrepot +
      '"><input type="text" name="" id="loc-entrepot" hidden="true" value="' +
      rows[0].localisation_entrepot +
      '"><input type="text" name="" id="id-personnel" hidden="true" value="' +
      rows[0].id_personnel +
      '">';
  });

  // Close the connection
  connection.end(function () {
    // The connection has been closed
  });
};

//***** Fonction de chargement des détaille de l'entrepot dans la section mouvements ***\\

const detail_entrepot_mvnt = (param) => {
  if (param == "S") {
    sequelize
      .query(
        "SELECT * FROM  `entrepots`, `entrepot_article` , `articles` , `conditionnements` WHERE  entrepots.id_entrepot = entrepot_article.entrepot_id  AND conditionnements.id_condmnt = entrepot_article.condmnt_id  AND articles.id_article = entrepot_article.article_id AND entrepots.id_entrepot = " +
          GET("id_e") +
          " AND articles.id_article = " +
          GET("id_a"),

        {
          type: sequelize.QueryTypes.SELECT,
        }
      )
      .then((a) => {
        //console.log(a)

        var S =
          " <div class='card'><div class='card-header'><h4>Etats des Mouvements " +
          '"" ' +
          a[0].libele_article +
          ' ""' +
          "</h4> </div><div class='card-body'><ul class='nav nav-pills mb-3' id='pills-tab' role='tablist'><li class='nav-item'><button class='nav-link active' id='pills-contact-tab' data-toggle='pill' href='#pills-contact' role='tab' aria-controls='pills-contact' aria-selected='false' onclick=Etats_echanges('S')>Srocks</button></li><li class='nav-item'><button class='nav-link ' id='pills-home-tab' data-toggle='pill' href='#pills-home' role='tab' aria-controls='pills-home' aria-selected='true' onclick=Etats_echanges('E')>Entrées en stock</button></li><li class='nav-item'><button class='nav-link' id='pills-profile-tab' data-toggle='pill' href='#pills-profile' role='tab' aria-controls='pills-profile' aria-selected='false' onclick=Etats_echanges('SRT')>Sorties</button></li></ul> <h4 class='card-title'>Quantité en stock par conditionnement </h4>";

        S += '<table class="table table-striped" style="width: 50%"><thead>';
        S +=
          '<tr><th>.</th><th style="">Conditionnements</th><th style="width: 10%">Quantité en stock</th></tr>';
        S += '</thead><tbody id="tab-article">';

        a.map((e) => {
          S += "<tr>";

          S +=
            '<td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td>';
          S +=
            "<td>" +
            e.abreviation_condmnt +
            '</td><td><input type="number" class="form-control"  readonly value="' +
            e.stock +
            '"></td>';
          S += "</tr>";
        }).join();

        S += "<tr>";

        S +=
          '<td class="py-1"><button onclick=modif_st() class=" btn btn-warning text-white me-0" id="pills-contact-tab" data-toggle="pill" role="tab" aria-controls="pills-contact" aria-selected="false" ><i class="mdi mdi-pencil"></i>Modifier</button></td>';
        S += "<td></td>";
        S += "</tr>";

        S += "</tbody></table></div></div>";
        document.getElementById("etats_ech").innerHTML = S;
      })
      .catch((error) => {
        console.error(
          "Failed to retrieve `Entrepots`, `Entrepot_Article` , `Articles` , `Conditionnements` data : ",
          error
        );
      });
  }
  if (param == "E") {
    sequelize
      .query(
        "SELECT * FROM  `bonreceptions`, `bonreception_article` , `articles` , `conditionnements` WHERE  bonreceptions.id_bonreception = bonreception_article.bonreception_id  AND conditionnements.id_condmnt = bonreception_article.conditionnement_id  AND articles.id_article = bonreception_article.article_id AND articles.id_article = " +
          GET("id_a") +
          " AND bonreceptions.entrepot_id = " +
          GET("id_e") +
          " ORDER BY bonreceptions.date_reception ASC",

        {
          type: sequelize.QueryTypes.SELECT,
        }
      )
      .then((BR) => {
        console.log(BR);
        a = " ";
        if (BR[0] != null) a = BR[0].libele_article;
        var E =
          " <div class='card'><div class='card-header'><h4>Etats des Mouvements " +
          '"" ' +
          a +
          ' ""' +
          "</h4> </div><div class='card-body'><ul class='nav nav-pills mb-3' id='pills-tab' role='tablist'><li class='nav-item'><button class='nav-link ' id='pills-contact-tab' data-toggle='pill' href='#pills-contact' role='tab' aria-controls='pills-contact' aria-selected='false' onclick=Etats_echanges('S')>Srocks</button></li><li class='nav-item'><button class='nav-link active' id='pills-home-tab' data-toggle='pill' href='#pills-home' role='tab' aria-controls='pills-home' aria-selected='true' onclick=Etats_echanges('E')>Entrées en stock</button></li><li class='nav-item'><button class='nav-link' id='pills-profile-tab' data-toggle='pill' href='#pills-profile' role='tab' aria-controls='pills-profile' aria-selected='false' onclick=Etats_echanges('SRT')>Sorties</button></li></ul>  <h4 class='card-title'>Liste des Entrées en stock</h4>";

        //let E = " <div class='card'><div class='card-header'><h4>Etats des Mouvements "+'"" '+BR[0].libele_article+' ""'+"</h4> </div><div class='card-body'><ul class='nav nav-pills mb-3' id='pills-tab' role='tablist'><li class='nav-item'><button class='nav-link active' id='pills-contact-tab' data-toggle='pill' href='#pills-contact' role='tab' aria-controls='pills-contact' aria-selected='false' onclick=Etats_echanges('S')>Srocks</button></li><li class='nav-item'><button class='nav-link ' id='pills-home-tab' data-toggle='pill' href='#pills-home' role='tab' aria-controls='pills-home' aria-selected='true' onclick=Etats_echanges('E')>Entrées en stock</button></li><li class='nav-item'><button class='nav-link' id='pills-profile-tab' data-toggle='pill' href='#pills-profile' role='tab' aria-controls='pills-profile' aria-selected='false' onclick=Etats_echanges('SRT')>Sorties</button></li></ul> <h4 class='card-title'>Liste des Entrées en stock</h4>"

        E += '<table class="table table-striped" style=""><thead>';
        E +=
          '<tr><th>.</th><th style="">Date</th><th style="">Article</th><th style="">Conditionnement</th><th style="width: 10%">Quantité Reçue</th><th style="">Provenance</th></tr>';
        E += '</thead><tbody id="tab">';
        E += "</tbody></table></div></div>";
        document.getElementById("etats_ech").innerHTML = E;

        BR.map((e) => {
          sequelize
            .query(
              "SELECT * FROM bomcommandes , fournisseur WHERE  bomcommandes.fournisseur_id = fournisseur.id_fournisseur AND id_boncmd = " +
                e.boncmd_id,
              {
                type: sequelize.QueryTypes.SELECT,
              }
            )
            .then((BC) => {
              //console.log(BC[0].nom_fournisseur)

              E = "<tr>";

              E +=
                '<td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td>';
              E += '<td class="py-1">' + e.date_reception + "</td>";
              E += '<td class="py-1">' + e.libele_article + "</td>";
              E +=
                "<td>" +
                e.abreviation_condmnt +
                '</td><td><input type="number" class="form-control"  readonly value="' +
                e.qteReçu +
                '"></td>';

              E += '<td class="py-1">' + BC[0].nom_fournisseur + "</td></tr>";

              E += "</tr>";

              document.getElementById("tab").innerHTML += E;
            })
            .catch((error) => {
              console.error(
                "Failed to retrieve Conditionnements data : ",
                error
              );
            });
        }).join();
      })
      .catch((error) => {
        console.error(
          "Failed to retrieve `BonReceptions`, `BonReception_Article` , `Articles` , `Conditionnements` data : ",
          error
        );
      });
  }
  if (param == "SRT") {
    sequelize
      .query(
        "SELECT * FROM  `bonsortie`, `bonsortie_article` , `articles` , `conditionnements` WHERE  bonsortie.id_bonsortie= bonsortie_article.bonsortie_id  AND conditionnements.id_condmnt = bonsortie_article.conditionnement_id  AND articles.id_article = bonsortie_article.article_id AND articles.id_article = " +
          GET("id_a") +
          " AND bonsortie.provenance = " +
          GET("id_e") +
          " ORDER BY bonsortie.date_bonsortie ASC",

        {
          type: sequelize.QueryTypes.SELECT,
        }
      )
      .then((BS) => {
        console.log(BS);
        a = " ";
        if (BS[0] != null) a = BS[0].libele_article;
        var SRT =
          " <div class='card'><div class='card-header'><h4>Etats des Mouvements " +
          '"" ' +
          a +
          ' ""' +
          "</h4> </div><div class='card-body'><ul class='nav nav-pills mb-3' id='pills-tab' role='tablist'><li class='nav-item'><button class='nav-link ' id='pills-contact-tab' data-toggle='pill' href='#pills-contact' role='tab' aria-controls='pills-contact' aria-selected='false' onclick=Etats_echanges('S')>Srocks</button></li><li class='nav-item'><button class='nav-link ' id='pills-home-tab' data-toggle='pill' href='#pills-home' role='tab' aria-controls='pills-home' aria-selected='true' onclick=Etats_echanges('E')>Entrées en stock</button></li><li class='nav-item'><button class='nav-link active' id='pills-profile-tab' data-toggle='pill' href='#pills-profile' role='tab' aria-controls='pills-profile' aria-selected='false' onclick=Etats_echanges('SRT')>Sorties</button></li></ul> <h4 class='card-title'>Sorties</h4>";

        //let E = " <div class='card'><div class='card-header'><h4>Etats des Mouvements "+'"" '+BR[0].libele_article+' ""'+"</h4> </div><div class='card-body'><ul class='nav nav-pills mb-3' id='pills-tab' role='tablist'><li class='nav-item'><button class='nav-link active' id='pills-contact-tab' data-toggle='pill' href='#pills-contact' role='tab' aria-controls='pills-contact' aria-selected='false' onclick=Etats_echanges('S')>Srocks</button></li><li class='nav-item'><button class='nav-link ' id='pills-home-tab' data-toggle='pill' href='#pills-home' role='tab' aria-controls='pills-home' aria-selected='true' onclick=Etats_echanges('E')>Entrées en stock</button></li><li class='nav-item'><button class='nav-link' id='pills-profile-tab' data-toggle='pill' href='#pills-profile' role='tab' aria-controls='pills-profile' aria-selected='false' onclick=Etats_echanges('SRT')>Sorties</button></li></ul> <h4 class='card-title'>Liste des Entrées en stock</h4>"

        SRT += '<table class="table table-striped" style=""><thead>';
        SRT +=
          '<tr><th>.</th><th style="">Date</th><th style="">Article</th><th style="">Conditionnement</th><th style="width: 10%">Quantité Sortie</th><th style="">Destination</th></tr>';
        SRT += '</thead><tbody id="tab">';
        SRT += "</tbody></table></div></div>";
        document.getElementById("etats_ech").innerHTML = SRT;

        BS.map((e) => {
          //console.log(e.nom_client != )

          if (e.nom_client !== null) {
            SRT = "<tr>";

            SRT +=
              '<td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td>';
            SRT += '<td class="py-1">' + e.date_bonsortie + "</td>";
            SRT += '<td class="py-1">' + e.libele_article + "</td>";
            SRT +=
              "<td>" +
              e.abreviation_condmnt +
              '</td><td><input type="number" class="form-control"  readonly value="' +
              e.qteSortie +
              '"></td>';

            SRT += '<td class="py-1">' + e.nom_client + "</td></tr>";

            SRT += "</tr>";

            document.getElementById("tab").innerHTML += SRT;
          } else {
            if (e.client_id !== null) {
              //console.log(e.client_id)

              sequelize
                .query(
                  "SELECT * FROM clients WHERE  id_client = " + e.client_id,
                  {
                    type: sequelize.QueryTypes.SELECT,
                  }
                )
                .then((Client) => {
                  SRT = "<tr>";

                  SRT +=
                    '<td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td>';
                  SRT += '<td class="py-1">' + e.date_bonsortie + "</td>";
                  SRT += '<td class="py-1">' + e.libele_article + "</td>";
                  SRT +=
                    "<td>" +
                    e.abreviation_condmnt +
                    '</td><td><input type="number" class="form-control"  readonly value="' +
                    e.qteSortie +
                    '"></td>';

                  SRT +=
                    '<td class="py-1">' + Client[0].nom_client + "</td></tr>";

                  SRT += "</tr>";

                  document.getElementById("tab").innerHTML += SRT;
                })
                .catch((error) => {
                  console.error(
                    "Failed to retrieve Conditionnements data : ",
                    error
                  );
                });
            } else {
              sequelize
                .query(
                  "SELECT * FROM entrepots WHERE  id_entrepot = " +
                    e.destination,
                  {
                    type: sequelize.QueryTypes.SELECT,
                  }
                )
                .then((d) => {
                  SRT = "<tr>";

                  SRT +=
                    '<td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td>';
                  SRT += '<td class="py-1">' + e.date_bonsortie + "</td>";
                  SRT += '<td class="py-1">' + e.libele_article + "</td>";
                  SRT +=
                    "<td>" +
                    e.abreviation_condmnt +
                    '</td><td><input type="number" class="form-control"  readonly value="' +
                    e.qteSortie +
                    '"></td>';

                  SRT +=
                    '<td class="py-1">' + d[0].libele_entrepot + "</td></tr>";

                  SRT += "</tr>";

                  document.getElementById("tab").innerHTML += SRT;
                })
                .catch((error) => {
                  console.error(
                    "Failed to retrieve Conditionnements data : ",
                    error
                  );
                });
            }
          }
          //  		sequelize.query(

          // 			'SELECT * FROM BomCommandes , Fournisseur WHERE  BomCommandes.fournisseur_id = Fournisseur.id_fournisseur AND id_boncmd = ' + e.boncmd_id,
          // 		{
          // 			type: sequelize.QueryTypes.SELECT
          // 		}
          // 	).then(BC => {

          // 		//console.log(BC[0].nom_fournisseur)

          // 		SRT+='<td class="py-1">'+BC[0].nom_fournisseur+'</td></tr>'

          // 	}).catch((error) => {

          // console.error('Failed to retrieve Conditionnements data : ', error);});
        }).join();
      })
      .catch((error) => {
        console.error(
          "Failed to retrieve `BonSortie`, `BonSortie_Article` , `Articles` , `Conditionnements` data : ",
          error
        );
      });
  }
};

//***** Fonction de chargement des détaille de stock pour modification ***\\

const modif_stock = () => {
  sequelize
    .query(
      "SELECT * FROM  `entrepots`, `entrepot_article` , `articles` , `conditionnements` WHERE  entrepots.id_entrepot = entrepot_article.entrepot_id  AND conditionnements.id_condmnt = entrepot_article.condmnt_id  AND articles.id_article = entrepot_article.article_id AND entrepots.id_entrepot = " +
        GET("id_e") +
        " AND articles.id_article = " +
        GET("id_a"),

      {
        type: sequelize.QueryTypes.SELECT,
      }
    )
    .then((a) => {
      //console.log(a)

      var S =
        " <div class='card'><div class='card-header'><h4>Etats des Mouvements " +
        '"" ' +
        a[0].libele_article +
        ' ""' +
        "</h4> </div><div class='card-body'><ul class='nav nav-pills mb-3' id='pills-tab' role='tablist'><li class='nav-item'><button class='nav-link active' id='pills-contact-tab' data-toggle='pill' href='#pills-contact' role='tab' aria-controls='pills-contact' aria-selected='false' onclick=Etats_echanges('S')>Srocks</button></li><li class='nav-item'><button class='nav-link ' id='pills-home-tab' data-toggle='pill' href='#pills-home' role='tab' aria-controls='pills-home' aria-selected='true' onclick=Etats_echanges('E')>Entrées en stock</button></li><li class='nav-item'><button class='nav-link' id='pills-profile-tab' data-toggle='pill' href='#pills-profile' role='tab' aria-controls='pills-profile' aria-selected='false' onclick=Etats_echanges('SRT')>Sorties</button></li></ul> <h4 class='card-title'>Quantité en stock par conditionnement </h4>";

      S +=
        '<table class="table table-striped" style="width: 50%" id="tab"><thead>';
      S +=
        '<tr><th>.</th><th style="">Conditionnements</th><th style="width: 10%">Quantité en stock</th></tr>';
      S += '</thead><tbody id="tab-article">';

      i = 1;

      a.map((e) => {
        S += "<tr>";

        S +=
          '<td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td>';
        S +=
          '<td><input hidden type="number" class="form-control"   id="cdmnt' +
          i +
          '" value="' +
          e.id_condmnt +
          '">' +
          e.abreviation_condmnt +
          '</td><td><input type="number" class="form-control"   id="st' +
          i +
          '" value="' +
          e.stock +
          '"></td>';
        S += "</tr>";

        i++;
      }).join();

      S += "<tr>";

      S +=
        '<td class="py-1"><button onclick=enreg_modif_st() class=" btn btn-primary text-white me-0" id="pills-contact-tab" data-toggle="pill" role="tab" aria-controls="pills-contact" aria-selected="false" >Enregistrer</button><button onclick=Annuler() class=" btn btn-danger text-white me-0" id="pills-contact-tab" data-toggle="pill" role="tab" aria-controls="pills-contact" aria-selected="false" >Annuler</button></td>';
      S += "<td></td>";
      S += "</tr>";

      S += "</tbody></table></div></div>";
      document.getElementById("etats_ech").innerHTML = S;
    })
    .catch((error) => {
      console.error(
        "Failed to retrieve `Entrepots`, `Entrepot_Article` , `Articles` , `Conditionnements` data : ",
        error
      );
    });
};

//***** Fonction de modification de stock  ***\\

const enreg_modif_stock = () => {
  for (var i = 1; i <= document.getElementById("tab").rows.length - 2; i++) {
    //alert(document.getElementById("cdmnt"+i).value + " - " + document.getElementById("st"+i).value)

    d = 0;

    sequelize
      .query(
        "UPDATE entrepot_article SET stock = :Stock WHERE entrepot_id = :id_entrepot AND article_id = :id_article AND condmnt_id = :id_condmnt  ",
        {
          replacements: {
            Stock: document.getElementById("st" + i).value,
            id_entrepot: GET("id_e"),
            id_article: GET("id_a"),
            id_condmnt: document.getElementById("cdmnt" + i).value,
          },
          type: sequelize.QueryTypes.UPDATE,
        }
      )
      .then((BC) => {
        d++;

        if (d == document.getElementById("tab").rows.length - 2) {
          detail_entrepot_mvnt("S");
        }
      })
      .catch((error) => {
        console.error("Failed to update entrepot_Article data : ", error);
      });
  }
};
//***** Fonction de chargement des détaille de l'entrepot pour modification ***\\

const modif_entrepot = () => {
  sequelize
    .query("SELECT * FROM  `personnels` ", {
      type: sequelize.QueryTypes.SELECT,
    })
    .then((pers) => {
      let c =
        '<div class="row"><div class="col-md-5"><div class="form-group row"><label class="col-sm-2 col-form-label">Nom</label><div class="col-sm-9"><input type="text" name="cli_name" id="nom" class="form-control" value="' +
        document.getElementById("nom-entrepot").value +
        '" /></div></div></div><div class="col-md-3"><div class="form-group row"><label class="col-sm-4 col-form-label">location</label><div class="col-sm-8"><input type="text" value="' +
        document.getElementById("loc-entrepot").value +
        '" name="cli_phone" id="loc" class="form-control" /></div></div></div><div class="col-md-3"><div class="form-group row"><label class="col-sm-3 col-form-label">Magazinier</label><div class="col-sm-9"><select class="js-example-basic-single w-100" id="mag">';

      pers
        .map((e) => {
          if (e.id_personnel == document.getElementById("id-personnel").value) {
            c +=
              '<option value="' +
              e.id_personnel +
              '" selected="true">' +
              e.nom_personnel +
              "</option>";
          } else {
            c +=
              '<option value="' +
              e.id_personnel +
              '" >' +
              e.nom_personnel +
              "</option>";
          }
        })
        .join();

      c +=
        '</select></div></div></div></div><div class="row"><div class="col-md-9"><div class="form-group row"><div class="col-sm-9" id="message"></div></div></div><div class="col-md-3"><div class="col-sm-9" id="message"></div><button onclick=update_entrepot("V") type="submit" class="btn btn-primary text-white me-2">Valider</button><button onclick=update_entrepot("A") class="btn btn-light">Annuler</button></div></div>';

      document.getElementById("modif-div").innerHTML = c;
    })
    .catch((error) => {
      console.error("Failed to retrieve personnel data : ", error);
    });
};

//***** Fonction  d'afichage de la quantité au changement du conditionnement  ***\\

const chr_qte = (id_c, id_a) => {
  sequelize
    .query(
      "SELECT * FROM entrepot_article WHERE article_id = " +
        id_a +
        " AND condmnt_id = " +
        id_c.value +
        " AND entrepot_id = " +
        GET("id"),
      {
        type: sequelize.QueryTypes.SELECT,
      }
    )
    .then((st) => {
      document.getElementById(id_a).value = st[0].stock;
    })
    .catch((error) => {
      console.error("Failed to retrieve Entrepot_Article data : ", error);
    });
};

//***** Fonction  de modification d'un entrepot  ***\\

const update_entrepot = (id) => {
  sequelize
    .query(
      "UPDATE entrepots SET libele_entrepot = '" +
        document.getElementById("nom").value +
        "', localisation_entrepot = '" +
        document.getElementById("loc").value +
        "', magazinier = " +
        document.getElementById("mag").value +
        " WHERE id_entrepot = " +
        id
    )
    .then((entpr) => {
      //detail_entrepot();

      document.getElementById("modif-div").innerHTML =
        '<button onclick="modif_entrepot()" class="btn btn-success text-white me-0" data-toggle="modal" data-target="#largeModal">Modifier</button>';
      window.location.reload();
    })
    .catch((error) => {
      console.error("Failed to update Entrepots data : ", error);
    });
};

//***** Fonction de chargement des  entrepots  dans la page d'enregistrement d'un bon de Sotie  ***\\

const chargement_entrepot_BS = (id, indice) => {
  connection = db_connect();
  $query = "SELECT * FROM `entrepots` ";

  connection.query($query, function (err, rows, fields) {
    if (err) {
      console.log("An error ocurred performing the query.");
      console.log(err);
      return;
    }

    let c = "";

    rows
      .map((elem) => {
        c +=
          '<option value="' +
          elem.id_entrepot +
          '">' +
          elem.libele_entrepot +
          "</option>";
      })
      .join();

    document.getElementById("entrepot_des").innerHTML += c;
    document.getElementById("entrepot_pr").innerHTML += c;

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
    //console.log("Query succesfully executed", rows[0].nom_fournisseur);
  });

  $query = "SELECT * FROM `clients` ";

  connection.query($query, function (err, rows, fields) {
    if (err) {
      console.log("An error ocurred performing the query.");
      console.log(err);
      return;
    }

    let c = "";

    rows
      .map((elem) => {
        c +=
          '<option value="' +
          elem.id_client +
          '">' +
          elem.nom_client +
          "</option>";
      })
      .join();

    document.getElementById("client_des").innerHTML += c;

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
    //console.log("Query succesfully executed", rows[0].nom_fournisseur);
  });
  // Close the connection
  connection.end(function () {
    // The connection has been closed
  });
};

//***** Fonction de chargement des  entrepots  dans la page d'enregistrement d'un bon de Sotie section modification d'un bon de sortie  ***\\

const chargement_entrepot_BS_modif = () => {
  //alert(GET('id'))

  sequelize
    .query("SELECT * FROM `entrepots`", {
      type: sequelize.QueryTypes.SELECT,
    })
    .then((entr) => {
      //console.log(entr[0])

      sequelize
        .query(
          "SELECT * FROM `bonsortie`  WHERE bonsortie.id_bonsortie =" +
            GET("id"),
          {
            type: sequelize.QueryTypes.SELECT,
          }
        )
        .then((BS) => {
          //console.log(BS[0][0].id_fournisseur)

          document.getElementById("date_sortie_a").value = BS[0].date_bonsortie;

          let c = "";
          let cc = "";
          entr.map((elem) => {
            if (elem.id_entrepot == BS[0].provenance) {
              c +=
                '<option value="' +
                elem.id_entrepot +
                '" selected>' +
                elem.libele_entrepot +
                "</option>";
            } else {
              c +=
                '<option value="' +
                elem.id_entrepot +
                '">' +
                elem.libele_entrepot +
                "</option>";
            }

            if (BS[0].destination !== null) {
              if (elem.id_entrepot == BS[0].destination) {
                cc +=
                  '<option value="' +
                  elem.id_entrepot +
                  '" selected>' +
                  elem.libele_entrepot +
                  "</option>";
              } else {
                cc +=
                  '<option value="' +
                  elem.id_entrepot +
                  '">' +
                  elem.libele_entrepot +
                  "</option>";
              }
            } else {
              cc +=
                '<option value="' +
                elem.id_entrepot +
                '">' +
                elem.libele_entrepot +
                "</option>";
            }
          });

          document.getElementById("entrepot_des").innerHTML += cc;

          document.getElementById("entrepot_pr").innerHTML += c;

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
          //console.log("Query succesfully executed", rows[0].nom_fournisseur);
        })
        .catch((error) => {
          console.error("Failed to retrieve BonSortie data : ", error);
        });
    })
    .catch((error) => {
      console.error("Failed to retrieve Entrepots  data : ", error);
    });

  sequelize
    .query("SELECT * FROM `clients` ", {
      type: sequelize.QueryTypes.SELECT,
    })
    .then((cl) => {
      //console.log(entr[0])

      sequelize
        .query(
          "SELECT * FROM `bonsortie`  WHERE bonsortie.id_bonsortie =" +
            GET("id"),
          {
            type: sequelize.QueryTypes.SELECT,
          }
        )
        .then((BS) => {
          //console.log(BS[0][0].id_fournisseur)

          let c = "";

          cl.map((elem) => {
            if (BS[0].client_id !== null) {
              if (elem.id_client == BS[0].client_id) {
                c +=
                  '<option value="' +
                  elem.id_client +
                  '" selected>' +
                  elem.nom_client +
                  "</option>";
              } else {
                c +=
                  '<option value="' +
                  elem.id_client +
                  '" >' +
                  elem.nom_client +
                  "</option>";
              }
            } else {
              c +=
                '<option value="' +
                elem.id_entrepot +
                '">' +
                elem.libele_entrepot +
                "</option>";

              if (BS[0].destination === null) {
                document.getElementById("nom_client").value = BS[0].nom_client;
              }
            }
          });

          document.getElementById("client_des").innerHTML += c;

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
          //console.log("Query succesfully executed", rows[0].nom_fournisseur);
        })
        .catch((error) => {
          console.error("Failed to retrieve BonSortie data : ", error);
        });
    })
    .catch((error) => {
      console.error("Failed to retrieve Clients  data : ", error);
    });

  sequelize
    .query(
      "SELECT * FROM `bonsortie_article` , `articles` , `bonsortie` , `conditionnements` WHERE conditionnements.id_condmnt = bonsortie_article.conditionnement_id AND bonsortie.id_bonsortie = bonsortie_article.bonsortie_id  AND articles.id_article = bonsortie_article.article_id AND bonsortie.id_bonsortie = " +
        GET("id"),
      {
        replacements: [],
        type: sequelize.QueryTypes.SELECT,
      }
    )
    .then((artcl) => {
      //console.log(artcl)

      n = 0;

      artcl.map((elem) => {
        //alert("aaaaa")

        sequelize.query("SELECT * FROM `articles` ").then((a) => {
          sequelize
            .query(
              "SELECT * FROM `conditionnements` , `articles_condmnt` , `articles` WHERE conditionnements.id_condmnt = articles_condmnt.condmnt_id AND articles.id_article = articles_condmnt.article_id AND articles.id_article = " +
                elem.article_id
            )
            .then((cnd) => {
              id_c = "";
              id_a = "";

              a[0].map((e) => {
                if (e.id_article == elem.article_id) {
                  id_a = e.id_article;
                }
              });

              cnd[0].map((ele) => {
                if (elem.conditionnement_id == ele.id_condmnt) {
                  id_c = ele.id_condmnt;
                }
              });

              sequelize
                .query(
                  "SELECT * FROM  `entrepots`, `entrepot_article` , `articles` , `conditionnements` WHERE  entrepots.id_entrepot = entrepot_article.entrepot_id  AND conditionnements.id_condmnt = entrepot_article.condmnt_id  AND articles.id_article = entrepot_article.article_id AND entrepots.id_entrepot = " +
                    elem.provenance +
                    " AND articles.id_article = " +
                    id_a +
                    " AND conditionnements.id_condmnt = " +
                    id_c,
                  {
                    type: sequelize.QueryTypes.SELECT,
                  }
                )
                .then((art) => {
                  c = "";
                  let cc = "";
                  a[0].map((e) => {
                    if (e.id_article == elem.article_id) {
                      //alert(e.libele_article)

                      c +=
                        '<option value="' +
                        e.id_article +
                        '" selected="true">' +
                        e.libele_article +
                        "</option>";
                      id_a = e.id_article;
                    } else {
                      c +=
                        '<option value="' +
                        e.id_article +
                        '" >' +
                        e.libele_article +
                        "</option>";
                    }
                  });

                  //console.log("enenenenenene"+cnd[0])

                  cnd[0].map((ele) => {
                    //alert(elem.conditionnement_id == ele.id_condmnt)

                    if (elem.conditionnement_id == ele.id_condmnt) {
                      cc +=
                        '<option value="' +
                        ele.id_condmnt +
                        '" selected="true">' +
                        ele.abreviation_condmnt +
                        "</option>";

                      id_c = ele.id_condmnt;
                    } else {
                      cc +=
                        '<option value="' +
                        ele.id_condmnt +
                        '">' +
                        ele.abreviation_condmnt +
                        "</option>";
                    }
                  });

                  n++;

                  var table = document.getElementById("myTable_m");
                  var row = table.insertRow(n);
                  //alert(n)
                  var cell1 = row.insertCell(0);
                  var cell2 = row.insertCell(1);
                  var cell3 = row.insertCell(2);
                  var cell4 = row.insertCell(3);

                  cell1.innerHTML =
                    '<div class="row"><div class="col-md-8" ><select class="js-example-basic-single w-100" onchange=chargement_cdmnt(this) id="m_article' +
                    n +
                    '">' +
                    c +
                    '</select></div><div class="col-md-4" ><select class="js-example-basic-single w-100" onchange=chargement_st(this) id="m_cdmnt' +
                    n +
                    '">' +
                    cc +
                    "</select></div></div>";
                  cell2.innerHTML =
                    '<input type="number" min="0" class="form-control" require id="m_st' +
                    n +
                    '" onchange=Montant(this) value=' +
                    art[0].stock +
                    ">";
                  cell3.innerHTML =
                    '<input type="number" min="0" class="form-control" require id="m_qte' +
                    n +
                    '" onchange=Montant(this) value=' +
                    elem.qteSortie +
                    ">";
                  cell4.innerHTML =
                    '<i title="Retirer" style="font-size: 25px" class="mdi mdi-minus-circle text-danger icon-remove" onclick="RemoveRow(this)" id="m_' +
                    n +
                    '"></i>';

                  var table = document.getElementById("myTable");
                  var row = table.insertRow(n);
                  //alert(n)
                  var cell1 = row.insertCell(0);
                  var cell2 = row.insertCell(1);
                  var cell3 = row.insertCell(2);
                  var cell4 = row.insertCell(3);

                  cell1.innerHTML =
                    '<div class="row"><div class="col-md-8" ><select class="js-example-basic-single w-100" onchange=chargement_cdmnt(this) id="article' +
                    n +
                    '">' +
                    c +
                    '</select></div><div class="col-md-4" ><select class="js-example-basic-single w-100" onchange=chargement_st(this) id="cdmnt' +
                    n +
                    '">' +
                    cc +
                    "</select></div></div>";
                  cell2.innerHTML =
                    '<input type="number" min="0" class="form-control" require id="st' +
                    n +
                    '" readonly value=' +
                    art[0].stock +
                    ">";
                  cell3.innerHTML =
                    '<input type="number" min="0" class="form-control" require id="qte' +
                    n +
                    '" onchange=chargement_qt(this) value=' +
                    elem.qteSortie +
                    ">";
                  cell4.innerHTML =
                    '<i title="Retirer" style="font-size: 25px" class="mdi mdi-minus-circle text-danger icon-remove" onclick="RemoveRow(this)" id="' +
                    n +
                    '"></i>';

                  var js_ = document.createElement("script");
                  js_.type = "text/javascript";
                  js_.src = "../../vendors/select2/select2.min.js";
                  document.body.appendChild(js_);
                  var js = document.createElement("script");
                  js.type = "text/javascript";
                  js.src = "../../js/select2.js";
                  document.body.appendChild(js);
                })
                .catch((error) => {
                  console.error(
                    "Failed to retrieve `Entrepots`, `Entrepot_Article` , `Articles` , `Conditionnements`  data : ",
                    error
                  );
                });
            })
            .catch((error) => {
              console.error(
                "Failed to retrieve BonSortie Article conditionments data : ",
                error
              );
            });
        });
      });
    })
    .catch((error) => {
      console.error("Failed to retrieve BonSortie data : ", error);
    });
};

//***** Fonction de chargement des  fournisseurs dans la page d'enregistrement d'un bon de sortie ***\\

const chargement_articles_BS = (a) => {
  connection = db_connect();

  $query = "SELECT * FROM `articles` ";

  connection.query($query, function (err, rows, fields) {
    if (err) {
      console.log("An error ocurred performing the query.");
      console.log(err);
      return;
    }

    let c = "<option value=0>Veuillez choisir un Article</option>";

    rows
      .map((elem) => {
        c +=
          '<option value="' +
          elem.id_article +
          '">' +
          elem.libele_article +
          "</option>";
      })
      .join();

    document.getElementById("article" + a).innerHTML = c;

    var js_ = document.createElement("script");
    js_.type = "text/javascript";
    js_.src = "../../vendors/select2/select2.min.js";
    document.body.appendChild(js_);
    var js = document.createElement("script");
    js.type = "text/javascript";
    js.src = "../../js/select2.js";
    document.body.appendChild(js);
  });

  // Close the connection
  connection.end(function () {
    // The connection has been closed
  });
};

//***** Fonction de chargement des bons de Sortie ***\\

const afiche_BS = () => {
  sequelize
    .query(
      "SELECT * FROM  `bonsortie`  ORDER BY date_bonsortie DESC",

      {
        type: sequelize.QueryTypes.SELECT,
      }
    )
    .then((BS) => {
      console.log(BS);

      BS.map((e) => {
        //console.log(e.nom_client != )

        if (e.nom_client !== null) {
          sequelize
            .query(
              "SELECT * FROM entrepots WHERE  id_entrepot = " + e.provenance,
              {
                type: sequelize.QueryTypes.SELECT,
              }
            )
            .then((pr) => {
              SRT = "<tr>";

              SRT +=
                '<td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td>';
              SRT += '<td class="py-1">' + e.date_bonsortie + "</td>";

              SRT +=
                "<td>" +
                pr[0].libele_entrepot +
                "</td><td>" +
                e.nom_client +
                "</td>";

              SRT +=
                '<td class="py-1"><a href="voir-bon-sortie.html?id=' +
                e.id_bonsortie +
                '" type="button" class="btn btn-primary text-white me-0" ></i>&nbsp; voir</a><button onclick="getBonSortiePdfToPrint(' +
                e.id_bonsortie +
                ')" type="button" class="btn btn-success text-white me-0" ></i>&nbsp; <i class="icon-printer"></i></button><button onclick=delete_bons(' +
                e.id_bonsortie +
                ") id=" +
                e.id_bonsortie +
                '"  class="btn btn-danger text-white me-0" ></i>&nbsp; Supprimer</button></td></tr>';

              SRT += "</tr>";

              document.getElementById("tab-bons").innerHTML += SRT;
            })
            .catch((error) => {
              console.error(
                "Failed to retrieve Entrepots provenance data : ",
                error
              );
            });
        } else {
          if (e.client_id !== null) {
            sequelize
              .query(
                "SELECT * FROM entrepots WHERE  id_entrepot = " + e.provenance,
                {
                  type: sequelize.QueryTypes.SELECT,
                }
              )
              .then((pr) => {
                sequelize
                  .query(
                    "SELECT * FROM clients WHERE  id_client = " + e.client_id,
                    {
                      type: sequelize.QueryTypes.SELECT,
                    }
                  )
                  .then((Client) => {
                    SRT = "<tr>";

                    SRT +=
                      '<td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td>';
                    SRT += '<td class="py-1">' + e.date_bonsortie + "</td>";

                    SRT +=
                      "<td>" +
                      pr[0].libele_entrepot +
                      "</td><td>" +
                      Client[0].nom_client +
                      "</td>";

                    SRT +=
                      '<td class="py-1"><a href="voir-bon-sortie.html?id=' +
                      e.id_bonsortie +
                      '" type="button" class="btn btn-primary text-white me-0" ></i>&nbsp; voir</a><button onclick="getBonSortiePdfToPrint(' +
                      e.id_bonsortie +
                      ')" type="button" class="btn btn-success text-white me-0" ></i>&nbsp; <i class="icon-printer"></i></button><button onclick=delete_bons(' +
                      e.id_bonsortie +
                      ") id=" +
                      e.id_bonsortie +
                      '"  class="btn btn-danger text-white me-0" ></i>&nbsp; Supprimer</button></td></tr>';

                    SRT += "</tr>";

                    document.getElementById("tab-bons").innerHTML += SRT;
                  })
                  .catch((error) => {
                    console.error("Failed to retrieve Clients data : ", error);
                  });
              })
              .catch((error) => {
                console.error(
                  "Failed to retrieve Entrepots provenance data : ",
                  error
                );
              });
          } else {
            sequelize
              .query(
                "SELECT * FROM entrepots WHERE  id_entrepot = " + e.provenance,
                {
                  type: sequelize.QueryTypes.SELECT,
                }
              )
              .then((pr) => {
                sequelize
                  .query(
                    "SELECT * FROM entrepots WHERE  id_entrepot = " +
                      e.destination,
                    {
                      type: sequelize.QueryTypes.SELECT,
                    }
                  )
                  .then((des) => {
                    SRT = "<tr>";

                    SRT +=
                      '<td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td>';
                    SRT += '<td class="py-1">' + e.date_bonsortie + "</td>";

                    SRT +=
                      "<td>" +
                      pr[0].libele_entrepot +
                      "</td><td>" +
                      des[0].libele_entrepot +
                      "</td>";

                    SRT +=
                      '<td class="py-1"><a href="voir-bon-sortie.html?id=' +
                      e.id_bonsortie +
                      '" type="button" class="btn btn-success text-white me-0" ></i>&nbsp; voir</a><button onclick="getBonSortiePdfToPrint(' +
                      e.id_bonsortie +
                      ')" type="button" class="btn btn-success text-white me-0" ></i>&nbsp; <i class="icon-printer"></i></button><button onclick=delete_bons(' +
                      e.id_bonsortie +
                      ") id=" +
                      e.id_bonsortie +
                      '"  class="btn btn-danger text-white me-0" ></i>&nbsp; Supprimer</button></td></tr>';

                    SRT += "</tr>";

                    document.getElementById("tab-bons").innerHTML += SRT;
                  })
                  .catch((error) => {
                    console.error(
                      "Failed to retrieve Entrepots destination data : ",
                      error
                    );
                  });
              })
              .catch((error) => {
                console.error(
                  "Failed to retrieve Entrepots provenance data : ",
                  error
                );
              });
          }
        }
        //  		sequelize.query(

        // 			'SELECT * FROM BomCommandes , Fournisseur WHERE  BomCommandes.fournisseur_id = Fournisseur.id_fournisseur AND id_boncmd = ' + e.boncmd_id,
        // 		{
        // 			type: sequelize.QueryTypes.SELECT
        // 		}
        // 	).then(BC => {

        // 		//console.log(BC[0].nom_fournisseur)

        // 		SRT+='<td class="py-1">'+BC[0].nom_fournisseur+'</td></tr>'

        // 	}).catch((error) => {

        // console.error('Failed to retrieve Conditionnements data : ', error);});
      }).join();
    })
    .catch((error) => {
      console.error("Failed to retrieve `BonSortie`, `Clients` data : ", error);
    });
};

//***** Fonction de chargement des  conditionnements  dans la page d'enregistrement d'un bon de sortie à la selection de l'article***\\

const chargement_cdmnt_BS = (id, indice) => {
  sequelize
    .query(
      "SELECT * FROM `conditionnements` , `articles_condmnt` , `articles` WHERE conditionnements.id_condmnt = articles_condmnt.condmnt_id AND articles.id_article = articles_condmnt.article_id AND articles.id_article = " +
        id,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    )
    .then((art) => {
      console.log("kslfqsjlqjsdfkqsffklqjl oil " + art);

      let c = "";
      art
        .map((elem) => {
          c +=
            '<option value="' +
            elem.id_condmnt +
            '">' +
            elem.abreviation_condmnt +
            "</option>";
        })
        .join();

      document.getElementById("cdmnt" + indice).innerHTML = c;

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

      sequelize
        .query(
          "SELECT * FROM  `entrepots`, `entrepot_article` , `articles` , `conditionnements` WHERE  entrepots.id_entrepot = entrepot_article.entrepot_id  AND conditionnements.id_condmnt = entrepot_article.condmnt_id  AND articles.id_article = entrepot_article.article_id AND entrepots.id_entrepot = " +
            document.getElementById("entrepot_pr").value +
            " AND articles.id_article = " +
            id +
            " AND conditionnements.id_condmnt = " +
            document.getElementById("cdmnt" + indice).value,
          {
            type: sequelize.QueryTypes.SELECT,
          }
        )
        .then((st) => {
          document.getElementById("st" + indice).value = st[0].stock;

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
        })
        .catch((error) => {
          console.error("Failed to update Entrepots data : ", error);
        });
    })
    .catch((error) => {
      console.error("Failed to update Entrepots data : ", error);
    });
};
//***** Fonction de chargement des  conditionnements  dans la page d'enregistrement d'un bon de sortie à la selection de l'article***\\

const chargement_st_BS = (id, indice) => {
  connection = db_connect();

  ($query =
    "SELECT * FROM  `entrepots`, `entrepot_article` , `articles` , `conditionnements` WHERE  entrepots.id_entrepot = entrepot_article.entrepot_id  AND conditionnements.id_condmnt = entrepot_article.condmnt_id  AND articles.id_article = entrepot_article.article_id AND entrepots.id_entrepot = " +
    document.getElementById("entrepot_pr").value +
    " AND articles.id_article = " +
    document.getElementById("article" + indice).value +
    " AND conditionnements.id_condmnt = " +
    id),
    //$query = 'SELECT * FROM `Conditionnements` , `Articles_Condmnt` , `Articles` WHERE Conditionnements.id_condmnt = Articles_Condmnt.condmnt_id AND Articles.id_article = Articles_Condmnt.article_id AND Articles.id_article = '+id

    connection.query($query, function (err, rows, fields) {
      if (err) {
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
      }

      document.getElementById("st" + indice).value = rows[0].stock;

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
    });
  // Close the connection
  connection.end(function () {
    // The connection has been closed
  });
};

//***** Fonction  d'enregistrement d'un bon de commande  ***\\

const modif_entr_pr = (id_e, n) => {
  a = 0;
  for (var i = 1; i <= n; i++) {
    if (document.getElementById("article" + i).value != "null") {
      sequelize
        .query(
          "SELECT * FROM  `entrepots`, `entrepot_article` , `articles` , `conditionnements` WHERE  entrepots.id_entrepot = entrepot_article.entrepot_id  AND conditionnements.id_condmnt = entrepot_article.condmnt_id  AND articles.id_article = entrepot_article.article_id AND entrepots.id_entrepot = " +
            document.getElementById("entrepot_pr").value +
            " AND articles.id_article = " +
            document.getElementById("article" + i).value +
            " AND conditionnements.id_condmnt = " +
            document.getElementById("cdmnt" + i).value,
          {
            type: sequelize.QueryTypes.SELECT,
          }
        )
        .then((art) => {
          a++;
          //alert(art[0].stock)
          if (art.length != 0) {
            document.getElementById("st" + a).value = art[0].stock;
          } else {
            document.getElementById("st" + a).value = 0;
          }
        })
        .catch((error) => {
          console.error(
            "Failed to retrieve `Entrepots`, `Entrepot_Article` , `Articles` , `Conditionnements`  data : ",
            error
          );
        });
    }
  }
};

//***** Fonction  d'enregistrement d'un bon de commande  ***\\

const insertion_bon_sortie = (n, c) => {
  dest = null;
  cl = null;
  nc = null;
  if (document.getElementById("entrepot_des").value != "null") {
    dest = document.getElementById("entrepot_des").value;
  } else {
    if (document.getElementById("client_des").value != "null") {
      cl = document.getElementById("client_des").value;
    } else {
      nc = document.getElementById("nom_client").value;
    }
  }
  // alert(document.getElementById('entrepot_pr').value+"+"+document.getElementById('date_sortie').value+"+"+dest+"+"+cl+"+"+nc)

  // 	for (var i = 1; i <=n; i++) {

  // 		if (document.getElementById("qte"+i).value != 0  ) {

  // 				alert(document.getElementById('article'+i).value+"+"+document.getElementById('cdmnt'+i).value+"+"+document.getElementById('qte'+i).value)
  // 		}
  // 	}

  compteur = 0;
  sequelize
    .query(
      'INSERT INTO bonsortie (date_bonsortie,provenance,destination,nom_client,client_id) VALUES ("' +
        document.getElementById("date_sortie").value +
        '",' +
        document.getElementById("entrepot_pr").value +
        "," +
        dest +
        "," +
        nc +
        "," +
        cl +
        ")"
    )
    .then((BS) => {
      for (var i = 1; i <= n; i++) {
        if (document.getElementById("qte" + i).value != 0) {
          sequelize
            .query(
              'INSERT INTO bonsortie_article (bonsortie_id,article_id,qteSortie,conditionnement_id) VALUES ("' +
                BS[0] +
                '","' +
                document.getElementById("article" + i).value +
                '","' +
                document.getElementById("qte" + i).value +
                '",' +
                document.getElementById("cdmnt" + i).value +
                ")"
            )
            .then((art_e) => {
              compteur++;

              if (compteur == c) {
                sequelize
                  .query(
                    "SELECT * FROM bonsortie_article WHERE bonsortie_id =" +
                      BS[0]
                  )
                  .then((B_A_) => {
                    //console.log(B_A)

                    d = 0;

                    B_A_[0]
                      .map((e) => {
                        //alert(elem.qteSortie)

                        sequelize
                          .query(
                            "SELECT * FROM entrepot_article WHERE article_id = " +
                              e.article_id +
                              " AND condmnt_id = " +
                              e.conditionnement_id +
                              " AND entrepot_id = " +
                              document.getElementById("entrepot_pr").value
                          )
                          .then((art_e) => {
                            //(art_e[0][0].stock - elem.qteSortie )

                            // alert(e.qteSortie)
                            sequelize
                              .query(
                                "UPDATE entrepot_article SET stock = :Stock WHERE entrepot_id = :id_entrepot AND article_id = :id_article AND condmnt_id = :id_condmnt  ",
                                {
                                  replacements: {
                                    Stock:
                                      parseInt(art_e[0][0].stock) -
                                      parseInt(e.qteSortie),
                                    id_entrepot:
                                      document.getElementById("entrepot_pr")
                                        .value,
                                    id_article: e.article_id,
                                    id_condmnt: e.conditionnement_id,
                                  },
                                  type: sequelize.QueryTypes.UPDATE,
                                }
                              )
                              .then((BC) => {
                                d++;
                                alert(d);
                                if (d == B_A_[0].length) {
                                  // alert(
                                  //   "Modification enregistrées avec success ."
                                  // );
                                  warning(
                                    "Bon de Sortie enregistré avec success enregistrée avec success vous le retrouverez dans la liste des Bon de Sortie ci dessous ."
                                  );

                                  // window.location.replace(
                                  //   "voir-bon-sortie.html?id=" + id
                                  // );
                                }
                              })
                              .catch((error) => {
                                console.error(
                                  "Failed to update entrepot_Article data : ",
                                  error
                                );
                              });
                          })
                          .catch((error) => {
                            console.error(
                              "Failed to select entrepot_Article data : ",
                              error
                            );
                          });
                      })
                      .join();
                  })
                  .catch((error) => {
                    console.error(
                      "Failed to select BonSortie_Article data : ",
                      error
                    );
                  });
              }

              window.location.reload();
            })
            .catch((error) => {
              console.error(
                "Failed to insert BonSortie_Article data : ",
                error
              );
            });
        }
      }
    })
    .catch((error) => {
      console.error("Failed to insert BonSortie data : ", error);
    });
};

//***** Fonction de modification d'un bon de sorie  ***\\

const update_bon_sortie = (id, n, c) => {
  date_bon = document.getElementById("date_sortie").value;

  if (date_bon == "") {
    date_bon = document.getElementById("date_sortie_a").value;
  }

  sequelize
    .query("SELECT * FROM bonsortie WHERE id_bonsortie =" + id)
    .then((BS) => {
      sequelize
        .query("SELECT * FROM bonsortie_article WHERE bonsortie_id =" + id)
        .then((B_A) => {
          //console.log(B_A)

          B_A[0]
            .map((elem) => {
              //alert(elem.qteSortie)

              sequelize
                .query(
                  "SELECT * FROM entrepot_article WHERE article_id = " +
                    elem.article_id +
                    " AND condmnt_id = " +
                    elem.conditionnement_id +
                    " AND entrepot_id = " +
                    BS[0][0].provenance
                  //document.getElementById("entrepot_pr").value
                )
                .then((art_e) => {
                  //(art_e[0][0].stock - elem.qteSortie )
                  sequelize
                    .query(
                      "UPDATE entrepot_article SET stock = :Stock WHERE entrepot_id = :id_entrepot AND article_id = :id_article AND condmnt_id = :id_condmnt  ",
                      {
                        replacements: {
                          Stock:
                            parseInt(art_e[0][0].stock) +
                            parseInt(elem.qteSortie),
                          id_entrepot: BS[0][0].provenance,
                          id_article: elem.article_id,
                          id_condmnt: elem.conditionnement_id,
                        },
                        type: sequelize.QueryTypes.UPDATE,
                      }
                    )
                    .then((BC) => {})
                    .catch((error) => {
                      console.error(
                        "Failed to update entrepot_Article data : ",
                        error
                      );
                    });
                })
                .catch((error) => {
                  console.error(
                    "Failed to select entrepot_Article data : ",
                    error
                  );
                });
            })
            .join();
        })
        .catch((error) => {
          console.error("Failed to select BonSortie_Article data : ", error);
        });
    })
    .catch((error) => {
      console.error("Failed to select BonSortie data : ", error);
    });

  compteur = 0;
  dest = null;
  cl = null;
  nc = null;
  if (document.getElementById("entrepot_des").value != "null") {
    dest = document.getElementById("entrepot_des").value;
  } else {
    if (document.getElementById("client_des").value != "null") {
      cl = document.getElementById("client_des").value;
    } else {
      nc = document.getElementById("nom_client").value;
    }
  }

  sequelize
    .query(
      "UPDATE bonsortie SET date_bonsortie = :date_bonsortie, provenance = :provenance , destination = :destination  , nom_client = :nom_client  , client_id = :client_id  WHERE id_bonsortie = :id_bonsortie",

      {
        replacements: {
          date_bonsortie: date_bon,
          provenance: document.getElementById("entrepot_pr").value,
          destination: dest,
          nom_client: nc,
          client_id: cl,
          id_bonsortie: id,
        },
        type: sequelize.QueryTypes.UPDATE,
      }
    )
    .then((BS) => {
      sequelize
        .query("DELETE FROM bonsortie_article WHERE bonsortie_id =" + id)
        .then((D) => {
          for (var i = 1; i <= n; i++) {
            if (document.getElementById("qte" + i).value != 0) {
              //alert(i)

              sequelize
                .query(
                  'INSERT INTO bonsortie_article (bonsortie_id,article_id,qteSortie,conditionnement_id) VALUES ("' +
                    id +
                    '","' +
                    document.getElementById("article" + i).value +
                    '","' +
                    document.getElementById("qte" + i).value +
                    '",' +
                    document.getElementById("cdmnt" + i).value +
                    ")"
                )
                .then((art_bc) => {
                  compteur++;

                  if (compteur == c) {
                    sequelize
                      .query(
                        "SELECT * FROM bonsortie_article WHERE bonsortie_id =" +
                          id
                      )
                      .then((B_A_) => {
                        //console.log(B_A)

                        d = 0;

                        B_A_[0]
                          .map((e) => {
                            //alert(elem.qteSortie)

                            sequelize
                              .query(
                                "SELECT * FROM entrepot_article WHERE article_id = " +
                                  e.article_id +
                                  " AND condmnt_id = " +
                                  e.conditionnement_id +
                                  " AND entrepot_id = " +
                                  document.getElementById("entrepot_pr").value
                              )
                              .then((art_e) => {
                                //(art_e[0][0].stock - elem.qteSortie )

                                // alert(e.qteSortie)
                                sequelize
                                  .query(
                                    "UPDATE entrepot_article SET stock = :Stock WHERE entrepot_id = :id_entrepot AND article_id = :id_article AND condmnt_id = :id_condmnt  ",
                                    {
                                      replacements: {
                                        Stock:
                                          parseInt(art_e[0][0].stock) -
                                          parseInt(e.qteSortie),
                                        id_entrepot:
                                          document.getElementById("entrepot_pr")
                                            .value,
                                        id_article: e.article_id,
                                        id_condmnt: e.conditionnement_id,
                                      },
                                      type: sequelize.QueryTypes.UPDATE,
                                    }
                                  )
                                  .then((BC) => {
                                    d++;

                                    if (d == B_A_[0].length) {
                                      alert(
                                        "Modification enregistrées avec success ."
                                      );

                                      // window.location.replace(
                                      //   "voir-bon-sortie.html?id=" + id
                                      // );
                                    }
                                  })
                                  .catch((error) => {
                                    console.error(
                                      "Failed to update entrepot_Article data : ",
                                      error
                                    );
                                  });
                              })
                              .catch((error) => {
                                console.error(
                                  "Failed to select entrepot_Article data : ",
                                  error
                                );
                              });
                          })
                          .join();
                      })
                      .catch((error) => {
                        console.error(
                          "Failed to select BonSortie_Article data : ",
                          error
                        );
                      });
                  }
                })
                .catch((error) => {
                  console.error(
                    "Failed to insert BonSortie_Article data : ",
                    error
                  );
                });
            }
          }
        })
        .catch((error) => {
          console.error("Failed to DELETE BonSortie_Article data : ", error);
        });
    })
    .catch((error) => {
      console.error("Failed to insert BonSortie data : ", error);
    });
};

//***** Fonction de d'affichage des détailles d'un bon de sortie***\\

const afiche_detaille_BS = (id) => {
  sequelize
    .query("SELECT * FROM  `bonsortie`   WHERE id_bonsortie = ? ", {
      replacements: [id],
      type: sequelize.QueryTypes.SELECT,
    })
    .then((BS) => {
      //console.log(BS)

      if (BS[0].nom_client !== null) {
        sequelize
          .query(
            "SELECT * FROM entrepots WHERE  id_entrepot = " + BS[0].provenance,
            {
              type: sequelize.QueryTypes.SELECT,
            }
          )
          .then((pr) => {
            //alert(pr[0].libele_entrepot)

            document.getElementById("entrepot_pr").value =
              pr[0].libele_entrepot;
            document.getElementById("date").value = BS[0].date_bonsortie;
            document.getElementById("destination").value = BS[0].nom_client;

            sequelize
              .query(
                "SELECT * FROM `bonsortie_article` , `articles` , `bonsortie` , `conditionnements` WHERE conditionnements.id_condmnt = bonsortie_article.conditionnement_id AND bonsortie.id_bonsortie = bonsortie_article.bonsortie_id  AND articles.id_article = bonsortie_article.article_id AND bonsortie.id_bonsortie = " +
                  id,
                {
                  replacements: [],
                  type: sequelize.QueryTypes.SELECT,
                }
              )
              .then((artcl) => {
                console.log(artcl);

                n = 1;

                artcl.map((elem) => {
                  var table = document.getElementById("myTable");
                  var row = table.insertRow(n);
                  //alert(n)
                  var cell1 = row.insertCell(0);
                  var cell2 = row.insertCell(1);
                  var cell3 = row.insertCell(2);

                  cell1.innerHTML =
                    '<td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td>';
                  cell2.innerHTML =
                    '<div class="row"><div class="col-md-8" ><input  type="text" name="cli_lname" class="form-control" value="' +
                    elem.libele_article +
                    '" disabled></div><div class="col-md-4" ><input  type="text" name="cli_lname" class="form-control" value="' +
                    elem.abreviation_condmnt +
                    '" disabled></div></div>';
                  cell3.innerHTML =
                    '<input type="text" readonly class="form-control" require id="qte" value="' +
                    elem.qteSortie +
                    '">';

                  n++;
                });
              })
              .catch((error) => {
                console.error(
                  "Failed to retrieve `BonSortie_Article` , `Articles` , `BonSortie` , `Conditionnements` data : ",
                  error
                );
              });
          })
          .catch((error) => {
            console.error(
              "Failed to retrieve Entrepots provenance data : ",
              error
            );
          });
      } else {
        if (BS[0].client_id !== null) {
          sequelize
            .query(
              "SELECT * FROM entrepots WHERE  id_entrepot = " +
                BS[0].provenance,
              {
                type: sequelize.QueryTypes.SELECT,
              }
            )
            .then((pr) => {
              sequelize
                .query(
                  "SELECT * FROM clients WHERE  id_client = " + BS[0].client_id,
                  {
                    type: sequelize.QueryTypes.SELECT,
                  }
                )
                .then((Client) => {
                  //alert(pr[0].libele_entrepot)

                  document.getElementById("entrepot_pr").value =
                    pr[0].libele_entrepot;
                  document.getElementById("date").value = BS[0].date_bonsortie;
                  document.getElementById("destination").value =
                    Client[0].nom_client;

                  sequelize
                    .query(
                      "SELECT * FROM `bonsortie_article` , `articles` , `bonsortie` , `conditionnements` WHERE conditionnements.id_condmnt = bonsortie_article.conditionnement_id AND bonsortie.id_bonsortie = bonsortie_article.bonsortie_id  AND articles.id_article = bonsortie_article.article_id AND bonsortie.id_bonsortie = " +
                        id,
                      {
                        replacements: [],
                        type: sequelize.QueryTypes.SELECT,
                      }
                    )
                    .then((artcl) => {
                      console.log(artcl);

                      n = 1;

                      artcl.map((elem) => {
                        var table = document.getElementById("myTable");
                        var row = table.insertRow(n);
                        //alert(n)
                        var cell1 = row.insertCell(0);
                        var cell2 = row.insertCell(1);
                        var cell3 = row.insertCell(2);

                        cell1.innerHTML =
                          '<td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td>';
                        cell2.innerHTML =
                          '<div class="row"><div class="col-md-8" ><input  type="text" name="cli_lname" class="form-control" value="' +
                          elem.libele_article +
                          '" disabled></div><div class="col-md-4" ><input  type="text" name="cli_lname" class="form-control" value="' +
                          elem.abreviation_condmnt +
                          '" disabled></div></div>';
                        cell3.innerHTML =
                          '<input type="text" readonly class="form-control" require id="qte" value="' +
                          elem.qteSortie +
                          '">';

                        n++;
                      });
                    })
                    .catch((error) => {
                      console.error(
                        "Failed to retrieve `BonSortie_Article` , `Articles` , `BonSortie` , `Conditionnements` data : ",
                        error
                      );
                    });
                })
                .catch((error) => {
                  console.error("Failed to retrieve Clients data : ", error);
                });
            })
            .catch((error) => {
              console.error(
                "Failed to retrieve Entrepots provenance data : ",
                error
              );
            });
        } else {
          sequelize
            .query(
              "SELECT * FROM entrepots WHERE  id_entrepot = " +
                BS[0].provenance,
              {
                type: sequelize.QueryTypes.SELECT,
              }
            )
            .then((pr) => {
              sequelize
                .query(
                  "SELECT * FROM entrepots WHERE  id_entrepot = " +
                    BS[0].destination,
                  {
                    type: sequelize.QueryTypes.SELECT,
                  }
                )
                .then((des) => {
                  //alert(pr[0].libele_entrepot)

                  document.getElementById("entrepot_pr").value =
                    pr[0].libele_entrepot;
                  document.getElementById("date").value = BS[0].date_bonsortie;
                  document.getElementById("destination").value =
                    des[0].libele_entrepot;

                  sequelize
                    .query(
                      "SELECT * FROM `bonsortie_article` , `articles` , `bonsortie` , `conditionnements` WHERE conditionnements.id_condmnt = bonsortie_article.conditionnement_id AND bonsortie.id_bonsortie = bonsortie_article.bonsortie_id  AND articles.id_article = bonsortie_article.article_id AND bonsortie.id_bonsortie = " +
                        id,
                      {
                        replacements: [],
                        type: sequelize.QueryTypes.SELECT,
                      }
                    )
                    .then((artcl) => {
                      console.log(artcl);

                      n = 1;

                      artcl.map((elem) => {
                        var table = document.getElementById("myTable");
                        var row = table.insertRow(n);
                        //alert(n)
                        var cell1 = row.insertCell(0);
                        var cell2 = row.insertCell(1);
                        var cell3 = row.insertCell(2);

                        cell1.innerHTML =
                          '<td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td>';
                        cell2.innerHTML =
                          '<div class="row"><div class="col-md-8" ><input  type="text" name="cli_lname" class="form-control" value="' +
                          elem.libele_article +
                          '" disabled></div><div class="col-md-4" ><input  type="text" name="cli_lname" class="form-control" value="' +
                          elem.abreviation_condmnt +
                          '" disabled></div></div>';
                        cell3.innerHTML =
                          '<input type="text" readonly class="form-control" require id="qte" value="' +
                          elem.qteSortie +
                          '">';

                        n++;
                      });
                    })
                    .catch((error) => {
                      console.error(
                        "Failed to retrieve `BonSortie_Article` , `Articles` , `BonSortie` , `Conditionnements` data : ",
                        error
                      );
                    });
                })
                .catch((error) => {
                  console.error(
                    "Failed to retrieve Entrepots destination data : ",
                    error
                  );
                });
            })
            .catch((error) => {
              console.error(
                "Failed to retrieve Entrepots provenance data : ",
                error
              );
            });
        }
      }
    })
    .catch((error) => {
      console.error("Failed to retrieve `BonSortie`, `Clients` data : ", error);
    });
};

//***** Fonction de suppression d'un bon de sortie  ***\\

const delete_bon_sortie = (id) => {
  sequelize
    .query("DELETE FROM bonsortie WHERE id_bonsortie =" + id)
    .then((BC) => {
      alert("Bon de Sortie Supprimée avec success.");
      window.location.reload();
    })
    .catch((error) => {
      console.error("Failed to DELETE BonSortie data : ", error);
    });
};

//***** Fonction de chargement des bons de reception ***\\

const afiche_BR = () => {
  let c = "";

  sequelize
    .query("SELECT * FROM `bomcommandes` ")
    .then((BC) => {
      //console.log(BC[0][1])
      BC[0].map((elem) => {
        sequelize
          .query("SELECT * FROM `fournisseur` WHERE id_fournisseur = ? ", {
            replacements: [elem.fournisseur_id],
            type: sequelize.QueryTypes.SELECT,
          })
          .then((fseur) => {
            if (elem.status == 0) {
              document.getElementById("tab-bon_r").innerHTML +=
                "<tr>" +
                '<td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td><td>' +
                fseur[0].nom_fournisseur +
                "</td><td>" +
                elem.date_boncmd +
                "</td><td>" +
                elem.montant_boncmd +
                "</td>" +
                '<td><button onclick="" class="btn  btn-danger text-white me-0" href="#" readonly>Non Reçu</button></td>' +
                '<td><div class="btn-wrapper"><a href="reception.html?id=' +
                elem.id_boncmd +
                '" type="button" class="btn btn-primary text-white me-0" ></i>&nbsp; Recevoir</a> </td></tr>';
            } else {
              document.getElementById("tab-bon_r").innerHTML +=
                "<tr>" +
                '<td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td><td>' +
                fseur[0].nom_fournisseur +
                "</td><td>" +
                elem.date_boncmd +
                "</td><td>" +
                elem.montant_boncmd +
                "</td>" +
                '<td><button onclick="" class="btn  btn-success text-white me-0" href="#" readonly>Reçu</button></td>' +
                '<td><div class="btn-wrapper"><a href="voir_bon_R.html?id=' +
                elem.id_boncmd +
                '" type="button" class="btn btn-primary text-white me-0" ></i>&nbsp; voir</a> </td></tr>';
            }
          })
          .catch((error) => {
            console.error("Failed to retrieve fournisseur data : ", error);
          });
      });
    })
    .catch((error) => {
      console.error("Failed to retrieve BomCommandes data : ", error);
    });
};

//***** Fonction de chargement de la page de reception d'une commande ***\\

const reception_BC = (id) => {
  sequelize
    .query("SELECT * FROM `fournisseur`")
    .then((fseurs) => {
      console.log(fseurs[0]);

      sequelize
        .query(
          "SELECT * FROM `fournisseur` , `bomcommandes`  WHERE fournisseur.id_fournisseur = bomcommandes.fournisseur_id AND bomcommandes.id_boncmd =" +
            id
        )
        .then((BC) => {
          console.log(BC[0][0].id_fournisseur);

          let c = "";
          fseurs[0].map((elem) => {
            if (elem.id_fournisseur == BC[0][0].id_fournisseur) {
              c +=
                '<option value="' +
                elem.id_fournisseur +
                '" selected>' +
                elem.nom_fournisseur +
                "</option>";
            } else {
              c +=
                '<option value="' +
                elem.id_fournisseur +
                '">' +
                elem.nom_fournisseur +
                "</option>";
            }
          });

          document.getElementById("fseur").innerHTML = c;
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
          //console.log("Query succesfully executed", rows[0].nom_fournisseur);

          document.getElementById("date_a").value = BC[0][0].date_boncmd;
        })
        .catch((error) => {
          console.error(
            "Failed to retrieve fournisseur BomCommandes data : ",
            error
          );
        });
    })
    .catch((error) => {
      console.error(
        "Failed to retrieve fournisseur BomCommandes data : ",
        error
      );
    });

  sequelize
    .query(
      "SELECT * FROM `boncmd_article` , `articles` , `bomcommandes` , `conditionnements` WHERE conditionnements.id_condmnt = boncmd_article.conditionnement_id AND bomcommandes.id_boncmd = boncmd_article.boncmd_id  AND articles.id_article = boncmd_article.article_id AND bomcommandes.id_boncmd = " +
        id,
      {
        replacements: [],
        type: sequelize.QueryTypes.SELECT,
      }
    )
    .then((artcl) => {
      //console.log(artcl)

      n = 0;
      t = 0;
      artcl.map((elem) => {
        sequelize.query("SELECT * FROM `articles` ").then((a) => {
          //alert(c+"aaaaa")
          sequelize
            .query(
              "SELECT * FROM `conditionnements` , `articles_condmnt` , `articles` WHERE conditionnements.id_condmnt = articles_condmnt.condmnt_id AND articles.id_article = articles_condmnt.article_id AND articles.id_article = " +
                elem.article_id
            )
            .then((cnd) => {
              c = "";

              n++;
              var table = document.getElementById("myTable");
              var row = table.insertRow(n);
              //alert(n)
              var cell1 = row.insertCell(0);
              var cell2 = row.insertCell(1);
              var cell3 = row.insertCell(2);

              a[0].map((e) => {
                if (e.id_article == elem.article_id) {
                  c +=
                    '<option value="' +
                    e.id_article +
                    '" selected="true">' +
                    e.libele_article +
                    "</option>";
                } else {
                  c +=
                    '<option value="' +
                    e.id_article +
                    '" >' +
                    e.libele_article +
                    "</option>";
                }
              });

              let cc = "";
              //console.log("enenenenenene"+cnd[0])

              cnd[0].map((ele) => {
                //alert(elem.conditionnement_id == ele.id_condmnt)

                if (elem.conditionnement_id == ele.id_condmnt) {
                  cc +=
                    '<option value="' +
                    ele.id_condmnt +
                    '" selected="true">' +
                    ele.abreviation_condmnt +
                    "</option>";
                } else {
                  cc +=
                    '<option value="' +
                    ele.id_condmnt +
                    '">' +
                    ele.abreviation_condmnt +
                    "</option>";
                }
              });

              //alert(c+"eeeeee")

              cell1.innerHTML =
                '<div class="row"><div class="col-md-8" ><select class="js-example-basic-single w-100" onchange=chargement_cdmnt(this) id="article' +
                n +
                '" disabled="true">' +
                c +
                '</select></div><div class="col-md-4" ><select disabled="true" class="js-example-basic-single w-100" id="cdmnt' +
                n +
                '">' +
                cc +
                "</select></div></div>";
              cell2.innerHTML =
                '<input type="number" min="0" class="form-control" require id="qte' +
                n +
                '" onchange=Montant(this) value=' +
                elem.qteCmd +
                ' disabled="true">';
              cell3.innerHTML =
                '<input type="number"  class="form-control" require id="qteR' +
                n +
                '" value=0 >';

              var js_ = document.createElement("script");
              js_.type = "text/javascript";
              js_.src = "../../vendors/select2/select2.min.js";
              document.body.appendChild(js_);
              var js = document.createElement("script");
              js.type = "text/javascript";
              js.src = "../../js/select2.js";
              document.body.appendChild(js);
            })
            .catch((error) => {
              console.error(
                "Failed to retrieve BomCommandes Article conditionments data : ",
                error
              );
            });

          sequelize
            .query("SELECT * FROM  `entrepots` ", {
              type: sequelize.QueryTypes.SELECT,
            })
            .then((pers) => {
              let c = "";
              pers
                .map((e) => {
                  c +=
                    '<option value="' +
                    e.id_entrepot +
                    '" >' +
                    e.libele_entrepot +
                    "</option>";
                })
                .join();

              document.getElementById("entrepot").innerHTML = c;

              var js_ = document.createElement("script");
              js_.type = "text/javascript";
              js_.src = "../../vendors/select2/select2.min.js";
              document.body.appendChild(js_);
              var js = document.createElement("script");
              js.type = "text/javascript";
              js.src = "../../js/select2.js";
              document.body.appendChild(js);
            })
            .catch((error) => {
              console.error("Failed to retrieve personnel data : ", error);
            });
        });
      });

      //document.getElementById("montant_total").value = artcl[0].montant_boncmd;
    })
    .catch((error) => {
      console.error("Failed to retrieve BomCommandes data : ", error);
    });
};

//***** Fonction  d'enregistrement d'un bon de Sortie  ***\\

const insert_BR = (n, c) => {
  compteur = 0;

  sequelize
    .query(
      'INSERT INTO bonreceptions (date_reception,boncmd_id,entrepot_id) VALUES ("' +
        document.getElementById("date").value +
        '",' +
        GET("id") +
        "," +
        document.getElementById("entrepot").value +
        ")"
    )
    .then((BR) => {
      for (var i = 1; i <= n; i++) {
        //if (document.getElementById("qteR"+i).value != 0  ) {

        sequelize
          .query(
            'INSERT INTO bonreception_article (bonreception_id,article_id,qteReçu,conditionnement_id) VALUES ("' +
              BR[0] +
              '","' +
              document.getElementById("article" + i).value +
              '","' +
              document.getElementById("qteR" + i).value +
              '","' +
              document.getElementById("cdmnt" + i).value +
              '")'
          )
          .then((art_bR) => {
            compteur++;
            //alert(compteur+"-"+c)
            if (compteur == c) {
              sequelize
                .query(
                  "UPDATE bomcommandes SET status = :status WHERE id_boncmd = :id_boncmd",
                  {
                    replacements: { status: 1, id_boncmd: GET("id") },
                    type: sequelize.QueryTypes.UPDATE,
                  }
                )
                .then((BC) => {
                  sequelize
                    .query(
                      "SELECT * FROM bonreception_article WHERE bonreception_id =" +
                        BR[0]
                    )
                    .then((B_R) => {
                      //console.log(B_A)
                      d = 0;
                      B_R[0]
                        .map((e) => {
                          //alert(elem.qteSortie)

                          sequelize
                            .query(
                              "SELECT * FROM entrepot_article WHERE article_id = " +
                                e.article_id +
                                " AND condmnt_id = " +
                                e.conditionnement_id +
                                " AND entrepot_id = " +
                                document.getElementById("entrepot").value
                            )
                            .then((art_e) => {
                              //(art_e[0][0].stock - elem.qteSortie )

                              //console.log(art_e)

                              sequelize
                                .query(
                                  "UPDATE entrepot_article SET stock = :Stock WHERE entrepot_id = :id_entrepot AND article_id = :id_article AND condmnt_id = :id_condmnt  ",
                                  {
                                    replacements: {
                                      Stock:
                                        parseInt(art_e[0][0].stock) +
                                        parseInt(e.qteReçu),
                                      id_entrepot:
                                        document.getElementById("entrepot")
                                          .value,
                                      id_article: e.article_id,
                                      id_condmnt: e.conditionnement_id,
                                    },
                                    type: sequelize.QueryTypes.UPDATE,
                                  }
                                )
                                .then((BC) => {
                                  d++;

                                  if (d == B_R[0].length) {
                                    alert(
                                      "Reception enregistrée avec success."
                                    );
                                    window.location.replace(
                                      "bon_de_reception.html"
                                    );
                                  }
                                })
                                .catch((error) => {
                                  console.error(
                                    "Failed to update entrepot_Article data : ",
                                    error
                                  );
                                });
                            })
                            .catch((error) => {
                              console.error(
                                "Failed to select entrepot_Article data : ",
                                error
                              );
                            });
                        })
                        .join();
                    })
                    .catch((error) => {
                      console.error(
                        "Failed to select BonReception_Article data : ",
                        error
                      );
                    });
                })
                .catch((error) => {
                  console.error(
                    "Failed to UPDATE BonReceptions data : ",
                    error
                  );
                });
            }
          })
          .catch((error) => {
            console.error(
              "Failed to insert BonReception_Article data : ",
              error
            );
          });
      }
      //}
    })
    .catch((error) => {
      console.error("Failed to insert BonReceptions data : ", error);
    });
};

//***** Fonction de chargement de la page de detail de reception d'une commande ***\\

const voir_reception_BC = (id) => {
  sequelize
    .query("SELECT * FROM `fournisseur`")
    .then((fseurs) => {
      console.log(fseurs[0]);

      sequelize
        .query(
          "SELECT * FROM `fournisseur` , `bomcommandes`  WHERE fournisseur.id_fournisseur = bomcommandes.fournisseur_id AND bomcommandes.id_boncmd =" +
            id
        )
        .then((BC) => {
          console.log(BC[0][0].id_fournisseur);

          let c = "";
          fseurs[0].map((elem) => {
            if (elem.id_fournisseur == BC[0][0].id_fournisseur) {
              c +=
                '<option value="' +
                elem.id_fournisseur +
                '" selected>' +
                elem.nom_fournisseur +
                "</option>";
            } else {
              c +=
                '<option value="' +
                elem.id_fournisseur +
                '">' +
                elem.nom_fournisseur +
                "</option>";
            }
          });

          document.getElementById("fseur").innerHTML = c;
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
          //console.log("Query succesfully executed", rows[0].nom_fournisseur);

          document.getElementById("date_a").value = BC[0][0].date_boncmd;
        })
        .catch((error) => {
          console.error(
            "Failed to retrieve fournisseur BomCommandes data : ",
            error
          );
        });
    })
    .catch((error) => {
      console.error(
        "Failed to retrieve fournisseur BomCommandes data : ",
        error
      );
    });

  sequelize
    .query(
      "SELECT * FROM `boncmd_article` , `articles` , `bomcommandes` , `conditionnements` WHERE conditionnements.id_condmnt = boncmd_article.conditionnement_id AND bomcommandes.id_boncmd = boncmd_article.boncmd_id  AND articles.id_article = boncmd_article.article_id AND bomcommandes.id_boncmd = " +
        id,
      {
        replacements: [],
        type: sequelize.QueryTypes.SELECT,
      }
    )
    .then((artcl) => {
      //console.log(artcl)

      n = 0;
      t = 0;
      artcl.map((elem) => {
        sequelize.query("SELECT * FROM `articles` ").then((a) => {
          //alert(c+"aaaaa")
          sequelize
            .query(
              "SELECT * FROM `conditionnements` , `articles_condmnt` , `articles` WHERE conditionnements.id_condmnt = articles_condmnt.condmnt_id AND articles.id_article = articles_condmnt.article_id AND articles.id_article = " +
                elem.article_id
            )
            .then((cnd) => {
              sequelize
                .query(
                  "SELECT * FROM `bonreceptions`  WHERE boncmd_id = " +
                    GET("id"),
                  {
                    replacements: [],
                    type: sequelize.QueryTypes.SELECT,
                  }
                )
                .then((br) => {
                  console.log("yoyo");
                  console.log(br);
                  console.log("yiyi");
                  sequelize
                    .query(
                      "SELECT * FROM `bonreception_article`  WHERE bonreception_article.conditionnement_id= " +
                        elem.conditionnement_id +
                        " AND bonreception_article.article_id = " +
                        elem.article_id +
                        " AND bonreception_article.bonreception_id = " +
                        br[0].id_bonreception,
                      {
                        replacements: [],
                        type: sequelize.QueryTypes.SELECT,
                      }
                    )
                    .then((art_r) => {
                      sequelize
                        .query("SELECT * FROM  `entrepots` ", {
                          type: sequelize.QueryTypes.SELECT,
                        })
                        .then((pers) => {
                          let c = "";
                          pers
                            .map((e) => {
                              if (e.id_entrepot == br[0].entrepot_id) {
                                c +=
                                  '<option value="' +
                                  e.id_entrepot +
                                  '" selected="true">' +
                                  e.libele_entrepot +
                                  "</option>";
                              } else {
                                c +=
                                  '<option value="' +
                                  e.id_entrepot +
                                  '" >' +
                                  e.libele_entrepot +
                                  "</option>";
                              }
                            })
                            .join();

                          document.getElementById("entrepot").innerHTML = c;

                          var js_ = document.createElement("script");
                          js_.type = "text/javascript";
                          js_.src = "../../vendors/select2/select2.min.js";
                          document.body.appendChild(js_);
                          var js = document.createElement("script");
                          js.type = "text/javascript";
                          js.src = "../../js/select2.js";
                          document.body.appendChild(js);

                          document.getElementById("date").value =
                            br[0].date_reception;
                        })
                        .catch((error) => {
                          console.error(
                            "Failed to retrieve personnel data : ",
                            error
                          );
                        });

                      c = "";

                      n++;
                      var table = document.getElementById("myTable");
                      var row = table.insertRow(n);
                      //alert(n)
                      var cell1 = row.insertCell(0);
                      var cell2 = row.insertCell(1);
                      var cell3 = row.insertCell(2);

                      a[0].map((e) => {
                        if (e.id_article == elem.article_id) {
                          c +=
                            '<option value="' +
                            e.id_article +
                            '" selected="true">' +
                            e.libele_article +
                            "</option>";
                        } else {
                          c +=
                            '<option value="' +
                            e.id_article +
                            '" >' +
                            e.libele_article +
                            "</option>";
                        }
                      });

                      let cc = "";
                      //console.log("enenenenenene"+cnd[0])

                      cnd[0].map((ele) => {
                        //alert(elem.conditionnement_id == ele.id_condmnt)

                        if (elem.conditionnement_id == ele.id_condmnt) {
                          cc +=
                            '<option value="' +
                            ele.id_condmnt +
                            '" selected="true">' +
                            ele.abreviation_condmnt +
                            "</option>";
                        } else {
                          cc +=
                            '<option value="' +
                            ele.id_condmnt +
                            '">' +
                            ele.abreviation_condmnt +
                            "</option>";
                        }
                      });

                      //alert(c+"eeeeee")

                      cell1.innerHTML =
                        '<div class="row"><div class="col-md-8" ><select class="js-example-basic-single w-100" onchange=chargement_cdmnt(this) id="article' +
                        n +
                        '" disabled="true">' +
                        c +
                        '</select></div><div class="col-md-4" ><select disabled="true" class="js-example-basic-single w-100" id="cdmnt' +
                        n +
                        '">' +
                        cc +
                        "</select></div></div>";
                      cell2.innerHTML =
                        '<input type="number" min="0" class="form-control" require id="qte' +
                        n +
                        '" onchange=Montant(this) value=' +
                        elem.qteCmd +
                        ' disabled="true">';
                      cell3.innerHTML =
                        '<input type="number"  class="form-control" require id="qteR' +
                        n +
                        '" value=' +
                        art_r[0].qteReçu +
                        " readonly >";

                      var js_ = document.createElement("script");
                      js_.type = "text/javascript";
                      js_.src = "../../vendors/select2/select2.min.js";
                      document.body.appendChild(js_);
                      var js = document.createElement("script");
                      js.type = "text/javascript";
                      js.src = "../../js/select2.js";
                      document.body.appendChild(js);
                    })
                    .catch((error) => {
                      console.error(
                        "Failed to retrieve BonReception_Article  data : ",
                        error
                      );
                    });
                })
                .catch((error) => {
                  console.error(
                    "Failed to retrieve BonReceptions  data : ",
                    error
                  );
                });
            })
            .catch((error) => {
              console.error(
                "Failed to retrieve BomCommandes Article conditionments data : ",
                error
              );
            });
        });
      });
    })
    .catch((error) => {
      console.error("Failed to retrieve BomCommandes data : ", error);
    });
};

//***** Fonction de chargement de la page de modificationl de reception d'une commande ***\\

const modif_reception_BC = (id) => {
  sequelize
    .query("SELECT * FROM `fournisseur`")
    .then((fseurs) => {
      console.log(fseurs[0]);

      sequelize
        .query(
          "SELECT * FROM `fournisseur` , `bomcommandes`  WHERE fournisseur.id_fournisseur = bomcommandes.fournisseur_id AND bomcommandes.id_boncmd =" +
            id
        )
        .then((BC) => {
          console.log(BC[0][0].id_fournisseur);

          let c = "";
          fseurs[0].map((elem) => {
            if (elem.id_fournisseur == BC[0][0].id_fournisseur) {
              c +=
                '<option value="' +
                elem.id_fournisseur +
                '" selected>' +
                elem.nom_fournisseur +
                "</option>";
            } else {
              c +=
                '<option value="' +
                elem.id_fournisseur +
                '">' +
                elem.nom_fournisseur +
                "</option>";
            }
          });

          document.getElementById("fseur").innerHTML = c;
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
          //console.log("Query succesfully executed", rows[0].nom_fournisseur);

          document.getElementById("date_a").value = BC[0][0].date_boncmd;
        })
        .catch((error) => {
          console.error(
            "Failed to retrieve fournisseur BomCommandes data : ",
            error
          );
        });
    })
    .catch((error) => {
      console.error(
        "Failed to retrieve fournisseur BomCommandes data : ",
        error
      );
    });

  sequelize
    .query(
      "SELECT * FROM `boncmd_article` , `articles` , `bomcommandes` , `conditionnements` WHERE conditionnements.id_condmnt = boncmd_article.conditionnement_id AND bomcommandes.id_boncmd = boncmd_article.boncmd_id  AND articles.id_article = boncmd_article.article_id AND bomcommandes.id_boncmd = " +
        id,
      {
        replacements: [],
        type: sequelize.QueryTypes.SELECT,
      }
    )
    .then((artcl) => {
      //console.log(artcl)

      n = 0;
      t = 0;
      artcl.map((elem) => {
        sequelize.query("SELECT * FROM `articles` ").then((a) => {
          //alert(c+"aaaaa")
          sequelize
            .query(
              "SELECT * FROM `conditionnements` , `articles_condmnt` , `articles` WHERE conditionnements.id_condmnt = articles_condmnt.condmnt_id AND articles.id_article = articles_condmnt.article_id AND articles.id_article = " +
                elem.article_id
            )
            .then((cnd) => {
              sequelize
                .query(
                  "SELECT * FROM `bonreceptions`  WHERE boncmd_id = " +
                    GET("id"),
                  {
                    replacements: [],
                    type: sequelize.QueryTypes.SELECT,
                  }
                )
                .then((br) => {
                  sequelize
                    .query(
                      "SELECT * FROM `bonreception_article`  WHERE bonreception_article.conditionnement_id= " +
                        elem.conditionnement_id +
                        " AND bonreception_article.article_id = " +
                        elem.article_id +
                        " AND bonreception_article.bonreception_id = " +
                        br[0].id_bonreception,
                      {
                        replacements: [],
                        type: sequelize.QueryTypes.SELECT,
                      }
                    )
                    .then((art_r) => {
                      sequelize
                        .query("SELECT * FROM  `entrepots` ", {
                          type: sequelize.QueryTypes.SELECT,
                        })
                        .then((pers) => {
                          let c = "";
                          pers
                            .map((e) => {
                              if (e.id_entrepot == br[0].entrepot_id) {
                                c +=
                                  '<option value="' +
                                  e.id_entrepot +
                                  '" selected="true">' +
                                  e.libele_entrepot +
                                  "</option>";
                              } else {
                                c +=
                                  '<option value="' +
                                  e.id_entrepot +
                                  '" >' +
                                  e.libele_entrepot +
                                  "</option>";
                              }
                            })
                            .join();

                          document.getElementById("entrepot").innerHTML = c;

                          var js_ = document.createElement("script");
                          js_.type = "text/javascript";
                          js_.src = "../../vendors/select2/select2.min.js";
                          document.body.appendChild(js_);
                          var js = document.createElement("script");
                          js.type = "text/javascript";
                          js.src = "../../js/select2.js";
                          document.body.appendChild(js);

                          document.getElementById("date").value =
                            br[0].date_reception;
                        })
                        .catch((error) => {
                          console.error(
                            "Failed to retrieve personnel data : ",
                            error
                          );
                        });

                      c = "";

                      a[0].map((e) => {
                        if (e.id_article == elem.article_id) {
                          c +=
                            '<option value="' +
                            e.id_article +
                            '" selected="true">' +
                            e.libele_article +
                            "</option>";
                        } else {
                          c +=
                            '<option value="' +
                            e.id_article +
                            '" >' +
                            e.libele_article +
                            "</option>";
                        }
                      });

                      let cc = "";
                      //console.log("enenenenenene"+cnd[0])

                      cnd[0].map((ele) => {
                        //alert(elem.conditionnement_id == ele.id_condmnt)

                        if (elem.conditionnement_id == ele.id_condmnt) {
                          cc +=
                            '<option value="' +
                            ele.id_condmnt +
                            '" selected="true">' +
                            ele.abreviation_condmnt +
                            "</option>";
                        } else {
                          cc +=
                            '<option value="' +
                            ele.id_condmnt +
                            '">' +
                            ele.abreviation_condmnt +
                            "</option>";
                        }
                      });

                      //alert(c+"eeeeee")

                      n++;
                      var table = document.getElementById("myTable_m");
                      var row = table.insertRow(n);
                      //alert(n)
                      var cell1 = row.insertCell(0);
                      var cell2 = row.insertCell(1);
                      var cell3 = row.insertCell(2);

                      cell1.innerHTML =
                        '<div class="row"><div class="col-md-8" ><select class="js-example-basic-single w-100" onchange=chargement_cdmnt(this) id="m_article' +
                        n +
                        '" disabled="true">' +
                        c +
                        '</select></div><div class="col-md-4" ><select disabled="true" class="js-example-basic-single w-100" id="m_cdmnt' +
                        n +
                        '">' +
                        cc +
                        "</select></div></div>";
                      cell2.innerHTML =
                        '<input type="number" min="0" class="form-control" require id="m_qte' +
                        n +
                        '" onchange=Montant(this) value=' +
                        elem.qteCmd +
                        ' disabled="true">';
                      cell3.innerHTML =
                        '<input type="number"  class="form-control" require id="m_qteR' +
                        n +
                        '" value=' +
                        art_r[0].qteReçu +
                        " >";

                      var table = document.getElementById("myTable");
                      var row = table.insertRow(n);
                      //alert(n)
                      var cell1 = row.insertCell(0);
                      var cell2 = row.insertCell(1);
                      var cell3 = row.insertCell(2);

                      cell1.innerHTML =
                        '<div class="row"><div class="col-md-8" ><select class="js-example-basic-single w-100" onchange=chargement_cdmnt(this) id="article' +
                        n +
                        '" disabled="true">' +
                        c +
                        '</select></div><div class="col-md-4" ><select disabled="true" class="js-example-basic-single w-100" id="cdmnt' +
                        n +
                        '">' +
                        cc +
                        "</select></div></div>";
                      cell2.innerHTML =
                        '<input type="number" min="0" class="form-control" require id="qte' +
                        n +
                        '" onchange=Montant(this) value=' +
                        elem.qteCmd +
                        ' disabled="true">';
                      cell3.innerHTML =
                        '<input type="number"  class="form-control" require id="qteR' +
                        n +
                        '" value=' +
                        art_r[0].qteReçu +
                        " >";

                      var js_ = document.createElement("script");
                      js_.type = "text/javascript";
                      js_.src = "../../vendors/select2/select2.min.js";
                      document.body.appendChild(js_);
                      var js = document.createElement("script");
                      js.type = "text/javascript";
                      js.src = "../../js/select2.js";
                      document.body.appendChild(js);
                    })
                    .catch((error) => {
                      console.error(
                        "Failed to retrieve BonReception_Article  data : ",
                        error
                      );
                    });
                })
                .catch((error) => {
                  console.error(
                    "Failed to retrieve BonReceptions  data : ",
                    error
                  );
                });
            })
            .catch((error) => {
              console.error(
                "Failed to retrieve BomCommandes Article conditionments data : ",
                error
              );
            });
        });
      });
    })
    .catch((error) => {
      console.error("Failed to retrieve BomCommandes data : ", error);
    });
};

//***** Fonction  d'enregistrement d'un bon de Sortie  ***\\

const Update_BR = (n, c) => {
  compteur = 0;

  sequelize
    .query("SELECT * FROM bonreceptions WHERE  boncmd_id = " + GET("id"))
    .then((BR) => {
      sequelize
        .query(
          "SELECT * FROM bonreception_article WHERE bonreception_id =" +
            BR[0][0].id_bonreception
        )
        .then((B_R) => {
          //console.log(B_A)
          d = 0;
          B_R[0]
            .map((e) => {
              //alert(elem.qteSortie)

              sequelize
                .query(
                  "SELECT * FROM entrepot_article WHERE article_id = " +
                    e.article_id +
                    " AND condmnt_id = " +
                    e.conditionnement_id +
                    " AND entrepot_id = " +
                    BR[0][0].entrepot_id
                )
                .then((art_e) => {
                  //(art_e[0][0].stock - elem.qteSortie )

                  //alert(art_e[0][0].stock)

                  sequelize
                    .query(
                      "UPDATE entrepot_article SET stock = :Stock WHERE entrepot_id = :id_entrepot AND article_id = :id_article AND condmnt_id = :id_condmnt  ",
                      {
                        replacements: {
                          Stock:
                            parseInt(art_e[0][0].stock) - parseInt(e.qteReçu),
                          id_entrepot: BR[0][0].entrepot_id,
                          id_article: e.article_id,
                          id_condmnt: e.conditionnement_id,
                        },
                        type: sequelize.QueryTypes.UPDATE,
                      }
                    )
                    .then((BC) => {
                      d++;

                      if (d == B_R[0].length) {
                        //alert("Reception enregistrée avec success.")
                        //window.location.replace('bon_de_reception.html');
                      }
                    })
                    .catch((error) => {
                      console.error(
                        "Failed to update entrepot_Article data : ",
                        error
                      );
                    });
                })
                .catch((error) => {
                  console.error(
                    "Failed to select entrepot_Article data : ",
                    error
                  );
                });
            })
            .join();
        })
        .catch((error) => {
          console.error("Failed to select BonReception_Article data : ", error);
        });
    })
    .catch((error) => {
      console.error("Failed to insert BonReceptions data : ", error);
    });

  date_bon = document.getElementById("date_n").value;

  if (date_bon == "") {
    date_bon = document.getElementById("date").value;
  }

  sequelize
    .query(
      "UPDATE bonreceptions SET date_reception = :date_reception , entrepot_id = :entrepot_id  WHERE boncmd_id = :boncmd_id",
      {
        replacements: {
          date_reception: date_bon,
          boncmd_id: GET("id"),
          entrepot_id: document.getElementById("entrepot").value,
        },
        type: sequelize.QueryTypes.UPDATE,
      }
    )
    .then((B) => {
      sequelize
        .query(
          "SELECT * FROM bonreceptions WHERE boncmd_id =" + GET("id"),

          {
            replacements: {},
            type: sequelize.QueryTypes.SELECT,
          }
        )
        .then((BR) => {
          sequelize
            .query(
              "DELETE FROM bonreception_article WHERE bonreception_id =" +
                BR[0].id_bonreception
            )
            .then((D) => {
              for (var i = 1; i <= n; i++) {
                //if (document.getElementById("qteR"+i).value != 0  ) {

                sequelize
                  .query(
                    'INSERT INTO bonreception_article (bonreception_id,article_id,qteReçu,conditionnement_id) VALUES ("' +
                      BR[0].id_bonreception +
                      '","' +
                      document.getElementById("article" + i).value +
                      '","' +
                      document.getElementById("qteR" + i).value +
                      '","' +
                      document.getElementById("cdmnt" + i).value +
                      '")'
                  )
                  .then((art_bR) => {
                    compteur++;
                    //alert(compteur+"-"+c)
                    if (compteur == c) {
                      sequelize
                        .query(
                          "SELECT * FROM bonreception_article WHERE bonreception_id =" +
                            BR[0].id_bonreception
                        )
                        .then((B_R) => {
                          //console.log(B_A)
                          d = 0;
                          B_R[0]
                            .map((e) => {
                              //alert(elem.qteSortie)

                              sequelize
                                .query(
                                  "SELECT * FROM entrepot_article WHERE article_id = " +
                                    e.article_id +
                                    " AND condmnt_id = " +
                                    e.conditionnement_id +
                                    " AND entrepot_id = " +
                                    document.getElementById("entrepot").value
                                )
                                .then((art_e) => {
                                  //(art_e[0][0].stock - elem.qteSortie )

                                  // alert(e.qteSortie)

                                  sequelize
                                    .query(
                                      "UPDATE entrepot_article SET stock = :Stock WHERE entrepot_id = :id_entrepot AND article_id = :id_article AND condmnt_id = :id_condmnt  ",
                                      {
                                        replacements: {
                                          Stock:
                                            parseInt(art_e[0][0].stock) +
                                            parseInt(e.qteReçu),
                                          id_entrepot:
                                            document.getElementById("entrepot")
                                              .value,
                                          id_article: e.article_id,
                                          id_condmnt: e.conditionnement_id,
                                        },
                                        type: sequelize.QueryTypes.UPDATE,
                                      }
                                    )
                                    .then((BC) => {
                                      d++;

                                      if (d == B_R[0].length) {
                                        alert(
                                          "Reception modifieé avec success."
                                        );
                                        window.location.replace(
                                          "voir_bon_R.html?id=" + GET("id")
                                        );
                                      }
                                    })
                                    .catch((error) => {
                                      console.error(
                                        "Failed to update entrepot_Article data : ",
                                        error
                                      );
                                    });
                                })
                                .catch((error) => {
                                  console.error(
                                    "Failed to select entrepot_Article data : ",
                                    error
                                  );
                                });
                            })
                            .join();
                        })
                        .catch((error) => {
                          console.error(
                            "Failed to select BonReception_Article data : ",
                            error
                          );
                        });
                    }
                  })
                  .catch((error) => {
                    console.error(
                      "Failed to insert BonReception_Article data : ",
                      error
                    );
                  });
                //}
              }
            })
            .catch((error) => {
              console.error(
                "Failed to DELETE BonReception_Article data : ",
                error
              );
            });
        })
        .catch((error) => {
          console.error("Failed to select BonReceptions data : ", error);
        });
    })
    .catch((error) => {
      console.error("Failed to update BonReceptions data : ", error);
    });
};

//***** Fonction de suppression d'unentrepot ***\\

const del_entrepot = (id) => {
  sequelize
    .query("DELETE FROM entrepots WHERE id_entrepot =" + id)
    .then((BC) => {
      alert("Entrepot  Supprimée avec success.");
      window.location.reload();
    })
    .catch((error) => {
      console.error("Failed to DELETE Entrepots data : ", error);
    });
};

//***** Fonction de chargement des détaille de l'entrepot dans la section mouvements ***\\

const moov_entrepot = (param) => {
  if (param == "S") {
    var S =
      " </div><div class='card-body'><ul class='nav nav-pills mb-3' id='pills-tab' role='tablist'><li class='nav-item'><button class='nav-link active' id='pills-contact-tab' data-toggle='pill' href='#pills-contact' role='tab' aria-controls='pills-contact' aria-selected='false' onclick=Etats_echanges('S')>Mouvements journaliers</button></li><li class='nav-item'><button class='nav-link ' id='pills-home-tab' data-toggle='pill' href='#pills-home' role='tab' aria-controls='pills-home' aria-selected='true' onclick=Etats_echanges('E')>Etat des stocks</button></ul> <h4 class='card-title'>Entrées et sortie journalière</h4>";

    S += '<div class="row"><div class="col-md-6">';
    S +=
      '<div class="form-group row"><label class="col-sm-3 col-form-label">Date </label><div class="col-sm-9">';
    S +=
      '<input type="datetime-local" name="cli_lname" id="date" class="form-control" /></div></div></div>';
    S +=
      '<div class="col-md-6"><div class="form-group row"><label class="col-sm-3 col-form-label">Mouvement</label><div class="col-sm-9">';
    S +=
      '<select class="js-example-basic-single w-100" id="moov"><option value="entr">Entrées</option><option value="srt">Sorties</option></select></div></div></div>';

    S +=
      '<div class="col-md-6"><div class="form-group row"><label class="col-sm-3 col-form-label">Article</label><div class="col-sm-9">';
    S +=
      '<select class="js-example-basic-single w-100" id="article" onchange="chargement_cdmnt(this)"><option value="null">Choisir un article</option></select></div></div></div>';
    S +=
      '<div class="col-md-6"><div class="form-group row"><div class="col-sm-9">';
    S +=
      '<select class="js-example-basic-single w-100" id="cdnmnt"><option value="null">Choisir un conditionnement</option></select></div></div></div>';

    S +=
      '<div class="col-md-6"><button onclick="search()" style="font-size: 25px" type="submit" class="btn btn-primary text-white me-0">Filtrer</button></div></div></div></div></div></div>';

    S +=
      '<table class="table table-striped"><thead id="entete"></thead><tbody id="tab_moov"></tbody></table>';
    document.getElementById("etats_ech").innerHTML = S;

    var js_ = document.createElement("script");
    js_.type = "text/javascript";
    js_.src = "../../vendors/select2/select2.min.js";
    document.body.appendChild(js_);
    var js = document.createElement("script");
    js.type = "text/javascript";
    js.src = "../../js/select2.js";
    document.body.appendChild(js);

    sequelize
      .query("SELECT * FROM `articles` ", {
        type: sequelize.QueryTypes.SELECT,
      })
      .then((a) => {
        let c = '<option value="null">Veuillez choisir un Article</option>';

        a.map((elem) => {
          c +=
            '<option value="' +
            elem.id_article +
            '">' +
            elem.libele_article +
            "</option>";
        }).join();

        document.getElementById("article").innerHTML = c;

        var js_ = document.createElement("script");
        js_.type = "text/javascript";
        js_.src = "../../vendors/select2/select2.min.js";
        document.body.appendChild(js_);
        var js = document.createElement("script");
        js.type = "text/javascript";
        js.src = "../../js/select2.js";
        document.body.appendChild(js);
      })
      .catch((error) => {
        console.error(
          "Failed to retrieve `entrepots`, `entrepot_article` , `articles` , `conditionnements` data : ",
          error
        );
      });
  }

  if (param == "E") {
    var E =
      "</div><div class='card-body'><ul class='nav nav-pills mb-3' id='pills-tab' role='tablist'><li class='nav-item'><button class='nav-link ' id='pills-contact-tab' data-toggle='pill' href='#pills-contact' role='tab' aria-controls='pills-contact' aria-selected='false' onclick=Etats_echanges('S')>Mouvements journaliers</button></li><li class='nav-item'><button class='nav-link active' id='pills-home-tab' data-toggle='pill' href='#pills-home' role='tab' aria-controls='pills-home' aria-selected='true' onclick=Etats_echanges('E')>Etat des stocks</button></li></ul>  <h4 class='card-title'>Liste des Articles et leurs quantité en stock</h4>";
    E +=
      '<table class="table table-striped"><thead id=""><tr><th>.</th><th style="width: 30%">Designation</th><th style="width: 15%"> Conditionnement </th><th style="width: 5%"> Quantité en stock </th> <th>Actions </th></tr></thead><tbody id="tab-article"></tbody></table>';
    document.getElementById("etats_ech").innerHTML = E;

    var js_ = document.createElement("script");
    js_.type = "text/javascript";
    js_.src = "../../vendors/select2/select2.min.js";
    document.body.appendChild(js_);
    var js = document.createElement("script");
    js.type = "text/javascript";
    js.src = "../../js/select2.js";
    document.body.appendChild(js);

    sequelize
      .query("SELECT * FROM  `articles`  ", {
        type: sequelize.QueryTypes.SELECT,
      })
      .then((artcl) => {
        console.log(artcl);

        artcl.map((elem) => {
          sequelize
            .query(
              "SELECT * FROM  `entrepots`, `entrepot_article` , `articles` , `conditionnements` WHERE  entrepots.id_entrepot = entrepot_article.entrepot_id  AND conditionnements.id_condmnt = entrepot_article.condmnt_id  AND articles.id_article = entrepot_article.article_id AND entrepots.id_entrepot = " +
                GET("id") +
                " AND articles.id_article = " +
                elem.id_article,

              {
                type: sequelize.QueryTypes.SELECT,
              }
            )
            .then((a) => {
              //console.log(artcl)
              let c = "";
              c += "<tr>";
              c +=
                '<td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td><td>' +
                elem.libele_article +
                '</td><td><select class="form-control" style=" color : black "  onchange=chargement_qte(this,' +
                elem.id_article +
                ")>";

              let st;
              nn = 0;
              a.map((e) => {
                c +=
                  '<option value="' +
                  e.condmnt_id +
                  '"  >' +
                  e.abreviation_condmnt +
                  "</option>";

                if (nn == 0) {
                  st = e.stock;
                  nn++;
                }
              }).join();

              c +=
                '</select></td><td><input type="number" class="form-control" name="" id="' +
                elem.id_article +
                '" readonly value="' +
                st +
                '"></td><td><div class="btn-wrapper"><a href="voir-article-stock.html?id_a=' +
                elem.id_article +
                "&id_e=" +
                GET("id") +
                '" type="button" class="btn btn-success text-white me-0" ></i>&nbsp; Mouvement</a></td>';
              c += "</tr>";

              document.getElementById("tab-article").innerHTML += c;

              var js_ = document.createElement("script");
              js_.type = "text/javascript";
              js_.src = "../../vendors/select2/select2.min.js";
              document.body.appendChild(js_);
              var js = document.createElement("script");
              js.type = "text/javascript";
              js.src = "../../js/select2.js";
              document.body.appendChild(js);
            })
            .catch((error) => {
              console.error(
                "Failed to retrieve `Entrepots`, `Entrepot_Article` , `Articles` , `Conditionnements` data : ",
                error
              );
            });
        });
      })
      .catch((error) => {
        console.error(
          "Failed to retrieve `Entrepots`, `Entrepot_Article` , `Articles` , `Conditionnements` data : ",
          error
        );
      });
  }
};

//***** Fonction de chargement des  conditionnements  dans la page detail entrepot à la selection de l'article***\\

const chargement_cdmnt_e = (id) => {
  sequelize
    .query(
      "SELECT * FROM `conditionnements` , `articles_condmnt` , `articles` WHERE conditionnements.id_condmnt = articles_condmnt.condmnt_id AND articles.id_article = articles_condmnt.article_id AND articles.id_article = " +
        id,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    )
    .then((art) => {
      //console.log("kslfqsjlqjsdfkqsffklqjl oil "+art)

      let c = "";
      c += '<option value="null">Choisir un conditionnement</option>';
      art
        .map((elem) => {
          c +=
            '<option value="' +
            elem.id_condmnt +
            '">' +
            elem.abreviation_condmnt +
            "</option>";
        })
        .join();

      document.getElementById("cdnmnt").innerHTML = c;

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
    })
    .catch((error) => {
      console.error("Failed to update Entrepots data : ", error);
    });
};

//***** Fonction de chargement des  conditionnements  dans la page detail entrepot à la selection de l'article***\\

const filtre_moov = () => {
  // S = '<tr><th>.</th><th>Date</th><th>Entrepot de provenance</th><th>destination</th><th>Actions</th></tr></thead>'
  // 	document.getElementById('entete').innerHTML = S
  // S = '<tr><th>.</th><th>Date</th><th>Entrepot de provenance</th><th>destination</th><th>Actions</th></tr></thead>'
  // 	document.getElementById('tab_moov').innerHTML = S

  date = "";
  for (var i = 0; i < 10; i++) {
    date += document.getElementById("date").value[i];
  }

  if (document.getElementById("article").value == "null") {
    if (document.getElementById("moov").value == "entr") {
      E =
        '<tr><th>.</th><th style="">Date</th><th style="">Article</th><th style="">Conditionnement</th><th style="width: 10%">Quantité Reçue</th><th style="">Provenance</th></tr>';

      document.getElementById("entete").innerHTML = E;

      //alert(document.getElementById('date').value[9])

      sequelize
        .query(
          "SELECT * FROM  `bonreceptions`, `bonreception_article` , `articles` , `conditionnements` WHERE  bonreceptions.id_bonreception = bonreception_article.bonreception_id  AND conditionnements.id_condmnt = bonreception_article.conditionnement_id  AND articles.id_article = bonreception_article.article_id AND  bonreceptions.entrepot_id = " +
            GET("id") +
            ' AND bonreceptions.date_reception = "' +
            date +
            '"',

          {
            type: sequelize.QueryTypes.SELECT,
          }
        )
        .then((BR) => {
          document.getElementById("tab_moov").innerHTML = "";

          BR.map((e) => {
            sequelize
              .query(
                "SELECT * FROM bomcommandes , fournisseur WHERE  bomcommandes.fournisseur_id = fournisseur.id_fournisseur AND id_boncmd = " +
                  e.boncmd_id,
                {
                  type: sequelize.QueryTypes.SELECT,
                }
              )
              .then((BC) => {
                //console.log(BC[0].nom_fournisseur)

                E = "<tr>";

                E +=
                  '<td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td>';
                E += '<td class="py-1">' + e.date_reception + "</td>";
                E += '<td class="py-1">' + e.libele_article + "</td>";
                E +=
                  "<td>" +
                  e.abreviation_condmnt +
                  '</td><td><input type="number" class="form-control"  readonly value="' +
                  e.qteReçu +
                  '"></td>';

                E += '<td class="py-1">' + BC[0].nom_fournisseur + "</td></tr>";

                E += "</tr>";

                document.getElementById("tab_moov").innerHTML += E;
              })
              .catch((error) => {
                console.error(
                  "Failed to retrieve Conditionnements data : ",
                  error
                );
              });
          }).join();
        })
        .catch((error) => {
          console.error(
            "Failed to retrieve `BonReceptions`, `BonReception_Article` , `Articles` , `Conditionnements` data : ",
            error
          );
        });
    } else {
      S =
        '<tr><th>.</th><th style="">Date</th><th style="">Article</th><th style="">Conditionnement</th><th style="width: 10%">Quantité Sortie</th><th style="">Destination</th></tr>';

      document.getElementById("entete").innerHTML = S;

      sequelize
        .query(
          "SELECT * FROM  `bonsortie`, `bonsortie_article` , `articles` , `conditionnements` WHERE  bonsortie.id_bonsortie= bonsortie_article.bonsortie_id  AND conditionnements.id_condmnt = bonsortie_article.conditionnement_id  AND articles.id_article = bonsortie_Article.article_id  AND bonsortie.provenance = " +
            GET("id") +
            ' AND bonsortie.date_bonsortie = "' +
            date +
            '"',

          {
            type: sequelize.QueryTypes.SELECT,
          }
        )
        .then((BS) => {
          document.getElementById("tab_moov").innerHTML = "";

          BS.map((e) => {
            //console.log(e.nom_client != )

            if (e.nom_client !== null) {
              SRT = "<tr>";

              SRT +=
                '<td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td>';
              SRT += '<td class="py-1">' + e.date_bonsortie + "</td>";
              SRT += '<td class="py-1">' + e.libele_article + "</td>";
              SRT +=
                "<td>" +
                e.abreviation_condmnt +
                '</td><td><input type="number" class="form-control"  readonly value="' +
                e.qteSortie +
                '"></td>';

              SRT += '<td class="py-1">' + e.nom_client + "</td></tr>";

              SRT += "</tr>";

              document.getElementById("tab_moov").innerHTML += SRT;
            } else {
              if (e.client_id !== null) {
                //console.log(e.client_id)

                sequelize
                  .query(
                    "SELECT * FROM clients WHERE  id_client = " + e.client_id,
                    {
                      type: sequelize.QueryTypes.SELECT,
                    }
                  )
                  .then((Client) => {
                    SRT = "<tr>";

                    SRT +=
                      '<td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td>';
                    SRT += '<td class="py-1">' + e.date_bonsortie + "</td>";
                    SRT += '<td class="py-1">' + e.libele_article + "</td>";
                    SRT +=
                      "<td>" +
                      e.abreviation_condmnt +
                      '</td><td><input type="number" class="form-control"  readonly value="' +
                      e.qteSortie +
                      '"></td>';

                    SRT +=
                      '<td class="py-1">' + Client[0].nom_client + "</td></tr>";

                    SRT += "</tr>";

                    document.getElementById("tab_moov").innerHTML += SRT;
                  })
                  .catch((error) => {
                    console.error(
                      "Failed to retrieve Conditionnements data : ",
                      error
                    );
                  });
              } else {
                sequelize
                  .query(
                    "SELECT * FROM entrepots WHERE  id_entrepot = " +
                      e.destination,
                    {
                      type: sequelize.QueryTypes.SELECT,
                    }
                  )
                  .then((d) => {
                    SRT = "<tr>";

                    SRT +=
                      '<td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td>';
                    SRT += '<td class="py-1">' + e.date_bonsortie + "</td>";
                    SRT += '<td class="py-1">' + e.libele_article + "</td>";
                    SRT +=
                      "<td>" +
                      e.abreviation_condmnt +
                      '</td><td><input type="number" class="form-control"  readonly value="' +
                      e.qteSortie +
                      '"></td>';

                    SRT +=
                      '<td class="py-1">' + d[0].libele_entrepot + "</td></tr>";

                    SRT += "</tr>";

                    document.getElementById("tab_moov").innerHTML += SRT;
                  })
                  .catch((error) => {
                    console.error(
                      "Failed to retrieve Conditionnements data : ",
                      error
                    );
                  });
              }
            }
            //  		sequelize.query(

            // 			'SELECT * FROM BomCommandes , Fournisseur WHERE  BomCommandes.fournisseur_id = Fournisseur.id_fournisseur AND id_boncmd = ' + e.boncmd_id,
            // 		{
            // 			type: sequelize.QueryTypes.SELECT
            // 		}
            // 	).then(BC => {

            // 		//console.log(BC[0].nom_fournisseur)

            // 		SRT+='<td class="py-1">'+BC[0].nom_fournisseur+'</td></tr>'

            // 	}).catch((error) => {

            // console.error('Failed to retrieve Conditionnements data : ', error);});
          }).join();
        })
        .catch((error) => {
          console.error(
            "Failed to retrieve `bonsortie`, `bonsortie_article` , `articles` , `conditionnements` data : ",
            error
          );
        });
    }
  } else {
    if (document.getElementById("moov").value == "entr") {
      E =
        '<tr><th>.</th><th style="">Date</th><th style="">Article</th><th style="">Conditionnement</th><th style="width: 10%">Quantité Reçue</th><th style="">Provenance</th></tr>';

      document.getElementById("entete").innerHTML = E;

      if (document.getElementById("cdnmnt").value == "null") {
        //alert(document.getElementById('date').value[9])

        sequelize
          .query(
            "SELECT * FROM  `bonreceptions`, `bonreception_article` , `articles` , `conditionnements` WHERE  bonreceptions.id_bonreception = bonreception_article.bonreception_id  AND conditionnements.id_condmnt = bonreception_article.conditionnement_id  AND articles.id_article = bonreception_article.article_id AND  bonreceptions.entrepot_id = " +
              GET("id") +
              " AND articles.id_article = " +
              document.getElementById("article").value +
              ' AND bonreceptions.date_reception = "' +
              date +
              '"',

            {
              type: sequelize.QueryTypes.SELECT,
            }
          )
          .then((BR) => {
            document.getElementById("tab_moov").innerHTML = "";

            BR.map((e) => {
              sequelize
                .query(
                  "SELECT * FROM bomcommandes , fournisseur WHERE  bomcommandes.fournisseur_id = fournisseur.id_fournisseur AND id_boncmd = " +
                    e.boncmd_id,
                  {
                    type: sequelize.QueryTypes.SELECT,
                  }
                )
                .then((BC) => {
                  //console.log(BC[0].nom_fournisseur)

                  E = "<tr>";

                  E +=
                    '<td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td>';
                  E += '<td class="py-1">' + e.date_reception + "</td>";
                  E += '<td class="py-1">' + e.libele_article + "</td>";
                  E +=
                    "<td>" +
                    e.abreviation_condmnt +
                    '</td><td><input type="number" class="form-control"  readonly value="' +
                    e.qteReçu +
                    '"></td>';

                  E +=
                    '<td class="py-1">' + BC[0].nom_fournisseur + "</td></tr>";

                  E += "</tr>";

                  document.getElementById("tab_moov").innerHTML += E;
                })
                .catch((error) => {
                  console.error(
                    "Failed to retrieve Conditionnements data : ",
                    error
                  );
                });
            }).join();
          })
          .catch((error) => {
            console.error(
              "Failed to retrieve `BonReceptions`, `BonReception_Article` , `Articles` , `Conditionnements` data : ",
              error
            );
          });
      } else {
        sequelize
          .query(
            "SELECT * FROM  `bonreceptions`, `bonreception_article` , `articles` , `conditionnements` WHERE  bonreceptions.id_bonreception = bonreception_article.bonreception_id  AND conditionnements.id_condmnt = bonreception_article.conditionnement_id  AND articles.id_article = bonreception_article.article_id AND  bonreceptions.entrepot_id = " +
              GET("id") +
              " AND articles.id_article = " +
              document.getElementById("article").value +
              " AND conditionnements.id_condmnt = " +
              document.getElementById("cdnmnt").value +
              ' AND bonreceptions.date_reception = "' +
              date +
              '"',

            {
              type: sequelize.QueryTypes.SELECT,
            }
          )
          .then((BR) => {
            document.getElementById("tab_moov").innerHTML = "";

            BR.map((e) => {
              sequelize
                .query(
                  "SELECT * FROM bomcommandes , fournisseur WHERE  bomcommandes.fournisseur_id = fournisseur.id_fournisseur AND id_boncmd = " +
                    e.boncmd_id,
                  {
                    type: sequelize.QueryTypes.SELECT,
                  }
                )
                .then((BC) => {
                  //console.log(BC[0].nom_fournisseur)

                  E = "<tr>";

                  E +=
                    '<td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td>';
                  E += '<td class="py-1">' + e.date_reception + "</td>";
                  E += '<td class="py-1">' + e.libele_article + "</td>";
                  E +=
                    "<td>" +
                    e.abreviation_condmnt +
                    '</td><td><input type="number" class="form-control"  readonly value="' +
                    e.qteReçu +
                    '"></td>';

                  E +=
                    '<td class="py-1">' + BC[0].nom_fournisseur + "</td></tr>";

                  E += "</tr>";

                  document.getElementById("tab_moov").innerHTML += E;
                })
                .catch((error) => {
                  console.error(
                    "Failed to retrieve Conditionnements data : ",
                    error
                  );
                });
            }).join();
          })
          .catch((error) => {
            console.error(
              "Failed to retrieve `BonReceptions`, `BonReception_Article` , `Articles` , `Conditionnements` data : ",
              error
            );
          });
      }
    } else {
      S =
        '<tr><th>.</th><th style="">Date</th><th style="">Article</th><th style="">Conditionnement</th><th style="width: 10%">Quantité Sortie</th><th style="">Destination</th></tr>';

      document.getElementById("entete").innerHTML = S;

      if (document.getElementById("cdnmnt").value == "null") {
        sequelize
          .query(
            "SELECT * FROM  `bonsortie`, `bonsortie_article` , `articles` , `conditionnements` WHERE  bonsortie.id_bonsortie= bonsortie_article.bonsortie_id  AND conditionnements.id_condmnt = bonsortie_article.conditionnement_id  AND articles.id_article = bonsortie_article.article_id  AND bonsortie.provenance = " +
              GET("id") +
              " AND articles.id_article = " +
              document.getElementById("article").value +
              ' AND bonsortie.date_bonsortie = "' +
              date +
              '"',

            {
              type: sequelize.QueryTypes.SELECT,
            }
          )
          .then((BS) => {
            document.getElementById("tab_moov").innerHTML = "";

            BS.map((e) => {
              //console.log(e.nom_client != )

              if (e.nom_client !== null) {
                SRT = "<tr>";

                SRT +=
                  '<td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td>';
                SRT += '<td class="py-1">' + e.date_bonsortie + "</td>";
                SRT += '<td class="py-1">' + e.libele_article + "</td>";
                SRT +=
                  "<td>" +
                  e.abreviation_condmnt +
                  '</td><td><input type="number" class="form-control"  readonly value="' +
                  e.qteSortie +
                  '"></td>';

                SRT += '<td class="py-1">' + e.nom_client + "</td></tr>";

                SRT += "</tr>";

                document.getElementById("tab_moov").innerHTML += SRT;
              } else {
                if (e.client_id !== null) {
                  //console.log(e.client_id)

                  sequelize
                    .query(
                      "SELECT * FROM clients WHERE  id_client = " + e.client_id,
                      {
                        type: sequelize.QueryTypes.SELECT,
                      }
                    )
                    .then((Client) => {
                      SRT = "<tr>";

                      SRT +=
                        '<td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td>';
                      SRT += '<td class="py-1">' + e.date_bonsortie + "</td>";
                      SRT += '<td class="py-1">' + e.libele_article + "</td>";
                      SRT +=
                        "<td>" +
                        e.abreviation_condmnt +
                        '</td><td><input type="number" class="form-control"  readonly value="' +
                        e.qteSortie +
                        '"></td>';

                      SRT +=
                        '<td class="py-1">' +
                        Client[0].nom_client +
                        "</td></tr>";

                      SRT += "</tr>";

                      document.getElementById("tab_moov").innerHTML += SRT;
                    })
                    .catch((error) => {
                      console.error(
                        "Failed to retrieve Conditionnements data : ",
                        error
                      );
                    });
                } else {
                  sequelize
                    .query(
                      "SELECT * FROM entrepots WHERE  id_entrepot = " +
                        e.destination,
                      {
                        type: sequelize.QueryTypes.SELECT,
                      }
                    )
                    .then((d) => {
                      SRT = "<tr>";

                      SRT +=
                        '<td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td>';
                      SRT += '<td class="py-1">' + e.date_bonsortie + "</td>";
                      SRT += '<td class="py-1">' + e.libele_article + "</td>";
                      SRT +=
                        "<td>" +
                        e.abreviation_condmnt +
                        '</td><td><input type="number" class="form-control"  readonly value="' +
                        e.qteSortie +
                        '"></td>';

                      SRT +=
                        '<td class="py-1">' +
                        d[0].libele_entrepot +
                        "</td></tr>";

                      SRT += "</tr>";

                      document.getElementById("tab_moov").innerHTML += SRT;
                    })
                    .catch((error) => {
                      console.error(
                        "Failed to retrieve Conditionnements data : ",
                        error
                      );
                    });
                }
              }
            }).join();
          })
          .catch((error) => {
            console.error(
              "Failed to retrieve `bonsortie`, `bonsortie_article` , `articles` , `conditionnements` data : ",
              error
            );
          });
      } else {
        sequelize
          .query(
            "SELECT * FROM  `bonsortie`, `bonsortie_article` , `articles` , `conditionnements` WHERE  bonsortie.id_bonsortie= bonsortie_article.bonsortie_id  AND conditionnements.id_condmnt = bonsortie_article.conditionnement_id  AND articles.id_article = bonsortie_article.article_id  AND bonsortie.provenance = " +
              GET("id") +
              " AND articles.id_article = " +
              document.getElementById("article").value +
              " AND conditionnements.id_condmnt = " +
              document.getElementById("cdnmnt").value +
              ' AND bonsortie.date_bonsortie = "' +
              date +
              '"',

            {
              type: sequelize.QueryTypes.SELECT,
            }
          )
          .then((BS) => {
            document.getElementById("tab_moov").innerHTML = "";

            BS.map((e) => {
              //console.log(e.nom_client != )

              if (e.nom_client !== null) {
                SRT = "<tr>";

                SRT +=
                  '<td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td>';
                SRT += '<td class="py-1">' + e.date_bonsortie + "</td>";
                SRT += '<td class="py-1">' + e.libele_article + "</td>";
                SRT +=
                  "<td>" +
                  e.abreviation_condmnt +
                  '</td><td><input type="number" class="form-control"  readonly value="' +
                  e.qteSortie +
                  '"></td>';

                SRT += '<td class="py-1">' + e.nom_client + "</td></tr>";

                SRT += "</tr>";

                document.getElementById("tab_moov").innerHTML += SRT;
              } else {
                if (e.client_id !== null) {
                  //console.log(e.client_id)

                  sequelize
                    .query(
                      "SELECT * FROM clients WHERE  id_client = " + e.client_id,
                      {
                        type: sequelize.QueryTypes.SELECT,
                      }
                    )
                    .then((Client) => {
                      SRT = "<tr>";

                      SRT +=
                        '<td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td>';
                      SRT += '<td class="py-1">' + e.date_bonsortie + "</td>";
                      SRT += '<td class="py-1">' + e.libele_article + "</td>";
                      SRT +=
                        "<td>" +
                        e.abreviation_condmnt +
                        '</td><td><input type="number" class="form-control"  readonly value="' +
                        e.qteSortie +
                        '"></td>';

                      SRT +=
                        '<td class="py-1">' +
                        Client[0].nom_client +
                        "</td></tr>";

                      SRT += "</tr>";

                      document.getElementById("tab_moov").innerHTML += SRT;
                    })
                    .catch((error) => {
                      console.error(
                        "Failed to retrieve Conditionnements data : ",
                        error
                      );
                    });
                } else {
                  sequelize
                    .query(
                      "SELECT * FROM entrepots WHERE  id_entrepot = " +
                        e.destination,
                      {
                        type: sequelize.QueryTypes.SELECT,
                      }
                    )
                    .then((d) => {
                      SRT = "<tr>";

                      SRT +=
                        '<td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td>';
                      SRT += '<td class="py-1">' + e.date_bonsortie + "</td>";
                      SRT += '<td class="py-1">' + e.libele_article + "</td>";
                      SRT +=
                        "<td>" +
                        e.abreviation_condmnt +
                        '</td><td><input type="number" class="form-control"  readonly value="' +
                        e.qteSortie +
                        '"></td>';

                      SRT +=
                        '<td class="py-1">' +
                        d[0].libele_entrepot +
                        "</td></tr>";

                      SRT += "</tr>";

                      document.getElementById("tab_moov").innerHTML += SRT;
                    })
                    .catch((error) => {
                      console.error(
                        "Failed to retrieve Conditionnements data : ",
                        error
                      );
                    });
                }
              }
            }).join();
          })
          .catch((error) => {
            console.error(
              "Failed to retrieve `BonSortie`, `BonSortie_Article` , `Articles` , `Conditionnements` data : ",
              error
            );
          });
      }
    }
  }
  // sequelize.query(

  // 				'SELECT * FROM `Conditionnements` , `Articles_Condmnt` , `Articles` WHERE Conditionnements.id_condmnt = Articles_Condmnt.condmnt_id AND Articles.id_article = Articles_Condmnt.article_id AND Articles.id_article = '+id,
  // 		{
  // 				type: sequelize.QueryTypes.SELECT
  // 		}

  // 	).then(art =>{

  // 		//console.log("kslfqsjlqjsdfkqsffklqjl oil "+art)

  // 		let c='';
  // 	    art.map((elem) => {

  // 			c+='<option value="'+elem.id_condmnt+'">'+elem.abreviation_condmnt+'</option>';

  //            }).join();

  // 		document.getElementById("cdnmnt").innerHTML = c;

  // 		var js_ = document.createElement('script');
  // 		js_.type='text/javascript';
  // 		js_.src = '../../vendors/select2/select2.min.js';
  // 		//document.body.removeChild(js_)
  // 		document.body.appendChild(js_)
  // 		var js = document.createElement('script');
  // 		js.type='text/javascript';
  // 		js.src = '../../js/select2.js';
  // 		//document.body.removeChild(js)
  // 		document.body.appendChild(js)

  // 				}).catch((error) => {console.error('Failed to update Entrepots data : ', error) });
};

///////-------SECTION ARTICLES----------\\\\\\\\\

//***** Function to load and display all articles in a list ***\\

const show_article = () => {
  // Perform a query

  sequelize
    .query("SELECT * FROM articles ORDER BY libele_article ASC", {
      type: sequelize.QueryTypes.SELECT,
    })
    .then((article_query) => {
      console.log(article_query);

      let c = "";

      article_query
        .map((article) => {
          c += "<tr>";
          c +=
            '<td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td><td>' +
            article.libele_article +
            "</td><td>" +
            article.description +
            "</td>";

          c += '<td><div class="btn-wrapper">';
          c +=
            '<a href="article_details.html?article_id=' +
            article.id_article +
            "&article_name=" +
            article.libele_article +
            '" type="button" class="btn btn-primary text-white me-0" ></i>&nbsp; Consulter</a></div></td>';
          c += '<td><div class="btn-wrapper">';
          c +=
            '<a href="article_details.html?article_id=' +
            article.id_article +
            "&article_name=" +
            article.libele_article +
            '" type="button" class="btn btn-success text-white me-0" ></i>&nbsp; Modifier</a>';
          c +=
            '<button type="button" class="btn btn-danger text-white me-0" onclick="delete_article_from_database(' +
            article.id_article +
            ')"></i>&nbsp; Supprimer</button></div></td>';
          c += "</tr>";
        })
        .join();
      document.getElementById("tab-article").innerHTML = c;
      document.getElementById("total_registred_articles").innerHTML =
        article_query.length;
    })
    .catch((error) => {
      console.error("Failed to retrieve Article data : ", error);
    });
};

const show_article_details = (article_id) => {
  // connection = db_connect();
  // Perform a query

  sequelize
    .query("SELECT * FROM articles WHERE id_article = ?", {
      replacements: [article_id],
      type: sequelize.QueryTypes.SELECT,
    })
    .then((article_conditionment_query) => {
      console.log(article_conditionment_query);
      document.getElementById("article_name").innerHTML =
        article_conditionment_query[0].libele_article;
    })
    .catch((error) => {
      console.error("Failed to retrieve Article data : ", error);
    });

  sequelize
    .query("SELECT * FROM articles_condmnt WHERE article_id = ?", {
      replacements: [article_id],
      type: sequelize.QueryTypes.SELECT,
    })
    .then((article_conditionment_query) => {
      console.log(article_conditionment_query);

      let c = "";
      let index = 1;
      article_conditionment_query
        .map((article_conditionment) => {
          sequelize
            .query(
              "SELECT * FROM entrepot_article, conditionnements WHERE entrepot_article.article_id = :id_article AND entrepot_article.condmnt_id = :id_condmnt AND conditionnements.id_condmnt = :id_condmnt",
              {
                replacements: {
                  id_article: article_id,
                  id_condmnt: article_conditionment.condmnt_id,
                },
                type: sequelize.QueryTypes.SELECT,
              }
            )
            .then((article_details_query) => {
              console.log("yooy");
              console.log(article_details_query);
              console.log("yooy");

              c +=
                '<tr><td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td><td id="conditionment' +
                index +
                '">' +
                article_details_query[0].libele_condmnt +
                '</td><td id="unit_price' +
                index +
                '">' +
                article_conditionment.prix_vente +
                '</td><td id="quantity' +
                index +
                '">' +
                article_details_query[0].stock +
                "</td>";

              c +=
                '<td><div class="btn-wrapper"><a href="#Update_Article" type="button" class="btn btn-success text-white me-0" onclick="fillElementForUpdate(' +
                index +
                ')" >&nbsp; Modifier</a><button type="button" class="btn btn-danger text-white me-0" onclick="delete_article_details_from_database(' +
                article_id +
                "," +
                article_conditionment.condmnt_id +
                "," +
                article_details_query[0].entrepot_id +
                ')"></i>&nbsp; Supprimer</button></td></tr>';

              index++;
              document.getElementById("tab-article_details").innerHTML = c;
            })
            .catch((error) => {
              console.error(
                "Failed to retrieve Entrepot Article data : ",
                error
              );
            });
        })
        .join();
    })
    .catch((error) => {
      console.error("Failed to retrieve Conditionnment Article data : ", error);
    });
};

//***** Function to load conditionment ***\\

const load_conditionment_items = (item) => {
  // Perform a query

  sequelize
    .query("SELECT * FROM conditionnements", {
      type: sequelize.QueryTypes.SELECT,
    })
    .then((Conditionment_query) => {
      console.log(Conditionment_query[0].id_condmnt);

      let c = "<option value=0>Veuillez choisir un Conditionnement</option>";
      Conditionment_query.map((conditionment_item) => {
        c += "<option>" + conditionment_item.libele_condmnt + "</option>";
      }).join();

      document.getElementById("conditionment_items" + item).innerHTML = c;

      var js_ = document.createElement("script");
      js_.type = "text/javascript";
      js_.src = "../../vendors/select2/select2.min.js";
      document.body.appendChild(js_);
      var js = document.createElement("script");
      js.type = "text/javascript";
      js.src = "../../js/select2.js";
      document.body.appendChild(js);
    })
    .catch((error) => {
      console.error("Failed to retrieve Conditionment data : ", error);
    });
};

//***** Function to register new article ***\\

const insert_article = (article_info) => {
  console.log(article_info);

  // Perform a query

  // Insertquery to add an article into database
  sequelize
    .query(
      "INSERT INTO articles (id_article, libele_article, description) VALUES (DEFAULT, :libele_article, :description)",
      {
        replacements: {
          libele_article: article_info.article_name,
          description: article_info.article_name,
        },
        type: sequelize.QueryTypes.INSERT,
      }
    )
    .then((article_query) => {
      console.log(article_query);

      article_info.article_items.map((conditionment_element) => {
        sequelize
          .query("SELECT * FROM conditionnements WHERE libele_condmnt = ?", {
            replacements: [conditionment_element.conditionment_items],
            type: sequelize.QueryTypes.SELECT,
          })
          .then((conditionment_query) => {
            console.log(conditionment_query[0].id_condmnt);

            sequelize
              .query(
                "INSERT INTO articles_condmnt (condmnt_id, article_id, prix_vente) VALUES (:condmnt_id, :article_id, :prix_vente)",
                {
                  replacements: {
                    condmnt_id: conditionment_query[0].id_condmnt,
                    article_id: article_query[0],
                    prix_vente: parseFloat(
                      conditionment_element.article_unit_price
                    ),
                  },
                  type: sequelize.QueryTypes.INSERT,
                }
              )
              .then((query_article_conditionment) => {
                console.log(query_article_conditionment);

                sequelize
                  .query("SELECT * FROM entrepots", {
                    type: sequelize.QueryTypes.SELECT,
                  })
                  .then((entrepot_query) => {
                    console.log(entrepot_query[0].id_entrepot);

                    entrepot_query.map((entrepot_element) => {
                      sequelize
                        .query(
                          "INSERT INTO entrepot_article (entrepot_id, article_id, condmnt_id, stock) VALUES (:entrepot_id, :article_id, :condmnt_id, :stock)",
                          {
                            replacements: {
                              entrepot_id: entrepot_element.id_entrepot,
                              article_id: article_query[0],
                              condmnt_id: conditionment_query[0].id_condmnt,
                              stock: 0,
                            },
                            type: sequelize.QueryTypes.INSERT,
                          }
                        )
                        .then((query_article_entrepot) => {
                          console.log(query_article_entrepot);
                          document.getElementById("message").innerHTML =
                            '<strong style="color: green;">Enregistrement réussi. Veuillez actualiser la page pour voir affiché l\'article enregistré.</strong>';

                          window.location.reload();
                          // alert("L'article a été crée avec succès\n\nVeuillez actualiser la page par un clic sur le bouton Actualiser")
                        })
                        .catch((error) => {
                          console.error(
                            "Failed to insert Article_entrepot data : ",
                            error
                          );
                        });
                    });
                  })
                  .catch((error) => {
                    console.error("Failed to retrieve Entrepot data : ", error);
                  });
              })
              .catch((error) => {
                console.error(
                  "Failed to insert Article_Conditionment data : ",
                  error
                );
              });
          })
          .catch((error) => {
            console.error("Failed to retrieve conditionments data : ", error);
          });
      });
    })
    .catch((error) => {
      console.error("Failed to insert article data : ", error);
    });
};

//***** Function to update informations concerning a specific article ***\\

const update_article_details = (globalArticleInfo) => {
  console.log(globalArticleInfo);

  globalArticleInfo.article_items.map((conditionment_element) => {
    sequelize
      .query("SELECT * FROM conditionnements WHERE libele_condmnt = ?", {
        replacements: [conditionment_element.conditionment_items],
        type: sequelize.QueryTypes.SELECT,
      })
      .then((conditionment_query) => {
        console.log(conditionment_query[0].id_condmnt);

        sequelize
          .query(
            "UPDATE articles_condmnt SET prix_vente = :prix_vente WHERE article_id = :id_article AND condmnt_id = :id_conditionment",
            {
              replacements: {
                id_conditionment: conditionment_query[0].id_condmnt,
                id_article: globalArticleInfo.article_id,
                prix_vente: parseFloat(
                  conditionment_element.article_unit_price
                ),
              },
              type: sequelize.QueryTypes.UPDATE,
            }
          )
          .then((query_article_conditionment) => {
            console.log(query_article_conditionment);

            sequelize
              .query(
                "SELECT * FROM entrepots WHERE libele_entrepot = 'Boutique'",
                {
                  type: sequelize.QueryTypes.SELECT,
                }
              )
              .then((entrepot_query) => {
                console.log(entrepot_query[0].id_entrepot);

                sequelize
                  .query(
                    "UPDATE entrepot_article SET stock = :stock WHERE article_id = :id_article AND entrepot_id = :entrepot_id AND condmnt_id = :id_conditionment",
                    {
                      replacements: {
                        entrepot_id: entrepot_query[0].id_entrepot,
                        id_article: globalArticleInfo.article_id,
                        id_conditionment: conditionment_query[0].id_condmnt,
                        stock: parseInt(conditionment_element.article_quantity),
                      },
                      type: sequelize.QueryTypes.UPDATE,
                    }
                  )
                  .then((query_article_entrepot) => {
                    console.log(query_article_entrepot);
                  })
                  .catch((error) => {
                    console.error(
                      "Failed to insert Article_entrepot data : ",
                      error
                    );
                  });
              })
              .catch((error) => {
                console.error("Failed to retrieve Entrepot data : ", error);
              });
          })
          .catch((error) => {
            console.error(
              "Failed to insert Article_Conditionment data : ",
              error
            );
          });
      })
      .catch((error) => {
        console.error("Failed to retrieve conditionments data : ", error);
      });
  });
  setTimeout(() => {
    window.location.reload();
  }, 500);
};

const insert_article_details = (globalArticleInfo) => {
  console.log(globalArticleInfo);
  globalArticleInfo.article_items.map((conditionment_element) => {
    sequelize
      .query("SELECT * FROM conditionnements WHERE libele_condmnt = ?", {
        replacements: [conditionment_element.conditionment_items],
        type: sequelize.QueryTypes.SELECT,
      })
      .then((conditionment_query) => {
        console.log(conditionment_query[0].id_condmnt);

        sequelize
          .query(
            "INSERT INTO articles_condmnt (condmnt_id, article_id, prix_vente) VALUES (:condmnt_id, :article_id, :prix_vente)",
            {
              replacements: {
                condmnt_id: conditionment_query[0].id_condmnt,
                article_id: globalArticleInfo.article_id,
                prix_vente: parseFloat(
                  conditionment_element.article_unit_price
                ),
              },
              type: sequelize.QueryTypes.INSERT,
            }
          )
          .then((query_article_conditionment) => {
            console.log(query_article_conditionment);

            sequelize
              .query("SELECT * FROM entrepots", {
                type: sequelize.QueryTypes.SELECT,
              })
              .then((entrepot_query) => {
                console.log(entrepot_query[0].id_entrepot);

                entrepot_query.map((entrepot_element) => {
                  sequelize
                    .query(
                      "INSERT INTO entrepot_article (entrepot_id, article_id, condmnt_id, stock) VALUES (:entrepot_id, :article_id, :condmnt_id, :stock)",
                      {
                        replacements: {
                          entrepot_id: entrepot_element.id_entrepot,
                          article_id: globalArticleInfo.article_id,
                          condmnt_id: conditionment_query[0].id_condmnt,
                          stock: conditionment_element.article_quantity,
                        },
                        type: sequelize.QueryTypes.INSERT,
                      }
                    )
                    .then((query_article_entrepot) => {
                      console.log(query_article_entrepot);
                    })
                    .catch((error) => {
                      console.error(
                        "Failed to insert Article_entrepot data : ",
                        error
                      );
                    });
                });
              })
              .catch((error) => {
                console.error("Failed to retrieve Entrepot data : ", error);
              });
          })
          .catch((error) => {
            console.error(
              "Failed to insert Article_Conditionment data : ",
              error
            );
          });
      })
      .catch((error) => {
        console.error("Failed to retrieve conditionments data : ", error);
      });
  });
  setTimeout(() => {
    window.location.reload();
  }, 500);
};

const delete_article = (article_id) => {
  sequelize
    .query("DELETE FROM articles WHERE id_article = ?", {
      replacements: [article_id],
      type: sequelize.QueryTypes.DELETE,
    })
    .then((delete_article_query) => {
      window.location.reload();
    })
    .catch((error) => {
      console.error("Failed to DELETE Article data : ", error);
    });
};

const delete_article_details = (article_id, conditionment_id, entrepot_id) => {
  sequelize
    .query(
      "DELETE FROM articles_condmnt, entrepot_article WHERE articles_condmnt.article_id = :article_id AND articles_condmnt.condmnt_id = :conditionment_id AND entrepot_article.article_id = :article_id AND entrepot_article.condmnt_id = :conditionment_id AND entrepot_article.entrepot_id = :entrepot_id",
      {
        replacements: {
          article_id: article_id,
          conditionment_id: conditionment_id,
          entrepot_id: entrepot_id,
        },
        type: sequelize.QueryTypes.DELETE,
      }
    )
    .then((delete_article_query) => {
      window.location.reload();
    })
    .catch((error) => {
      console.error("Failed to DELETE Article data : ", error);
    });
};

///////-------SECTION ARRIVALS----------\\\\\\\\\

//***** Function to load and display all articles in a list ***\\

const show_arrivals = () => {
  // Perform a query

  sequelize
    .query(
      "SELECT * FROM BonSortie, Entrepots WHERE Entrepots.id_entrepot = BonSortie.provenance AND BonSortie.status=1",
      {
        type: sequelize.QueryTypes.SELECT,
      }
    )
    .then((arrival_query) => {
      console.log(arrival_query);

      let c = "";

      arrival_query
        .map((arrival) => {
          c += "<tr>";
          c +=
            '<td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td><td>' +
            arrival.libele_entrepot +
            "</td><td>" +
            arrival.date_bonsortie +
            "</td>";

          c +=
            '<td><div class="btn-wrapper"><a href="arrivee_reception.html?bonsortie_id=' +
            arrival.id_bonsortie +
            "&hideButton=" +
            true +
            '" type="button" class="btn btn-primary text-white me-0" ></i>&nbsp; Consulter</a></div></td>';
          c +=
            '<td><div class="btn-wrapper"><div class="badge badge-opacity-success">Reçu</div></div></td>';

          // c +=
          //   '<td><div class="btn-wrapper"><a href="article_details.html?reception_id=' +
          //   arrival.id_reception +
          //   '" type="button" class="btn btn-success text-white me-0" ></i>&nbsp; Imprimer</a><button type="button" class="btn btn-danger text-white me-0" onclick="delete_arrivals_from_database(' +
          //   arrival.id_reception +
          //   ')"></i>&nbsp; Supprimer</button></div></td>';
          c += "</tr>";
        })
        .join();
      document.getElementById("tab-arrivals").innerHTML = c;
    })
    .catch((error) => {
      console.error("Failed to retrieve Arrivals data : ", error);
    });
};

const show_arrival_details = (reception_id) => {
  // connection = db_connect();
  // Perform a query

  sequelize
    .query("SELECT * FROM Articles_Condmnt WHERE article_id = ?", {
      replacements: [article_id],
      type: sequelize.QueryTypes.SELECT,
    })
    .then((article_conditionment_query) => {
      console.log(article_conditionment_query);

      let c = "";
      let index = 1;
      article_conditionment_query
        .map((article_conditionment) => {
          sequelize
            .query(
              "SELECT * FROM Entrepot_Article, Conditionnements WHERE Entrepot_Article.article_id = :id_article AND Entrepot_Article.condmnt_id = :id_condmnt AND Conditionnements.id_condmnt = :id_condmnt",
              {
                replacements: {
                  id_article: article_id,
                  id_condmnt: article_conditionment.condmnt_id,
                },
                type: sequelize.QueryTypes.SELECT,
              }
            )
            .then((article_details_query) => {
              console.log("yooy");
              console.log(article_details_query);

              c +=
                '<tr><td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td><td id="conditionment' +
                index +
                '">' +
                article_details_query[0].libele_condmnt +
                '</td><td id="unit_price' +
                index +
                '">' +
                article_conditionment.prix_vente +
                '</td><td id="quantity' +
                index +
                '">' +
                article_details_query[0].stock +
                "</td>";

              c +=
                '<td><div class="btn-wrapper"><a href="#Form_Article" type="button" class="btn btn-success text-white me-0" onclick="fillElementForUpdate(' +
                index +
                ')" >&nbsp; Modifier</a><button type="button" class="btn btn-danger text-white me-0" onclick="delete_article_details_from_database(' +
                article_id +
                "," +
                article_conditionment.condmnt_id +
                "," +
                article_details_query[0].entrepot_id +
                ')"></i>&nbsp; Supprimer</button></td></tr>';

              index++;
              document.getElementById("tab-article_details").innerHTML = c;
            })
            .catch((error) => {
              console.error(
                "Failed to retrieve Entrepot Article data : ",
                error
              );
            });
        })
        .join();
    })
    .catch((error) => {
      console.error("Failed to retrieve Conditionnment Article data : ", error);
    });
};

const load_new_arrivals = () => {
  // Perform a query

  sequelize
    .query(
      "SELECT * FROM Bonsortie, Entrepots WHERE Entrepots.id_entrepot = Bonsortie.provenance AND BonSortie.status = 0 AND Bonsortie.destination IS NOT NULL",
      {
        type: sequelize.QueryTypes.SELECT,
      }
    )
    .then((new_arrival_query) => {
      console.log(new_arrival_query);

      let c = "";

      new_arrival_query
        .map((new_arrival) => {
          c += "<tr>";
          c +=
            '<td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td><td>' +
            new_arrival.libele_entrepot +
            "</td><td>" +
            new_arrival.date_bonsortie +
            "</td>";

          c += '<td> <div class="btn-wrapper">';
          c +=
            '<a class="btn btn-primary text-white me-0" href="arrivee_reception.html?bonsortie_id=' +
            new_arrival.id_bonsortie +
            "&hideButton=" +
            true +
            '"><i class="icon-download"></i> Recevoir</a></div></td>';
          // c += '<td> <div class="btn-wrapper"><button onclick="getBillPdfToPrint(' +
          //   new_arrival.id_bonsortie +
          // ')" type="button"  class="btn btn-success text-white me-0"><i class="icon-printer"></i> Print</button></div></td>';

          c += "</tr>";
        })
        .join();
      document.getElementById("tab-new-arrivals").innerHTML = c;
    })
    .catch((error) => {
      console.error("Failed to retrieve New Arrivals data : ", error);
    });
};

const show_new_arrival_details = (bonsortie_id) => {
  // connection = db_connect();
  // Perform a query

  sequelize
    .query(
      "SELECT * FROM Bonsortie_Article, Articles, Conditionnements WHERE Bonsortie_Article.bonsortie_id = :id_bonsortie AND  Articles.id_article = Bonsortie_Article.article_id AND Conditionnements.id_condmnt = Bonsortie_Article.conditionnement_id",
      {
        replacements: { id_bonsortie: bonsortie_id },
        type: sequelize.QueryTypes.SELECT,
      }
    )
    .then((new_arrival_details_query) => {
      console.log(new_arrival_details_query);

      let c = "";

      let index = 1;

      new_arrival_details_query
        .map((element) => {
          c += "<tr>";
          c +=
            '<td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td><td id="article' +
            index +
            '">' +
            element.libele_article +
            '</td><td id="article_conditionment' +
            index +
            '">' +
            element.libele_condmnt +
            '</td><td id="quantity' +
            index +
            '">' +
            element.qteSortie +
            "</td>";
          // c +=
          //   '<td><div class="btn-wrapper"><button onclick="delete_sell_details_from_database(' +
          //   element.bonsortie_id +
          //   "," +
          //   element.article_id +
          //   "," +
          //   element.conditionnement_id +
          //   ')" type="button" class="btn btn-success text-white me-0" >Recevoir</button></div></td>';
          c += "</tr>";

          index++;
        })
        .join();

      document.getElementById("tab_new_arrival_details").innerHTML = c;
    })
    .catch((error) => {
      console.error("Failed to retrieve Bills Details data : ", error);
    });
};

const receiveNewBonSortie = (bonsortie_id) => {
  // connection = db_connect();
  // Perform a query

  // Perform a query

  sequelize
    .query(
      "UPDATE BonSortie SET status = 1 WHERE id_bonsortie = :bonsortie_id",
      {
        replacements: {
          bonsortie_id: bonsortie_id,
        },
        type: sequelize.QueryTypes.UPDATE,
      }
    )
    .then((customer_query) => {
      console.log(customer_query);

      window.open("arrivee.html", "_self");
    })
    .catch((error) => {
      console.error("Failed to Update a BonSortie in database : ", error);
    });
};

///////-------SECTION CLIENTS----------\\\\\\\\\

//***** Function to load and display all customer in a list ***\\

const show_customer = () => {
  // Perform a query

  sequelize
    .query("SELECT * FROM clients", {
      type: sequelize.QueryTypes.SELECT,
    })
    .then((customer_query) => {
      console.log(customer_query);

      let c = "";
      customer_query
        .map((element) => {
          c += "<tr>";
          c +=
            '<td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td><td>' +
            element.nom_client +
            "</td><td>" +
            element.telephone_client +
            "</td>";
          c += '<td><div class="btn-wrapper">';
          c +=
            '<a href="customer_details.html?id_client=' +
            element.id_client +
            "&customer_phone=" +
            element.telephone_client +
            "&customer_name=" +
            element.nom_client +
            "&update_parameter=" +
            true +
            '" type="button" class="btn btn-primary text-white me-0" ></i>&nbsp; Consulter</a></div></td>';
          c += '<td><div class="btn-wrapper">';
          c +=
            '<a href="customer_details.html?id_client=' +
            element.id_client +
            "&customer_phone=" +
            element.telephone_client +
            "&customer_name=" +
            element.nom_client +
            "&update_parameter=" +
            false +
            '" type="button" class="btn btn-success text-white me-0" ></i>&nbsp; Modifier</a>';
          c +=
            '<button type="button" class="btn btn-danger text-white me-0" onclick="delete_customer_from_database(' +
            element.id_client +
            ')"></i>&nbsp; Supprimer</button></td>';
          c += "</tr>";
        })
        .join();

      document.getElementById("tab-customer").innerHTML = c;
    })
    .catch((error) => {
      console.error("Failed to retrieve Customer data : ", error);
    });
};

const show_customer_bills = (id_client) => {
  // Perform a query

  sequelize
    .query("SELECT * FROM factures WHERE client_id = ?", {
      replacements: [id_client],
      type: sequelize.QueryTypes.SELECT,
    })
    .then((bill_query) => {
      console.log(bill_query);

      let c = "";
      bill_query
        .map((element) => {
          c += "<tr>";
          c +=
            '<td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td><td>' +
            element.id_facture +
            "</td><td>FCFA " +
            element.reduction +
            "</td><td>FCFA " +
            element.montant__facture +
            "</td><td>" +
            element.reglement_facture +
            "</td><td>" +
            element.date_facture +
            "</td>";
          c +=
            '<td><div class="btn-wrapper"><a href="vendeur_details.html?id_facture=' +
            element.id_facture +
            "&update_parameter=" +
            true +
            "&total=" +
            element.montant__facture +
            '" type="button" class="btn btn-primary text-white me-0"></i>&nbsp; <i class="icon-eye"></i></a><a href="vendeur_details.html#NewClient?id_facture=' +
            element.id_facture +
            "&update_parameter=" +
            false +
            "&total=" +
            element.montant__facture +
            '" type="button" class="btn btn-warning text-white me-0""></i>&nbsp; Modifier</a><button href="vendeur_details.html?id_facture=' +
            element.id_facture +
            '" type="button" class="btn btn-success text-white me-0" ></i>&nbsp; <i class="icon-printer"></i></button><button onclick="delete_sell_from_database(' +
            element.id_facture +
            ')" type="button" class="btn btn-danger text-white me-0" ></i>&nbsp; <i class="icon-trash"></i></button></td>';
          c += "</tr>";
        })
        .join();

      document.getElementById("tab_article_sells").innerHTML = c;
    })
    .catch((error) => {
      console.error("Failed to retrieve Bills data : ", error);
    });
};

const show_customer_account_status = (id_client) => {
  // Perform a query

  sequelize
    .query("SELECT * FROM compte_client WHERE client_id = ?", {
      replacements: [id_client],
      type: sequelize.QueryTypes.SELECT,
    })
    .then((customer_account_query) => {
      console.log(customer_account_query);

      document.getElementById("amount_to_pay").value =
        customer_account_query[0].montant_a_payer;
      document.getElementById("amount_paid").value =
        customer_account_query[0].montant_regler;
      document.getElementById("amount").value = customer_account_query[0].solde;
    })
    .catch((error) => {
      console.error("Failed to retrieve Customer Bills data : ", error);
    });
};

//***** Function to insert customer in database ***\\

const insert_customer = (customer_name, customer_phone) => {
  // Perform a query

  sequelize
    .query(
      "INSERT INTO clients (id_client, nom_client, telephone_client) VALUES (DEFAULT, :nom_client, :telephone_client)",
      {
        replacements: {
          nom_client: customer_name,
          telephone_client: customer_phone,
        },
        type: sequelize.QueryTypes.INSERT,
      }
    )
    .then((customer_query) => {
      console.log(customer_query[0]);

      sequelize
        .query(
          "INSERT INTO compte_client (id_compteC, montant_a_payer, montant_regler, solde, client_id) VALUES (DEFAULT, :montant_a_payer, :montant_regler, :solde, :client_id)",
          {
            replacements: {
              montant_a_payer: 0.0,
              montant_regler: 0.0,
              solde: 0.0,
              client_id: customer_query[0],
            },
            type: sequelize.QueryTypes.INSERT,
          }
        )
        .then((customer_account_query) => {
          console.log(customer_account_query);

          sequelize
            .query(
              "INSERT INTO factures (id_facture, date_facture, montant__facture, reglement_facture, client_id, vendeur_id, caissier_id, reduction) VALUES (DEFAULT, :date_facture, :montant__facture, :reglement_facture, :client_id, :vendeur_id, :caissier_id, :reduction)",
              {
                replacements: {
                  date_facture: new Date(),
                  montant__facture: 0.0,
                  reglement_facture: "Credit",
                  client_id: customer_query[0],
                  vendeur_id: 1,
                  caissier_id: 1,
                  reduction: 0.0,
                },
                type: sequelize.QueryTypes.INSERT,
              }
            )
            .then((bill_query) => {
              console.log(bill_query);

              window.location.reload();
            })
            .catch((error) => {
              console.error(
                "Failed to Insert a Customer's bill in database : ",
                error
              );
            });
        })
        .catch((error) => {
          console.error(
            "Failed to Insert a Customer's customer_account in database : ",
            error
          );
        });
    })
    .catch((error) => {
      console.error("Failed to Insert a Customer in database : ", error);
    });
};

//***** Function to insert customer in database ***\\

const update_customer = (customer_name, customer_phone, customer_id) => {
  // Perform a query

  sequelize
    .query(
      "UPDATE clients SET nom_client = :nom_client, telephone_client = :telephone_client WHERE id_client = :id_client",
      {
        replacements: {
          id_client: customer_id,
          nom_client: customer_name,
          telephone_client: customer_phone,
        },
        type: sequelize.QueryTypes.UPDATE,
      }
    )
    .then((customer_query) => {
      console.log(customer_query);
    })
    .catch((error) => {
      console.error("Failed to Update a Customer in database : ", error);
    });
};

const update_customer_account = (amount_to_pay, customer_id, caissier_id) => {
  // Perform a query

  // Update Customer Account
  sequelize
    .query(
      "SELECT * FROM clients, compte_client WHERE clients.id_client = ? AND compte_client.client_id = clients.id_client",
      {
        replacements: [customer_id],
        type: sequelize.QueryTypes.SELECT,
      }
    )
    .then((customer_account_query) => {
      console.log(customer_account_query);

      sequelize
        .query(
          "UPDATE compte_client SET montant_regler = :montant_regler, solde = :solde WHERE client_id = :id_client",
          {
            replacements: {
              montant_regler:
                customer_account_query[0].montant_regler +
                parseFloat(amount_to_pay),
              solde:
                customer_account_query[0].montant_a_payer -
                (customer_account_query[0].montant_regler +
                  parseFloat(amount_to_pay)),
              id_client: customer_account_query[0].client_id,
            },
            type: sequelize.QueryTypes.UPDATE,
          }
        )
        .then((result) => {
          console.log(result);

          sequelize
            .query(
              "INSERT INTO reçues (id_reçue, date, montant, compteC_id, caissier_id) VALUES (DEFAULT, :date, :montant, :compteC_id, :caissier_id)",
              {
                replacements: {
                  date: new Date(),
                  montant: parseFloat(amount_to_pay),
                  compteC_id: customer_account_query[0].id_compteC,
                  caissier_id: caissier_id,
                },
                type: sequelize.QueryTypes.INSERT,
              }
            )
            .then((bill_query) => {
              console.log(bill_query);

              generateReceiptPDFFile(
                customer_account_query[0].nom_client,
                customer_account_query[0].montant_a_payer,
                customer_account_query[0].montant_regler +
                  parseFloat(amount_to_pay),
                customer_account_query[0].montant_a_payer -
                  (customer_account_query[0].montant_regler +
                    parseFloat(amount_to_pay)),
                parseFloat(amount_to_pay)
              );
            })
            .catch((error) => {
              console.error(
                "Failed to Insert a Customer's receipt in database : ",
                error
              );
            });
        })
        .catch((error) => {
          console.error("Failed to update customer account data : ", error);
        });
    })
    .catch((error) => {
      console.error("Failed to retreive Customer Account data : ", error);
    });
};

const delete_customer = (customer_id) => {
  sequelize
    .query("DELETE FROM Clients WHERE id_client = ?", {
      replacements: [customer_id],
      type: sequelize.QueryTypes.DELETE,
    })
    .then((delete_article_query) => {
      window.location.reload();
      // alert("Client Supprimé avec success.");
    })
    .catch((error) => {
      console.error("Failed to DELETE Customer data : ", error);
    });
};

///////-------SECTION FACTURES / VEMTES----------\\\\\\\\\

//***** Function to load and display all sells in a list ***\\

const show_sells = () => {
  // Perform a query

  sequelize
    .query("SELECT * FROM factures ORDER BY id_facture DESC", {
      type: sequelize.QueryTypes.SELECT,
    })
    .then((bill_query) => {
      console.log(bill_query);

      let c = "";
      bill_query
        .map((element) => {
          c += "<tr>";
          c +=
            '<td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td><td>' +
            element.id_facture +
            "</td><td>" +
            element.nom_client +
            "</td><td>FCFA " +
            element.reduction +
            "</td><td>FCFA " +
            element.montant__facture +
            "</td><td>" +
            element.reglement_facture +
            "</td><td>" +
            element.date_facture +
            "</td>";
          c += '<td><div class="btn-wrapper">';
          c +=
            '<a href="vendeur_details.html?id_facture=' +
            element.id_facture +
            "&update_parameter=" +
            true +
            "&total=" +
            element.montant__facture +
            '" type="button" class="btn btn-primary text-white me-0"></i>&nbsp; <i class="icon-eye"></i></a>';
          c +=
            '<a href="vendeur_details.html?id_facture=' +
            element.id_facture +
            "&update_parameter=" +
            false +
            "&total=" +
            element.montant__facture +
            '" type="button" class="btn btn-warning text-white me-0""></i>&nbsp; Modifier</a>';
          c +=
            '<button onclick="getBillPdfToPrint(' +
            element.id_facture +
            ')" type="button" class="btn btn-success text-white me-0" ></i>&nbsp; <i class="icon-printer"></i></button><button onclick="delete_sell_from_database(' +
            element.id_facture +
            ')" type="button" class="btn btn-danger text-white me-0" ></i>&nbsp; <i class="icon-trash"></i></button></td>';
          c += "</tr>";
        })
        .join();

      // localStorage.setItem('id_facture', element.id_facture)
      // localStorage.setItem('update_parameter', true)
      // localStorage.setItem('total', element.montant__facture)

      document.getElementById("tab_sells").innerHTML = c;
    })
    .catch((error) => {
      console.error("Failed to retrieve Bills data : ", error);
    });
};

const show_sell_details = (id_facture) => {
  sequelize
    .query(
      "SELECT * FROM facture_article, articles, conditionnements WHERE facture_article.facture_id = :id_facture AND  articles.id_article = facture_article.article_id AND conditionnements.id_condmnt = facture_article.conditionnement_id",
      {
        replacements: { id_facture: parseInt(id_facture) },
        type: sequelize.QueryTypes.SELECT,
      }
    )
    .then((bill_details_query) => {
      console.log(bill_details_query);

      let c = "";

      let index = 1;

      bill_details_query
        .map((element) => {
          c += "<tr>";
          c +=
            '<td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td><td id="article' +
            index +
            '">' +
            element.libele_article +
            '</td><td id="article_conditionment' +
            index +
            '">' +
            element.libele_condmnt +
            '</td><td id="quantity' +
            index +
            '">' +
            element.qte +
            '</td><td id="unit_price' +
            index +
            '">FCFA ' +
            element.PU +
            '</td><td id="reduction' +
            index +
            '">FCFA ' +
            element.reduction +
            "</td><td>" +
            (element.qte * element.PU - element.reduction) +
            "</td>";
          c +=
            '<td><div class="btn-wrapper"><button onclick="delete_sell_details_from_database(' +
            element.bonsortie_id +
            "," +
            element.article_id +
            "," +
            element.conditionnement_id +
            ')" type="button" class="btn btn-danger text-white me-0" ></i>&nbsp; <i class="icon-trash"></i></button></div></td>';
          c += "</tr>";

          index++;
        })
        .join();

      document.getElementById("tab_article_sells").innerHTML = c;
    })
    .catch((error) => {
      console.error("Failed to retrieve Bills Details data : ", error);
    });
};

const delete_sell = (id_facture) => {
  sequelize
    .query("DELETE FROM fFactures WHERE id_facture = ?", {
      replacements: [id_facture],
      type: sequelize.QueryTypes.DELETE,
    })
    .then((delete_article_query) => {
      alert("Facture Supprimée avec success.");
      window.location.reload();
    })
    .catch((error) => {
      console.error("Failed to DELETE Bill data : ", error);
    });
};

const delete_sell_details = (id_facture, article_id, conditionment_id) => {
  sequelize
    .query(
      "DELETE FROM facture_article WHERE facture_id = :facture_id AND article_id = :article_id AND conditionnement_id = :conditionment_id",
      {
        replacements: {
          facture_id: id_facture,
          article_id: article_id,
          conditionment_id: conditionment_id,
        },
        type: sequelize.QueryTypes.DELETE,
      }
    )
    .then((delete_article_query) => {
      alert("Article Supprimé avec success.");
      window.location.reload();
    })
    .catch((error) => {
      console.error("Failed to DELETE Article data from Bill : ", error);
    });
};

//***** Function to load customer ***\\

const load_customer_items = (item) => {
  // Perform a query

  sequelize
    .query("SELECT * FROM clients", {
      type: sequelize.QueryTypes.SELECT,
    })
    .then(function (customer_query) {
      console.log(customer_query[0].libele_article);

      let c = "<option value=0>Veuillez choisir un Client";
      customer_query
        .map((customer_item) => {
          c +=
            "<option value=" +
            customer_item.id_client +
            ">" +
            customer_item.nom_client +
            "</option>";
        })
        .join();

      document.getElementById("customer_name").innerHTML = c;

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
      //console.log("Query succesfully executed", rows[0].nom_fournisseur);

      // listArticles.push(Articles_query)

      // document.getElementById("articles_items[]").innerHTML = c;
    })
    .catch((error) => {
      console.error("Failed to retrieve Customer data : ", error);
    });
};
//***** Function to load articles ***\\

const load_articles_items = (item) => {
  // Perform a query

  sequelize
    .query("SELECT * FROM articles", {
      type: sequelize.QueryTypes.SELECT,
    })
    .then(function (Articles_query) {
      console.log(Articles_query[0].libele_article);

      let c = "<option value=0>Veuillez choisir un Article";
      Articles_query.map((Article_item) => {
        c +=
          "<option value=" +
          Article_item.id_article +
          ">" +
          Article_item.libele_article +
          "</option>";
      }).join();

      document.getElementById("articles_items" + item).innerHTML = c;

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
      //console.log("Query succesfully executed", rows[0].nom_fournisseur);

      // listArticles.push(Articles_query)

      // document.getElementById("articles_items[]").innerHTML = c;
    })
    .catch((error) => {
      console.error("Failed to retrieve Articles data : ", error);
    });
};

//***** Function to load conditionment ***\\

const load_conditionment_items_for_sells = (item_id, item_indice) => {
  // Perform a query

  sequelize
    .query(
      "SELECT * FROM `conditionnements` , `articles_condmnt` , `articles` WHERE conditionnements.id_condmnt = articles_condmnt.condmnt_id AND articles.id_article = articles_condmnt.article_id AND articles.id_article = ?",
      {
        replacements: [item_id],
        type: sequelize.QueryTypes.SELECT,
      }
    )
    .then((Conditionment_query) => {
      console.log(Conditionment_query);

      let c = "";
      Conditionment_query.map((conditionment_item) => {
        c +=
          "<option value=" +
          conditionment_item.id_condmnt +
          ">" +
          conditionment_item.libele_condmnt +
          "</option>";
      }).join();

      console.log(item_indice);
      console.log("conditionment" + item_indice);

      document.getElementById("conditionment" + item_indice).innerHTML = c;

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

      // document.getElementById("articles_conditionment[]").innerHTML = c;
    })
    .catch((error) => {
      console.error("Failed to retrieve Conditionment data : ", error);
    });
};

//***** Function to load conditionment ***\\

const load_article_items_unit_price_for_sells = (
  item_indice,
  article_id,
  conditionment_id
) => {
  console.log(item_indice, article_id, conditionment_id);
  // Perform a query

  sequelize
    .query("SELECT id_entrepot FROM entrepots WHERE libele_entrepot = ?", {
      replacements: ["Boutique"],
      type: sequelize.QueryTypes.SELECT,
    })
    .then((entrepot_query) => {
      console.log(entrepot_query);

      sequelize
        .query(
          "SELECT prix_vente FROM `articles_condmnt` WHERE condmnt_id = :condmnt_id AND article_id = :article_id",
          {
            replacements: {
              condmnt_id: conditionment_id,
              article_id: article_id,
              entrepot_id: entrepot_query[0].id_entrepot,
            },
            type: sequelize.QueryTypes.SELECT,
          }
        )
        .then((Conditionment_query) => {
          console.log(Conditionment_query);

          sequelize
            .query(
              "SELECT stock FROM `entrepot_article` WHERE condmnt_id = :condmnt_id AND article_id = :article_id AND entrepot_id = :entrepot_id",
              {
                replacements: {
                  condmnt_id: conditionment_id,
                  article_id: article_id,
                  entrepot_id: entrepot_query[0].id_entrepot,
                },
                type: sequelize.QueryTypes.SELECT,
              }
            )
            .then((entrepot_article_query) => {
              console.log(entrepot_article_query);

              document.getElementById(
                "article_unit_price" + item_indice
              ).value = Conditionment_query[0].prix_vente;

              document
                .getElementById("article_quantity" + item_indice)
                .setAttribute("max", entrepot_article_query[0].stock);
            })
            .catch((error) => {
              console.error(
                "Failed to retrieve Articles Unit price and Quantity data : ",
                error
              );
            });
        })
        .catch((error) => {
          console.error(
            "Failed to retrieve Articles Unit price and Quantity data : ",
            error
          );
        });
    })
    .catch((error) => {
      console.error(
        "Failed to retrieve Articles Unit price and Quantity data : ",
        error
      );
    });
};

//***** Function to load articles ***\\
const load_articles_items_entrepot = (item) => {
  // Perform a query

  sequelize
    .query("SELECT * FROM entrepots", {
      type: sequelize.QueryTypes.SELECT,
    })
    .then(function (Entrepots_query) {
      console.log(Entrepots_query[0].libele_article);

      let c = "";
      Entrepots_query.map((Entrepot_item) => {
        c +=
          "<option value=" +
          Entrepot_item.id_entrepot +
          ">" +
          Entrepot_item.libele_entrepot +
          "</option>";
      }).join();

      document.getElementById("entrepot" + item).innerHTML = c;

      var js_ = document.createElement("script");
      js_.type = "text/javascript";
      js_.src = "../../vendors/select2/select2.min.js";
      document.body.appendChild(js_);
      var js = document.createElement("script");
      js.type = "text/javascript";
      js.src = "../../js/select2.js";
      document.body.appendChild(js);
    })
    .catch((error) => {
      console.error("Failed to retrieve Entrepots data : ", error);
    });
};

//***** Function to load articles ***\\
const load_caisser_items = () => {
  // Perform a query

  sequelize
    .query(
      "SELECT * FROM personnel_fonction, personnels WHERE personnel_fonction.fonction_id = 1 AND personnels.id_personnel = personnel_fonction.personnel_id",
      {
        type: sequelize.QueryTypes.SELECT,
      }
    )
    .then(function (Caissiers_query) {
      console.log(Caissiers_query[0].libele_article);

      let c = "";
      Caissiers_query.map((Caissier_item) => {
        c +=
          "<option value=" +
          Caissier_item.id_personnel +
          ">" +
          Caissier_item.nom_personnel +
          "</option>";
      }).join();

      document.getElementById("caissier").innerHTML = c;

      var js_ = document.createElement("script");
      js_.type = "text/javascript";
      js_.src = "../../vendors/select2/select2.min.js";
      document.body.appendChild(js_);
      var js = document.createElement("script");
      js.type = "text/javascript";
      js.src = "../../js/select2.js";
      document.body.appendChild(js);
    })
    .catch((error) => {
      console.error("Failed to retrieve Caissier data : ", error);
    });
};

//***** Function to register new sell ***\\
const insert_sell = (customer_data) => {
  console.log(customer_data);
  //   generateBilPDFFile();
  // Perform a query
  var currentBillDateCreation = new Date();

  // Insertquery to add an bill into database
  if (customer_data.customer_article_items_entrepot.length != 0) {
    let client_identification = [];
    if (customer_data.customer_payement_method == "Credit") {
      sequelize
        .query("SELECT * FROM clients WHERE nom_client = ?", {
          replacements: [customer_data.customer_name],
          type: sequelize.QueryTypes.SELECT,
        })
        .then((customer_query) => {
          console.log(customer_query[0].id_client);

          for (entrepot of customer_data.customer_article_items_entrepot) {
            sequelize
              .query(
                "INSERT INTO bonsortie (id_bonsortie, date_bonsortie, provenance, client_id) VALUES (DEFAULT, :date_bonsortie, :provenance, :id_client)",
                {
                  replacements: {
                    date_bonsortie: new Date(),
                    provenance: entrepot.entrepot_id,
                    id_client: customer_query[0].id_client,
                  },
                  type: sequelize.QueryTypes.INSERT,
                }
              )
              .then((bon_sortie_query) => {
                console.log(customer_data.bill_article);

                insert_bon_sortie_details(bon_sortie_query[0], entrepot);
              })
              .catch((error) => {
                console.error("Failed to insert bill data : ", error);
              });
          }
          // window.location.reload();
        })
        .catch((error) => {
          console.error("Failed to retrieve Customer data : ", error);
        });
    } else {
      for (entrepot of customer_data.customer_article_items_entrepot) {
        console.log(entrepot);
        sequelize
          .query(
            "INSERT INTO bonsortie (id_bonsortie, date_bonsortie, provenance, nom_client) VALUES (DEFAULT, :date_bonsortie, :provenance, :nom_client)",
            {
              replacements: {
                date_bonsortie: new Date(),
                provenance: entrepot.entrepot_id,
                nom_client: customer_data.customer_name,
              },
              type: sequelize.QueryTypes.INSERT,
            }
          )
          .then((bon_sortie_query) => {
            // console.log(customer_data.bill_article);

            insert_bon_sortie_details(bon_sortie_query[0], entrepot);
            // window.location.reload();
          })
          .catch((error) => {
            console.error("Failed to insert bill data : ", error);
          });
      }
    }
  }

  if (customer_data.customer_article_items.length != 0) {
    if (customer_data.customer_payement_method == "Credit") {
      sequelize
        .query("SELECT * FROM clients WHERE id_client = ?", {
          replacements: [customer_data.customer_name],
          type: sequelize.QueryTypes.SELECT,
        })
        .then((customer_query) => {
          console.log(customer_query[0].id_client);

          sequelize
            .query(
              "INSERT INTO factures (id_facture, date_facture, montant__facture, reglement_facture, client_id, vendeur_id, caissier_id, reduction) VALUES (DEFAULT, :date_facture, :montant__facture, :reglement_facture, :id_client, :vendeur_id, :caissier_id, :reduction)",
              {
                replacements: {
                  date_facture: new Date(),
                  montant__facture: parseFloat(
                    customer_data.customer_total_sell_price
                  ),
                  reglement_facture: customer_data.customer_payement_method,
                  id_client: parseInt(customer_query[0].id_client),
                  vendeur_id: 1,
                  caissier_id: customer_data.customer_caissier,
                  reduction: parseFloat(customer_data.customer_total_reduction),
                },
                type: sequelize.QueryTypes.INSERT,
              }
            )
            .then((bill_query) => {
              console.log(customer_data.bill_article);

              insert_sell_details(
                bill_query[0],
                parseFloat(customer_data.customer_total_sell_price),
                customer_data,
                false
              );
              // Update Customer Account
              sequelize
                .query(
                  "SELECT montant_a_payer FROM compte_client WHERE client_id = ?",
                  {
                    replacements: [customer_query[0].id_client],
                    type: sequelize.QueryTypes.SELECT,
                  }
                )
                .then((customer_account_query) => {
                  console.log(customer_account_query);

                  sequelize
                    .query(
                      "UPDATE compte_client SET montant_a_payer = :montant_a_payer WHERE client_id = :id_client",
                      {
                        replacements: {
                          montant_a_payer:
                            customer_account_query[0].montant_a_payer +
                            parseFloat(customer_data.customer_total_sell_price),
                          id_client: customer_query[0].id_client,
                        },
                        type: sequelize.QueryTypes.UPDATE,
                      }
                    )
                    .then((result) => {
                      console.log(result);
                      // window.location.reload();
                      setTimeout(() => {
                        getBillPdfFileToPrint(bill_query[0]);
                      }, 1000);
                    })
                    .catch((error) => {
                      console.error(
                        "Failed to update customer account data : ",
                        error
                      );
                    });
                })
                .catch((error) => {
                  console.error(
                    "Failed to retreive Customer Account data : ",
                    error
                  );
                });
            })
            .catch((error) => {
              console.error("Failed to insert bill data : ", error);
            });
        })
        .catch((error) => {
          console.error("Failed to retrieve Customer data : ", error);
        });
    } else {
      sequelize
        .query(
          "INSERT INTO factures (id_facture, date_facture, montant__facture, reglement_facture, nom_client, vendeur_id, caissier_id, reduction) VALUES (DEFAULT, :date_facture, :montant__facture, :reglement_facture, :nom_client, :vendeur_id, :caissier_id, :reduction)",
          {
            replacements: {
              date_facture: new Date(),
              montant__facture: parseFloat(
                customer_data.customer_total_sell_price
              ),
              reglement_facture: customer_data.customer_payement_method,
              nom_client: customer_data.customer_name,
              vendeur_id: 1,
              caissier_id: customer_data.customer_caissier,
              reduction: parseFloat(customer_data.customer_total_reduction),
            },
            type: sequelize.QueryTypes.INSERT,
          }
        )
        .then((bill_query) => {
          // console.log(bill_query);

          insert_sell_details(
            bill_query[0],
            parseFloat(customer_data.customer_total_sell_price),
            customer_data,
            false
          );

          setTimeout(() => {
            getBillPdfFileToPrint(bill_query[0]);
          }, 1000);

          // generateBilPDFFile(
          //   bill_query[0],
          //   customer_data,
          //   currentBillDateCreation.getFullYear() + "-" + (currentBillDateCreation.getMonth() + 1) + "-" + currentBillDateCreation.getDate());
          // window.location.reload();
        })
        .catch((error) => {
          console.error("Failed to insert bill data : ", error);
        });
    }
  }
};

const insert_sell_details = (
  id_facture,
  totalBill,
  customer_data,
  update_params
) => {
  if (update_params) {
    sequelize
      .query(
        "UPDATE factures SET montant__facture = :montant__facture WHERE id_facture = :facture_id",
        {
          replacements: {
            facture_id: id_facture,
            montant__facture:
              totalBill + customer_data.customer_total_sell_price,
          },
          type: sequelize.QueryTypes.UPDATE,
        }
      )
      .then()
      .catch((error) => {
        console.error("Failed to insert article data : ", error);
      });
  }
  for (article of customer_data.customer_article_items.article_infos) {
    sequelize
      .query(
        "INSERT INTO facture_article (facture_id, article_id, qte, conditionnement_id, entrepot_id, PU, reduction) VALUES (:facture_id, :article_id, :qte, :conditionnement_id, :entrepot_id, :PU, :reduction)",
        {
          replacements: {
            facture_id: id_facture,
            article_id: parseInt(article.articles_items),
            qte: parseInt(article.article_quantity),
            conditionnement_id: parseInt(article.conditionment),
            entrepot_id: parseInt(article.entrepot),
            PU: parseFloat(article.article_unit_price),
            reduction: parseFloat(article.reduction),
          },
          type: sequelize.QueryTypes.INSERT,
        }
      )
      .then((article_query) => {
        // console.log(article_query);
        sequelize
          .query(
            "SELECT stock FROM `entrepot_article` WHERE condmnt_id = :condmnt_id AND article_id = :article_id AND entrepot_id = :entrepot_id",
            {
              replacements: {
                article_id: article.articles_items,
                condmnt_id: article.conditionment,
                entrepot_id: article.entrepot,
              },
              type: sequelize.QueryTypes.SELECT,
            }
          )
          .then((article_entrepot_query) => {
            // console.log(article_entrepot_query);

            sequelize
              .query(
                "UPDATE `entrepot_article` SET stock = :article_new_quantity WHERE condmnt_id = :condmnt_id AND article_id = :article_id AND entrepot_id = :entrepot_id",
                {
                  replacements: {
                    article_new_quantity:
                      parseInt(article_entrepot_query[0].stock) -
                      parseInt(article.article_quantity),
                    article_id: article.articles_items,
                    condmnt_id: article.conditionment,
                    entrepot_id: article.entrepot,
                  },
                  type: sequelize.QueryTypes.UPDATE,
                }
              )
              .then((article_query) => {
                // console.log(article_query);
                // generateBilPDFFile(customer_data);
              })
              .catch((error) => {
                console.error(
                  "Failed to update entrepot details data : ",
                  error
                );
              });
          })
          .catch((error) => {
            console.error("Failed to select entrepot details data : ", error);
          });
      })
      .catch((error) => {
        console.error("Failed to insert article data : ", error);
      });
  }
};

const insert_bon_sortie_details = (id_bonsortie, entrepot_data) => {
  for (article of entrepot_data.article_infos) {
    sequelize
      .query(
        "INSERT INTO bonsortie_Article (bonsortie_id, article_id, qteSortie, conditionnement_id) VALUES (:bonsortie_id, :article_id, :qteSortie, :conditionnement_id)",
        {
          replacements: {
            bonsortie_id: id_bonsortie,
            article_id: article.articles_items,
            qteSortie: article.article_quantity,
            conditionnement_id: article.conditionment,
          },
          type: sequelize.QueryTypes.INSERT,
        }
      )
      .then((article_query) => {
        // console.log(article_query);

        sequelize
          .query(
            "SELECT stock FROM `entrepot_Article` WHERE condmnt_id = :condmnt_id AND article_id = :article_id AND entrepot_id = :entrepot_id",
            {
              replacements: {
                article_id: article.articles_items,
                condmnt_id: article.conditionment,
                entrepot_id: entrepot_data.entrepot_id,
              },
              type: sequelize.QueryTypes.SELECT,
            }
          )
          .then((article_entrepot_query) => {
            // console.log(article_entrepot_query);

            sequelize
              .query(
                "UPDATE `entrepot_Article` SET stock = :article_new_quantity WHERE condmnt_id = :condmnt_id AND article_id = :article_id AND entrepot_id = :entrepot_id",
                {
                  replacements: {
                    article_new_quantity:
                      article_entrepot_query[0].stock -
                      article.article_quantity,
                    article_id: article.articles_items,
                    condmnt_id: article.conditionment,
                    entrepot_id: entrepot_data.entrepot_id,
                  },
                  type: sequelize.QueryTypes.UPDATE,
                }
              )
              .then((article_query) => {
                // console.log(article_query);
                // generateBilPDFFile(customer_data);
              })
              .catch((error) => {
                console.error("Failed to insert article data : ", error);
              });
          })
          .catch((error) => {
            console.error("Failed to insert article data : ", error);
          });
      })
      .catch((error) => {
        console.error("Failed to insert article data : ", error);
      });
  }
};

//***** Function to update informations concerning a specific sell ***\\

const update_sells = (a, b, c, id) => {
  console.log(a, b, c, id);

  sequelize
    .query(
      "UPDATE articles SET libele_article = :libele_article, description = :description WHERE id_article = :id_article",
      {
        replacements: { id_article: id, libele_article: a, description: a },
        type: sequelize.QueryTypes.UPDATE,
      }
    )
    .then((update_article) => {
      console.log(update_article);

      // sequelize.query(
      // 	"UPDATE Articles_Condmnt SET article_id = :article_id , prix_vente = :prix_vente WHERE id_article = :id_article",
      // 	{
      // 		replacements: {article_id: a, prix_vente: a},
      // 		type: sequelize.QueryTypes.SELECT
      // 	}
      // ).then(result => {
      // 	  console.log(result);
      // }).catch((error) => {
      // 	console.error('Failed to insert data : ', error);
      // });
    })
    .catch((error) => {
      console.error("Failed to insert data : ", error);
    });
};

const generateBilPDFFile = (id_facture, data) => {
  const date = new Date();
  const [month, day, year] = [
    date.getMonth() + 1,
    date.getDate(),
    date.getFullYear(),
  ];
  const [hour, minutes, seconds] = [
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ];

  var doc = new jsPDF("p", "pt");

  doc.setFont("courier", "italic");

  // generate the above data table
  var body = [];

  console.log(data);

  for (article of data.customer_article_items.article_infos) {
    body.push([
      // counter++,
      article.article_quantity,
      article.conditionment + " de " + article.articles_items,
      article.article_unit_price,
      article.reduction,
      article.article_total_price,
    ]);
  }

  // New Header and Footer Data Include the table
  var y = 10;
  doc.setLineWidth(2);

  // First Table (Bill Head)
  doc.autoTable({
    body: [
      ["COMMERCE GENERAL", "", "Date Facture : "],
      [
        "Facture N°" + id_facture,
        {
          content: "F",
          styles: { fontSize: 14, font: "courier", fontStyle: "bold" },
        },
        day +
          "/" +
          month +
          "/" +
          year +
          " à " +
          hour +
          ":" +
          minutes +
          ":" +
          seconds,
      ],
      ["CLIENT : " + data.customer_name, "", "Magasin : Boutique"],
    ],
    startY: 30,
    styles: {
      font: "courier",
      fontStyle: "bold",
      // minCellHeight: 10,
      // fontSize: 12,
      // cellPadding: 10,
    },
    theme: "plain",
    tableLineColor: "black",
    tableLineWidth: 1,
    columnStyles: {
      0: { halign: "left", cellWidth: 300 },
      1: { halign: "left" },
    },
  });

  // Second table (Bill Body)
  doc.autoTable({
    body: body,
    // startY: 200,
    head: [
      [
        // "N°",
        "Quantité",
        "Conditionnement & Article",
        // "Article",
        "Prix U",
        "Réduction",
        "Montant",
      ],
    ],
    styles: {
      font: "courier",
      fontStyle: "bold",
      fontSize: 12,
      lineColor: "black",
      lineWidth: 1,
    },
    theme: "plain",
    tableLineColor: "black",
    tableLineWidth: 1,
    // columnStyles: {
    // 0: {halign: 'right', cellWidth: 25,},
    // 1: {halign: 'left', cellWidth: 100,},
    // 2: {halign: 'right', cellWidth: 50,},
    // 3: {halign: 'right', cellWidth: 50,}
    // },
  });

  // Third Table (Bill Footer)
  doc.autoTable({
    body: [
      [
        "Nombre de Produits       " +
          data.customer_article_items.article_infos.length,
        "Montant Total       " + data.customer_total_sell_price + " FCFA",
      ],
    ],
    styles: {
      font: "courier",
      fontStyle: "bold",
      fontSize: 12,
    },
    theme: "plain",
    columnStyles: {
      0: { halign: "left" },
      1: { halign: "right" },
    },
  });

  // Forth Table (Bill Last element)
  doc.autoTable({
    body: [
      ["Les marchandises vendues et livrées ne sont ni reprises ni échangées"],
    ],
    styles: {
      font: "courier",
      fontStyle: "bold",
      fontSize: 12,
    },
    theme: "plain",
    columnStyles: {
      0: { halign: "center" },
    },
  });

  // Fifth Table (Bill Signature)
  doc.autoTable({
    body: [["Le Caissier", "Le Factureur"]],
    styles: {
      font: "courier",
      fontStyle: "bold",
      minCellHeight: 10,
      // fontSize: 12,
      cellPadding: {
        horizontal: 20,
      },
    },
    theme: "plain",
    columnStyles: {
      0: { halign: "left", valign: "top" },
      1: { halign: "right", valign: "top" },
    },
  });

  var file_Path =
    "Facture_de_" +
    data.customer_name +
    "_du_" +
    year +
    "-" +
    month +
    "-" +
    day +
    "_" +
    id_facture +
    ".pdf";

  doc.autoPrint({ variant: "non-conform" });

  doc.save(file_Path);
  var absolutePdfFilePath = resolve(file_Path);

  window.open(absolutePdfFilePath);
};

const generateBonSortiePDFFile = (id_bonsortie, data) => {
  const date = new Date();
  const [month, day, year] = [
    date.getMonth() + 1,
    date.getDate(),
    date.getFullYear(),
  ];
  const [hour, minutes, seconds] = [
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ];

  var doc = new jsPDF("p", "pt");

  doc.setFont("courier", "italic");

  // generate the above data table
  var body = [];

  console.log(data);

  for (article of data.bonsortie_article_items.article_infos) {
    body.push([
      // counter++,
      article.article_quantity,
      article.conditionment,
      article.articles_items,
    ]);
  }

  // New Header and Footer Data Include the table
  var y = 10;
  doc.setLineWidth(2);

  // First Table (Bill Head)
  doc.autoTable({
    body: [
      ["COMMERCE GENERAL", "", "Date Bon Sortie : "],
      [
        "Bon De Sortie N°" + id_bonsortie,
        {
          content: "BS",
          styles: { fontSize: 14, font: "courier", fontStyle: "bold" },
        },
        day +
          "/" +
          month +
          "/" +
          year +
          " à " +
          hour +
          ":" +
          minutes +
          ":" +
          seconds,
      ],
      [
        "Provenance : " + data.bonsortie_provenance,
        "",
        "Destination : " + data.bonsortie_destination,
      ],
    ],
    startY: 30,
    styles: {
      font: "courier",
      fontStyle: "bold",
      // minCellHeight: 10,
      // fontSize: 12,
      // cellPadding: 10,
    },
    theme: "plain",
    tableLineColor: "black",
    tableLineWidth: 1,
    columnStyles: {
      0: { halign: "left", cellWidth: 300 },
      1: { halign: "left" },
    },
  });

  // Second table (Bill Body)
  doc.autoTable({
    body: body,
    // startY: 200,
    head: [
      [
        // "N°",
        "Quantité",
        "Conditionnement",
        "Article",
      ],
    ],
    styles: {
      font: "courier",
      fontStyle: "bold",
      fontSize: 12,
      lineColor: "black",
      lineWidth: 1,
    },
    theme: "plain",
    tableLineColor: "black",
    tableLineWidth: 1,
    // columnStyles: {
    // 0: {halign: 'right', cellWidth: 25,},
    // 1: {halign: 'left', cellWidth: 100,},
    // 2: {halign: 'right', cellWidth: 50,},
    // 3: {halign: 'right', cellWidth: 50,}
    // },
  });

  // Third Table (Bill Footer)
  doc.autoTable({
    body: [
      [
        "Nombre de Produits       " +
          data.bonsortie_article_items.article_infos.length,
        " ",
      ],
    ],
    styles: {
      font: "courier",
      fontStyle: "bold",
      fontSize: 12,
    },
    theme: "plain",
    columnStyles: {
      0: { halign: "left" },
      1: { halign: "right" },
    },
  });

  // Forth Table (Bill Last element)
  // doc.autoTable({
  //   body: [
  //     [
  //       "Les marchandises vendues et livrées ne sont ni reprises ni échangées",
  //     ],
  //   ],
  //   styles: {
  //     font: "courier",
  //     fontStyle: "bold",
  //     fontSize: 12,
  //   },
  //   theme: "plain",
  //   columnStyles: {
  //     0: { halign: 'center' },
  //   },
  // });

  // Fifth Table (Bill Signature)
  doc.autoTable({
    body: [["", "Le Directeur"]],
    styles: {
      font: "courier",
      fontStyle: "bold",
      minCellHeight: 10,
      // fontSize: 12,
      cellPadding: {
        horizontal: 20,
      },
    },
    theme: "plain",
    columnStyles: {
      0: { halign: "left", valign: "top" },
      1: { halign: "right", valign: "top" },
    },
  });

  var file_Path =
    "Bon_de_Sortie_du_" +
    year +
    "-" +
    month +
    "-" +
    day +
    "_" +
    id_bonsortie +
    ".pdf";

  doc.autoPrint({ variant: "non-conform" });

  doc.save(file_Path);
  var absolutePdfFilePath = resolve(file_Path);

  window.open(absolutePdfFilePath);
};

const generateBonCommandePDFFile = (id_boncommande, data) => {
  const date = new Date();
  const [month, day, year] = [
    date.getMonth() + 1,
    date.getDate(),
    date.getFullYear(),
  ];
  const [hour, minutes, seconds] = [
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ];

  var doc = new jsPDF("p", "pt");

  doc.setFont("courier", "italic");

  // generate the above data table
  var body = [];

  console.log(data);

  for (article of data.boncommande_article_items.article_infos) {
    body.push([
      // counter++,
      article.article_quantity,
      article.conditionment,
      article.articles_items,
      article.article_unit_price,
      article.article_quantity * article.article_unit_price,
    ]);
  }

  // New Header and Footer Data Include the table
  var y = 10;
  doc.setLineWidth(2);

  // First Table (Bill Head)
  doc.autoTable({
    body: [
      ["COMMERCE GENERAL", "", "Date Bon Commande : "],
      [
        "Bon De Commande N°" + id_boncommande,
        {
          content: "BC",
          styles: { fontSize: 14, font: "courier", fontStyle: "bold" },
        },
        day +
          "/" +
          month +
          "/" +
          year +
          " à " +
          hour +
          ":" +
          minutes +
          ":" +
          seconds,
      ],
      ["Fournisseur : " + data.fournisseur, "", ""],
    ],
    startY: 30,
    styles: {
      font: "courier",
      fontStyle: "bold",
      // minCellHeight: 10,
      // fontSize: 12,
      // cellPadding: 10,
    },
    theme: "plain",
    tableLineColor: "black",
    tableLineWidth: 1,
    columnStyles: {
      0: { halign: "left", cellWidth: 300 },
      1: { halign: "left" },
    },
  });

  // Second table (Bill Body)
  doc.autoTable({
    body: body,
    // startY: 200,
    head: [
      [
        // "N°",
        "Quantité",
        "Conditionnement",
        "Article",
        "Prix U",
        "Montant",
      ],
    ],
    styles: {
      font: "courier",
      fontStyle: "bold",
      fontSize: 12,
      lineColor: "black",
      lineWidth: 1,
    },
    theme: "plain",
    tableLineColor: "black",
    tableLineWidth: 1,
    // columnStyles: {
    // 0: {halign: 'right', cellWidth: 25,},
    // 1: {halign: 'left', cellWidth: 100,},
    // 2: {halign: 'right', cellWidth: 50,},
    // 3: {halign: 'right', cellWidth: 50,}
    // },
  });

  // Third Table (Bill Footer)
  doc.autoTable({
    body: [
      [
        "Nombre de Produits       " +
          data.boncommande_article_items.article_infos.length,
        "Montant Total       " + data.boncommande_total_sell_price + " FCFA",
      ],
    ],
    styles: {
      font: "courier",
      fontStyle: "bold",
      fontSize: 12,
    },
    theme: "plain",
    columnStyles: {
      0: { halign: "left" },
      1: { halign: "right" },
    },
  });

  // Forth Table (Bill Last element)
  // doc.autoTable({
  //   body: [
  //     [
  //       "Les marchandises vendues et livrées ne sont ni reprises ni échangées",
  //     ],
  //   ],
  //   styles: {
  //     font: "courier",
  //     fontStyle: "bold",
  //     fontSize: 12,
  //   },
  //   theme: "plain",
  //   columnStyles: {
  //     0: { halign: 'center' },
  //   },
  // });

  // Fifth Table (Bill Signature)
  doc.autoTable({
    body: [["Le Fournisseur", "Le Directeur"]],
    styles: {
      font: "courier",
      fontStyle: "bold",
      minCellHeight: 10,
      // fontSize: 12,
      cellPadding: {
        horizontal: 20,
      },
    },
    theme: "plain",
    columnStyles: {
      0: { halign: "left", valign: "top" },
      1: { halign: "right", valign: "top" },
    },
  });

  var file_Path =
    "Bon_de_Commande_de_" +
    data.customer_name +
    "_du_" +
    year +
    "-" +
    month +
    "-" +
    day +
    "_" +
    id_boncommande +
    ".pdf";

  doc.autoPrint({ variant: "non-conform" });

  doc.save(file_Path);
  var absolutePdfFilePath = resolve(file_Path);

  window.open(absolutePdfFilePath);
};

const generateReceiptPDFFile = (
  customer_name,
  amount_to_pay,
  amount_paid,
  amount_remaining_to_pay,
  new_amout_paid
) => {
  const date = new Date();
  const [month, day, year] = [
    date.getMonth() + 1,
    date.getDate(),
    date.getFullYear(),
  ];
  const [hour, minutes, seconds] = [
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ];

  var doc = new jsPDF("p", "pt");

  doc.setFont("courier", "italic");
  console.log(new_amout_paid);

  // generate the above data table
  var body = [[amount_to_pay, new_amout_paid, amount_remaining_to_pay]];

  // New Header and Footer Data Include the table
  var y = 10;
  doc.setLineWidth(2);

  // First Table (Receipt Head)
  doc.autoTable({
    body: [
      ["COMMERCE GENERAL", "", "Date et Heure Tirage : "],
      [
        "Reçu De Versement",
        {
          content: "R",
          styles: { fontSize: 14, font: "courier", fontStyle: "bold" },
        },
        day +
          "/" +
          month +
          "/" +
          year +
          " à " +
          hour +
          ":" +
          minutes +
          ":" +
          seconds,
      ],
      ["CLIENT : " + customer_name, "", "Magasin : Boutique"],
    ],
    startY: 30,
    styles: {
      font: "courier",
      fontStyle: "bold",
      // minCellHeight: 10,
      // fontSize: 12,
    },
    theme: "plain",
    tableLineColor: "black",
    tableLineWidth: 1,
    columnStyles: {
      0: { halign: "left", cellWidth: 300 },
      1: { halign: "left" },
    },
  });

  // Second table (Receipt Body)
  doc.autoTable({
    body: body,
    // startY: 200,
    head: [["A PAYER (FCFA)", "AVANCE (FCFA)", "RESTE (FCFA)"]],
    styles: {
      font: "courier",
      fontStyle: "bold",
      fontSize: 12,
      lineColor: "black",
      lineWidth: 1,
    },
    theme: "plain",
    tableLineColor: "black",
    tableLineWidth: 1,
    // columnStyles: {
    // 0: {halign: 'right', cellWidth: 25,},
    // 1: {halign: 'left', cellWidth: 100,},
    // 2: {halign: 'right', cellWidth: 50,},
    // 3: {halign: 'right', cellWidth: 50,}
    // },
  });

  // Third Table (Receipt Footer)
  doc.autoTable({
    body: [["PAIEMENT DE BON"]],
    styles: {
      font: "courier",
      fontStyle: "bold",
    },
    theme: "plain",
    columnStyles: {
      0: { halign: "center" },
    },
  });

  // Fourth Table (Receipt Signature)
  doc.autoTable({
    body: [["Le Caissier", "Le Factureur"]],
    styles: {
      font: "courier",
      fontStyle: "bold",
      minCellHeight: 10,
      // fontSize: 12,
      cellPadding: {
        horizontal: 20,
      },
    },
    theme: "plain",
    columnStyles: {
      0: { halign: "left", valign: "top" },
      1: { halign: "right", valign: "top" },
    },
  });

  var filePath =
    "Reçu_de_" +
    customer_name +
    "_du_" +
    year +
    "-" +
    month +
    "-" +
    day +
    ".pdf";

  console.log(filePath);

  doc.autoPrint({ variant: "non-conform" });
  doc.save(filePath);

  var absolutePdfFilePath = resolve(filePath);

  window.open(absolutePdfFilePath);
};

const getBillPdfFileToPrint = (id_facture) => {
  sequelize
    .query("SELECT * FROM factures WHERE id_facture = ?", {
      replacements: [id_facture],
      type: sequelize.QueryTypes.SELECT,
    })
    .then((bill_query) => {
      console.log(bill_query);

      // var billPdfFilePath = "../Documents/Factures_Clients/Facture_de_" +
      //   "customer_data" +
      //   "_du_" +
      //   bill_query[0].date_facture +
      //   "_" +
      //   id_facture +
      //   ".pdf"

      if (bill_query[0].reglement_facture == "Credit") {
        sequelize
          .query("SELECT * FROM clients WHERE id_client = :id_client", {
            replacements: {
              id_client: bill_query[0].client_id,
            },
            type: sequelize.QueryTypes.SELECT,
          })
          .then((customer_details_query) => {
            // console.log(bill_details_query);

            var globalBillInfo = {
              customer_name: customer_details_query[0].nom_client,
              customer_article_items: {
                article_infos: [],
              },
              customer_payement_method: bill_query[0].reglement_facture,
              customer_total_reduction: bill_query[0].reduction,
              customer_total_sell_price: bill_query[0].montant__facture,
            };

            sequelize
              .query(
                "SELECT * FROM facture_article, articles, conditionnements WHERE facture_article.facture_id = :id_facture AND  articles.id_article = facture_article.article_id AND conditionnements.id_condmnt = facture_article.conditionnement_id",
                {
                  replacements: {
                    id_facture: bill_query[0].id_facture,
                  },
                  type: sequelize.QueryTypes.SELECT,
                }
              )
              .then((bill_details_query) => {
                // console.log(bill_details_query);

                for (bill_detail of bill_details_query) {
                  globalBillInfo.customer_article_items.article_infos.push({
                    articles_items: bill_detail.libele_article,
                    conditionment: bill_detail.libele_condmnt,
                    article_quantity: bill_detail.qte,
                    article_unit_price: bill_detail.PU,
                    reduction: bill_detail.reduction,
                    article_total_price:
                      bill_detail.qte *
                      (bill_detail.PU - bill_detail.reduction),
                    entrepot: bill_detail.entrepot_id,
                  });
                }
                // console.log(globalBillInfo)

                generateBilPDFFile(
                  id_facture,
                  globalBillInfo,
                  bill_query[0].date_facture
                );
              })
              .catch((error) => {
                console.error("Failed to retrieve Bill Details data : ", error);
              });
          })
          .catch((error) => {
            console.error("Failed to retrieve Bill Details data : ", error);
          });
      } else {
        var globalBillInfo = {
          customer_name: bill_query[0].nom_client,
          customer_article_items: {
            article_infos: [],
          },
          customer_payement_method: bill_query[0].reglement_facture,
          customer_total_reduction: bill_query[0].reduction,
          customer_total_sell_price: bill_query[0].montant__facture,
        };

        sequelize
          .query(
            "SELECT * FROM facture_article, articles, conditionnements WHERE facture_article.facture_id = :id_facture AND  articles.id_article = facture_article.article_id AND conditionnements.id_condmnt = facture_article.conditionnement_id",
            {
              replacements: {
                id_facture: bill_query[0].id_facture,
              },
              type: sequelize.QueryTypes.SELECT,
            }
          )
          .then((bill_details_query) => {
            // console.log(bill_details_query);

            for (bill_detail of bill_details_query) {
              globalBillInfo.customer_article_items.article_infos.push({
                articles_items: bill_detail.libele_article,
                conditionment: bill_detail.libele_condmnt,
                article_quantity: bill_detail.qte,
                article_unit_price: bill_detail.PU,
                reduction: bill_detail.reduction,
                article_total_price:
                  bill_detail.qte * (bill_detail.PU - bill_detail.reduction),
                entrepot: bill_detail.entrepot_id,
              });
            }
            // console.log(globalBillInfo)

            generateBilPDFFile(
              id_facture,
              globalBillInfo,
              bill_query[0].date_facture
            );
          })
          .catch((error) => {
            console.error("Failed to retrieve Bill Details data : ", error);
          });
      }
    })
    .catch((error) => {
      console.error("Failed to retrieve Bill data : ", error);
    });
};

const findBonSortiePdfToPrint = (id_bonsortie) => {
  sequelize
    .query("SELECT * FROM bonsortie WHERE id_bonsortie = ?", {
      replacements: [id_bonsortie],
      type: sequelize.QueryTypes.SELECT,
    })
    .then((bonsortie_query) => {
      console.log(bonsortie_query);

      sequelize
        .query(
          "SELECT * FROM entrepots WHERE  id_entrepot = " +
            bonsortie_query[0].provenance,
          {
            type: sequelize.QueryTypes.SELECT,
          }
        )
        .then((pr) => {
          if (bonsortie_query[0].destination != null) {
            sequelize
              .query(
                "SELECT * FROM entrepots WHERE  id_entrepot = " +
                  bonsortie_query[0].destination,
                {
                  type: sequelize.QueryTypes.SELECT,
                }
              )
              .then((des) => {
                var globalBonSortieInfo = {
                  bonsortie_article_items: {
                    article_infos: [],
                  },
                  bonsortie_provenance: pr[0].libele_entrepot,
                  bonsortie_destination: des[0].libele_entrepot,
                };

                sequelize
                  .query(
                    "SELECT * FROM bonsortie_article, articles, conditionnements WHERE bonsortie_article.bonsortie_id = :id_bonsortie AND  articles.id_article = bonsortie_article.article_id AND conditionnements.id_condmnt = bonsortie_article.conditionnement_id",
                    {
                      replacements: {
                        id_bonsortie: id_bonsortie,
                      },
                      type: sequelize.QueryTypes.SELECT,
                    }
                  )
                  .then((bill_details_query) => {
                    // console.log(bill_details_query);

                    for (bill_detail of bill_details_query) {
                      globalBonSortieInfo.bonsortie_article_items.article_infos.push(
                        {
                          articles_items: bill_detail.libele_article,
                          conditionment: bill_detail.libele_condmnt,
                          article_quantity: bill_detail.qteSortie,
                        }
                      );
                    }
                    // console.log(globalBonSortieInfo)

                    generateBonSortiePDFFile(id_bonsortie, globalBonSortieInfo);
                  })
                  .catch((error) => {
                    console.error(
                      "Failed to retrieve Bill Details data : ",
                      error
                    );
                  });
              })
              .catch((error) => {
                console.error(
                  "Failed to retrieve Entrepots destination data : ",
                  error
                );
              });
          } else {
            if (bonsortie_query[0].nom_client != null) {
              var globalBonSortieInfo = {
                bonsortie_article_items: {
                  article_infos: [],
                },
                bonsortie_provenance: pr[0].libele_entrepot,
                bonsortie_destination: bonsortie_query[0].nom_client,
              };
              sequelize
                .query(
                  "SELECT * FROM bonsortie_article, articles, conditionnements WHERE bonsortie_article.bonsortie_id = :id_bonsortie AND  articles.id_article = bonsortie_article.article_id AND conditionnements.id_condmnt = bonsortie_article.conditionnement_id",
                  {
                    replacements: {
                      id_bonsortie: id_bonsortie,
                    },
                    type: sequelize.QueryTypes.SELECT,
                  }
                )
                .then((bill_details_query) => {
                  // console.log(bill_details_query);

                  for (bill_detail of bill_details_query) {
                    globalBonSortieInfo.bonsortie_article_items.article_infos.push(
                      {
                        articles_items: bill_detail.libele_article,
                        conditionment: bill_detail.libele_condmnt,
                        article_quantity: bill_detail.qteSortie,
                      }
                    );
                  }
                  // console.log(globalBonSortieInfo)

                  generateBonSortiePDFFile(id_bonsortie, globalBonSortieInfo);
                })
                .catch((error) => {
                  console.error(
                    "Failed to retrieve Bill Details data : ",
                    error
                  );
                });
            } else {
              sequelize
                .query(
                  "SELECT * FROM Clients WHERE  id_client = " +
                    bonsortie_query[0].client_id,
                  {
                    type: sequelize.QueryTypes.SELECT,
                  }
                )
                .then((des) => {
                  var globalBonSortieInfo = {
                    bonsortie_article_items: {
                      article_infos: [],
                    },
                    bonsortie_provenance: pr[0].libele_entrepot,
                    bonsortie_destination: des[0].nom_ckient,
                  };

                  sequelize
                    .query(
                      "SELECT * FROM bonsortie_article, articles, conditionnements WHERE bonsortie_article.bonsortie_id = :id_bonsortie AND  articles.id_article = bonsortie_article.article_id AND conditionnements.id_condmnt = bonsortie_article.conditionnement_id",
                      {
                        replacements: {
                          id_bonsortie: id_bonsortie,
                        },
                        type: sequelize.QueryTypes.SELECT,
                      }
                    )
                    .then((bill_details_query) => {
                      // console.log(bill_details_query);

                      for (bill_detail of bill_details_query) {
                        globalBonSortieInfo.bonsortie_article_items.article_infos.push(
                          {
                            articles_items: bill_detail.libele_article,
                            conditionment: bill_detail.libele_condmnt,
                            article_quantity: bill_detail.qteSortie,
                          }
                        );
                      }
                      // console.log(globalBonSortieInfo)

                      generateBonSortiePDFFile(
                        id_bonsortie,
                        globalBonSortieInfo
                      );
                    })
                    .catch((error) => {
                      console.error(
                        "Failed to retrieve Bill Details data : ",
                        error
                      );
                    });
                })
                .catch((error) => {
                  console.error(
                    "Failed to retrieve Entrepots destination data : ",
                    error
                  );
                });
            }
          }
        })
        .catch((error) => {
          console.error(
            "Failed to retrieve Entrepots provenance data : ",
            error
          );
        });
    })
    .catch((error) => {
      console.error("Failed to retrieve Bill data : ", error);
    });
};

const findBonCommandePdfToPrint = (id_boncommande) => {
  sequelize
    .query(
      "SELECT * FROM bomcommandes, fournisseur WHERE bomcommandes.id_boncmd = ? AND fournisseur.id_fournisseur=bomcommandes.fournisseur_id",
      {
        replacements: [id_boncommande],
        type: sequelize.QueryTypes.SELECT,
      }
    )
    .then((boncommande_query) => {
      console.log(boncommande_query);

      var globalBonCommandeInfo = {
        boncommande_total_sell_price: boncommande_query[0].montant_boncmd,
        boncommande_article_items: {
          article_infos: [],
        },
        fournisseur: boncommande_query[0].nom_fournisseur,
      };

      sequelize
        .query(
          "SELECT * FROM boncmd_article, articles, conditionnements WHERE boncmd_article.boncmd_id = :id_boncommande AND  articles.id_article = boncmd_article.article_id AND conditionnements.id_condmnt = boncmd_article.conditionnement_id",
          {
            replacements: {
              id_boncommande: id_boncommande,
            },
            type: sequelize.QueryTypes.SELECT,
          }
        )
        .then((boncommande_article_query) => {
          // console.log(boncommande_article_query);

          for (boncommande_item of boncommande_article_query) {
            globalBonCommandeInfo.boncommande_article_items.article_infos.push({
              articles_items: boncommande_item.libele_article,
              conditionment: boncommande_item.libele_condmnt,
              article_quantity: boncommande_item.qteCmd,
              article_unit_price: boncommande_item.PU,
            });
          }
          console.log(globalBonCommandeInfo);

          generateBonCommandePDFFile(id_boncommande, globalBonCommandeInfo);
        })
        .catch((error) => {
          console.error("Failed to retrieve Bill Details data : ", error);
        });
    })
    .catch((error) => {
      console.error("Failed to retrieve Bill data : ", error);
    });
};

///////-------SECTION CAISSE----------\\\\\\\\\

//***** Function to load and display all bills total amount ***\\

const show_store_account_status = (date) => {
  // Perform a query

  sequelize
    .query(
      "SELECT * FROM factures, personnels WHERE factures.nom_client IS NOT NULL AND factures.date_facture = ? AND personnels.id_personnel = factures.caissier_id",
      {
        replacements: [date],
        type: sequelize.QueryTypes.SELECT,
      }
    )
    .then((customer_account_query) => {
      console.log(customer_account_query);

      let c = "";
      let final_amount = 0;
      customer_account_query
        .map((element) => {
          c += "<tr>";
          c +=
            '<td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td><td>' +
            element.id_facture +
            "</td><td>" +
            element.nom_client +
            "</td><td>FCFA " +
            element.reduction +
            "</td><td>FCFA " +
            element.montant__facture +
            "</td><td>" +
            element.reglement_facture +
            "</td><td>" +
            element.nom_personnel +
            "</td>";
          // c += '<td><div class="btn-wrapper">';
          // c +=
          //   '<a href="vendeur_details.html?id_facture=' +
          //   element.id_facture +
          //   "&update_parameter=" +
          //   true +
          //   "&total=" +
          //   element.montant__facture +
          //   '" type="button" class="btn btn-primary text-white me-0"></i>&nbsp; <i class="icon-eye"></i></a>';
          // c +=
          //   '<a href="vendeur_details.html?id_facture=' +
          //   element.id_facture +
          //   "&update_parameter=" +
          //   false +
          //   "&total=" +
          //   element.montant__facture +
          //   '" type="button" class="btn btn-warning text-white me-0""></i>&nbsp; Modifier</a>';
          // c +=
          //   '<button onclick="getBillPdfToPrint(' +
          //   element.id_facture +
          //   ')" type="button" class="btn btn-success text-white me-0" ></i>&nbsp; <i class="icon-printer"></i></button><button onclick="delete_sell_from_database(' +
          //   element.id_facture +
          //   ')" type="button" class="btn btn-danger text-white me-0" ></i>&nbsp; <i class="icon-trash"></i></button></td>';
          c += "</tr>";
          final_amount += element.montant__facture;
        })
        .join();

      document.getElementById("tab_sells_caissier").innerHTML = c;

      // document.getElementById("caissier_name").value = element.nom_personnel

      document.getElementById("final_amount").value = final_amount;

      sequelize
        .query(
          "SELECT * FROM personnels, personnel_fonction WHERE personnel_fonction.personnel_id = personnels.id_personnel AND personnel_fonction.fonction_id = 1",
          {
            type: sequelize.QueryTypes.SELECT,
          }
        )
        .then((caissier_account_query) => {
          console.log(caissier_account_query);
          let caissier_html_item = "";
          caissier_account_query
            .map((caissier_account_query_item) => {
              var caissier_total = 0;
              customer_account_query.forEach((customer_account_query_item) => {
                if (
                  caissier_account_query_item.nom_personnel ==
                  customer_account_query_item.nom_personnel
                ) {
                  caissier_total +=
                    customer_account_query_item.montant__facture;
                }
              });
              // AND reçues.caissier_id = personnels.id_personnel
              let montant_a_credit = 0;
              sequelize
                .query(
                  "SELECT SUM(montant) AS montant_compte_credit FROM reçues WHERE caissier_id = :caissier_id AND date = :date",
                  {
                    replacements: {
                      caissier_id: caissier_account_query_item.id_personnel,
                      date: date,
                    },
                    type: sequelize.QueryTypes.SELECT,
                  }
                )
                .then((credit_query) => {
                  console.log(credit_query);
                  montant_a_credit += credit_query[0].montant_compte_credit;
                })
                .catch((error) => {
                  console.error(
                    "Failed to retrieve Credit Account Data amount:",
                    error
                  );
                });
              setTimeout(() => {
                console.log(montant_a_credit);
                caissier_html_item += "<tr>";
                caissier_html_item +=
                  '<td id="caissier_name">' +
                  caissier_account_query_item.nom_personnel +
                  "</td>";
                caissier_html_item += "<td>";
                // caissier_html_item += '<th>Comptant</th>'
                caissier_html_item +=
                  '<input type="number" name="article_unit_price" id="final_amount" min="0" class="form-control" value="' +
                  caissier_total +
                  '" disabled/>';
                caissier_html_item += "</td>";
                caissier_html_item += "<td>";
                // caissier_html_item += '<th>Comptant</th>'
                caissier_html_item +=
                  '<input type="number" name="article_unit_price" id="final_amount" min="0" class="form-control" value="' +
                  parseFloat(montant_a_credit) +
                  '" disabled/>';
                caissier_html_item += "</td>";
                caissier_html_item += "</tr>";
              }, 500);
            })
            .join();
          setTimeout(() => {
            document.getElementById("caissierTable").innerHTML =
              caissier_html_item;
          }, 1000);
        })
        .catch((error) => {
          console.error("Failed to retrieve Bills final amount : ", error);
        });
    })
    .catch((error) => {
      console.error("Failed to retrieve Bills final amount : ", error);
    });
};

///////-------SECTION ADMINISTRATION----------\\\\\\\\\

//***** Function to log as administrator ***\\

const user_login = (user_login, user_password) => {
  // Perform a query

  sequelize
    .query("SELECT * FROM comptes WHERE login = ?", {
      replacements: [user_login],
      type: sequelize.QueryTypes.SELECT,
    })
    .then((user_account_query) => {
      console.log(user_account_query);

      if (user_account_query.length == 0) {
        document.getElementById("message").innerHTML =
          "<strong style='color: red;'>Un compte administrateur avec ces Infomations n'existe pas\n\nVeuillez réessayer la connexion!!</strong>";
      } else {
        if (user_account_query[0].password != user_password) {
          document.getElementById("message").innerHTML =
            "<strong style='color: red;'>Identifiant ou Mot de Passe Incorrect!!!</strong>";
        } else {
          sequelize
            .query(
              "SELECT * FROM personnel_fonction, fonction WHERE personnel_fonction.personnel_id = :id_personnel AND fonction.id_fonction=personnel_fonction.fonction_id",
              {
                replacements: {
                  id_personnel: user_account_query[0].personnel_id,
                },
                type: sequelize.QueryTypes.SELECT,
              }
            )
            .then((user_role_query) => {
              console.log(user_role_query);

              localStorage.setItem("user_login", user_account_query[0].login);
              localStorage.setItem(
                "user_password",
                user_account_query[0].password
              );
              localStorage.setItem(
                "user_role",
                user_role_query[0].libele_fonction
              );

              window.open("../../index.html", "_self");
            })
            .catch((error) => {
              console.error("Failed to retrieve Bills final amount : ", error);
            });
        }
      }
    })
    .catch((error) => {
      console.error("Failed to retrieve Account info amount : ", error);
    });
};

//***** Function to load and display all bills total amount ***\\

const show_users = () => {
  // Perform a query

  sequelize
    .query(
      "SELECT * FROM personnels, personnel_fonction, fonction WHERE personnel_fonction.personnel_id=personnels.id_personnel AND fonction.id_fonction=personnel_fonction.fonction_id",
      {
        type: sequelize.QueryTypes.SELECT,
      }
    )
    .then((personnel_query) => {
      console.log(personnel_query);

      let c = "";
      personnel_query
        .map((personnel_item) => {
          // c += "<option>" + conditionment_item.libele_condmnt + "</option>";
          c +=
            '<tr><td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td>';
          c += "<td> " + personnel_item.nom_personnel + " </td>";
          c += "<td> " + personnel_item.telephone_personnel + " </td>";
          c += "<td> " + personnel_item.libele_fonction + " </td>";
          c += '<td><div class="btn-wrapper">';
          c +=
            '<button onclick="deletePersonnel(' +
            personnel_item.id_personnel +
            ')" class="btn btn-danger text-white me-0" href="#">Supprimer</button>';
          c += "</div></td></tr>";
        })
        .join();

      document.getElementById("personnel_tab").innerHTML = c;
    })
    .catch((error) => {
      console.error("Failed to retrieve Personnel Data amount : ", error);
    });
};

//***** Function to load and display all bills total amount ***\\

const show_fonction = () => {
  // Perform a query

  sequelize
    .query("SELECT * FROM fonction", {
      type: sequelize.QueryTypes.SELECT,
    })
    .then((fonction_query) => {
      console.log(fonction_query);

      let c = "<option value=0>Veuillez choisir un fonction";
      fonction_query
        .map((fonction_item) => {
          c +=
            "<option value=" +
            fonction_item.id_fonction +
            ">" +
            fonction_item.libele_fonction +
            "</option>";
        })
        .join();

      document.getElementById("fonction_options").innerHTML = c;

      var js_ = document.createElement("script");
      js_.type = "text/javascript";
      js_.src = "../../vendors/select2/select2.min.js";
      document.body.appendChild(js_);
      var js = document.createElement("script");
      js.type = "text/javascript";
      js.src = "../../js/select2.js";
      document.body.appendChild(js);
    })
    .catch((error) => {
      console.error("Failed to retrieve Personnel Data amount : ", error);
    });
};

//***** Function to insert personnel in database ***\\

const insert_personnel = (
  personnel_name,
  personnel_phone,
  personnel_fonction,
  personnel_password
) => {
  // Perform a query

  sequelize
    .query(
      "INSERT INTO personnels (id_personnel, nom_personnel, telephone_personnel) VALUES (DEFAULT, :nom_personnel, :telephone_personnel)",
      {
        replacements: {
          nom_personnel: personnel_name,
          telephone_personnel: personnel_phone,
        },
        type: sequelize.QueryTypes.INSERT,
      }
    )
    .then((personnel_insertion_query) => {
      console.log(personnel_insertion_query[0]);

      sequelize
        .query(
          "INSERT INTO personnel_fonction (personnel_id, fonction_id) VALUES (:personnel_id, :fonction_id)",
          {
            replacements: {
              personnel_id: personnel_insertion_query[0],
              fonction_id: personnel_fonction,
            },
            type: sequelize.QueryTypes.INSERT,
          }
        )
        .then((customer_account_query) => {
          console.log(customer_account_query);

          sequelize
            .query(
              "INSERT INTO comptes (login, password, personnel_id) VALUES (:login, :password,:personnel_id)",
              {
                replacements: {
                  login: personnel_name,
                  password: personnel_password,
                  personnel_id: personnel_insertion_query[0],
                  fonction_id: personnel_fonction,
                },
                type: sequelize.QueryTypes.INSERT,
              }
            )
            .then((customer_account_query) => {
              console.log(customer_account_query);

              alert(
                "Le personnel a été créé avec succès\n\nVeuilez Actualiser la page et consulter le nouveau personnel ajouté dans la liste de personnel"
              );
            })
            .catch((error) => {
              console.error(
                "Failed to Insert a Customer's customer_account in database : ",
                error
              );
            });
        })
        .catch((error) => {
          console.error(
            "Failed to Insert a personnel_account in database : ",
            error
          );
        });
    })
    .catch((error) => {
      console.error("Failed to Insert a personnel in database : ", error);
    });
};

const delete_personnel = (personnel_id) => {
  sequelize
    .query("DELETE FROM personnels WHERE id_personnel = ?", {
      replacements: [personnel_id],
      type: sequelize.QueryTypes.DELETE,
    })
    .then((delete_personnel_query) => {
      alert("Personnel Supprimé avec success.");
      window.location.reload();
    })
    .catch((error) => {
      console.error("Failed to DELETE Customer data : ", error);
    });
};

contextBridge.exposeInMainWorld("electron", {
  // Administrator Login
  user_login: user_login,
  show_users: show_users,
  show_fonction: show_fonction,
  insert_personnel: insert_personnel,
  delete_personnel: delete_personnel,

  // section achat

  afiche_fseur: afiche_fseur,
  insert_fseur: insert_fseur,
  update_fseur: update_fseur,
  detail_fseur: detail_fseur,
  chargement_articles_BC: chargement_articles_BC,
  chargement_cdmnt_BC: chargement_cdmnt_BC,
  chargement_fseur_BC: chargement_fseur_BC,
  insertion_bon_cmd: insertion_bon_cmd,
  afiche_BC: afiche_BC,
  afiche_detaille_BC: afiche_detaille_BC,
  modif_BC: modif_BC,
  update_bon_cmd: update_bon_cmd,
  delete_bon_cmd: delete_bon_cmd,
  delete_fseur: delete_fseur,

  // section entrepots

  chargement_mag: chargement_mag,
  insertion_entrepot: insertion_entrepot,
  liste_entrepot: liste_entrepot,
  detail_entrepot: detail_entrepot,
  detail_entrepot_article: detail_entrepot_article,
  modif_entrepot: modif_entrepot,
  update_entrepot: update_entrepot,
  chr_qte: chr_qte,
  detail_entrepot_mvnt: detail_entrepot_mvnt,
  chargement_entrepot_BS: chargement_entrepot_BS,
  chargement_entrepot_BS_modif: chargement_entrepot_BS_modif,
  chargement_articles_BS: chargement_articles_BS,
  chargement_cdmnt_BS: chargement_cdmnt_BS,
  chargement_st_BS: chargement_st_BS,
  modif_entr_pr: modif_entr_pr,
  modif_stock: modif_stock,
  enreg_modif_stock: enreg_modif_stock,
  afiche_BS: afiche_BS,
  insertion_bon_sortie: insertion_bon_sortie,
  afiche_detaille_BS: afiche_detaille_BS,
  delete_bon_sortie: delete_bon_sortie,
  update_bon_sortie: update_bon_sortie,
  afiche_BR: afiche_BR,
  reception_BC: reception_BC,
  insert_BR: insert_BR,
  voir_reception_BC: voir_reception_BC,
  modif_reception_BC: modif_reception_BC,
  Update_BR: Update_BR,
  del_entrepot: del_entrepot,
  moov_entrepot: moov_entrepot,
  chargement_cdmnt_e: chargement_cdmnt_e,
  filtre_moov: filtre_moov,

  // Functions to manage Articles

  show_article: show_article,
  show_article_details: show_article_details,
  insert_article: insert_article,
  update_article_details: update_article_details,
  insert_article_details: insert_article_details,
  delete_article: delete_article,
  delete_article_details: delete_article_details,
  load_conditionment_items: load_conditionment_items,

  // Functions to Manage Arrivals

  show_arrivals: show_arrivals,
  show_arrival_details: show_arrival_details,
  load_new_arrivals: load_new_arrivals,
  show_new_arrival_details: show_new_arrival_details,
  receiveNewBonSortie: receiveNewBonSortie,

  // Functions to Manage Customers

  show_customer: show_customer,
  insert_customer: insert_customer,
  update_customer: update_customer,
  update_customer_account: update_customer_account,
  delete_customer: delete_customer,
  show_customer_bills: show_customer_bills,
  show_customer_account_status: show_customer_account_status,

  // Functions to Manage Sells and Bills

  show_sells: show_sells,
  show_sell_details: show_sell_details,
  delete_sell: delete_sell,
  delete_sell_details: delete_sell_details,
  load_articles_items: load_articles_items,
  insert_sell: insert_sell,
  insert_sell_details: insert_sell_details,
  update_sells: update_sells,
  load_conditionment_items_for_sells: load_conditionment_items_for_sells,
  load_articles_items_entrepot: load_articles_items_entrepot,
  load_caisser_items: load_caisser_items,
  load_article_items_unit_price_for_sells:
    load_article_items_unit_price_for_sells,
  load_customer_items: load_customer_items,

  // Functions Manage Bills Total Amount
  show_store_account_status: show_store_account_status,

  // Functions to Manage Bills PDF Files
  getBillPdfFileToPrint: getBillPdfFileToPrint,
  findBonSortiePdfToPrint: findBonSortiePdfToPrint,
  findBonCommandePdfToPrint: findBonCommandePdfToPrint,
});

// "scripts": {
//   "start": "electron .",
//   "pack":"electron-builder --dir",
//   "pack-win":"electron-builder --dir --win",
//   "build": "electron-builder",
//   "dist": "electron-builder",
//   "dist-win": "electron-builder --win"
// },
