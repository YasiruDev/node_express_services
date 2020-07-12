const md5 = require('md5');
const jwt = require('jwt-simple');
const Customer = require('../models/customer');

const customer = {

    singup: (req, res) => {
        const {cName, email, password} = req.body;
        const data = {
            cName, email, password: md5(password), status : 1 , createdAt: new Date()
        };
        Customer.checkCustomer({email}, (err, row) => {
            if (err) {
                res.json({msg: err.message, status: false});
            } else {
                if (row.length > 0) {
                    res.json({msg: 'This email has already used', status: false});
                } else {
                    Customer.insert(data, (err, row) => {
                        if (err) {
                            res.json({msg: err.message, status: false});
                        } else {
                            res.json({msg: 'You have successfully registered', status: true});
                        }
                    });
                }
            }
        });
    },

    login: (req, res) => {
        const {email,password} = req.body;
        const data = {
            email,password: md5(password)
        };
        Customer.validateCustomer(data, (err, customer) => {
            if (err) {
                res.json({msg: err.message, status: false});
            } else {
                if (customer.length > 0) {
                    const date_obj = new Date();
                    date_obj.setDate(date_obj.getDate() + 1);
                    const token = jwt.encode({
                        exp: date_obj,
                        id: customer[0].id,
                        customerEmail: customer[0].email
                    }, process.env.AUTH_SECRET);
                    customer[0].token = token;
                    res.json({msg: 'You have login successfully', status: true, data: customer[0]});
                } else {
                    res.json({msg: 'You are not authorized', status: false});
                }
            }
        });
    },
    listAll: (req, res) => {

        Customer.list(req.query,(err, rows) => {
            if (err) {
                res.json({msg: err.message, status: false});
            } else {
                res.json({msg: 'You have successfully fetch customers', status: true, data: rows});
            }
        });
    },
    customerById: (req, res) => {

        Customer.customerById(req.query,(err, rows) => {
            if (err) {
                res.json({msg: err.message, status: false});
            } else {
                res.json({msg: 'You have successfully fetch Customers', status: true, data: rows});
            }
        });
    },
    editCustomer: (req, res) => {
        const {cName,email,cId} = req.body;
        const data ={
            cId,
            cName,
            email,
            updatedAt : new Date()
        }
        Customer.editCustomer(data, (err, rows) => {
            if (err) {
                res.json({msg: err.message, status: false});
            } else {
                res.json({msg: 'You have successfully update suppliers', status: true, data: rows});
            }
        });
    },
    changeStatus: (req, res) => {
        const {status,cId} = req.body;
        const data ={
            cId,
            status:status,
            updatedAt : new Date()
        }
        Customer.updateCustomer(data, (err, rows) => {
            if (err) {
                res.json({msg: err.message, status: false});
            } else {
                res.json({msg: 'You have successfully update customer', status: true, data: rows});
            }
        });
    },
    upload: (req, res) => {
        const {} = req.body;
        console.log("req ==>",req.body);
        console.log("req.files==>",req.files);
        // const data ={
        //     cId,
        //     status:status,
        //     updatedAt : new Date()
        // }
        // Customer.updateCustomer(data, (err, rows) => {
        //     if (err) {
        //         res.json({msg: err.message, status: false});
        //     } else {
        //         res.json({msg: 'You have successfully update customer', status: true, data: rows});
        //     }
        // });
    },
}

module.exports = customer;
