//*排序
const sort = document.querySelector("#sort")
//*下拉選單
const dropdown = document.querySelector(".selectpicker")


if (dropdown) {
    const dropdownValue = dropdown.dataset.value
    $(".selectpicker").selectpicker("val", dropdownValue)
}


if(sort){
  $("select").on("change", function (e) {
      const sortName = encodeURIComponent(this.options[this.selectedIndex].value)
      const oldHref = window.location.href
      let newHref =""
      
      if (oldHref.indexOf("/sort") < 0){
        if(oldHref.indexOf("/" , oldHref.length-1) === oldHref.length-1){
          newHref = oldHref.slice(0,-1)
        }else{
          newHref = oldHref
        }
      }else{
        newHref = oldHref.slice(0, oldHref.indexOf("/sort"))
      }     
      newHref += `/sort?name=${sortName}`    
      window.location.href = newHref
  })
}