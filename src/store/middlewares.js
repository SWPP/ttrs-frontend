const req = require.context('.', true, /\.\/.+\/middlewares\.js$/)

module.exports = []

req.keys().forEach(key => {
  const middlewares = req(key)

  Object.keys(middlewares).forEach(name => {
    module.exports.push(middlewares[name])
  })
})
