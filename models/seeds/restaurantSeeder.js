const restaurantJson = require("./restaurant.json")
const { Restaurants, RestaurantCategory } = require("../restaurant")
const db = require("../../config/mongoose")

db.once('open', () => {
    restaurantJson.results.forEach((restaurant) => {
        Restaurants.create({
            name: restaurant.name,
            name_en: restaurant.name_en,
            category: restaurant.category,
            image: restaurant.image,
            location: restaurant.location,
            phone: restaurant.phone,
            google_map: restaurant.google_map,
            rating: restaurant.rating,
            description: restaurant.description,
            uploadDate: restaurant.uploadDate
        })
    })
    console.log("Restaurants collection done")

    restaurantJson.category.forEach(category =>{
        RestaurantCategory.create({
            name:category.name
        })
    })
    console.log("RestaurantCategory collection done")
})
