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
      // -1 represents a banned user. 0 represents a user who hasn't validated email. 1 is a plain user. 2+ are staff/admins
      default: 0,
      min: -1
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
