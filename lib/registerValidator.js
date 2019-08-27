const registerValidator = (email, password, displayName) => {
  const messages = []

  const empty = email === '' || password === '' || displayName === ''
  if (empty) messages.push('All fields must be filled out.')

  const validEmail = email.match(/\S+@\S+\.\S+/)
  if (!validEmail) messages.push('Please enter a valid email address.')

  if (password.length < 4)
    messages.push('Your password must be at least 4 characters in length.')

  if (displayName.length < 3)
    messages.push('Your display name must be at least 3 characters in length.')

  return messages
}

export default registerValidator
