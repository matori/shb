function mockServer(app) {
  app
    .use((req, res, next) => {
      console.info(`🖥 Requested: ${req.url}, Method: ${req.method}`)
      next()
    })
    .get("/api", (req, res) => {
      const apiIndex = require("./api/index")
      const html = apiIndex()
      res.send(Buffer.from(html))
    })
  .get("/api/entries", function(req, res) {
    const entries = require("./api/entries")
    const data = entries(req, res)
    res.json(data)
  })
  .get("/api/detail", function(req, res) {
    const detail = require("./api/detail")
    const data = detail(req)
    res.json(data)
  })
}

module.exports = mockServer
