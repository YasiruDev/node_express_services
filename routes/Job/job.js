const md5 = require('md5');
const jwt = require('jwt-simple');
const {STATUS} = require('./../../config');
const Job = require('./../../models/Job/job');


const job = {


    create: (req, res) => {
        const {catId,title,desc,address,city,mobile,image} = req.body;
        const cId = req.userId;
        const data ={
            cId, 
            catId,
            title,
            desc,
            address,
            city,
            mobile,
            image,
            status:STATUS[0],
            createdAt : new Date(),
            updatedAt : new Date()
        }
        Job.insert(data, (err, job) => {
            if (err) {
                res.json({msg: err.message, status: false});
            } else {
                if (job.length > 0) {
                 
                    res.json({msg: 'Job created successfully', status: true, data: job[0]});
                } else {
                    res.json({msg: 'Please enter valid details', status: false});
                }
            }
        });
    },
    update: (req, res) => {
        const {jId,sId} = req.body;
        const cId = req.userId;
        const data ={
            id:jId,
            cId, 
            sId,
            status:STATUS[1],
            updatedAt : new Date()
        }
        Job.updateJob(data, (err, job) => {
            if (err) {
                res.json({msg: err.message, status: false});
            } else {
                if (job.length > 0) {
                 
                    res.json({msg: 'Job picked successfully', status: true, data: job[0]});
                } else {
                    res.json({msg: 'Please enter valid details', status: false});
                }
            }
        });
    },
    listAll: (req, res) => {

        Job.list(req.query,(err, rows) => {
            if (err) {
                res.json({msg: err.message, status: false});
            } else {
                res.json({msg: 'You have successfully fetch jobs', status: true, data: rows});
            }
        });
    },
  
    listByCIty: (req, res) => {

        Job.listByCIty(req.query,(err, rows) => {
            if (err) {
                res.json({msg: err.message, status: false});
            } else {
                res.json({msg: 'You have successfully fetch jobs', status: true, data: rows});
            }
        });
    },
    orderHistory: (req, res) => {
        const cId = req.userId;
        Job.customerJobHistory(cId,(err, rows) => {
            if (err) {
                res.json({msg: err.message, status: false});
            } else {
                res.json({msg: 'You have successfully fetch jobs history', status: true, data: rows});
            }
        });
    },
    SupOrderHistory: (req, res) => {
        const sId = req.userId;
        Job.supplierJobHistory(sId,(err, rows) => {
            if (err) {
                res.json({msg: err.message, status: false});
            } else {
                res.json({msg: 'You have successfully fetch jobs history', status: true, data: rows});
            }
        });
    },
  
}

module.exports = job;
