import apiIndex from "./api/index.js"
import entries from "./api/entries.js"
import detail from "./api/detail.js"
import stars from "./api/stars.js"

// `vite --mode dummy` のときだけ、/api 以下でダミーAPIを返す
function mockApi() {
  return {
    name: "mock-api",
    apply: "serve",
    configureServer(server) {
      if (server.config.mode !== "dummy") {
        return
      }
      server.middlewares.use("/api", async (req, res) => {
        const url = new URL(req.url, "http://localhost")
        console.info(`🖥 Requested: ${req.originalUrl}, Method: ${req.method}`)
        // .php は付けても付けなくてもよい
        switch (url.pathname.replace(/\.php$/, "")) {
          case "/":
            sendHtml(res, 200, apiIndex())
            return
          case "/entries":
            await sendJson(res, entries(url.searchParams))
            return
          case "/detail":
            await sendJson(res, detail(url.searchParams))
            return
          case "/stars":
            await sendJson(res, stars(url.searchParams))
            return
          default:
            // 本番APIでも、存在しないパスはJSONではなくHTMLが返る
            sendHtml(res, 404, "<!DOCTYPE html><title>404 Not Found</title><h1>Not Found</h1>")
        }
      })
    },
  }
}

async function sendJson(res, { status, body, delay = 0 }) {
  if (delay) {
    await new Promise((resolve) => setTimeout(resolve, delay))
  }
  res.statusCode = status
  res.setHeader("Content-Type", "application/json; charset=utf-8")
  res.end(JSON.stringify(body))
}

function sendHtml(res, status, html) {
  res.statusCode = status
  res.setHeader("Content-Type", "text/html; charset=utf-8")
  res.end(html)
}

export default mockApi
