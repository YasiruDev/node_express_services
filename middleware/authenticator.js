const jwt = require('jwt-simple');
const bearerToken = require('bearer-token');

module.exports = function (req, res, next) {
    if (req.url.indexOf('/api/protected/') < 0) {
        next();
    } else {
        // next();
        try {
            bearerToken(req, function (err, token) {
                console.log("token: ",token)
                if (err) {
                    res.json({msg: 'Empty header', status: false});
                } else {

                    try {
                        const decoded = jwt.decode(token, process.env.AUTH_SECRET);
                        // console.log("decoded --> ",decoded)
                        req.userId = decoded.id;
                        if (decoded.exp <= Date.now() || !decoded.id) {
                            res.json({msg: 'Invalid access token', status: false});
                        }
                        next();
                    } catch (err) {
                        res.json({msg: 'Invalid access token '+err, status: false});
                        return;
                    }
                }
            });
        } catch (err) {
            res.json({msg: 'Invalid access token', status: false});
            return;
        }
    }
};