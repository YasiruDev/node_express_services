const Category = require('../models/category');
const Moment = require('moment');

const category = {

    create: (req, res) => {
        const {category} = req.body;
        const data = {
            category, status:1
        };
        Category.insert(data, (err, row) => {
            if (err) {
                res.json({msg: err.message, status: false});
            } else {
                res.json({msg: 'You have successfully created a category', status: true});
            }
        });
    },

    list: (req, res) => {
        Category.list((err, rows) => {
            if (err) {
                res.json({msg: err.message, status: false});
            } else {
                res.json({msg: 'You have successfully fetch categories', status: true, data: rows});
            }
        });
    },
}

module.exports = category;
