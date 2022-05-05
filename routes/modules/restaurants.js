// *引用 Express 與 Express 路由器
const express = require("express")
const router = express.Router()
// *引用  model
const { Restaurants, RestaurantCategory } = require("../../models/restaurant")
const { findAll, 
    createOne, 
    findByIdAndUpdate, 
    returnFindAll, 
    returnFindOne, 
    returnFindById, 
    returnCreateOne, 
    returnDeleteById } = require("../../controllers/CRUDHelper")
const { validationRules, restaurantValidate } = require("../../controllers/validatorHelper")
//*引用其他
const datetime = require('node-datetime')


async function keepFormData(pageName ,req ,  res) {
    const inputData = req.body
    inputData._id = req.params.id
    //透過 await 暫停 Promise : returnFindAll，“等待” resolve 結果(在此為mongoose執行.then()結果回傳後，在賦值至 category 。
    const category = await returnFindAll(RestaurantCategory)
    const definedErrorMsg = req.definedErrorMsg

    res.render(pageName, { inputData, results: category, errors: definedErrorMsg })
}


//*顯示新增一筆餐廳頁面
router.get("/new", (req, res) => {
    findAll(RestaurantCategory, "new", req, res)
})

//*新增一筆餐廳資料
router.post("/", validationRules(), restaurantValidate, (req, res) => {
    const definedErrorMsg = req.definedErrorMsg

    if(Object.keys(definedErrorMsg).length !== 0){       
        keepFormData("new", req, res)
    }else{
        const uploadDate = datetime.create()
        const formatDate = uploadDate.format("Y-m-d")
        const newRestaurant = req.body
        const filters = { name: newRestaurant.name, location: newRestaurant.location, phone: newRestaurant.phone }

        async function checkAndCreate() {
            //檢查是否重複
            const restaurantResult = await returnFindOne(Restaurants, filters)

            if (restaurantResult === null) {
                newRestaurant.uploadDate = formatDate
                //新增
                createOne(Restaurants, newRestaurant, "/", req, res)
            } else {
                async function showError() {
                    const category = await returnFindAll(RestaurantCategory)
                    const errors = { upload: `資料重複:該餐廳資料已於${restaurantResult.uploadDate}上傳，請勿重複上傳!` }

                    res.render("new", { errors, results: category })
                }
                showError()
            }
        }
        checkAndCreate()
    }
})

//*新增一筆餐廳類別資料
router.post("/category" , (req , res)=>{
    const category = req.body
    let response = {msgTitle:"" , msgText:""}

    async function checkAndCreate(){
        const categoryResult = await returnFindOne(RestaurantCategory, category)

        if(categoryResult === null){
            //新增
            const createCategoryResult = await returnCreateOne(RestaurantCategory, category)
            
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

//*顯示詳細資料(可編輯、刪除版本)頁面
router.get("/:id", (req, res) => {
    async function getData(){
        const restaurantResult = await returnFindById(Restaurants , req )
        const scripts = [{ script: "/javascripts/deleteHelper.js" }]

        res.render("showEdit" , {result:restaurantResult , scripts})
    }
    getData()
})

//*顯示修改一筆餐廳頁面
router.get("/:id/edit" ,(req,res)=>{
    async function getData(){
        const restaurantResult = await returnFindById(Restaurants , req)
        const categoryResults = await returnFindAll(RestaurantCategory)

        res.render("edit" , {inputData:restaurantResult , results:categoryResults})
    }   
    getData()
})

//*修改一筆餐廳資料
router.put("/:id" ,validationRules() , restaurantValidate, (req , res) =>{
    const definedErrorMsg = req.definedErrorMsg

    if (Object.keys(definedErrorMsg).length !== 0) {
        keepFormData("edit", req, res)
    }else{
        const uploadDate = datetime.create()
        const formatDate = uploadDate.format("Y-m-d")
        const newRestaurant = req.body
        const path = `/backstage/restaurants/${req.params.id}`
        
        newRestaurant.uploadDate = formatDate
        findByIdAndUpdate(Restaurants, newRestaurant, path, req, res)
    }
})

//*批次刪除餐廳資料
router.delete("/batch" ,(req , res)=>{
    const idCount = req.body.count
    const idArr = req.body.id.split(',')
    let response = { msgTitle: "", msgText: "" }

    async function deleteData(){
        const deleteDataResult = await returnDeleteById(Restaurants , idArr)

        if(deleteDataResult){
            response.msgTitle = "刪除成功"
            response.msgText = `您勾選的${idCount}筆餐廳資料已刪除成功！`
        }else{
            response.msgTitle = "刪除失敗"
            response.msgText = deleteDataResult
        }
        res.json(response)
    }
    deleteData()
})

//*刪除一筆餐廳資料
router.delete("/:id" , (req , res)=>{
    async function deleteData(){
        const deleteDataResult = await returnDeleteById(Restaurants , [req.body.id])
        let response = { msgTitle: "", msgText: "" }
        
        if (deleteDataResult) {
            response.msgTitle = "刪除成功"
            response.msgText = `該餐廳資料已刪除成功！`
        } else {
            response.msgTitle = "刪除失敗"
            response.msgText = deleteDataResult
        }
        res.json(response)
    }    
    deleteData()
})

// *匯出路由模組
module.exports = router
