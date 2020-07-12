const md5 = require('md5');
const jwt = require('jwt-simple');
const Admin = require('./../../models/Admin/admin');

const admin = {

    singup: (req, res) => {
        const {aName, password} = req.body;
        const data = {
            aName, password: md5(password)
        };
        Admin.checkAdmin({aName}, (err, row) => {
            if (err) {
                res.json({msg: err.message, status: false});
            } else {
                if (row.length > 0) {
                    res.json({msg: 'This name has already used', status: false});
                } else {
                    Admin.insert(data, (err, row) => {
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
        const {aName,password} = req.body;
        const data = {
            aName,password: md5(password)
        };
        Admin.validateAdmin(data, (err, admin) => {
            if (err) {
                res.json({msg: err.message, status: false});
            } else {
                if (admin.length > 0) {
                    const date_obj = new Date();
                    date_obj.setDate(date_obj.getDate() + 1);
                    const token = jwt.encode({
                        exp: date_obj,
                        id: admin[0].id,
                        customerName: admin[0].aName
                    }, process.env.AUTH_SECRET);
                    admin[0].token = token;
                    res.json({msg: 'You have login successfully', status: true, data: admin[0]});
                } else {
                    res.json({msg: 'Please enter valid name or password', status: false});
                }
            }
        });
    },
    cityCreate: (req, res) => {
        const {city} = req.body;
        const data = {
            city, status:1,createdAt: new Date()
        };
        Admin.insertCity(data, (err, row) => {
            if (err) {
                res.json({msg: err.message, status: false});
            } else {
                res.json({msg: 'You have successfully created a city', status: true});
            }
        });
    },
    listAllCities: (req, res) => {

        Admin.listCitites(req.query,(err, rows) => {
            if (err) {
                res.json({msg: err.message, status: false});
            } else {
                res.json({msg: 'You have successfully fetch customers', status: true, data: rows});
            }
        });
    },
    changeStatus: (req, res) => {
        const {status,cityId} = req.body;
        const data ={
            cityId,
            status:status,
            updatedAt : new Date()
        }
        Admin.updateCity(data, (err, rows) => {
            if (err) {
                res.json({msg: err.message, status: false});
            } else {
                res.json({msg: 'You have successfully update city', status: true, data: rows});
            }
        });
    },
    categoryCreate: (req, res) => {
        const {category} = req.body;
        const data = {
            category, status:1,createdAt: new Date()
        };
        Admin.insertCategory(data, (err, row) => {
            if (err) {
                res.json({msg: err.message, status: false});
            } else {
                res.json({msg: 'You have successfully created a category', status: true});
            }
        });
    },
    listAllCategories: (req, res) => {

        Admin.listCategories(req.query,(err, rows) => {
            if (err) {
                res.json({msg: err.message, status: false});
            } else {
                res.json({msg: 'You have successfully fetch categories', status: true, data: rows});
            }
        });
    },
    categoryById: (req, res) => {

        Admin.categoryById(req.query,(err, rows) => {
            if (err) {
                res.json({msg: err.message, status: false});
            } else {
                res.json({msg: 'You have successfully fetch category', status: true, data: rows});
            }
        });
    },
    editCategory: (req, res) => {
        const {category,catId} = req.body;
        const data ={
            catId,
            category,
            updatedAt : new Date()
        }
        Admin.editCategory(data, (err, rows) => {
            if (err) {
                res.json({msg: err.message, status: false});
            } else {
                res.json({msg: 'You have successfully update category', status: true, data: rows});
            }
        });
    },
    changeCategoryStatus: (req, res) => {
        const {status,catId} = req.body;
        const data ={
            catId,
            status:status,
            updatedAt : new Date()
        }
        Admin.updateCategory(data, (err, rows) => {
            if (err) {
                res.json({msg: err.message, status: false});
            } else {
                res.json({msg: 'You have successfully update Category', status: true, data: rows});
            }
        });
    },
    listAllPayments: (req, res) => {

        Admin.listPayments(req.query,(err, rows) => {
            if (err) {
                res.json({msg: err.message, status: false});
            } else {
                res.json({msg: 'You have successfully fetch jobs', status: true, data: rows});
            }
        });
    },
    createPayment: (req, res) => {
        const {sId,membership,date,desc,amount} = req.body;
        const data = {
            sId,membership,date,desc,amount,createdAt: new Date()
        };
        Admin.checkPayment(data, (err, row) => {
            console.log("row ---->",row)
            if (row.length>0) {
                res.json({msg: `Supplier Id #${data.sId} have paid for -${data.date}`, status: false});
            } else {
                Admin.insertPayment(data, (err, row) => {
                    if (err) {
                        res.json({msg: err.message, status: false});
                    } else {
                        res.json({msg: 'You have successfully created a payment', status: true});
                    }
                });
            }
        });
       
    },
}

module.exports = admin;
