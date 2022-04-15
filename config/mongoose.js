//#region - MongoDB Setting
require("dotenv").config()
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection
db.on("error", () => {
    console.log("mongodb error!")
})

db.once("open", () => {
    console.log("mongodb connected!")
})
//#endregion -