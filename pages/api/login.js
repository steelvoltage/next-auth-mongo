import { send, createError, run } from 'micro'
import jwt from 'jsonwebtoken'

const secret = 'SUPER_SECRET_PASSWORD'

const user = {
  id: 1,
  email: 'test@test.com',
  password: '123456',
  displayName: 'george'
}

const login = async (req, res) => {
  if (req.method !== 'POST') {
    return send(res, 406, { error: 'Endpoint only accepts POST requests.' })
  }
  const { email, password } = req.body
  const validate = email === user.email || password === user.password

  if (!validate) {
    return send(res, 401, { error: 'Invalid login credentials' })
  }

  const token = jwt.sign(
    { user: { id: user.id, email: user.email, displayName: user.displayName } },
    secret,
    (err, token) => {
      return send(res, 200, { token: token })
    }
  )

  return token
}

export default (req, res) => run(req, res, login)
