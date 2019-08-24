import Router from 'next/router'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'

const secret = 'SUPER_SECRET_PASSWORD'

const authLogin = token => {
  cookie.set('token', token, { expires: 1 })
  Router.push('/')
}

const authLogout = () => {
  cookie.remove('token')
  window.localStorage.setItem('logout', Date.now())
  Router.push('/login')
}

const authCheck = ctx => {
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
    if (err) {
      Router.push('/login')
    }
    user = decoded
  })

  return user
}

export { authLogout, authLogin, authCheck }
