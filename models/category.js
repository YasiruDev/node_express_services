const db = require('../config/db');

const category = {

    insert: (data, next) => {
        const query = "INSERT INTO category set ? ";
        db.query(query, data, next);
    },

    list: (next) => {
        const query = "SELECT * FROM category WHERE status=1";
        db.query(query, null, next);
    },
}

module.exports = category;