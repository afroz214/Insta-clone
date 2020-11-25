import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log('Connected')
    } catch (error) {
        console.log('Not Connected')
    }
}

export default connectDB