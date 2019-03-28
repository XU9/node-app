const express = require('express');
const mongoose = require("mongoose");
const app = express();

// 引入user.js
const users = require("./routes/api/users");

const db = require("./config/keys").mongoURI;
mongoose.connect(db)
    .then(() => { console.log("MongoDB Connected") })
    .catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("Hello World!");
})

// 使用router
app.use("/api/users",users);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})