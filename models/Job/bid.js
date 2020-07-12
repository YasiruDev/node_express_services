const db = require('../../config/db');

const bid = {
  
    submit: (data, next) => {
        const query = "INSERT INTO bid set ? ";
        db.query(query, data, next);
    },

}

module.exports = bid;