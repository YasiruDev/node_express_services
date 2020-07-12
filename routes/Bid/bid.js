
const Bid = require('../../models/Job/bid');

const bid = {

    bid: (req, res) => {
        const {jId, value} = req.body;
        const sId = req.userId;
        const data ={
            jId, sId, value,
            createdAt : new Date(),
            updatedAt : new Date()
        }
      
        Bid.submit(data, (err, row) => {
            if (err) {
                res.json({msg: err.message, status: false});
            } else {
                res.json({msg: 'You have successfully bided', status: true});
            }
        });
    }
}

module.exports = bid;
