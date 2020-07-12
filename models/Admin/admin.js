const db = require('./../../config/db');

const admin = {

    checkAdmin: (data, next) => {
        const query = "SELECT * FROM admin WHERE aName=? limit 1";
        db.query(query, [data.email], next);
    },

    insert: (data, next) => {
        const query = "INSERT INTO admin set ? ";
        db.query(query, data, next);
    },

    validateAdmin: (data, next) => {
        const query = "SELECT id,aName FROM admin WHERE aName=? AND password=? limit 1";
        db.query(query, [data.aName, data.password], next);
    },
    insertCity: (data, next) => {
        const query = "INSERT INTO city set ? ";
        db.query(query, data, next);
    },
    listCitites: (data, next) => {
        const query = "SELECT * FROM city ";
        db.query(query, null, next);
    },
    updateCity: (data, next) => {
        const query = 'UPDATE city SET status=?,updatedAt=? WHERE id=?';
        db.query(query, [data.status, data.updatedAt, data.cityId], next);
    },
    insertCategory: (data, next) => {
        const query = "INSERT INTO category set ? ";
        db.query(query, data, next);
    },
    listCategories: (data, next) => {
        const query = "SELECT * FROM category ";
        db.query(query, null, next);
    },
    categoryById: (data, next) => {
        const query = "SELECT * FROM category WHERE id=? ";
        db.query(query, data.catId, next);
    },
    editCategory: (data, next) => {
        const query = 'UPDATE category SET category=?,updatedAt=? WHERE id=?';
        db.query(query, [data.category, data.updatedAt, data.catId], next);
    },
    updateCategory: (data, next) => {
        const query = 'UPDATE category SET status=?,updatedAt=? WHERE id=?';
        db.query(query, [data.status, data.updatedAt, data.catId], next);
    },
    listPayments: (data, next) => {
        const where = data.sId?`supplier.id=? AND payment.date=?`:`payment.date=?`;
        const dataValues = data.sId?[data.sId,data.date] : [data.date]
        const query = `SELECT payment.sId,supplier.sName,payment.membership,payment.date,payment.desc,payment.amount
        FROM payment
        LEFT JOIN supplier 
            ON supplier.id = payment.sId
            WHERE  ${where}`;
        db.query(query, dataValues, next);
    },
    checkPayment: (data, next) => {
        const query = "SELECT * FROM payment WHERE sId=? AND date=? limit 1";
        db.query(query, [data.sId,data.date], next);
    },
    insertPayment: (data, next) => {
        const query = "INSERT INTO payment set ? ";
        db.query(query, data, next);
    },
}

module.exports = admin;