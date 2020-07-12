const mysql = require('mysql');

const db = {
	pool: mysql.createPool({
		connectionLimit: process.env.DB_POOL_SIZE,
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		debug: false,
		timezone: 'utc'
	}),

	trans: mysql.createConnection(
		{
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE
		}
	),
	query: function (qry, params, next) {
		qry = mysql.format(qry, params);
		console.log(qry);
		db.pool.query(qry, function (err, rows) {
			next && next(err, rows);
		});
	},

	transactionQuery: function (qry1, qry2, qry3, params1, params2, next) {
		db.trans.beginTransaction(function (err) {
			if (err) { throw err; }

			db.trans.query(mysql.format(qry1, params1), function (err, result) {
				if (err) {
					db.trans.rollback(function () {
						throw err;
					});
				}

				params2.jId = result.insertId

				db.trans.query(mysql.format(qry2, params2), function (err, result) {
					if (err) {
						db.trans.rollback(function () {
							throw err;
						});
					}
					db.trans.commit(function (err) {
						if (err) {
							db.trans.rollback(function () {
								throw err;
							});
						}

						db.trans.query(mysql.format(qry3, params2.jId), function (err, rows) {
							next(err, rows);
						});
						db.trans.end();
					});
				});
			});
		});
	}
}

module.exports = db;