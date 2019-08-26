const withCSS = require('@zeit/next-css')
require('dotenv').config()

module.exports = withCSS({
  env: {
    SECRET_KEY: process.env.SECRET_KEY
  }
})
