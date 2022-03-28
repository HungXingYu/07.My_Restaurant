//#region  require packages used in the project(該專案需使用的Packages)
const express = require('express')
const app = express()
const port = 3000
app.use(express.static('public'))

const exphbs = require('express-handlebars')
app.engine('handlebars' , exphbs({defaultLayout:'main'}))
app.set('view engine' , 'handlebars')

const restaurantList = require('./restaurant.json')
//#endregion 

//#region  routes setting(設定路由)
//顯示首頁
app.get('/' , (req , res)=>{
  res.render('index' , {restaurants:restaurantList.results})
})

//顯示詳細資料
app.get('/restaurants/:restaurant_ID' , (req , res)=>{  
  const restaurant = restaurantList.results.find(restaurant =>restaurant.id.toString()===req.params.restaurant_ID)

  res.render('show' , {restaurant:restaurant})
})

//顯示搜尋結果
app.get('/search' , (req , res) =>{
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant =>{
      if(restaurant.name.toLowerCase().includes(keyword.toLowerCase())|| restaurant.category.includes(keyword)){
        return restaurant
      }
  })

  res.render('index' , {keyword:keyword , restaurants:restaurants})
})
//#endregion 

//#region  start and listen on the Express server(啟動伺服器)
app.listen(port , ()=>{
  console.log(`Express is listening on localhost:${port}`)
})
//#endregion 