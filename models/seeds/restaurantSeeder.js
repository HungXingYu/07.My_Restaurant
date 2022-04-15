const restaurantJson = require("./restaurant.json")
const Restaurants = require("../restaurant")

require("dotenv").config()
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection
db.on("error", () => {
    console.log("mongodb error!")
})

db.once("open", () => {
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
})
