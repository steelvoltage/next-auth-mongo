// @ts-check
import mongoose from 'mongoose'

const { Schema } = mongoose

const UserSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      required: [true, `can't be blank`],
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      index: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    displayName: {
      type: String,
      minLength: 6,
      trim: true
    },
    access: {
      type: Number,
      default: 0,
      min: -1,
      max: 2
    }
  },
  { timestamps: true }
)

export default mongoose.models.User || mongoose.model('User', UserSchema)
