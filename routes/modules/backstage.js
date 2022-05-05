// *引用 Express 與 Express 路由器
const express = require("express")
const router = express.Router()
// *引用  model
const {Restaurants} = require("../../models/restaurant")
const { findLimitBySort, findRestaurantByFilter } = require("../../controllers/CRUDHelper")

//*公用變數
let pageSetting = {
    pageName: "backstage",
    skipDataTotal: 0,
    limit: 6,
    sortField: "",
    currentPage: "",
    scripts: [{ script: "/javascripts/deleteHelper.js" }]
}


//*顯示後臺管理頁面
router.get("/", (req, res) => {
    pageSetting.sortField = "uploadDate"
    pageSetting.skipDataTotal = 0
    pageSetting.currentPage = "1"
    
    findLimitBySort(Restaurants, pageSetting, req, res)
})

//*Search 資料取得與渲染
router.get("/search", (req, res) => {
    pageSetting.sortField = req.query.sortType || "uploadDate"
    pageSetting.currentPage = req.query.page || "1"
    pageSetting.skipDataTotal = (parseInt(pageSetting.currentPage) - 1) * pageSetting.limit

    findRestaurantByFilter(Restaurants, pageSetting, req, res)
})

//*排序與分頁
router.get("/sort" , (req , res) =>{
    pageSetting.sortField = req.query.sortType
    pageSetting.currentPage = req.query.page
    pageSetting.skipDataTotal = (parseInt(pageSetting.currentPage) - 1) * pageSetting.limit

    findLimitBySort(Restaurants, pageSetting, req, res)
})

// *匯出路由模組
module.exports = router