import { send, run } from 'micro'
import connectToDb from '../../../lib/database'
import User from '../../../models/User'

async function Account(req, res) {
  const errors = []
  console.log(req.headers)
  if (req.method !== 'GET') {
    errors.push('Endpoint only accepts GET requests.')
    return send(res, 406, { errors })
  }

  const { userId } = req.body

  if (!userId) {
    errors.push('User ID is required.')
    return send(res, 406, { errors })
  }

  try {
    await connectToDb()

    let user = await User.findOne({ _id: userId })

    if (!user) {
      errors.push('User not found.')
      return send(res, 406, { errors })
    }

    return send(res, 200, {
      id: user._id,
      email: user.email,
      displayName: user.displayName,
      access: user.access
    })
  } catch (err) {
    errors.push('System error, please try again.')
    res.send(res, 401, { errors })
  }
}

export default (req, res) => run(req, res, Account)
