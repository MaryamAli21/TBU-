const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    subject: { type: String },
    resolved: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Inquiry', inquirySchema);