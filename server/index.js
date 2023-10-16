const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const app = express();
const path = require("path")
const PORT = process.env.PORT || 8080

//models
require("./model/user")
require("./model/order")

//connecting frontend and backend
app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/dist/index.html"));
});

app.use(express.json())//parsing the req before it get to routes
app.use(cors({
    "origin": "*"
}))//connecting the server side and client side
app.use(express.urlencoded({ extended: true }));

//routes

app.use(require('./route/auth'))
app.use(require('./route/order'))
app.use("/test", (req, res) => {
    console.log("App is running");
    return res.json({ message: "app is running" })
})


mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Successfully connected with DB"))
    .catch(() => console.log("Failed while connecting to db"));


app.listen(PORT, () => {
    console.log(`server is running on PORT ${process.env.PORT}`);
});
