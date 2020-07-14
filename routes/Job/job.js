const md5 = require('md5');
const jwt = require('jwt-simple');
const { STATUS } = require('./../../config');
const Job = require('./../../models/Job/job');
const fileuploder = require('../../helpers/fileUploader');

const job = {


    create: (req, res) => {
        const { catId, title, desc, address, city, mobile, image } = req.body;
        const cId = req.userId;
        const data = {
            cId,
            catId,
            title,
            desc,
            address,
            city,
            mobile,
            image,
            status: STATUS[0],
            createdAt: new Date(),
            updatedAt: new Date()
        }
        Job.insert(data, (err, job) => {
            if (err) {
                res.json({ msg: err.message, status: false });
            } else {
                if (job.length > 0) {

                    res.json({ msg: 'Job created successfully', status: true, data: job[0] });
                } else {
                    res.json({ msg: 'Please enter valid details', status: false });
                }
            }
        });
    },
    update: (req, res) => {
        const { jId, sId } = req.body;
        const cId = req.userId;
        const data = {
            id: jId,
            cId,
            sId,
            status: STATUS[1],
            updatedAt: new Date()
        }
        Job.updateJob(data, (err, job) => {
            if (err) {
                res.json({ msg: err.message, status: false });
            } else {
                if (job.length > 0) {

                    res.json({ msg: 'Job picked successfully', status: true, data: job[0] });
                } else {
                    res.json({ msg: 'Please enter valid details', status: false });
                }
            }
        });
    },
    listAll: (req, res) => {

        Job.list(req.query, (err, rows) => {
            if (err) {
                res.json({ msg: err.message, status: false });
            } else {
                res.json({ msg: 'You have successfully fetch jobs', status: true, data: rows });
            }
        });
    },

    listByCIty: (req, res) => {

        Job.listByCIty(req.query, (err, rows) => {
            if (err) {
                res.json({ msg: err.message, status: false });
            } else {
                res.json({ msg: 'You have successfully fetch jobs', status: true, data: rows });
            }
        });
    },
    orderHistory: (req, res) => {
        const cId = req.userId;
        Job.customerJobHistory(cId, (err, rows) => {
            if (err) {
                res.json({ msg: err.message, status: false });
            } else {
                res.json({ msg: 'You have successfully fetch jobs history', status: true, data: rows });
            }
        });
    },
    SupOrderHistory: (req, res) => {
        const sId = req.userId;
        Job.supplierJobHistory(sId, (err, rows) => {
            if (err) {
                res.json({ msg: err.message, status: false });
            } else {
                res.json({ msg: 'You have successfully fetch jobs history', status: true, data: rows });
            }
        });
    },
    upload: (req, res) => {
        fileuploder.fileUpload(req, res, process.env.UPLOAD_DIR, process.env.PROFILE_PICTURES, function (err, doc) {
            if (err) {                
                res.json({ msg: err.message, status: false });
                return;
            } else {
                const profPicPath = 'http://' + process.env.ACCESS_URL + '/' + doc.filePath;
                var picData = {
                    jId: req.body.jId,
                    imageUrl: profPicPath
                }
                Job.update_pic(picData, function (pic_error, result) {
                    if (pic_error) {
                        console.log('Faile to upload Job description  ', pic_error);
                    } else {
                        console.log('Job description uploaded success',);
                    }
                });

                var msg = {
                    filePath: profPicPath,
                    msg: 'Job description uploaded'
                };
                res.json({ msg: 'Job description uploaded', status: true, data: msg });
                return;

            }
        });
    },

}

module.exports = job;
