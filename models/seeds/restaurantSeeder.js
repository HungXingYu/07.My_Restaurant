const restaurantJson = require("./restaurant.json")
const { Restaurants, RestaurantCategory } = require("../restaurant")
const db = require("../../config/mongoose")

db.once('open', () => {
    restaurantJson.results.forEach((restaurant) => {
        Restaurants.create({
            name: restaurant.name.trim(),
            name_en: restaurant.name_en.trim(),
            category: restaurant.category.trim(),
            image: restaurant.image.trim(),
            location: restaurant.location.trim(),
            phone: restaurant.phone.trim(),
            google_map: restaurant.google_map.trim(),
            rating: restaurant.rating,
            description: restaurant.description.trim(),
            uploadDate: restaurant.uploadDate.trim()
        })
    })
    console.log("Restaurants collection done")

    restaurantJson.category.forEach(category =>{
        RestaurantCategory.create({
            name:category.name.trim()
        })
    })
    console.log("RestaurantCategory collection done")
})
