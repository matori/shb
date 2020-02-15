const fs = require("fs")
const path = require("path")
const createDummyDetail = require("./create-dummy-detail")

function detail(req) {
  const fileName = req.query.url
  const jsonFileName = getJsonFileName(fileName)
  return jsonFileName ? require(`./data/details/${jsonFileName}`) : createDummyDetail()
}

function getJsonFileName(fileName) {
  const dummyFiles = fs.readdirSync(path.resolve(__dirname, "./data/details/"))
  const fileExist = fileName ? dummyFiles.includes(`${fileName}.json`) : false
  return fileExist ? `${fileName}.json` : null
}

module.exports = detail
