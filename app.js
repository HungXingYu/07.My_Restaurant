//#region  require packages used in the project(該專案需使用的Packages)
//#region - setting express 
const { request } = require("express")
const express = require("express")
const app = express()
const port = process.env.PORT || 3000
//#endregion -

//#region - setting express-handlebars 
const exphbs = require("express-handlebars")
app.engine("handlebars", exphbs({ defaultLayout: "main" }))
app.set("view engine", "handlebars")
//#endregion -

//#region - setting body-parser
app.use(express.urlencoded({ extended: true }))
//#endregion -

//#region - setting method-override
const methodOverride = require("method-override")
app.use(methodOverride("_method"))
//#endregion -

//#region - setting routes 
const routes = require("./routes")
app.use(routes)
//#endregion -

//#region - setting database
require("./config/mongoose")
//#endregion -

app.use(express.static("public"))
//#endregion

//#region  start and listen on the Express server(啟動伺服器)
app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}`)
})
//#endregion
