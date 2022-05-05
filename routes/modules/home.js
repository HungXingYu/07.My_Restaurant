// *引用 Express 與 Express 路由器
const express = require("express")
const router = express.Router()
// *引用  model
const {Restaurants} = require("../../models/restaurant")
const { findLimitBySort, findRestaurantByFilter, findById, returnFindCount } = require("../../controllers/CRUDHelper")

//*公用變數
let pageSetting = {
    pageName: "index",
    skipDataTotal: 0,
    limit: 6,
    sortField: "uploadDate",
    currentPage: "",
    scripts: []
}

// *定義首頁路由
router.get("/", (req, res) => {
    pageSetting.sortField = "uploadDate"
    pageSetting.skipDataTotal = 0
    pageSetting.currentPage = "1"
    
    findLimitBySort(Restaurants , pageSetting , req , res)
})

//* Search 資料取得與渲染
router.get("/search", (req, res) => {  
    pageSetting.sortField = req.query.sortType || "uploadDate"
    pageSetting.currentPage = req.query.page || "1"
    pageSetting.skipDataTotal = (parseInt(pageSetting.currentPage) - 1) * pageSetting.limit

    findRestaurantByFilter(Restaurants, pageSetting, req, res)
})

//*顯示詳細資料
router.get("/restaurants/:id", (req, res) => {
    findById(Restaurants , "show" , req , res)   
})

//*排序與分頁
router.get("/sort" , (req , res) =>{
    pageSetting.sortField = req.query.sortType
    pageSetting.currentPage = req.query.page
    pageSetting.skipDataTotal = (parseInt(pageSetting.currentPage) - 1) * pageSetting.limit

    findLimitBySort(Restaurants, pageSetting, req, res)
})

//*取得資料的總數
router.get("/page" , (req , res)=>{
    async function getData(){
        const itemCount = await returnFindCount(Restaurants , req)
        const response = itemCount
        res.json(response)
    }
    getData()
})



// *匯出路由模組
module.exports = router
