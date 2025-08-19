const userModel = require('../models/userModel');
const crypto = require('crypto');

module.exports.registerUser = async function (req, res) {
    try {
        const { firstname, middlename, lastname, email, mobile, password, confirmPassword, department } = req.body;

        if (!firstname || !middlename || !lastname || !email || !mobile || !password || !confirmPassword || !department) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password confirmation does not match password" });
        }

        // Check for existing user by email or mobile
        const existingUser = await userModel.findOne({ $or: [{ email }, { mobile }] });
        if (existingUser) {
            if (existingUser.email === email) return res.status(400).json({ message: "Email already registered" });
            if (existingUser.mobile === mobile) return res.status(400).json({ message: "Mobile already registered" });
        }

        const user = new userModel({
            fullname: { firstname, middlename, lastname },
            email,
            mobile,
            password,
            department
        });
        user.confirmPassword = confirmPassword;

        await user.save();

        const token = user.generateUserToken();

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(201).json({
            message: "User registered successfully",
            user: { id: user._id, email: user.email, mobile: user.mobile, role: user.role }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


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

module.exports.logoutUser = async function (req, res) {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "Logout successful" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports.changePassword = async function (req, res) {
    try {
        const { currentPassword, newPassword, confirmNewPassword } = req.body;

        if (!currentPassword || !newPassword || !confirmNewPassword) {
            return res.status(400).json({ message: "All password fields are required" });
        }

        // Check if new password and confirmation match
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ message: "New password confirmation does not match new password" });
        }

        const user = await userModel.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Verify current password
        const isCurrentPasswordValid = await user.comparePassword(currentPassword);
        if (!isCurrentPasswordValid) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }

        // Check if new password is different from current password
        const isNewPasswordSame = await user.comparePassword(newPassword);
        if (isNewPasswordSame) {
            return res.status(400).json({ message: "New password must be different from current password" });
        }

        // Set new password and let model handle hashing/validation
        user.password = newPassword;
        user.confirmPassword = confirmNewPassword;

        await user.save();

        res.status(200).json({ message: "Password changed successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports.resetPassword = async function (req, res) {
    try {
        const { email, newPassword, confirmNewPassword } = req.body;

        if (!email || !newPassword || !confirmNewPassword) {
            return res.status(400).json({ message: "Email, new password, and confirmation are required" });
        }

        // Check if new password and confirmation match
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ message: "New password confirmation does not match new password" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if new password is different from current password
        const isNewPasswordSame = await user.comparePassword(newPassword);
        if (isNewPasswordSame) {
            return res.status(400).json({ message: "New password must be different from current password" });
        }

        // Set new password and let model handle hashing/validation
        user.password = newPassword;
        user.confirmPassword = confirmNewPassword;

        await user.save();

        res.status(200).json({ message: "Password reset successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Forgot password: create a reset token and (normally) email it to the user
module.exports.forgotPassword = async function (req, res) {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Email is required" });

        const user = await userModel.findOne({ email }).select('+passwordResetToken +passwordResetExpires');
        if (!user) return res.status(200).json({ message: "If that email is registered, you'll receive a reset link" });

        const rawToken = user.createPasswordResetToken();
        await user.save({ validateBeforeSave: false });

        // In a real app, send rawToken via email. Here we return it for testing purposes only.
        res.status(200).json({ message: "Password reset token generated", resetToken: rawToken });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Reset password with token
module.exports.resetPasswordWithToken = async function (req, res) {
    try {
        const { token } = req.params;
        const { newPassword, confirmNewPassword } = req.body;

        if (!token) return res.status(400).json({ message: "Token is required" });
        if (!newPassword || !confirmNewPassword) return res.status(400).json({ message: "New password and confirmation are required" });
        if (newPassword !== confirmNewPassword) return res.status(400).json({ message: "New password confirmation does not match new password" });

        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
        const user = await userModel.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: new Date() }
        }).select('+passwordResetToken +passwordResetExpires');

        if (!user) return res.status(400).json({ message: "Token is invalid or has expired" });

        // Set new password; model will hash and validate via pre-save
        user.password = newPassword;
        user.confirmPassword = confirmNewPassword;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        res.status(200).json({ message: "Password has been reset successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
