const userModel = require('../models/userModel');

module.exports.registerUser = async function (req, res) {
    try {
        const { firstname, middlename, lastname, email, password, department } = req.body;

        if (!firstname || !middlename || !lastname || !email || !password || !department) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already registered" });

        const hashedPassword = await userModel.hashPassword(password);

        const user = new userModel({
            fullname: { firstname, middlename, lastname },
            email,
            password: hashedPassword,
            department
        });

        await user.save();

        const token = user.generateUserToken(); // now returns string token

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(201).json({
            message: "User registered successfully",
            user: { id: user._id, email: user.email, role: user.role }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// LOGIN
module.exports.loginUser = async function (req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({ message: "Email and password required" });

        const user = await userModel.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = user.generateUserToken();

        
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        });
        
        res.status(200).json({
            message: "Login successful",
            user: { id: user._id, email: user.email, role: user.role }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports.userProfile = async function (req, res) {
    try {
        res.status(200).json({
            id: req.user._id,
            fullname: req.user.fullname,
            email: req.user.email,
            role: req.user.role,
            department: req.user.department
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// LOGOUT
module.exports.logoutUser = async function (req, res) {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "Logout successful" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
