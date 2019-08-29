// @ts-check
import { send, run } from 'micro'
import jwt from 'jsonwebtoken'
import connectToDb from '../../../lib/database'

const secret = process.env.SECRET_KEY

const user = {
  id: 1,
  email: 'test@test.com',
  password: '123456',
  displayName: 'george'
}

async function Login(req, res) {
  const errors = []

  if (req.method !== 'POST') {
    errors.push('Endpoint only accepts POST requests.')
    return send(res, 406, { errors })
  }

  const { email, password } = req.body
  const validate = email === user.email && password === user.password

  if (!validate) {
    errors.push('Invalid login credentials. Please try again.')
    return send(res, 401, { errors })
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, displayName: user.displayName },
    secret,
    (err, token) => {
      return send(res, 200, { token: token })
    }
  )
}

export default (req, res) => run(req, res, Login)
