const mongoose = require('../../config');
const Schema = mongoose.Schema;
var md5 = require('md5');

const user = new Schema({
    username: {
        required: true,
        type: String
    },
    email: {
        default:null,

        type: String
    },
    phone: {
        type: Number,
        default:null
    },
    password: {
        required: true,
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verification_code: {
        type: Number,
        required: true
    },
    profile_image: {
        type: String,
        default:null
        // required: true
    },
    // social_type: {
    //     type: String,
    //     enum: ['normal', 'facebook', 'google'],
    //     default: 'normal',
    //     required: true
    // },
    role: {
        type: String,
        enum: ['Admin'],
        default: 'Admin'
    },
    type: {
        type: String,
        enum: ['mobile','email'],
        // default: 'A'
        required: true

    },
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Delete'],
        default: 'Active'
    },
}, { timestamps: { createdAt: 'created_date', updatedAt: 'updated_date' } });
user.pre('save', async function () {
    if (this.password) {
        this.password = md5(this.password)
    }
})
user.pre('update', async function () {
    const modifiedFields = this.getUpdate().$set.password;
    if (modifiedFields) {
        this.getUpdate().$set.password = md5(modifiedFields)
    }
    this.updated_date = new Date()
})
const UserModel = mongoose.model('users', user);
module.exports = UserModel

