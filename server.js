require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const app = express()
const port = process.env.APP_PORT;

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
const routes = require('./routes');
const validator = require('./middleware/validator');
const authenticator = require('./middleware/authenticator');


app.all('/api/*', [authenticator]);
app.use(fileUpload());
app.use(routes);

app.listen(port, () => console.log(`note app listening on port ${port}!`));


