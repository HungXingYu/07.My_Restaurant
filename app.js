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

const Restaurants = require("./models/restaurant")
//#endregion

//#region  routes setting(設定路由)
//*顯示首頁
app.get("/", (req, res) => {
    Restaurants.find()
        .lean()
        .sort({_id: 'asc'})
        .then((restaurants) => res.render("index", { restaurants }))
        .catch((error) => console.error(error))
})

//*顯示詳細資料
app.get("/restaurants/:id", (req, res) => {
    const id = req.params.id
    return Restaurants.findById(id)
        .lean()
        .then((restaurant) => res.render("show", { restaurant }))
        .catch((error) => console.error(error))
})


//* Search 資料取得與渲染
app.get("/search", (req, res) => {
    const keyword = req.query.keyword //* 從URL中傳來的 keyword引數
    const reg = new RegExp(keyword, "i") //* 不區分大小寫
    
    /** 多條件與模糊查詢指令
     *  多條件查詢: query.$or
     *  模糊查詢: query.$regex
     */
    Restaurants.find({ $or: [{ name: { $regex: reg } }, { name_en: { $regex: reg } }] })
        .lean()
        .then((restaurantResults) => {
            if (restaurantResults.length === 0) {
                Restaurants.find({ category: { $regex: reg } })
                    .lean()
                    .then((restaurantResults) => res.render("index", {keyword ,  restaurants: restaurantResults }))
                    .catch((error) => console.log(error))
            } else {
                res.render("index", { keyword , restaurants: restaurantResults })
            }
        })
        .catch((error) => console.log(error))
})

//*顯示後臺管理頁面
app.get("/backstage", (req, res) => {
    Restaurants.find()
        .lean()
        .sort({ _id: "asc" })
        .then((restaurants) => res.render("backstage", { restaurants }))
        .catch((error) => console.error(error))
})

//*顯示新增餐廳頁面
app.get("/backstage/new", (req, res) => {
    res.render("new")
})
//#endregion

//#region  start and listen on the Express server(啟動伺服器)
app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}`)
})
//#endregion
