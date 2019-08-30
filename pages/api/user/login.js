// @ts-check
import { send, run } from 'micro'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import connectToDb from '../../../lib/database'
import User from '../../../models/User'

const secret = process.env.SECRET_KEY

async function Login(req, res) {
  const errors = []
  const invalid = 'Invalid login credentials. Please try again.'

  if (req.method !== 'POST') {
    errors.push('Endpoint only accepts POST requests.')
    return send(res, 406, { errors })
  }

  const { email, password } = req.body

  const loginInvalid = !email || !password || !email.match(/\S+@\S+\.\S+/)

  if (loginInvalid) {
    errors.push(invalid)
    return send(res, 401, { errors })
  }

  try {
    await connectToDb()

    let user = await User.findOne({ email })

    if (!user) {
      errors.push(invalid)
      return send(res, 401, { errors })
    }

    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
      errors.push(invalid)
      return send(res, 401, { errors })
    }

    jwt.sign({ id: user.id }, secret, (err, token) => {
      return send(res, 200, { token })
    })
  } catch (err) {
    errors.push('System error, please try again.')
    res.send(res, 401, { errors })
  }
}

export default (req, res) => run(req, res, Login)
