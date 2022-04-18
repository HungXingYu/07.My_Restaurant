// *引用 Express 與 Express 路由器
const express = require("express")
const router = express.Router()
// *引用  model
const Restaurants = require("../../models/restaurant")

// *定義首頁路由
router.get("/", (req, res) => {
    Restaurants.find()
        .lean()
        .sort({ _id: "asc" })
        .then((restaurants) => res.render("index", { restaurants }))
        .catch((error) => console.error(error))
})

//* Search 資料取得與渲染
router.get("/search", (req, res) => {
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
                    .then((restaurantResults) => res.render("index", { keyword, restaurants: restaurantResults }))
                    .catch((error) => console.log(error))
            } else {
                res.render("index", { keyword, restaurants: restaurantResults })
            }
        })
        .catch((error) => console.log(error))
})

//*顯示詳細資料
router.get("/restaurants/:id", (req, res) => {
    const id = req.params.id
    return Restaurants.findById(id)
        .lean()
        .then((restaurant) => res.render("show", { restaurant }))
        .catch((error) => console.error(error))
})

// *匯出路由模組
module.exports = router
