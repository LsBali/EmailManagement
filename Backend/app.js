const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

main().then(res => {
    console.log("DB connected successfully")
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.DBCONNECT);
}
module.exports = main;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("i am backend")
})

app.listen(process.env.PORT, () => {
    console.log(`server started on port ${process.env.PORT}`);
})