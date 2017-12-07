const mongoose  = require('mongoose');
const bcrypto   = require('bcrypt-nodejs');
const crypto    = require('crypto');
const Schema    = mongoose.Schema;

var UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: false,
        unique: true
    },
    privilages: {
        makePost: {
            type: Boolean,
            default: true,
        },
        deletePost: {
            type: Boolean,
            default: true 
        },
        deleteOthersPosts: {
            type: Boolean,
            default: false
        },
        editPosts: {
            type: Boolean,
            default: true
        },
        editOthersPosts: {
            type: Boolean,
            default: true
        },
        adminPrivilages: {
            type: Boolean,
            default: false
        },
        superAdmin: {
            type: Boolean,
            default: false
        },
        deleteUsers: {
            type: Boolean,
            type: false
        },
        // wether this user can make others admin or not
        givePrivilages: {
            type: Boolean,
            default: false
        }
    },
    profilePicPath: {
        type: String,
        required: false,
        default: '',
        unique: true
    },
    bio: {
        type: String,
        required: false,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

UserSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next();
    if (user.password) {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, null, function(err, hash) {
                if (err) return next(err);
                user.password = hash;
                next(err);
            });
        });
    }
});

module.exports = mongoose.model('User', UserSchema);