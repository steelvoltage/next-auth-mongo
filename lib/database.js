//@ts-check
import mongoose from 'mongoose'

async function connectToDb() {
  if (mongoose.connections[0].readyState) return
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useCreateIndex: true
    })
  } catch (err) {
    console.log(err)
  }
}

export default connectToDb
