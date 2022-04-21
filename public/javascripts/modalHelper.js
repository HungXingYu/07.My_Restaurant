const searchBar = document.querySelector("#searchBar")
const restaurantList = document.querySelector("#restaurantList .col")

if(searchBar!==null && restaurantList === null){
  Swal.fire({
      icon: "error",
      title: "查無資料",
      text: "查無資料，請重新輸入關鍵字在進行搜尋",
  })
}
