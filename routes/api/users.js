// @login & register
const express = require('express');
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt");

router.get("/test", (req, res) => {
    res.json({
        msg: "login ..."
    })
})


// $router POST api/user/register
// @desc 
// access public
router.post("/register", (req, res) => {
    // console.log(req.body);
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                return res.status(400).json({ email: "邮箱已被注册" });
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    // avatar,
                    password: req.body.password
                });

                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;

                        newUser.password = hash;

                        newUser
                            .save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });
            }
        })
    // res.json({
    //     msg: "user register"
    // })
})


module.exports = router;