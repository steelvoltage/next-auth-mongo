// @ts-check
import { send, run } from 'micro'
import connectToDb from '../../../lib/database'
import User from '../../../models/User'
import bcrypt from 'bcryptjs'
import registerValidator from '../../../lib/registerValidator'

async function Register(req, res) {
  const { email, password, displayName } = req.body
  const errors = registerValidator(email, password, displayName)

  if (req.method !== 'POST') {
    errors.push('Endpoint only accepts POST requests.')
    return send(res, 406, { errors })
  }

  if (errors.length > 0) {
    return send(res, 401, { errors })
  }

  try {
    await connectToDb()
    let user = await User.findOne({ email })
    if (user) {
      errors.push('Email account already registered.')
      return send(res, 401, { errors })
    }
    user = new User({
      email,
      password,
      displayName
    })
    const salt = await bcrypt.genSalt(10)
    console.log(salt)
    user.password = await bcrypt.hash(password, salt)
    await user.save()
    return send(res, 200, user)
  } catch (err) {
    errors.push('Database error, please try again.')
    res.send(res, 401, { errors })
  }
}

export default (req, res) => run(req, res, Register)
