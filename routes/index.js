//#region 引用 Express 與 Express 路由器
const express = require("express")
const router = express.Router()
//#endregion

//#region  引入模組程式碼
//#region - 引入 home 模組程式碼
const home = require("./modules/home")
/* 將網址結構符合 home 模組使用的 request 字串導向 home 模組
 *  /
 *  /search
 *  /restaurants/:id
 *  /sort
 */
router.use("/", home)
//#endregion -

//#region - 引用 backstage 模組程式碼
const backstage = require("./modules/backstage")
/* 將網址結構符合 backstage 模組使用的 request 字串導向 backstage 模組
 *  /backstage
 *  /backstage/search
 *  /backstage/sort
 */
router.use("/backstage", backstage)
//#endregion -

//#region - 引用 restaurants 模組程式碼
const restaurants = require("./modules/restaurants")
/* 將網址結構符合 restaurants 模組使用的 request 字串導向 restaurants 模組
 *  /backstage/restaurants
 * /backstage/restaurants/new
 * /backstage/restaurants/category
 * /backstage/restaurants/:id
 * /backstage/restaurants/:id/edit
 * /backstage/restaurants/batch
 */
router.use("/backstage/restaurants", restaurants)
//#endregion -
//#endregion

//#region 匯出路由模組
module.exports = router
//#endregion
