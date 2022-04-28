const findAll = (Model, pageName, req, res) => {
  Model.find()
        .lean()
        .sort({ _id: "asc" })
        .then((results) => res.render(pageName, { results }))
        .catch((error) => console.error(error))
}

const findRestaurantByFilter = (Model, pageName, req, res) => {
    const keyword = req.query.keyword.trim()//* 從URL中傳來的 keyword引數
    const reg = new RegExp(keyword, "i") //* 不區分大小寫

    if (keyword.length === 0) {
        res.render(pageName, { keyword: "" })
    } else {
        /** 多條件與模糊查詢指令
         *  多條件查詢: query.$or
         *  模糊查詢: query.$regex
         */
        Model.find({ $or: [{ name: { $regex: reg } }, { name_en: { $regex: reg } }] })
            .lean()
            .then((results) => {
                if (results.length === 0) {
                    Model.find({ category: { $regex: reg } })
                        .lean()
                        .then((results) => res.render(pageName, { keyword, results }))
                        .catch((error) => console.log(error))
                } else {
                    res.render(pageName, { keyword, results })
                }
            })
            .catch((error) => console.log(error))
    }    
}

const findById = (Model, pageName, req, res) => {
    const id = req.params.id
    Model.findById(id)
        .lean()
        .then((result) =>res.render(pageName, {result}))
        .catch((error) => console.error(error))
}

const createOne = (Model ,uploadData ,  pageName , req , res)=>{
    Model.create(uploadData)
        .then(() => res.redirect(pageName))
        .catch((error) => console.log(error))
}

const findByIdAndUpdate = (Model , updateData , path , req , res)=>{
    const id = req.params.id
    Model.findByIdAndUpdate(id , updateData)
        .then(res.redirect(path))
        .catch(error=>console.log(error))
}

const returnFindAll = (Model) => {
    return Model.find()
        .lean()
        .sort({ _id: "asc" })
        .then((results) => {return results})
        .catch((error) => console.error(error))
}

const returnFindOne=(Model , filters)=>{
    return Model.findOne(filters)
        .lean()
        .then((result)=>{return result })        
        .catch(error=>console.log(error))
}

const returnFindById = (Model , req ) =>{
    const id = req.params.id
    return Model.findById(id)
        .lean()
        .then(result => {return result})
        .catch(error => console.log(error))
}

const returnCreateOne = (Model ,uploadData)=>{
    return Model.create(uploadData)
        .then(() => {return true})
        .catch(error=>{return error})
}


module.exports = { findAll, 
    findRestaurantByFilter, 
    findById,
    createOne,
    findByIdAndUpdate,
    returnFindAll,
    returnFindOne,
    returnFindById,
    returnCreateOne,
}
