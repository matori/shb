import apiIndex from "./api/index.js"
import entries from "./api/entries.js"
import detail from "./api/detail.js"

// `vite --mode dummy` のときだけ、/api 以下でダミーAPIを返す
function mockApi() {
  return {
    name: "mock-api",
    apply: "serve",
    configureServer(server) {
      if (server.config.mode !== "dummy") {
        return
      }
      server.middlewares.use("/api", (req, res, next) => {
        const url = new URL(req.url, "http://localhost")
        console.info(`🖥 Requested: ${req.originalUrl}, Method: ${req.method}`)
        switch (url.pathname) {
          case "/":
            res.setHeader("Content-Type", "text/html; charset=utf-8")
            res.end(apiIndex())
            return
          case "/entries":
            sendJson(res, entries())
            return
          case "/detail":
            sendJson(res, detail(url.searchParams))
            return
          default:
            next()
        }
      })
    },
  }
}

function sendJson(res, data) {
  res.setHeader("Content-Type", "application/json; charset=utf-8")
  res.end(JSON.stringify(data))
}

export default mockApi
