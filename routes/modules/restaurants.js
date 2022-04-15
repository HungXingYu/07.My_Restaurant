// *引用 Express 與 Express 路由器
const express = require("express")
const router = express.Router()
// *引用  model
const Restaurants = require("../../models/restaurant")

//*顯示新增餐廳頁面
router.get("/new", (req, res) => {
    res.render("new")
})

// *匯出路由模組
module.exports = router