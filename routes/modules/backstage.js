// *引用 Express 與 Express 路由器
const express = require("express")
const router = express.Router()
// *引用  model
const {Restaurants} = require("../../models/restaurant")
const {findRestaurantByFilter , returnFindAll} = require("../../controllers/CRUDHelper")

//*顯示後臺管理頁面
router.get("/", (req, res) => {
    async function getData(){
        const restaurantResults = await returnFindAll(Restaurants)
        const scripts = [{ script: '/javascripts/deleteHelper.js' }]

        res.render("backstage", { results: restaurantResults, scripts})
    }
    getData()
})

//* Search 資料取得與渲染
router.get("/search", (req, res) => {
    findRestaurantByFilter(Restaurants, "backstage", req, res)
})

// *匯出路由模組
module.exports = router