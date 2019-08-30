// @ts-check
import React, { useState } from 'react'
import Head from 'next/head'
import withAuth from '../components/withAuth'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [validationErrors, setValidationErrors] = useState([])
  const [passError, setPassError] = useState(null)
  const disabled =
    email === '' || password === '' || password2 === '' || displayName === ''

  function handleSubmit(e) {
    e.preventDefault()
  }

  function comparePasswords() {
    if (password !== password2 && password !== '' && password2 !== '') {
      setPassError('Passwords must match.')
    } else {
      setPassError(null)
    }
  }

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <h1 className="title">Register</h1>
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
        <div className="field">
          <label htmlFor="password2" className="label">
            Confirm Password
          </label>
          <div className="control">
            <input
              type="password"
              className="input"
              name="password2"
              value={password2}
              onChange={e => {
                setPassword2(e.target.value)
              }}
              onKeyUp={e => comparePasswords()}
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="displayName" className="label">
            Display Name
          </label>
          <div className="control">
            <input
              type="text"
              className="input"
              name="displayName"
              value={displayName}
              onChange={e => {
                setDisplayName(e.target.value)
              }}
            />
          </div>
        </div>
        {passError ? (
          <div className="message is-danger">
            <div className="message-body">{passError}</div>
          </div>
        ) : null}
        {validationErrors.length > 0 ? (
          <div className="message is-danger">
            <div className="message-body">
              {validationErrors.map(error => {
                return <p>{error}</p>
              })}
            </div>
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
    </>
  )
}

export default withAuth(Register, true)
