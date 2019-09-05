import Router from 'next/router'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'
import jwt from 'jsonwebtoken'
import fetch from 'isomorphic-unfetch'

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

function bannedUserTokenRemoval() {
  cookie.remove('token')
  Router.push('/login?issue=banned')
}

function authLogoutSync(event) {
  if (event.key === 'logout') {
    Router.push('/login')
  }
}

function authCheck(ctx, misdirect) {
  const { token } = nextCookie(ctx)
  if (ctx.req && token && misdirect) {
    ctx.res.writeHead(301, { Location: '/account' })
    return ctx.res.end()
  }
  if (token && misdirect) {
    return Router.push('/account')
  }
  return token
}

function authRouteCheck(ctx) {
  const { token } = nextCookie(ctx)
  if (ctx.req && !token) {
    ctx.res.writeHead(302, { Location: '/login' })
    return ctx.res.end()
  }
  if (!token) {
    return Router.push('/login')
  }
  return token
}

function verifyRedirect(ctx) {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: '/verify' })
    return ctx.res.end()
  }
  return Router.push('/verify')
}

async function getUser(token) {
  if (token) {
    const { id } = jwt.verify(token, secret)
    const response = await fetch(`http://localhost:3000/api/user/account/${id}`)
    const { user } = await response.json()
    if (!user || user.isBanned) {
      bannedUserTokenRemoval()
    }
    return user
  }
  return null
}

export {
  authLogout,
  authLogoutSync,
  authLogin,
  authCheck,
  authRouteCheck,
  verifyRedirect,
  getUser
}
