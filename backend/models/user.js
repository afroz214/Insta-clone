import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true,
        default: 'No-Pic'
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    following: [{
        followuser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        name: {
            type: String
        },
        avatar: {
            type: String
        }
    }],
    followers: [{
        followuser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        name: {
            type: String
        },
        avatar: {
            type: String
        }
    }]
}, { timestamps: true })

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    } else {
        next()
    }
})

userSchema.methods.signedWithToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET)
}

const User = mongoose.model('User', userSchema)

export default User