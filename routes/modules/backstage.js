// *引用 Express 與 Express 路由器
const express = require("express")
const router = express.Router()
// *引用  model
const Restaurants = require("../../models/restaurant")
const { findAll, findRestaurantByFilter } = require("../../controllers/CRUD")

//*顯示後臺管理頁面
router.get("/", (req, res) => {
    findAll(Restaurants, "backstage", req, res) 
})

//* Search 資料取得與渲染
router.get("/search", (req, res) => {
    findRestaurantByFilter(Restaurants, "backstage", req, res)
})

// *匯出路由模組
module.exports = router