//*搜尋
const searchBar = document.querySelector("#searchBar")
const restaurantList = document.querySelector("#restaurantList .col")

//*上傳
const uploadBtn = document.querySelector("#uploadBtn")


//#region - 查無資料
if (searchBar !== null && restaurantList === null) {
    Swal.fire({
        title: "查無資料",
        text: "您輸入的關鍵字查無資料，請重新輸入關鍵字再查詢",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK"
    }).then((result) => {
        if (result.isConfirmed) {
            const href = location.href.split("?")[0].replace("search", "")
            window.location.href = href
        }
    })
}
//#endregion -


