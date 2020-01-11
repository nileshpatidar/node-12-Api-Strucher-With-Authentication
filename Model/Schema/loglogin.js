const mongoose = require('../../config');

const Schema = mongoose.Schema;
const logfile = new Schema({
    user_id: { type: String, required: true },
    ip_address: { type: String },
    country: { type: String },
    city: { type: String },
    latitude: { type: String },
    longitude: { type: String },
    time_zone: { type: String },
    login_time: { type: Date, default: Date.now },
    web_browser: { type: String },
    operating_system: { type: String },
    platform: { type: String },
    secret_key: { type: String },
    role: { type: String },
    device_token: { type: String },
    device_platform: { type: String },
    status: { type: String, enum: ['Active', 'Inactive', 'Delete'], default: 'Active' },
}, { timestamps: { createdAt: 'created_date', updatedAt: 'updated_date' } });

module.exports = mongoose.model('loginlogs', logfile);
