import React, { useState } from 'react'
import Head from 'next/head'
import withAuth from '../components/withAuth'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [errors, setErrors] = useState([])
  const [passErr, setPassErr] = useState(null)

  const disabled =
    email === '' || password === '' || password2 === '' || displayName === ''

  const handleSubmit = e => {
    e.preventDefault()
  }

  const comparePasswords = () => {
    if (password !== password2 && password !== '' && password2 !== '') {
      setPassErr('Passwords must match.')
    } else {
      setPassErr(null)
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
        {passErr ? (
          <div className="message is-danger">
            <div className="message-body">{passErr}</div>
          </div>
        ) : null}
        {errors.length > 0 ? (
          <div className="message is-danger">
            <div className="message-body">
              {errors.map(error => {
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
