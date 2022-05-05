const { body, validationResult } = require("express-validator")

const validationRules = () => {
  return [
      body("name").trim()
        .isLength({min:1}).withMessage("空白錯誤:餐廳中文名未輸入或僅輸入空白!"),
      body("name_en").trim()
        .isLength({min:1}).withMessage("空白錯誤:餐廳英文名未輸入或僅輸入空白!")
        .isAlphanumeric('en-US',{ignore: " -'"}).withMessage("格式錯誤:餐廳英文名必須包含大小寫英文或數字，符號僅支援三種格式(空格,-,')!"),
      body("category").trim()
        .isLength({min:1}).withMessage("空白錯誤:餐廳類別不得空白!"),
      body("image").trim()
        .isLength({min:1}).withMessage("空白錯誤:餐廳照片網址未輸入或僅輸入空白!")
        .isURL().withMessage("格式錯誤:餐廳照片輸入的內容並非網址!"),
      body("location").trim()
        .isLength({min:1}).withMessage("空白錯誤:餐廳地址未輸入或僅輸入空白!"),
      body("phone").trim()
        .isLength({min:1}).withMessage("空白錯誤:餐廳電話未輸入或僅輸入空白!")
        .isNumeric().withMessage("格式錯誤:餐廳電話僅能以數字表示!"),
      body("google_map").trim()
        .isLength({min:1}).withMessage("空白錯誤:Google Map網址未輸入或僅輸入空白!")
        .isURL().withMessage("格式錯誤:Google Map網址輸入的內容並非網址!"),
      body("rating").trim()
        .isLength({min:1}).withMessage("空白錯誤:評分未輸入或僅輸入空白!")
        .isNumeric().withMessage("格式錯誤:評分僅能以數字表示!"),
      body("description").trim()
        .isLength({min:1}).withMessage("空白錯誤:描述未輸入或僅輸入空白!")
  ]
}

const restaurantValidate = (req,res,next)=>{
    const errors = validationResult(req)
    //*自行在req物件新增definedErrorMsg屬性
    req.definedErrorMsg = {}

    //*無錯誤訊息，回傳next()使router繼續往下執行
    if (errors.isEmpty()) {
        return next()
    }

    //*有錯誤訊息，req.definedErrorMsg賦值，再next()使router繼續往下執行
    const extractedErrors = {}

    errors.array({ onlyFirstError: true }).map((error) => {
        extractedErrors[error.param] = error.msg
    })
    req.definedErrorMsg = extractedErrors
    next()
}


module.exports = {
    validationRules,
    restaurantValidate,
}