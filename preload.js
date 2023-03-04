window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
 	 
const { contextBridge, ipcRenderer , BrowserWindow} = require('electron')

 const GET = (param) => {

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

	 
var path = require('path')
var fs = require('fs')

var mysql = require('mysql');


function db_connect(argument) {
	
       // Add the credentials to access your database
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : null, // or the original password : 'apaswword'
		database : 'Market_Manager_DB'
	});

	// connect to mysql
	connection.connect(function(err) {
		// in case of error
		if(err){
			console.log(err.code);
			console.log(err.fatal);
		}
	});

	return connection;

}

// Connection to MySQL database via the package SEQUELIZE
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
   'Market_Manager_DB',
   'root',
   	null,
    {
      host: 'localhost',
      dialect: 'mysql'
    }
  );

sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});


///////-------SECTION FOURNISSEURS----------\\\\\\\\\

//***** Fonction de remplissage du tableau des fournisseurs ***\\

const afiche_fseur = () => {

connection = db_connect();
// Perform a query

$query = 'SELECT * FROM `Fournisseur` ';

connection.query($query, function(err, rows, fields) {
    if(err){
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
    }

    let c="";
    let r = rows.map((elem) => {

    		c+="<tr>";
    		c+='<td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td><td>'+elem.nom_fournisseur+'</td><td>'+elem.telephone_fournisseur+'</td><td>'+elem.adresse_fournisseur+'</td>'
            c+='<td><div class="btn-wrapper"><a href="voir-fournisseur.html?id='+elem.id_fournisseur+'" type="button" class="btn btn-success text-white me-0" ></i>&nbsp; voir</a></td>'             
            c+="</tr>"       


                           }).join();

    document.getElementById("tab-fseur").innerHTML = c;
    
                                  
    //console.log("Query succesfully executed", rows[0].nom_fournisseur);
});

// Close the connection
connection.end(function(){
    // The connection has been closed
});
           
         }


//***** Fonction d'enregistrement d'un fournisseur ***\\

const insert_fseur = (a,b,c) => {

	console.log(a,b,c);

connection = db_connect();
// Perform a query

$query = 'INSERT INTO Fournisseur (nom_fournisseur,telephone_fournisseur,adresse_fournisseur) VALUES ("'+a+'","'+b+'","'+c+'")';

connection.query($query, function(err, result) {
    if(err){
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
    }

    console.log(result.insertId);
    
                                  
    //console.log("Query succesfully executed", rows[0].nom_fournisseur);
});

// Close the connection
connection.end(function(){
    // The connection has been closed
});
           
         }


//***** Fonction de modification des informations fournisseur ***\\

const update_fseur = (a,b,c,id) => {

	console.log(a,b,c,id);

connection = db_connect();
// Perform a query

$query = "UPDATE Fournisseur SET  nom_fournisseur = '"+a+"' , telephone_fournisseur = '"+b+"' , adresse_fournisseur = '"+c+"'  WHERE id_fournisseur = "+id;
console.log($query)

connection.query($query, function(err, result) {
    if(err){
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
    }
    
                                  
    //console.log("Query succesfully executed", rows[0].nom_fournisseur);
});

// Close the connection
connection.end(function(){
    // The connection has been closed
});
           
         }


//***** Fonction de chargement des détaille fournisseur ***\\

const detail_fseur = () => {

connection = db_connect();
// Perform a query

$query = 'SELECT * FROM `Fournisseur` WHERE id_fournisseur='+GET("id");

connection.query($query, function(err, rows, fields) {
    if(err){
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
    }


   
    document.getElementById("info").innerHTML = '<img class="rounded-circle mx-auto d-block" src="../../images/faces/face1.jpg" alt="Card image cap" style="width: 20%;"><h2 class="text-sm-center mt-2 mb-1"><strong >'+rows[0].nom_fournisseur+'</strong></h2><div class="location text-sm-center"><i class="fa fa-map-marker"></i><spam >'+rows[0].adresse_fournisseur+'</spam>, <spam id="">'+rows[0].telephone_fournisseur+'</spam> </div>'
    document.getElementById("info").innerHTML += '<input type="text" name="" id="id" hidden="true" value="'+rows[0].id_fournisseur+'"><input type="text" name="" id="nom-fseur" hidden="true" value="'+rows[0].nom_fournisseur+'"><input type="text" name="" id="adresse-fseur" hidden="true" value="'+rows[0].adresse_fournisseur+'"><input type="text" name="" id="tel-fseur" hidden="true" value="'+rows[0].telephone_fournisseur+'">';


    
                                  
    //console.log("Query succesfully executed", rows[0].nom_fournisseur);
});

// Close the connection
connection.end(function(){
    // The connection has been closed
});
           
         }


//***** Fonction de chargement des  fournisseurs dans la page d'enregistrement d'un bon de commande ***\\

const chargement_articles_BC = (a) => {





				connection = db_connect();
				// Perform a query

				$query = 'SELECT * FROM `Articles` '

				connection.query($query, function(err, rows, fields) {
				    if(err){
				        console.log("An error ocurred performing the query.");
				        console.log(err);
				        return;
				    }

				      let c='<option value=0>Veuillez choisir un Article</option>';

				     let r = rows.map((elem) => {

				    		c+='<option value="'+elem.id_article+'">'+elem.libele_article+'</option>';
				                   


                           }).join();
				   
				  
					document.getElementById("article"+a).innerHTML = c
					
					 
				      var js_ = document.createElement('script');
				     js_.type='text/javascript';  
				     js_.src = '../../vendors/select2/select2.min.js';
				     document.body.appendChild(js_) 
				     var js = document.createElement('script');
				     js.type='text/javascript';  
				     js.src = '../../js/select2.js';
				     document.body.appendChild(js)                      
				    //console.log("Query succesfully executed", rows[0].nom_fournisseur);
				});




				// Close the connection
				connection.end(function(){
				    // The connection has been closed
				});
}
           
         		
//***** Fonction de chargement des  conditionnements  dans la page d'enregistrement d'un bon de commande  à la selection de l'article***\\

const chargement_cdmnt_BC = (id,indice) => {





				connection = db_connect();
				// Perform a query


				$query = 'SELECT * FROM `Conditionnements` , `Articles_Condmnt` , `Articles` WHERE Conditionnements.id_condmnt = Articles_Condmnt.condmnt_id AND Articles.id_article = Articles_Condmnt.article_id AND Articles.id_article = '+id

				connection.query($query, function(err, rows, fields) {
				    if(err){
				        console.log("An error ocurred performing the query.");
				        console.log(err);
				        return;
				    }

				      let c='';

				     let r = rows.map((elem) => {

				    		c+='<option value="'+elem.id_condmnt+'">'+elem.abreviation_condmnt+'</option>';
				                   


                           }).join();
				   
				  
					document.getElementById("cdmnt"+indice).innerHTML = c;
					
					 
				     var js_ = document.createElement('script');
				     js_.type='text/javascript';  
				     js_.src = '../../vendors/select2/select2.min.js';
				     //document.body.removeChild(js_) 
				     document.body.appendChild(js_) 
				     var js = document.createElement('script');
				     js.type='text/javascript';  
				     js.src = '../../js/select2.js';
				     //document.body.removeChild(js) 
				     document.body.appendChild(js)                   
				    //console.log("Query succesfully executed", rows[0].nom_fournisseur);
				});

				// Close the connection
				connection.end(function(){
				    // The connection has been closed
				});

           
         }


//***** Fonction de chargement des  Fournisseurs  dans la page d'enregistrement d'un bon de commande  ***\\

const chargement_fseur_BC = (id,indice) => {





				connection = db_connect();
				// Perform a query


				$query = 'SELECT * FROM `Fournisseur` '

				connection.query($query, function(err, rows, fields) {
				    if(err){
				        console.log("An error ocurred performing the query.");
				        console.log(err);
				        return;
				    }

				      let c='';

				     let r = rows.map((elem) => {

				    		c+='<option value="'+elem.id_fournisseur+'">'+elem.nom_fournisseur+'</option>';
				                   


                           }).join();
				   
				  
					document.getElementById("fseur").innerHTML = c;
					
					 
				     var js_ = document.createElement('script');
				     js_.type='text/javascript';  
				     js_.src = '../../vendors/select2/select2.min.js';
				     //document.body.removeChild(js_) 
				     document.body.appendChild(js_) 
				     var js = document.createElement('script');
				     js.type='text/javascript';  
				     js.src = '../../js/select2.js';
				     //document.body.removeChild(js) 
				     document.body.appendChild(js)                   
				    //console.log("Query succesfully executed", rows[0].nom_fournisseur);
				});

				// Close the connection
				connection.end(function(){
				    // The connection has been closed
				});

           
         }


///////-------SECTION ARTICLES----------\\\\\\\\\

//***** Function to load and display all articles in a list ***\\

const show_article = () => {
	// Perform a query

	sequelize.query(
		'SELECT * FROM Articles',
		{
			type: sequelize.QueryTypes.SELECT
		}
	).then(article_query => {
		console.log(article_query[0].id_article);

		sequelize.query(
			'SELECT * FROM entrepots WHERE libele_entrepot = ?',
			{
				replacements: ['Boutique'],
				type: sequelize.QueryTypes.SELECT
			}
		).then(entrepot_query => {
			console.log(entrepot_query[0].id_entrepot);

			sequelize.query(
				'SELECT * FROM Entrepot_Article WHERE entrepot_id = ?',
				{
					replacements: [entrepot_query[0].id_entrepot],
					type: sequelize.QueryTypes.SELECT
				}
			).then(article_entrepot_query => {
				console.log(article_entrepot_query[0].entrepot_id);

				sequelize.query(
					'SELECT * FROM Articles_Condmnt',
					{
						type: sequelize.QueryTypes.SELECT
					}
				).then(article_conditionment_query => {
					console.log(article_conditionment_query);
	
					sequelize.query(
						'SELECT * FROM Conditionnements',
						{
							type: sequelize.QueryTypes.SELECT
						}
					).then(conditionment_query => {
						console.log(conditionment_query);
		
						var finalList = []
		
						console.log(article_query)
						console.log(article_entrepot_query)
		
						for (let item = 0; item < article_query.length; item++) {

							finalList.push([article_query[item],article_entrepot_query[item], article_conditionment_query[item]]);
						}
		
						console.log("c'est ok")
		
						let c="";
						finalList.map((element) => {
							c+="<tr>";
							c+='<td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td><td>'+element[0].libele_article+'</td><td>'+element[0].description+'</td><td>'+element[1].stock+'</td><td>FCFA '+element[2].prix_vente+'</td><td>FCFA '+element[2].prix_vente * element[1].stock+'</td><td>'+element[2].condmnt_id+'</td>'
							c+='<td><div class="btn-wrapper"><a href="article_details.html?article_id='+element[0].id_article+'&article_name='+element[0].libele_article+'&article_prix_unitaire='+element[2].prix_vente+'&article_quantity='+element[1].stock+'" type="button" class="btn btn-success text-white me-0" ></i>&nbsp; Modifier</a><button href="voir-fournisseur.html?id='+element+'" type="button" class="btn btn-danger text-white me-0" ></i>&nbsp; Supprimer</button></td>'             
							c+="</tr>"
						}).join();
		
						document.getElementById("tab-article").innerHTML = c;   
					}).catch((error) => {
						console.error('Failed to retrieve Conditionnment Entrepot data : ', error);
					});     
				}).catch((error) => {
					console.error('Failed to retrieve Conditionnment Article data : ', error);
				});  
			}).catch((error) => {
				console.error('Failed to retrieve Article Entrepot data : ', error);
			});	
		}).catch((error) => {
			console.error('Failed to retrieve Entrepot data : ', error);
		});	
	}).catch((error) => {
		console.error('Failed to retrieve Article data : ', error);
	});	       
}


const show_article_details = (article_id) => {
	connection = db_connect();
	// Perform a query

	$query_get_articles_conditionment = 'SELECT * FROM `Articles_Condmnt` WHERE article_id='+article_id;

	connection.query($query_get_articles, function(err, rows, fields) {
	    if(err){
	        console.log("An error ocurred performing the query.");
	        console.log(err);
	        return;
	    }

	    let c="";
	    let r = rows.map((article) => {
			c+="<tr>";
			c+='<td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td><td>'+article.libele_article+'</td><td>'+article.quantite_article+'</td><td>FCFA '+article.prix_unitaire+'</td><td>FCFA '+article.prix_unitaire * article.quantite_article+'</td><td>FCFA '+article.id_condmnt+'</td>'
	        c+='<td><div class="btn-wrapper"><a href="voir-fournisseur.html?id='+article.id_fournisseur+'" type="button" class="btn btn-success text-white me-0" ></i>&nbsp; Modifier</a><a href="voir-fournisseur.html?id='+article.id_fournisseur+'" type="button" class="btn btn-danger text-white me-0" ></i>&nbsp; Supprimer</a></td>'             
	        c+="</tr>"
		}).join();

	    document.getElementById("tab-article").innerHTML = c;                                  
	    //console.log("Query succesfully executed", rows[0].nom_fournisseur);
	});

	// Close the connection
	connection.end(function(){
	    // The connection has been closed
	});
           
}

//***** Function to load conditionment ***\\

const load_conditionment_items = () => {
		// Perform a query

	sequelize.query(
		'SELECT * FROM Conditionnements',
		{
			type: sequelize.QueryTypes.SELECT
		}
	).then(Conditionment_query => {
		console.log(Conditionment_query[0].id_condmnt);

		let c="";
		Conditionment_query.map((conditionment_item) => {
			c+='<option>'+conditionment_item.libele_condmnt+'</option>'  
		}).join();

		document.getElementById("conditionment_items").innerHTML = c;
	}).catch((error) => {
		console.error('Failed to retrieve Conditionment data : ', error);
	});	
}

//***** Function to register new article ***\\

const insert_article = (a,b,c,d) => {

	console.log(a,b,c,d);

	// Perform a query

	// Insertquery to add an article into database
	sequelize.query(
		'INSERT INTO Articles (id_article, libele_article, description) VALUES (DEFAULT, :libele_article, :description)',
		{
			replacements: {libele_article: a, description: a},
		  	type: sequelize.QueryTypes.INSERT
		}
	).then(article_query => {
		console.log(article_query);

		sequelize.query(
			'SELECT * FROM Conditionnements WHERE libele_condmnt = ?',
			{
			  replacements: [d],
			  type: sequelize.QueryTypes.SELECT
			}
		).then(conditionment_query => {
			console.log(conditionment_query[0].id_condmnt);

			sequelize.query(
				'INSERT INTO Articles_Condmnt (condmnt_id, article_id, prix_vente) VALUES (:condmnt_id, :article_id, :prix_vente)',
				{
					replacements: {condmnt_id: conditionment_query[0].id_condmnt, article_id: article_query[0], prix_vente: parseFloat(b)},
					type: sequelize.QueryTypes.INSERT
				}
			).then(query_article_conditionment => {
				console.log(query_article_conditionment);

				sequelize.query(
					'SELECT * FROM entrepots',
					{
					  type: sequelize.QueryTypes.SELECT
					}
				).then(entrepot_query => {
					console.log(entrepot_query[0].id_entrepot);
		
					sequelize.query(
						'INSERT INTO Entrepot_Article (entrepot_id, article_id, condmnt_id, stock) VALUES (:entrepot_id, :article_id, :condmnt_id, :stock)',
						{
							replacements: {entrepot_id: entrepot_query[0].id_entrepot, article_id: article_query[0], condmnt_id: conditionment_query[0].id_condmnt, stock: parseInt(c)},
							type: sequelize.QueryTypes.INSERT
						}
					).then(query_article_entrepot => {
						console.log(query_article_entrepot);
		
						
					}).catch((error) => {
						console.error('Failed to insert Article_entrepot data : ', error);
					});
				}).catch((error) => {
					console.error('Failed to retrieve Entrepot data : ', error);
				});
			}).catch((error) => {
				console.error('Failed to insert Article_Conditionment data : ', error);
			});
		}).catch((error) => {
			console.error('Failed to retrieve conditionments data : ', error);
		});
	}).catch((error) => {
		console.error('Failed to insert article data : ', error);
	});
}


//***** Function to update informations concerning a specific article ***\\

const update_article = (a,b,c,id) => {

	console.log(a,b,c,id);

	sequelize.query(
		"UPDATE Articles SET libele_article = :libele_article, description = :description WHERE id_article = :id_article",
		{
			replacements: {id_article: id, libele_article: a, description: a},
			type: sequelize.QueryTypes.UPDATE
		}
	).then(update_article => {
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
	}).catch((error) => {
		console.error('Failed to insert data : ', error);
	});
}



///////-------SECTION FACTURES / VEMTES----------\\\\\\\\\

//***** Function to load and display all sells in a list ***\\

const show_sells = () => {
	// Perform a query

	sequelize.query(
		'SELECT * FROM Articles',
		{
			type: sequelize.QueryTypes.SELECT
		}
	).then(article_query => {
		console.log(article_query[0].id_article);

		sequelize.query(
			'SELECT * FROM entrepots WHERE libele_entrepot = ?',
			{
				replacements: ['Boutique'],
				type: sequelize.QueryTypes.SELECT
			}
		).then(entrepot_query => {
			console.log(entrepot_query[0].id_entrepot);

			sequelize.query(
				'SELECT * FROM Entrepot_Article WHERE entrepot_id = ?',
				{
					replacements: [entrepot_query[0].id_entrepot],
					type: sequelize.QueryTypes.SELECT
				}
			).then(article_entrepot_query => {
				console.log(article_entrepot_query[0].entrepot_id);

				sequelize.query(
					'SELECT * FROM Articles_Condmnt',
					{
						type: sequelize.QueryTypes.SELECT
					}
				).then(article_conditionment_query => {
					console.log(article_conditionment_query);
	
					sequelize.query(
						'SELECT * FROM Conditionnements',
						{
							type: sequelize.QueryTypes.SELECT
						}
					).then(conditionment_query => {
						console.log(conditionment_query);
		
						var finalList = []
		
						console.log(article_query)
						console.log(article_entrepot_query)
		
						for (let item = 0; item < article_query.length; item++) {

							finalList.push([article_query[item],article_entrepot_query[item], article_conditionment_query[item]]);
						}
		
						console.log("c'est ok")
		
						let c="";
						finalList.map((element) => {
							c+="<tr>";
							c+='<td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td><td>'+element[0].libele_article+'</td><td>'+element[0].description+'</td><td>'+element[1].stock+'</td><td>FCFA '+element[2].prix_vente+'</td><td>FCFA '+element[2].prix_vente * element[1].stock+'</td><td>'+element[2].condmnt_id+'</td>'
							c+='<td><div class="btn-wrapper"><a href="article_details.html?article_id='+element[0].id_article+'&article_name='+element[0].libele_article+'&article_prix_unitaire='+element[2].prix_vente+'&article_quantity='+element[1].stock+'" type="button" class="btn btn-success text-white me-0" ></i>&nbsp; Modifier</a><button href="voir-fournisseur.html?id='+element+'" type="button" class="btn btn-danger text-white me-0" ></i>&nbsp; Supprimer</button></td>'             
							c+="</tr>"
						}).join();
		
						document.getElementById("tab-article").innerHTML = c;   
					}).catch((error) => {
						console.error('Failed to retrieve Conditionnment Entrepot data : ', error);
					});     
				}).catch((error) => {
					console.error('Failed to retrieve Conditionnment Article data : ', error);
				});  
			}).catch((error) => {
				console.error('Failed to retrieve Article Entrepot data : ', error);
			});	
		}).catch((error) => {
			console.error('Failed to retrieve Entrepot data : ', error);
		});	
	}).catch((error) => {
		console.error('Failed to retrieve Article data : ', error);
	});	       
}


const show_sell_details = (article_id) => {
	connection = db_connect();
	// Perform a query

	$query_get_articles_conditionment = 'SELECT * FROM `Articles_Condmnt` WHERE article_id='+article_id;

	connection.query($query_get_articles, function(err, rows, fields) {
	    if(err){
	        console.log("An error ocurred performing the query.");
	        console.log(err);
	        return;
	    }

	    let c="";
	    let r = rows.map((article) => {
			c+="<tr>";
			c+='<td class="py-1"><i class="mdi mdi-grid-large menu-icon"></i></td><td>'+article.libele_article+'</td><td>'+article.quantite_article+'</td><td>FCFA '+article.prix_unitaire+'</td><td>FCFA '+article.prix_unitaire * article.quantite_article+'</td><td>FCFA '+article.id_condmnt+'</td>'
	        c+='<td><div class="btn-wrapper"><a href="voir-fournisseur.html?id='+article.id_fournisseur+'" type="button" class="btn btn-success text-white me-0" ></i>&nbsp; Modifier</a><a href="voir-fournisseur.html?id='+article.id_fournisseur+'" type="button" class="btn btn-danger text-white me-0" ></i>&nbsp; Supprimer</a></td>'             
	        c+="</tr>"
		}).join();

	    document.getElementById("tab-article").innerHTML = c;                                  
	    //console.log("Query succesfully executed", rows[0].nom_fournisseur);
	});

	// Close the connection
	connection.end(function(){
	    // The connection has been closed
	});
           
}

//***** Function to load articles ***\\

const load_articles_items = () => {
		// Perform a query

	sequelize.query(
		'SELECT * FROM Articles',
		{
			type: sequelize.QueryTypes.SELECT
		}
	).then(function(Articles_query) {
		console.log(Articles_query[0].libele_article);

		// let c="";
		// Articles_query.map((Article_item) => {
		// 	c+='<option>'+Article_item.libele_article+'</option>'  
		// }).join();

		listArticles.push(Articles_query)

		// document.getElementById("articles_items[]").innerHTML = c;
	}).catch((error) => {
		console.error('Failed to retrieve Articles data : ', error);
	});	
}

//***** Function to load conditionment ***\\

const load_conditionment_items_for_sells = () => {
	// Perform a query

sequelize.query(
	'SELECT * FROM Conditionnements',
	{
		type: sequelize.QueryTypes.SELECT
	}
).then(Conditionment_query => {
	console.log(Conditionment_query[0].id_condmnt);

	// let c="";
	// Conditionment_query.map((conditionment_item) => {
	// 	c+='<option value='+conditionment_item.libele_condmnt+'>'+conditionment_item.libele_condmnt+'</option>'  
	// }).join();

	return Conditionment_query

	// document.getElementById("articles_conditionment[]").innerHTML = c;
}).catch((error) => {
	console.error('Failed to retrieve Conditionment data : ', error);
});	
}

//***** Function to register new sell ***\\

const insert_sell = (a,b,c,d) => {

	console.log(a,b,c);

	// Perform a query

	// Insertquery to add an article into database
	sequelize.query(
		'INSERT INTO Articles (id_article, libele_article, description) VALUES (DEFAULT, :libele_article, :description)',
		{
			replacements: {libele_article: a, description: a},
		  	type: sequelize.QueryTypes.INSERT
		}
	).then(article_query => {
		console.log(article_query);

		sequelize.query(
			'SELECT * FROM Conditionnements WHERE libele_condmnt = ?',
			{
			  replacements: [d],
			  type: sequelize.QueryTypes.SELECT
			}
		).then(conditionment_query => {
			console.log(conditionment_query[0].id_condmnt);

			sequelize.query(
				'INSERT INTO Articles_Condmnt (condmnt_id, article_id, prix_vente) VALUES (:condmnt_id, :article_id, :prix_vente)',
				{
					replacements: {condmnt_id: conditionment_query[0].id_condmnt, article_id: article_query[0], prix_vente: parseFloat(b)},
					type: sequelize.QueryTypes.INSERT
				}
			).then(query_article_conditionment => {
				console.log(query_article_conditionment);

				sequelize.query(
					'SELECT * FROM entrepots',
					{
					  type: sequelize.QueryTypes.SELECT
					}
				).then(entrepot_query => {
					console.log(entrepot_query[0].id_entrepot);
		
					sequelize.query(
						'INSERT INTO Entrepot_Article (entrepot_id, article_id, condmnt_id, stock) VALUES (:entrepot_id, :article_id, :condmnt_id, :stock)',
						{
							replacements: {entrepot_id: entrepot_query[0].id_entrepot, article_id: article_query[0], condmnt_id: conditionment_query[0].id_condmnt, stock: parseInt(c)},
							type: sequelize.QueryTypes.INSERT
						}
					).then(query_article_entrepot => {
						console.log(query_article_entrepot);
		
						
					}).catch((error) => {
						console.error('Failed to insert Article_entrepot data : ', error);
					});
				}).catch((error) => {
					console.error('Failed to retrieve Entrepot data : ', error);
				});
			}).catch((error) => {
				console.error('Failed to insert Article_Conditionment data : ', error);
			});
		}).catch((error) => {
			console.error('Failed to retrieve conditionments data : ', error);
		});
	}).catch((error) => {
		console.error('Failed to insert article data : ', error);
	});
}


//***** Function to update informations concerning a specific sell ***\\

const update_sells = (a,b,c,id) => {

	console.log(a,b,c,id);

	sequelize.query(
		"UPDATE Articles SET libele_article = :libele_article, description = :description WHERE id_article = :id_article",
		{
			replacements: {id_article: id, libele_article: a, description: a},
			type: sequelize.QueryTypes.UPDATE
		}
	).then(update_article => {
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
	}).catch((error) => {
		console.error('Failed to insert data : ', error);
	});
}




contextBridge.exposeInMainWorld(
  'electron',
  {
    afiche_fseur : afiche_fseur,
    insert_fseur : insert_fseur,
    update_fseur : update_fseur,
    detail_fseur : detail_fseur,
    chargement_articles_BC : chargement_articles_BC ,
    chargement_cdmnt_BC : chargement_cdmnt_BC,
    chargement_fseur_BC : chargement_fseur_BC,
 	// Functions to maanage articles
    show_article: show_article,
	show_article_details: show_article_details,
    insert_article : insert_article,
    update_article : update_article,
    load_conditionment_items : load_conditionment_items,
	// Function to Manage Sells and Bills
	show_sells: show_sells,
	show_sell_details: show_sell_details,
	load_articles_items: load_articles_items,
	insert_sell: insert_sell,
	update_sells: update_sells,
	load_conditionment_items_for_sells: load_conditionment_items_for_sells
  }
)