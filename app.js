const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const users = require('./routes/api/users');
const bodyParser = require('body-parser');



const port = process.env.PORT || 5000;
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log('Connect to Mongodb Successfully'))
.catch(err=>console.log(err))

app.get("/", (req, res) => res.send("Hello World"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/users', users)
app.listen(port, () => console.log(`Server is running on port ${port}`));