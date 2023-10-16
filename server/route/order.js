const mongoose = require("mongoose");
const express = require("express");
const requireUserLogin = require("../middleware/requireUserLogin");
const User = mongoose.model("User")
const Order = mongoose.model("Order")
const router = express.Router()


// router.get("/getTotalOrder", requireUserLogin, (req, res) => {
//     const { email } = req.user
//     Order.find({ orderedBy: email })
//         .then(savedOrders => {
//             return res.json(savedOrders.length)
//         })
// })

router.get("/getTotalOrder", requireUserLogin, (req, res) => {
    Order.aggregate([
        {
            $match: {
                orderedBy: req.user.email,
                status: "ordered"
            }
        }
    ])
        .then(generatedOrders => {
            return res.json(generatedOrders.length);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        });
});



router.put("/addNewAddress", requireUserLogin, (req, res) => {
    // console.log(req.user);
    const newAddress = req.body.address
    User.findOneAndUpdate(
        { email: req.user.email },
        { $push: { address: newAddress } },
        { new: true }
    ).then(updatedUserAddress => {
        if (!updatedUserAddress) {
            return res.status(404).json({ error: "User not found" });
        }
        // console.log(updatedUserAddress);
        return res.json({ message: "Address added successfully", updatedUserAddress });
    })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        });

})

router.get("/getAddress", requireUserLogin, (req, res) => {
    User.findOne({ email: req.user.email })
        .then(savedUser => {
            // console.log(savedUser);
            return res.json(savedUser.address)
        }).catch(error => {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        });
})


router.post("/order", requireUserLogin, (req, res) => {
    // console.log(req.user);
    const { orderDetails, shippingAddress, totalPrice } = req.body
    const { email, phone, name, pincode } = req.user
    let randomNumber = (Math.floor(Math.random() * (10000000 - 1000 + 1)) + 1000) + "";

    const orderId = (name).toUpperCase().slice(0, 3) + randomNumber.slice(0, 3) + pincode
    // console.log(orderId);
    const currentTime = new Date().toDateString()
    // console.log(currentTime);
    const newOrder = new Order({
        orderDetails,
        shippingAddress,
        totalPrice,
        paymentTiming: currentTime,
        orderedBy: email,
        contactNumber: phone,
        orderId: orderId,
        status: "ordered"
    })
    newOrder.save()
        .then(() => {
            return res.json({ message: "Ordered Successfully" })
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        });
})


router.get("/getAllOrder", requireUserLogin, (req, res) => {
    Order.find()
        .then(allOrders => {
            return res.json(allOrders)
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        });

})


router.put("/cancelorder", requireUserLogin, async (req, res) => {
    Order.findOneAndUpdate(
        { _id: req.body._id },
        { $set: { status: "canceled" } },
        { new: true }
    ).then(() => {
        Order.find()
            .then(allOrders => {
                return res.json(allOrders)
            })
            .catch(error => {
                console.error(error);
                return res.status(500).json({ error: "Internal server error" });
            });
    })
})

module.exports = router