const md5 = require('md5');
const jwt = require('jwt-simple');
const Supplier = require('../models/supplier');

const supplier = {

    singup: (req, res) => {
        const { sName, email, mobile, password } = req.body;
        const data = {
            sName, email, mobile, status: 0, password: md5(password) ,  createdAt: new Date()
        };
        Supplier.checkSupplier({ email: email }, (err, row) => {
            if (err) {
                res.json({ msg: err.message, status: false });
            } else {
                if (row.length > 0) {
                    res.json({ msg: 'This email has already used', status: false });
                } else {
                    Supplier.insert(data, (err, row) => {
                        if (err) {
                            res.json({ msg: err.message, status: false });
                        } else {
                            res.json({ msg: 'You have successfully registered', status: true });
                        }
                    });
                }
            }
        });
    },

    login: (req, res) => {
        const { email, password } = req.body;
        const data = {
            email, password: md5(password)
        };
        Supplier.validateSupplier(data, (err, supplier) => {
            if (err) {
                res.json({ msg: err.message, status: false });
            } else {
                if (supplier.length > 0) {
                    const date_obj = new Date();
                    date_obj.setDate(date_obj.getDate() + 1);
                    const token = jwt.encode({
                        exp: date_obj,
                        id: supplier[0].id,
                        supplierEmail: supplier[0].email
                    }, process.env.AUTH_SECRET);
                    supplier[0].token = token;
                    res.json({ msg: 'You have login successfully', status: true, data: supplier[0] });
                } else {
                    res.json({ msg: 'You are not authorized', status: false });
                }
            }
        });
    },
    listAll: (req, res) => {

        Supplier.list(req.query, (err, rows) => {
            if (err) {
                res.json({ msg: err.message, status: false });
            } else {
                res.json({ msg: 'You have successfully fetch suppliers', status: true, data: rows });
            }
        });
    },
    supplierById: (req, res) => {

        Supplier.supplierById(req.query, (err, rows) => {
            if (err) {
                res.json({ msg: err.message, status: false });
            } else {
                res.json({ msg: 'You have successfully fetch suppliers', status: true, data: rows });
            }
        });
    },
    changeStatus: (req, res) => {
        const { status, sId } = req.body;
        const data = {
            sId,
            status: status,
            updatedAt: new Date()
        }
        Supplier.updateSupplier(data, (err, rows) => {
            if (err) {
                res.json({ msg: err.message, status: false });
            } else {
                res.json({ msg: 'You have successfully update suppliers', status: true, data: rows });
            }
        });
    },
    editSupplier: (req, res) => {
        const { sName, mobile, sId } = req.body;
        const data = {
            sId,
            sName,
            mobile,
            updatedAt: new Date()
        }
        Supplier.editSupplier(data, (err, rows) => {
            if (err) {
                res.json({ msg: err.message, status: false });
            } else {
                res.json({ msg: 'You have successfully update suppliers', status: true, data: rows });
            }
        });
    },
}

module.exports = supplier;
