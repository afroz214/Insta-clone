import express from 'express'
import { auth } from '../middleware/auth.js'
import upload from '../middleware/multer.js'
import Post from '../models/post.js'

const router = express.Router()

router.post('/uploadphoto', upload.single('photo'), async (req, res) => {
    res.send(`${req.file.path}`)
})

router.post('/', auth, async (req, res) => {
    try {
        const post = new Post({
            user: req.user.id,
            text: req.body.text,
            photo: req.body.photo
        })
        await post.save()
        res.json(post)
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' })
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find({ user: req.user.id })
        if (!posts) {
            return res.status(400).json({ msg: 'No Posts' })
        }
        res.json(posts)
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' })
    }
})

router.get('/all', auth, async (req, res) => {
    try {
        const posts = await Post.find({}).populate('user', 'name avatar').sort({ createdAt: -1 })
        res.json(posts)
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' })
    }
})

router.get('/all/:id', auth, async (req, res) => {
    try {
        const posts = await Post.find({ user: req.params.id })
        res.json(posts)
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' })
    }
})

router.get('/followusers', auth, async (req, res) => {
    try {
        const posts = await Post.find({ user: req.user.following[1] })
        res.json(posts)
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' })
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('user', 'name avatar')
        if (!post) {
            return res.status(400).json({ msg: 'No Post found' })
        }
        res.json(post)
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' })
    }
})

router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('user', 'name, avatar')
        if (!post) {
            return res.status(400).json({ msg: 'No Post Found' })
        }
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id)
            post.likes.splice(removeIndex, 1)
            await post.save()
            return res.json({ msg: 'Like Removed' })
        }
        post.likes.push({ user: req.user.id })
        await post.save()
        res.json({ msg: 'Like Added' })
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' })
    }
})

router.put('/comment/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(400).json({ msg: 'No Post Found' })
        }
        const addComment = {
            user: req.user.id,
            name: req.user.name,
            text: req.body.text
        }
        console.log('1')
        post.comments.push(addComment)
        console.log('2')
        await post.save()
        console.log('3')
        res.json({ msg: 'Success' })
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' })
    }
})

router.delete('/comment/:id/:commentId', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(400).json({ msg: 'No Post found' })
        }
        const comment = post.comments.find(x => x.id === req.params.commentId)
        if (!comment) {
            return res.status(400).json({ msg: 'No Comment found' })
        }
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'You are not auth' })
        }
        const removeIndex = post.comments.map(x => x.id).indexOf(req.params.commentId)
        post.comments.splice(removeIndex, 1)
        await post.save()
        res.json({ msg: 'success' })
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' })
    }
})

export default router