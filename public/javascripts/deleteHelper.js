const allcheck = document.querySelector("#allcheck")
const checks = document.querySelectorAll(".card .form-check-input")
const deleteBtn = document.querySelector("#deleteBtn")
const deleteOneBtn = document.querySelector("#deleteOneBtn")


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

function deleteData(msgText ,url , body ){
  Swal.fire({
      title: "是否確定刪除?",
      html: `<b>${msgText}</b>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "確定",
      cancelButtonText: "取消",
      showLoaderOnConfirm: true,
      preConfirm: () => {
          return fetch(url, {
              method: "Delete",
              headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
              },
              body: body
          })
              .then((response) => {return response.json()})
              .catch((error) => console.log(error))
      },
      allowOutsideClick: false
  }).then((result) => {
      if (result.isConfirmed) {
          const msgTitle = result.value.msgTitle
          const msgHtml = `<b>${result.value.msgText}</b>`
          if (msgTitle === "刪除失敗") {
              callErrorMsg(msgTitle, msgHtml)
          } else {
              callSuccessMsg(msgTitle, msgHtml).then((result) => {
                  if (result.isConfirmed) {
                      window.location.href = location.origin
                  }
              })
          }
      }
  })
}

if(allcheck){
  allcheck.addEventListener("click", (event) => {
      checks.forEach((check) => {
          check.checked = allcheck.checked
      })
  })
}

if(deleteBtn){
  deleteBtn.addEventListener("click", (event) => {
      let checkedCount = 0
      let checkedIdArr = []
      checks.forEach((check) => {
          if (check.checked) {
              ++checkedCount
              checkedIdArr.push(check.id)
          }
      })

      const msgText = `您勾選了${checkedCount}筆餐廳，是否確定刪除?`
      const ajaxUrl = "/backstage/restaurants/batch"
      const ajaxBody = `id=${checkedIdArr}&count=${checkedCount}`
      deleteData(msgText , ajaxUrl , ajaxBody)
  })
}

if(deleteOneBtn){
  deleteOneBtn.addEventListener("click" , (event)=>{
      const id = deleteOneBtn.dataset.id
      const msgText = "是否確定刪除該餐廳資料?"
      const ajaxUrl = `/backstage/restaurants/${id}`
      const ajaxBody = `id=${id}`
      deleteData(msgText, ajaxUrl, ajaxBody)
  })
}

