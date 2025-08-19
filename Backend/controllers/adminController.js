const emailModel = require('../models/emailModel');

module.exports.listLeaveRequests = async function (req, res) {
    try {
        const { status } = req.query;
        const filter = {};
        if (status && ["Pending", "Approved", "Rejected"].includes(status)) {
            filter.status = status;
        }
        const items = await emailModel.find(filter).sort({ receivedAt: -1 });
        return res.status(200).json({ emails: items });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports.getLeaveRequest = async function (req, res) {
    try {
        const { id } = req.params;
        const item = await emailModel.findById(id);
        if (!item) return res.status(404).json({ message: 'Record not found' });
        return res.status(200).json({ email: item });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports.approveLeaveRequest = async function (req, res) {
    try {
        const { id } = req.params;
        const { adminRemarks } = req.body;
        const item = await emailModel.findById(id);
        if (!item) return res.status(404).json({ message: 'Record not found' });
        if (item.status !== 'Pending') return res.status(400).json({ message: 'Only pending records can be approved' });
        item.status = 'Approved';
        item.adminRemarks = adminRemarks || '';
        item.reviewedBy = req.user._id;
        item.reviewedAt = new Date();
        await item.save();
        return res.status(200).json({ message: 'Leave request approved', email: item });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports.rejectLeaveRequest = async function (req, res) {
    try {
        const { id } = req.params;
        const { adminRemarks } = req.body;
        const item = await emailModel.findById(id);
        if (!item) return res.status(404).json({ message: 'Record not found' });
        if (item.status !== 'Pending') return res.status(400).json({ message: 'Only pending records can be rejected' });
        item.status = 'Rejected';
        item.adminRemarks = adminRemarks || '';
        item.reviewedBy = req.user._id;
        item.reviewedAt = new Date();
        await item.save();
        return res.status(200).json({ message: 'Leave request rejected', email: item });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports.summaryStats = async function (req, res) {
    try {
        const [pending, approved, rejected] = await Promise.all([
            emailModel.countDocuments({ status: 'Pending' }),
            emailModel.countDocuments({ status: 'Approved' }),
            emailModel.countDocuments({ status: 'Rejected' })
        ]);
        return res.status(200).json({ pending, approved, rejected });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
