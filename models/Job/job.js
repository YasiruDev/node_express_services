const db = require('../../config/db');

const job = {

    insert: (data, next) => {
        const query1 = "INSERT INTO job set ? ";
        const query2 = "INSERT INTO image set ? ";
        const query3 = "SELECT * FROM job WHERE id=? ";
        const param2 = {
            imageUrl: data.image
        }
        delete data.image

        db.transactionQuery(query1, query2, query3, data, param2, next);

    },
    updateJob: (data, next) => {
        const query = 'UPDATE job SET sId=?,status=?,updatedAt=? WHERE id=?';
        db.query(query, [data.sId, data.status, data.updatedAt, data.id], null);
        job.selectJob(data, next);
    },
    list: (data, next) => {
        const query = `SELECT job.id,job.title,job.desc,job.mobile,job.address,
        job.city,job.updatedAt,job.status,bid.value,customer.cName,supplier.sName
        FROM job
        INNER JOIN customer 
            ON customer.id = job.cId 
        LEFT JOIN supplier 
            ON supplier.id = job.sId
        LEFT JOIN bid 
            ON  bid.sId = job.sId 
            AND bid.jId = job.id  
        WHERE supplier.id IS NULL OR bid.id IS NOT NULL`;
        db.query(query, null, next);
    },
    selectJob: (data, next) => {
        const query = "SELECT * FROM job WHERE id= ? ";
        db.query(query, data.id, next);
    },
    listByCIty: (data, next) => {
        const query = "SELECT * FROM job WHERE city= ? AND status IS NULL or status=''";
        db.query(query, data.city, next);
    },
    customerJobHistory: (cId, next) => {
        const query = "SELECT * FROM job WHERE cId= ? ";
        db.query(query, cId, next);
    },
    supplierJobHistory: (sId, next) => {
        const query = "SELECT * FROM job WHERE sId= ? ";
        db.query(query, sId, next);
    },
    bid: (data, next) => {
        const query = "INSERT INTO bid set ? ";
        db.query(query, data, next);
    },
    update_pic: function (picData,next) {                      
        var query = "INSERT INTO image set ?";
        db.query(query, picData, next);
    }, 

}

module.exports = job;