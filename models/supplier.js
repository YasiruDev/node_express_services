const db = require('../config/db');

const supplier = {

    checkSupplier: (data, next) => {
        const query = "SELECT email FROM supplier WHERE email=? limit 1";
        db.query(query, [data.email], next);
    },

    insert: (data, next) => {
        const query = "INSERT INTO supplier set ? ";
        db.query(query, data, next);
    },

    validateSupplier: (data, next) => {
        const query = "SELECT id, email FROM supplier WHERE email=? AND password=? AND status=1 limit 1";
        db.query(query, [data.email, data.password], next);
    },
    list: (data, next) => {
        const query = "SELECT * FROM supplier ";
        db.query(query, null, next);
    },
    supplierById: (data, next) => {
        const query = "SELECT * FROM supplier WHERE id=? ";
        db.query(query, data.sId, next);
    },
    updateSupplier: (data, next) => {
        const query = 'UPDATE supplier SET status=?,updatedAt=? WHERE id=?';
        db.query(query, [data.status, data.updatedAt, data.sId], next);
    },
    editSupplier: (data, next) => {
        const query = 'UPDATE supplier SET sName=?,mobile=?,updatedAt=? WHERE id=?';
        db.query(query, [data.sName, data.mobile,data.updatedAt, data.sId], next);
    },
}

module.exports = supplier;