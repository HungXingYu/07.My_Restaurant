// *引用 Express 與 Express 路由器
const express = require("express")
const router = express.Router()

// *引入 home 模組程式碼
const home = require("./modules/home")
// *將網址結構符合 / 、 /search、/restaurants/:id 字串的 request 導向 home 模組 
router.use("/", home)
router.use("/search", home)
router.use("/restaurants/:id", home)

// *引用 backstage 模組
const backstage = require("./modules/backstage")
// * 將網址符合 /backstage 字串的 request 導向 backstage 模組 
router.use("/backstage", backstage)


// *引用 restaurants 模組
const restaurants = require('./modules/restaurants')
// * 將網址符合 /backstage/restaurants 字串的 request 導向 restaurants 模組
router.use("/backstage/restaurants" , restaurants)


// *匯出路由模組
module.exports = router
