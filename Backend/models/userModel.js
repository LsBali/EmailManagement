const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["employee", "admin"],
        default: "employee",
    },
    department: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

userSchema.methods.generateUserToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWTSECRET, { expiresIn: "24h" });

    return { token };
}

userSchema.statics.hashPassword = async function (password) {
    await bcrypt.hash(password, 10)
}

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
