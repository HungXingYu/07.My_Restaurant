// *引用 Express 與 Express 路由器
const express = require("express")
const router = express.Router()
// *引用  model
const {Restaurants} = require("../../models/restaurant")
const { findAll,findAllBySort, findRestaurantByFilter, findById } = require("../../controllers/CRUDHelper")

// *定義首頁路由
router.get("/", (req, res) => {
    findAll(Restaurants, "index", req, res)
})

//* Search 資料取得與渲染
router.get("/search", (req, res) => {
    findRestaurantByFilter(Restaurants, "index", req, res)
})

//*顯示詳細資料
router.get("/restaurants/:id", (req, res) => {
    console.log(req)
    findById(Restaurants , "show" , req , res)
    
})

//*排序
router.get("/sort" , (req , res) =>{
    findAllBySort(Restaurants , "index" , req , res)
})

// *匯出路由模組
module.exports = router
