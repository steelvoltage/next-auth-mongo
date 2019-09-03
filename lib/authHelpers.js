//@ts-check
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
  Router.push('/login?issue=rejected')
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
    return ctx.res.end()
  }
  if (token && misdirect) {
    return Router.push('/account')
  }
  if (token) {
    const { id } = jwt.verify(token, secret)
    const response = await fetch(`http://localhost:3000/api/user/account/${id}`)
    const { user } = await response.json()
    if (!user || user.access < 0) {
      bannedUserTokenRemoval()
    }
    return user
  }
}

async function authRouteCheck(ctx) {
  const { token } = nextCookie(ctx)
  if (ctx.req && !token) {
    ctx.res.writeHead(302, { Location: '/login' })
    return ctx.res.end()
  }
  if (!token) {
    return Router.push('/login')
  }
  const { id } = await jwt.verify(token, secret)
  const response = await fetch(`http://localhost:3000/api/user/account/${id}`)
  const { user } = await response.json()
  if (!user || user.access < 0) {
    bannedUserTokenRemoval()
  }
  return user
}

export { authLogout, authLogoutSync, authLogin, authCheck, authRouteCheck }
