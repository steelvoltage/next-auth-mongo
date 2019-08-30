//@ts-check
import Router from 'next/router'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'
import jwt from 'jsonwebtoken'
import connectToDb from './database'
import User from '../models/User'

const secret = process.env.SECRET_KEY

function authLogin(token) {
  cookie.set('token', token, { expires: 1 })
  Router.push('/')
}

function authLogout() {
  cookie.remove('token')
  window.localStorage.setItem('logout', Date.now().toString())
  Router.push('/login')
}

function quietAuthLogout() {
  cookie.remove('token')
  window.localStorage.setItem('logout', Date.now().toString())
}

function authLogoutSync(event) {
  if (event.key === 'logout') {
    Router.push('/login')
  }
}

async function authCheck(ctx, misdirect) {
  const { token } = nextCookie(ctx)

  if (ctx.req && token && misdirect) {
    ctx.res.writeHead(301, { Location: '/account' })
    ctx.res.end()
  }

  if (token && misdirect) {
    Router.push('/account')
  }

  const decodedToken = await jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return null
    }
    return decoded
  })
  const { id } = decodedToken
  const user = await getUser(id)
  return user
}

async function authRouteCheck(ctx) {
  const { token } = nextCookie(ctx)

  if (ctx.req && !token) {
    ctx.res.writeHead(302, { Location: '/login' })
    ctx.res.end()
  }

  if (!token) {
    Router.push('/login')
  }

  const decodedToken = await jwt.verify(token, secret, (err, decoded) => {
    if (err && ctx.req) {
      ctx.res.writeHead(302, { Location: '/login' })
      ctx.res.end()
    } else if (err) {
      Router.push('/login')
    }
    return decoded
  })
  const { id } = decodedToken
  const user = await getUser(id)
  return user
}

async function getUser(id) {
  try {
    await connectToDb()
    const user = await User.findOne({ _id: id })
    if (!user) {
      quietAuthLogout()
    }
    if (user.access < 0) {
      authLogout()
    }
    return {
      id: user._id.toString(),
      email: user.email,
      displayName: user.displayName
    }
  } catch (err) {
    authLogout()
  }
}

export { authLogout, authLogoutSync, authLogin, authCheck, authRouteCheck }
