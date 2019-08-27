// @ts-check
import { send, run } from 'micro'
import connectToDb from '../../../lib/database'
import User from '../../../models/User'
import registerValidator from '../../../lib/registerValidator'

const Register = async (req, res) => {
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
    await connectToDb
  } catch (err) {
    errors.push('Database error, please try again.')
    console.log(err)
  }

  // This API endpoint is unfinished. Just having it return something.
  send(res, 200, req.body)
}

export default (req, res) => run(req, res, Register)
