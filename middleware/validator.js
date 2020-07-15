const validator = {

    signup: (req, res, next) => {
        const { sName, mobile, email, password } = req.body;
        if (sName == '' || sName == null) {
            res.json({ msg: "Supplier name required", status: false });
        } else if (mobile == '' || mobile == null) {
            res.json({ msg: "Mobile required", status: false });
        } else if (email == '' || email == null) {
            res.json({ msg: "Email required", status: false });
        } else if (password == '' || password == null) {
            res.json({ msg: "Password required", status: false });
        }
        else {
            next();
        }
    },

    login: (req, res, next) => {
        const { email, password } = req.body;
        if (email == '' || email == null) {
            res.json({ msg: "Email required", status: false });
        } else if (password == '' || password == null) {
            res.json({ msg: "Password required", status: false });
        } else {
            next();
        }
    },
    loginAdmin: (req, res, next) => {
        const { aName, password } = req.body;
        if (aName == '' || aName == null) {
            res.json({ msg: "Admin Name required", status: false });
        } else if (password == '' || password == null) {
            res.json({ msg: "Password required", status: false });
        } else {
            next();
        }
    },
    signupAdmin: (req, res, next) => {
        const { aName, password } = req.body;
        if (aName == '' || aName == null) {
            res.json({ msg: "Admin name required", status: false });
        } else if (password == '' || password == null) {
            res.json({ msg: "Password required", status: false });
        }
        else {
            next();
        }
    },
    signupCustomer: (req, res, next) => {
        const { cName, email, password } = req.body;
        if (cName == '' || cName == null) {
            res.json({ msg: "Customer name required", status: false });
        } else if (email == '' || email == null) {
            res.json({ msg: "Email required", status: false });
        } else if (password == '' || password == null) {
            res.json({ msg: "Password required", status: false });
        }
        else {
            next();
        }
    },
    createCategory: (req, res, next) => {
        const { category } = req.body;

        if (category == '' || category == null) {
            res.json({ msg: "Category required", status: false });
        } else {
            next();
        }
    },
    createJob: (req, res, next) => {
        const { title, catId, desc, address, city, image } = req.body;

        if (title == '' || title == null) {
            res.json({ msg: "Title required", status: false });
        }
        else if (catId == '' || catId == null) {
            res.json({ msg: "Category required", status: false });
        } else if (desc == '' || desc == null) {
            res.json({ msg: "Description required", status: false });
        } else if (address == '' || address == null) {
            res.json({ msg: "Address required", status: false });
        }
        else if (city == '' || city == null) {
            res.json({ msg: "City required", status: false });
        }
        // else if (image == '' || image == null) {
        //     res.json({ msg: "Image required", status: false });
        // } 
        else {
            next();
        }
    },
    bid: (req, res, next) => {
        const { jId, value } = req.body;

        if (jId == '' || jId == null) {
            res.json({ msg: "Job id required", status: false });
        }
        else if (value == '' || value == null) {
            res.json({ msg: "Bid value required", status: false });
        }
        else {
            next();
        }
    },
    approveBid: (req, res, next) => {
        const { jId, sId, status } = req.body;

        if (jId == '' || jId == null) {
            res.json({ msg: "Job id required", status: false });
        }
        else if (sId == '' || sId == null) {
            res.json({ msg: "Supplier Id required", status: false });
        }
        // else if (status == '' || status == null) {
        //     res.json({ msg: "Status required", status: false });
        // }
        else {
            next();
        }
    },
    cityCheck: (req, res, next) => {
        const { city } = req.query;
        if (city == '' || city == null) {
            res.json({ msg: "City required", status: false });
        }
        else {
            next();
        }
    },
    checkSid: (req, res, next) => {
        const { sId } = req.query;
        if (sId === '' || sId === null) {
            res.json({ msg: "Supplier Id required", status: false });
        }
        else {
            next();
        }
    },
    checkCid: (req, res, next) => {
        const { status } = req.query;
        if (!status) {
            res.json({ msg: "Status required", status: false });
        }
        else {
            next();
        }
    },
    checkCatid: (req, res, next) => {
        const { catId } = req.query;
        if (catId === '' || catId === null) {
            res.json({ msg: "Category Id required", status: false });
        }
        else {
            next();
        }
    },
    changeStatus: (req, res, next) => {
        console.log("change status---->", req.body)
        const { status, sId } = req.body;
        if (status === '' || status === null) {
            res.json({ msg: "Status required", status: false });
        } else if (sId == '' || sId == null) {
            res.json({ msg: "Supplier required", status: false });
        }
        else {
            next();
        }
    },
    validateRate: (req, res, next) => {
        const { jId,rate, sId } = req.body;
        if (!jId) {
            res.json({ msg: "Job Id required", status: false });
        } else if (!sId) {
            res.json({ msg: "Supplier required", status: false });
        }
        else if (!rate) {
            res.json({ msg: "Rate required", status: false });
        }
        else {
            next();
        }
    },
    editSupplier: (req, res, next) => {
        const { sId, sName, mobile } = req.body;

        if (sId === '' || sId === null) {
            res.json({ msg: "Supplier id required", status: false });
        }
        else if (sName === '' || sName === null) {
            res.json({ msg: "Supplier Name required", status: false });
        }
        else if (mobile === '' || mobile === null) {
            res.json({ msg: "Mobile required", status: false });
        }
        else {
            next();
        }
    },
    editCustomer: (req, res, next) => {
        const { cId, cName, email } = req.body;

        if (cId === '' || cId === null) {
            res.json({ msg: "Customer id required", status: false });
        }
        else if (cName === '' || cName === null) {
            res.json({ msg: "Customer Name required", status: false });
        }
        else if (email === '' || email === null) {
            res.json({ msg: "Email required", status: false });
        }
        else {
            next();
        }
    },
    updateCustomer: (req, res, next) => {
        const { cName, email } = req.body;

        if (!cName ) {
            res.json({ msg: "Customer Name required", status: false });
        }
        else if (!email) {
            res.json({ msg: "Email required", status: false });
        }
        else {
            next();
        }
    },
    changeCustomerStatus: (req, res, next) => {
        const { status, cId } = req.body;
        if (status === '' || status === null) {
            res.json({ msg: "Status required", status: false });
        } else if (cId == '' || cId == null) {
            res.json({ msg: "Customer Id required", status: false });
        }
        else {
            next();
        }
    },
    changeCityStatus: (req, res, next) => {
        const { status, cityId } = req.body;
        if (status === '' || status === null) {
            res.json({ msg: "Status required", status: false });
        } else if (cityId == '' || cityId == null) {
            res.json({ msg: "City Id required", status: false });
        }
        else {
            next();
        }
    },
    addCity: (req, res, next) => {
        const { city } = req.body;
        if (city === '' || city === null) {
            res.json({ msg: "City required", status: false });
        }
        else {
            next();
        }
    },
    addCategory: (req, res, next) => {
        const { category } = req.body;
        if (category === '' || category === null) {
            res.json({ msg: "Category required", status: false });
        }
        else {
            next();
        }
    },
    editCategory: (req, res, next) => {
        const { catId, category } = req.body;

        if (catId === '' || catId === null) {
            res.json({ msg: "Category id required", status: false });
        }
        else if (category === '' || category === null) {
            res.json({ msg: "Category Name required", status: false });
        }
        else {
            next();
        }
    },
    changeCategoryStatus: (req, res, next) => {
        const { status, catId } = req.body;
        if (status === '' || status === null) {
            res.json({ msg: "Status required", status: false });
        } else if (catId == '' || catId == null) {
            res.json({ msg: "Category Id required", status: false });
        }
        else {
            next();
        }
    },
    addPayment: (req, res, next) => {
        const { sId, membership, date, desc, amount } = req.body;
        if (sId === '' || sId === null) {
            res.json({ msg: "Supplier required", status: false });
        } else if (membership === '' || membership === null) {
            res.json({ msg: "Membership type required", status: false });
        }
        else if (date === '' || date === null) {
            res.json({ msg: "Date required", status: false });
        }
        else if (desc === '' || desc === null) {
            res.json({ msg: "Description required", status: false });
        }
        else if (amount === '' || amount === null) {
            res.json({ msg: "Amount required", status: false });
        }
        else {
            next();
        }
    },
    pymentFilterCheck: (req, res, next) => {
        const { date } = req.query;
        if (date == '' || date == null) {
            res.json({ msg: "Date required", status: false });
        }
        else {
            next();
        }
    },

}

module.exports = validator;