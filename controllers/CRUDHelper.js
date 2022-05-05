const findAll = (Model, pageName, req, res) => {
  Model.find()
        .lean()
        .sort('uploadDate')
        .then((results) => res.render(pageName, { results , sort:"uploadDate"}))
        .catch((error) => console.error(error))
}

const findAllBySort = (Model , pageName , req , res) =>{
    const sortField = req.query.name
    Model.find()
        .lean()
        .sort(sortField)
        .then((results) => res.render(pageName, { results , sort: sortField}))
        .catch((error) => console.error(error))
}

const findLimitBySort = (Model, pageSetting ,req, res) => {
    Model.find()
        .skip(pageSetting.skipDataTotal)
        .limit(pageSetting.limit)
        .lean()
        .sort(pageSetting.sortField)
        .then((results) => {
            res.render(pageSetting.pageName, {results, 
                    sort: pageSetting.sortField, 
                    pageNum: pageSetting.currentPage,
                    scripts:pageSetting.scripts
                 })
        })
        .catch((error) => console.error(error))
}

const findRestaurantByFilter = (Model, pageSetting, req, res) => {
    const keyword = req.query.keyword.trim() //* 從URL中傳來的 keyword引數
    const reg = new RegExp(keyword, "i") //* 不區分大小寫

    if (keyword.length === 0) {
        res.render(pageSetting.pageName, { keyword: "" })
    } else {
        /** 多條件與模糊查詢指令
         *  多條件查詢: query.$or
         *  模糊查詢: query.$regex
         */
        Model.find({ $or: [{ name: { $regex: reg } }, { name_en: { $regex: reg } }] })
            .skip(pageSetting.skipDataTotal)
            .limit(pageSetting.limit)
            .lean()
            .then((results) => {
                if (results.length !== 0){
                    res.render(pageSetting.pageName, { keyword, 
                                results, 
                                sort: pageSetting.sortField,
                                pageNum: pageSetting.currentPage,
                                scripts:pageSetting.scripts
                            })
                    return
                }

                Model.find({ category: { $regex: reg } })
                    .skip(pageSetting.skipDataTotal)
                    .limit(pageSetting.limit)
                    .lean()
                    .then((results) => {
                        res.render(pageSetting.pageName, { keyword, results, sort: pageSetting.sortField, pageNum: pageSetting.currentPage, scripts: pageSetting.scripts })
                    })
                    .catch((error) => console.log(error))
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

const returnFindAllCount = (Model) =>{
    return Model.find()
        .count()
        .lean()
        .then((result) => {return result})
        .catch((error) => console.error(error))
}

const returnFindCount = (Model, req) => {
    const keyword = req.query.keyword.trim() //* 從URL中傳來的 keyword引數
    const reg = new RegExp(keyword, "i") //* 不區分大小寫
    return Model.find({ $or: [{ name: { $regex: reg } }, { name_en: { $regex: reg } }] })
        .count()
        .lean()
        .then((result) => {
            if(result !== 0)  return result
            
            Model.find({ category: { $regex: reg } })
                .count()
                .lean()
                .then(result => {return result})
                .catch((error) => console.error(error))            
        })
        .catch((error) => console.error(error))
}

const returnFindAll = (Model) => {
    return Model.find()
        .lean()
        .sort({uploadDate: "asc" })
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

const returnDeleteById = (Model , idArr) =>{
    return Model.deleteMany({_id:{$in:idArr}})
        .then(()=>{return true})
        .catch((error)=>{return error})
}

module.exports = { findAll,
    findAllBySort,
    findLimitBySort,
    findRestaurantByFilter, 
    findById,
    createOne,
    findByIdAndUpdate,
    returnFindAllCount,
    returnFindCount,
    returnFindAll,
    returnFindOne,
    returnFindById,
    returnCreateOne,
    returnDeleteById,
}
