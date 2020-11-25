import express from 'express'
import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import { auth } from '../middleware/auth.js'
import upload from '../middleware/multer.js'

const router = express.Router()

router.post('/register', async (req, res) => {
    const { name, email, password, isAdmin } = req.body
    try {
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ msg: 'email already exists' })
        }
        user = new User({
            name, email, password, isAdmin
        })
        await user.save()
        const token = user.signedWithToken()
        res.json({ user, token })
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' })
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ msg: 'email not exists' })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ msg: 'Incorrect Password' })
        }
        const token = user.signedWithToken()
        res.json({ user, token })
    } catch (error) {
        res.status(500).json({ msg: 'Srever Error' })
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        if (!user) {
            return res.status(400).json({ msg: 'No User Found' })
        }
        res.json(user)
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' })
    }
})

router.get('/all', auth, async (req, res) => {
    try {
        const users = await User.find({}).select('-password')
        res.json(users)
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' })
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password')
        if (!user) {
            return res.status(400).json({ msg: 'No User found' })
        }
        res.json(user)
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' })
    }
})

router.put('/', auth, async (req, res) => {
    const { name, email, password } = req.body
    try {
        const user = await User.findById(req.user.id)
        if (!user) {
            return res.status(400).json({ msg: 'Login First' })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ msg: 'your password was incorrect' })
        }
        user.name = name
        user.email = email
        await user.save()
        res.json({ msg: 'Success' })
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' })
    }
})

router.put('/changepassword', auth, async (req, res) => {
    const { oldPassword, newPassword } = req.body
    try {
        const user = await User.findById(req.user.id)
        if (!user) {
            return res.status(400).json({ msg: 'Login First' })
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password)
        if (!isMatch) {
            return res.status(400).json({ msg: 'your password was incorrect' })
        }
        user.password = newPassword
        await user.save()
        res.json({ msg: 'Success' })
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' })
    }
})

router.put('/photo', upload.single('avatar'), auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        if (!user) {
            return res.status(400).json({ msg: 'No User Found' })
        }
        user.avatar = req.file.path
        await user.save()
        res.json(user)
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' })
    }
})

router.put('/follow/:id', auth, async (req, res) => {
    try {
        const userLogin = await User.findById(req.user.id)
        const findUser = await User.findById(req.params.id)
        if (!findUser) {
            return res.status(400).json({ msg: 'No User found' })
        }
        findUser.followers.push({ user: req.user.id, name: req.user.name, avatar: req.user.avatar })
        userLogin.following.push({ user: req.params.id, name: findUser.name, avatar: findUser.avatar })
        await findUser.save()
        await userLogin.save()
        res.json({ msg: 'Success' })
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' })
    }
})

router.delete('/unfollow/:id', auth, async (req, res) => {
    try {
        const userLogin = await User.findById(req.user.id)
        const findUser = await User.findById(req.params.id)
        if (!findUser) {
            return res.status(400).json({ msg: 'No User found' })
        }
        const unfollowUser = findUser.followers.map(x => x.user.toString()).indexOf(req.user.id)
        findUser.followers.splice(unfollowUser, 1)
        const unFollowingUser = userLogin.following.map(x => x.user.toString()).indexOf(req.params.id)
        userLogin.following.splice(unFollowingUser, 1)
        await findUser.save()
        await userLogin.save()
        res.json({ msg: 'Success' })
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' })
    }
})

router.delete('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        if (!user) {
            return res.status(400).json({ msg: 'You Need to Login first' })
        }
        await user.remove()
        res.json({ msg: 'Success' })
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' })
    }
})

export default router