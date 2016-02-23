var DB = require('../lib/db.js');
var Utils = require("../lib/utils");

/**
 * CRUD API for resource
 */
module.exports = function(app) {
	
	var db = DB(app.config);
	var util = Utils();
	
	/**
	 * ======= admin API ========= 
	 */
	
	/**
	 * get all resources
	 */
	app.get('/api/t/:table', function(req, res){
		var table = req.params.table;
		
		db.connect(function(err, connection){
			connection.query('SELECT * FROM ' + table, function(err, docs) {
				connection.release();
				
				if (!err) {
					//pages = util.pickFields(docs, ['slug','title','language']);
					return res.status(200).send(docs);
				} else {
					return res.status(500).send({ message : err });
				}
			});
		});
	});

	/**
	 * save a resource by POST
	 * return inserted object with pk
	 */
	app.post('/api/t/:table', function(req, res){
		var table = req.params.table;
		
		db.connect(function(err, connection){
			// req.body like  {title: 'test'}
			connection.query('INSERT INTO '+ table +' SET ?', req.body, function(err, result) {
				connection.release();
				
				if (!err) {
					//pages = util.pickFields(docs, ['slug','title','language']);
					req.body = _.extend(req.body, {id: result.insertId});
					
					return res.status(200).send(req.body);
				} else {
					return res.status(500).send({ message : err });
				}
			});
		});
	});

	/**
	 * Update an existing object, return updated object
	 */
	app.put('/api/t/:table', function(req, res){
		var id = req.body._id;
		var table = req.params.table;
		var object = _.omit(req.body, 'id');
		
		console.log('editing ' + table + 'with id =' + id);
		
		db.connect(function(err, connection){
			// req.body like  {title: 'test'}
			connection.query('UPDATE ?? SET ? WHERE id = ??', [table, object , id ], function(err, result) {
				connection.release();
				
				if (!err) {
					return res.status(200).send(req.body);
				} else {
					return res.status(500).send({ message : err });
				}
			});
		});
	});

	/**
	 * delete an existing object
	 */
	app.delete('/api/t/:table/:id', function(req, res){
		var id = req.params.id;
		var table = req.params.table;
		
		db.connect(function(err, connection){
			// req.body like  {title: 'test'}
			connection.query('DELETE FROM ?? WHERE id = ??', [table, id], function(err, result) {
				connection.release();
				
				if (!err) {
					return res.status(200).send(req.body);
				} else {
					return res.status(500).send({ message : err });
				}
			});
		});
	});
	
};