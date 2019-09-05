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
    isVerified: {
      type: Boolean,
      default: false
    },
    isBanned: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

let User

try {
  User = mongoose.model('User')
} catch (err) {
  User = mongoose.model('User', UserSchema)
}

export default User
