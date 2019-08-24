import React, { useState } from 'react'
import Head from 'next/head'
import fetch from 'isomorphic-unfetch'

import { authLogin } from '../lib/utils/auth'

import Layout from '../components/layout/Layout'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const disabled = email === '' || password === ''

  const handleSubmit = async e => {
    e.preventDefault()

    const url = 'http://localhost:3000/api/login'

    try {
      const loginAttempt = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      if (loginAttempt.ok) {
        const { token } = await loginAttempt.json()
        authLogin(token)
      } else {
        const { message } = await loginAttempt.json()
        setError(message)
      }
    } catch (err) {
      console.error('Error:', err)
    }
  }

  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>
      <h1 className="title">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="email" className="label">
            Email Address
          </label>
          <div className="control">
            <input
              type="email"
              className="input"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="password" className="label">
            Password
          </label>
          <div className="control">
            <input
              type="password"
              className="input"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
        </div>
        {error ? (
          <div className="message is-danger">
            <div className="message-body">{error}</div>
          </div>
        ) : null}
        <div className="field">
          <div className="control">
            <button disabled={disabled} type="submit" className="button">
              Submit
            </button>
          </div>
        </div>
      </form>
    </Layout>
  )
}

export default Login
