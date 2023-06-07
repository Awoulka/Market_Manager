var alasql = require('alasql');

var db = new alasql.Database();

db.exec("CREATE TABLE example (a INT, b INT)");

db.tables.example.data = [
	{a:5,b:6},
	{a:3,b:4}
];

console.table(alasql('SELECT * FROM example'));
