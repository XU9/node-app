const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();



// 引入user.js
const users = require("./routes/api/users");

// 引入profile
const profiles = require("./routes/api/profiles");


const db = require("./config/keys").mongoURI;

// 使用body-parse中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// connect to mongo
mongoose.connect(db)
    .then(() => { console.log("MongoDB Connected") })
    .catch(err => console.log(err));

// passport初始化
app.use(passport.initialize());
require('./config/passport')(passport);

// app.get("/", (req, res) => {
//     res.send("Hello World!");
// })

// 使用router
app.use("/api/users", users);
app.use("/api/profiles", profiles);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})