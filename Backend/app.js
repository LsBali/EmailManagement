const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const userAuthRoutes = require("./routes/userAuthRoutes");
const startEmailListener = require('./services/mailParser');
const emailRoutes = require("./routes/emaildata")
const empRoutes = require("./routes/employeeRoutes")
const adminRoutes = require("./routes/adminRoutes")

async function main() {
    try {
        await mongoose.connect(process.env.DBCONNECT, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DB connected successfully");

        startEmailListener();
    } catch (err) {
        console.error("DB connection failed:", err);
    }
}

main();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());



app.use('/emails', emailRoutes);

app.use("/auth", userAuthRoutes)
app.use("/employee", empRoutes);
app.use("/admin", adminRoutes);

app.get("/", (req, res) => {
    res.send("i am backend")
})

app.listen(process.env.PORT, () => {
    console.log(`server started on port ${process.env.PORT}`);
})