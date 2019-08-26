import Router from 'next/router'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'
import jwt from 'jsonwebtoken'

const secret = process.env.SECRET_KEY

const authLogin = token => {
  cookie.set('token', token, { expires: 1 })
  Router.push('/')
}

const authLogout = () => {
  cookie.remove('token')
  window.localStorage.setItem('logout', Date.now())
  Router.push('/login')
}

const authLogoutSync = event => {
  if (event.key === 'logout') {
    console.log('logout sync')
    Router.push('/login')
  }
}

const authCheck = (ctx, misdirect) => {
  const { token } = nextCookie(ctx)

  if (ctx.req && token && misdirect) {
    ctx.res.writeHead(301, { Location: '/account' })
    ctx.res.end()
  }

  if (token && misdirect) {
    Router.push('/account')
  }

  let user
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      user = null
    }
    user = decoded
  })
  return user
}

const authRouteCheck = ctx => {
  const { token } = nextCookie(ctx)

  if (ctx.req && !token) {
    ctx.res.writeHead(302, { Location: '/login' })
    ctx.res.end()
  }

  if (!token) {
    Router.push('/login')
  }

  let user
  jwt.verify(token, secret, (err, decoded) => {
    if (err && ctx.req) {
      ctx.res.writeHead(302, { Location: '/login' })
      ctx.res.end()
    } else if (err) {
      Router.push('/login')
    }
    user = decoded
  })

  return user
}

export { authLogout, authLogoutSync, authLogin, authCheck, authRouteCheck }
