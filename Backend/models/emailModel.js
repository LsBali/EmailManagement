const mongoose = require('mongoose');

const emailDataSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    leaveReason: {
        type: String,
        required: true,
    },
    leaveType: {
        type: String,
        enum: ["Sick Leave", "Casual Leave", "Paid Leave", "Other"],
        default: "Other",
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending",
    },
    adminRemarks: {
        type: String,
        default: "",
    },
    reviewedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // admin who approved/rejected
    },
    reviewedAt: {
        type: Date,
    },
    rawEmailId: {
        type: String, // Gmail/IMAP UID or Message-ID
        unique: true,
        required: true,
    },
    attachments: [
        {
            filename: { type: String, required: true },
            mimetype: { type: String, required: true },
            size: { type: Number },
            path: { type: String, required: true },
            uploadedAt: { type: Date, default: Date.now }
        }
    ],
    receivedAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

const emailModel = mongoose.model("EmailData", emailDataSchema);

module.exports = emailModel;
