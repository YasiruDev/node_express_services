const db = require('../config/db');

const customer = {

    checkCustomer: (data, next) => {
        const query = "SELECT  email FROM customer WHERE email=? limit 1";
        db.query(query, [data.email], next);
    },

    insert: (data, next) => {
        const query = "INSERT INTO customer set ? ";
        db.query(query, data, next);
    },

    validateCustomer: (data, next) => {
        const query = "SELECT id, email FROM customer WHERE email=? AND password=? AND status=1 limit 1";
        db.query(query, [data.email, data.password], next);
    },
    list: (data, next) => {
        const query = "SELECT * FROM customer ";
        db.query(query, null, next);
    },
    customerById: (data, next) => {
        const query = "SELECT * FROM customer WHERE id=? ";
        db.query(query, data.cId, next);
    },
    editCustomer: (data, next) => {
        const query = 'UPDATE customer SET cName=?,email=?,updatedAt=? WHERE id=?';
        db.query(query, [data.cName, data.email,data.updatedAt, data.cId], next);
    },
    updateCustomer: (data, next) => {
        const query = 'UPDATE customer SET status=?,updatedAt=? WHERE id=?';
        db.query(query, [data.status, data.updatedAt, data.cId], next);
    },
}

module.exports = customer;