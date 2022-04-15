//#region  require packages used in the project(該專案需使用的Packages)
//#region - express setting
const { request } = require("express")
const express = require("express")
const app = express()
const port = 3000
//#endregion -

//#region - express-handlebars Setting
const exphbs = require("express-handlebars")
app.engine("handlebars", exphbs({ defaultLayout: "main" }))
app.set("view engine", "handlebars")
//#endregion -

//#region - method-override Setting
const methodOverride = require("method-override")
app.use(methodOverride("_method"))
//#endregion -

//#region - routes Setting
const routes = require("./routes")
app.use(routes)
//#endregion -

//#region - database Setting
require("./config/mongoose")
//#endregion -

app.use(express.static("public"))
//#endregion

//#region  start and listen on the Express server(啟動伺服器)
app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}`)
})
//#endregion
