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