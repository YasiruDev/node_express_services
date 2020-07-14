const express = require('express');
const router = express.Router();

const validator = require('../middleware/validator');
const customer = require('./customer');
const category = require('./category');
const supplier = require('./supplier');
const admin = require('./Admin/admin');
const job = require('./Job/job');
const bid = require('./Bid/bid')



router.post('/api/protected/category/create', validator.createCategory, category.create);
router.get('/api/protected/category/list', category.list);

//customer
router.post('/api/customer/signup', validator.signupCustomer, customer.singup);
router.post('/api/customer/login', validator.login, customer.login);

router.post('/api/protected/customer/job-create', validator.createJob, job.create);
router.patch('/api/protected/customer/approve-bid', validator.approveBid, job.update);
router.get('/api/protected/customer/order-list',  job.orderHistory); 

router.post('/api/protected/customer/upload', job.upload);

//Supplier
router.post('/api/supplier/signup', validator.signup, supplier.singup);
router.post('/api/supplier/login', validator.login, supplier.login);

router.post('/api/protected/supplier/bid', validator.bid, bid.bid);
router.get('/api/protected/supplier/job-list-by-city',validator.cityCheck, job.listByCIty);
router.get('/api/protected/supplier/order-list',  job.SupOrderHistory);

//Admin
router.post('/api/admin/signup', validator.signupAdmin, admin.singup);
router.post('/api/admin/login', validator.loginAdmin, admin.login);
router.get('/api/protected/admin/customer-list',  customer.listAll);
router.get('/api/protected/admin/supplier-list',  supplier.listAll);
router.get('/api/protected/admin/supplier',validator.checkSid, supplier.supplierById);
router.patch('/api/protected/admin/supplier-edit', validator.editSupplier, supplier.editSupplier);
router.patch('/api/protected/admin/supplier-change-status', validator.changeStatus, supplier.changeStatus);

router.get('/api/protected/admin/customer',validator.checkCid, customer.customerById);
router.patch('/api/protected/admin/customer-edit', validator.editCustomer, customer.editCustomer);
router.patch('/api/protected/admin/customer-change-status', validator.changeCustomerStatus, customer.changeStatus);

router.get('/api/protected/admin/job-list-all', job.listAll);

router.post('/api/protected/admin/city', validator.addCity, admin.cityCreate);
router.get('/api/protected/admin/city-list',  admin.listAllCities);
router.patch('/api/protected/admin/city-change-status', validator.changeCityStatus, admin.changeStatus);

router.post('/api/protected/admin/category', validator.addCategory, admin.categoryCreate);
router.get('/api/protected/admin/category-list',  admin.listAllCategories);
router.get('/api/protected/admin/category',validator.checkCatid, admin.categoryById);
router.patch('/api/protected/admin/category-edit', validator.editCategory, admin.editCategory);
router.patch('/api/protected/admin/category-change-status', validator.changeCategoryStatus, admin.changeCategoryStatus);

router.get('/api/protected/supplier/payment-list-all', validator.pymentFilterCheck,admin.listAllPayments);
router.post('/api/protected/supplier/payment', validator.addPayment, admin.createPayment);

module.exports = router;
