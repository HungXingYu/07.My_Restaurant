//*搜尋
const searchBar = document.querySelector("#searchBar")
const restaurantList = document.querySelector("#restaurantList .col")
//*新增餐廳類別
const addCategoryBtn = document.querySelector("#addCategory")
//*上傳
const uploadBtn = document.querySelector("#uploadBtn")
const modifyBtn = document.querySelector("#modifyBtn")
//*資料驗證
const dataError = document.querySelectorAll(`[data-error$='!']`) //get element where data-error ends with `!`

function callSuccessMsg(msgTitle, msgHtml) {
    return Swal.fire({
        title: msgTitle,
        html: msgHtml,
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK"
    })
}

function callErrorMsg(msgTitle, msgHtml) {
    return Swal.fire({
        title: msgTitle,
        html: msgHtml,
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK"
    })
}

function callYesNoMsg(msgTitle) {
    return Swal.fire({
        title: msgTitle,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes"
    })
}


//#region - 搜尋餐廳查無資料
if (searchBar && !restaurantList) {
    let msgTitle = "查無資料"
    let msgHtml = "<b>您輸入的關鍵字查無資料，請重新輸入關鍵字再查詢</b>"
    callErrorMsg(msgTitle, msgHtml).then((result) => {
        if (result.isConfirmed) {
            const href = location.href.split("?")[0].replace("search", "")
            window.location.href = href
        }
    })
}
//#endregion -

//#region - 是否確定上傳資料
function formSubmit(CRUDBtn,msgTitle){
    const uploadForm = CRUDBtn.parentElement.parentElement
    callYesNoMsg(msgTitle).then((result) => {
        if (result.isConfirmed) {
            uploadForm.submit()
        }
    })
}

if(uploadBtn){
    uploadBtn.addEventListener("click", (event) => {
        formSubmit(uploadBtn , "是否確定上傳?")
    })
}

if(modifyBtn){
    modifyBtn.addEventListener("click" , (event)=>{
        formSubmit(modifyBtn, "是否確定修改?")
    })
}
//#endregion -

//#region - 資料驗證錯誤
if (dataError.length !== 0) {
    const msgTitle = "資料錯誤"
    let msgHtml = '<div style="text-align:justify" class="col-10 offset-1"><b>'
    let msgCount = 0
    dataError.forEach((errorMsg) => {
        msgHtml += `<u>${++msgCount}.${errorMsg.dataset.error}</u><br>`
    })
    msgHtml += "</b></div>"

    callErrorMsg(msgTitle, msgHtml).then((result) => {
        if (result.isConfirmed) {
            dataError.forEach((inputData) => {
                inputData.dataset.error = ""
                if(inputData.id !== "uploadBtn" && inputData.id !== "category"){                    
                    inputData.value = ""
                    inputData.innerHTML = ""
                }               
            })
        }
    })
}
//#endregion -

//#region - 建立新餐廳類別
if(addCategoryBtn){
    addCategoryBtn.addEventListener("click", (event) => {
        Swal.fire({
            title: "建立新的餐廳類別",
            input: "text",
            inputAttributes: { autocapitalize: "off" },
            inputLabel: "請輸入餐廳類別名稱",
            inputPlaceholder: "請輸入餐廳類別名稱",
            showCancelButton: true,
            confirmButtonText: "確定",
            cancelButtonText: "取消",
            showLoaderOnConfirm: true,
            inputValidator: (category) => {
                if (!category) {
                    return "您尚未輸入任何內容"
                }
            },
            preConfirm: (category) => {
                return fetch("/backstage/restaurants/category", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: `name=${category}`
                })
                    .then((response) => {
                        return response.json()
                    })
                    .catch((error) => console.log(error))
            },
            allowOutsideClick: false //執行時是否允許外部點擊
        }).then((result) => {
            if (result.isConfirmed) {
                const msgTitle = result.value.msgTitle
                const msgHtml = `<b>${result.value.msgText}</b>`
                if (msgTitle === "建立失敗") {
                    callErrorMsg(msgTitle, msgHtml)
                } else {
                    callSuccessMsg(msgTitle, msgHtml).then((result) => {
                        if (result.isConfirmed) {
                            //*ajax取得新增至資料庫後所有的餐廳類別，refresh餐廳類別下拉選單
                            //#region -Promise寫法
                            //  fetch("/backstage/restaurants/category")
                            //      .then((response) => { return response.json()})
                            //      .then((response) => {console.log(response)})
                            //      .catch((error) => {console.log(`Error: ${error}`)})
                            //#endregion -

                            //#region - async/await寫法
                            async function getCategory(url) {
                                let response = await fetch(url)
                                let categoryResult = await response.json()

                                $("#category").find("option").remove()
                                categoryResult.forEach((category) => {
                                    $("#category").append( `<option value="${category.name}">${category.name}</option>`)
                                })
                                
                                $("#category").selectpicker("refresh")
                            }
                            getCategory("/backstage/restaurants/category")
                            //#endregion -
                        }
                    })
                }
            }
        })
    })
}
//#endregion -


