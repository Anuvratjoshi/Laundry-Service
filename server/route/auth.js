const express = require("express");
const User = require("../model/user")
const bcrypt = require("bcrypt")
const router = express.Router()
const JWT = require("jsonwebtoken")


router.post("/user-register", (req, res) => {
    const { name, phone, email, state, district, address, pincode, password } = req.body;

    // Check if the email or phone already exists in the database
    User.findOne({ $or: [{ email }, { phone }] })
        .then(existingUser => {
            if (existingUser) {
                return res.status(422).json({ error: "User already exists" });
            }
            bcrypt.hash(password, 10)
                .then(hashedPAssword => {
                    const newUser = new User({
                        name,
                        phone,
                        email,
                        state,
                        district,
                        address,
                        pincode,
                        password: hashedPAssword
                    });

                    newUser.save()
                        .then(() => {
                            return res.json({ message: `${name} registered successfully` });
                        })
                        .catch(error => {
                            return res.status(500).json({ error: "Registration failed" });
                        });
                })

        })
        .catch(error => {
            return res.status(500).json({ error: "Internal server error" });
        });
});


router.post("/user-login", (req, res) => {
    const { loginId, password } = req.body;
    if (isNaN(parseInt(loginId))) {
        User.findOne({ email: loginId })
            .then((savedUser) => {
                if (!savedUser) {
                    return res.status(401).json({ error: "Invalid email or password" });
                }

                bcrypt.compare(password, savedUser.password)
                    .then((doMatch) => {
                        if (!doMatch) {
                            return res.status(401).json({ error: "Invalid email or password" });
                        }

                        // If both email/phone and password are correct, send the success response
                        const token = JWT.sign(
                            { _id: savedUser._id },
                            process.env.JWT_SECRET,
                            {
                                expiresIn: "24h",
                            }
                        );

                        // Use res.status(200) for success response
                        return res.status(200).json({ token, message: `${savedUser.name} signed in successfully`, name: savedUser.name });
                    })
                    .catch(error => {
                        console.log(error);
                        return res.status(500).json({ error: "Login failed" });
                    });
            })
            .catch(error => {
                console.log(error);
                return res.status(500).json({ error: "Internal server error" });
            });
    }
    else {

        User.findOne({ phone: Number(loginId) })
            .then((savedUser) => {
                if (!savedUser) {
                    return res.status(401).json({ error: "Invalid Number or password" });
                }

                bcrypt.compare(password, savedUser.password)
                    .then((doMatch) => {
                        if (!doMatch) {
                            return res.status(401).json({ error: "Invalid Number or password" });
                        }

                        // If both email/phone and password are correct, send the success response
                        const token = JWT.sign(
                            { _id: savedUser._id },
                            process.env.JWT_SECRET,
                            {
                                expiresIn: "1h",
                            }
                        );

                        // Use res.status(200) for success response
                        return res.status(200).json({ token, message: `${savedUser.name} signed in successfully`, name: savedUser.name });
                    })
                    .catch(error => {
                        console.log(error);
                        return res.status(500).json({ error: "Login failed" });
                    });
            })
            .catch(error => {
                console.log(error);
                return res.status(500).json({ error: "Internal server error" });
            });
    }
});




module.exports = router