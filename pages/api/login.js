import { send, run } from 'micro'
import jwt from 'jsonwebtoken'

const secret = process.env.SECRET_KEY

const user = {
  id: 1,
  email: 'test@test.com',
  password: '123456',
  displayName: 'george'
}

const login = async (req, res) => {
  if (req.method !== 'POST') {
    return send(res, 406, {
      messages: ['Endpoint only accepts POST requests.']
    })
  }
  const { email, password } = req.body
  const validate = email === user.email && password === user.password

  if (!validate) {
    return send(res, 401, {
      messages: ['Invalid login credentials. Please try again.']
    })
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, displayName: user.displayName },
    secret,
    (err, token) => {
      return send(res, 200, { token: token })
    }
  )

  return token
}

export default (req, res) => run(req, res, login)
