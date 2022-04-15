// *引用 Express 與 Express 路由器
const express = require("express")
const router = express.Router()
// *引用  model
const Restaurants = require("../../models/restaurant")

//*顯示後臺管理頁面
router.get("/", (req, res) => {
    Restaurants.find()
        .lean()
        .sort({ _id: "asc" })
        .then((restaurants) => res.render("backstage", { restaurants }))
        .catch((error) => console.error(error))
})

// *匯出路由模組
module.exports = router