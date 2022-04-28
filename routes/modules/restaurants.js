// *引用 Express 與 Express 路由器
const express = require("express")
const router = express.Router()
// *引用  model
const { Restaurants, RestaurantCategory } = require("../../models/restaurant")
const { findById, findAll, createOne, returnFindAll ,returnFindOne, returnCreateOne } = require("../../controllers/CRUDHelper")
const { validationRules, newRestaurantValidate } = require("../../controllers/validatorHelper")
//*引用其他
const datetime = require('node-datetime')


//*顯示新增餐廳頁面
router.get("/new", (req, res) => {
    findAll(RestaurantCategory, "new", req, res)
})

//*新增餐廳
router.post("/", validationRules(), newRestaurantValidate, (req, res) => {
    const uploadDate = datetime.create()
    const formatDate = uploadDate.format("Y-m-d")
    const newRestaurant = req.body
    const filters = {name:newRestaurant.name , location:newRestaurant.location , phone:newRestaurant.phone}
    
    async function checkAndCreate(){
        const restaurantResult = await returnFindOne(Restaurants , filters)

        if(restaurantResult === null){
            newRestaurant.uploadDate = formatDate
            createOne(Restaurants, newRestaurant, "/", req, res)
        }else{
            async function keepData(){
                const category = await returnFindAll(RestaurantCategory)
                const errors = {upload:`資料重複:該餐廳資料已於${restaurantResult.uploadDate}上傳，請勿重複上傳!`}

                return res.render("new", { errors, results: category })
            }
            keepData()
        }
    }
    checkAndCreate()
    
})

//*新增餐廳類別
router.post("/category" , (req , res)=>{
    const category = req.body
    let response = {msgTitle:"" , msgText:""}

    async function checkAndCreate(){
        const categoryResult = await returnFindOne(RestaurantCategory, category)

        if(categoryResult === null){
            const createCategoryResult = await returnCreateOne(RestaurantCategory, category)
            //新增
            if (createCategoryResult) {
                response.msgTitle = "建立成功"
                response.msgText = `餐廳類別【${category.name}】建立成功!`
            }else{
                response.msgTitle = "建立失敗"
                response.msgText = createCategoryResult
            }
        }else{
            response.msgTitle = "建立失敗"
            response.msgText = `餐廳類別【${category.name}】已存在，請勿重複建立!` 
        }
        res.json(response)
    }
    checkAndCreate()
})

//*取得新增至資料庫後所有的餐廳類別
router.get("/category" , (req, res)=>{  
    async function getData(){
        const categoryResults = await returnFindAll(RestaurantCategory)
        const response = categoryResults
        res.json(response)        
    }
    getData()
})

//*顯示詳細資料(可編輯版本)
router.get("/:id", (req, res) => {
    findById(Restaurants, "showEdit", req, res)
})

// *匯出路由模組
module.exports = router
