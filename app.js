//#region  require packages used in the project(該專案需使用的Packages)
//#region - express setting
const { request } = require("express")
const express = require("express")
const app = express()
const port = 3000
//#endregion -

app.use(express.static("public"))

//#region - express-handlebars Setting
const exphbs = require("express-handlebars")
app.engine("handlebars", exphbs({ defaultLayout: "main" }))
app.set("view engine", "handlebars")
//#endregion -

//#region - MongoDB Setting
require("dotenv").config()
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection
db.on("error", () => {
    console.log("mongodb error!")
})

db.once("open", () => {
    console.log("mongodb connected!")
})
//#endregion -

//#region - method-override Setting
const methodOverride = require("method-override")
app.use(methodOverride("_method"))
//#endregion -

//#region - routes Setting
const routes = require("./routes")
app.use(routes)
//#endregion -

const Restaurants = require("./models/restaurant")
//#endregion

//#region  routes setting(設定路由)









//#endregion

//#region  start and listen on the Express server(啟動伺服器)
app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}`)
})
//#endregion
