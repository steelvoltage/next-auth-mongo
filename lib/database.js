//@ts-check
import mongoose from 'mongoose'

const connectToDb = async () => {
  if (mongoose.connections[0].readyState) return

  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true
  })
}

export default connectToDb
