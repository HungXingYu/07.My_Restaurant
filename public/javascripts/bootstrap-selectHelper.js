//*排序
const sort = document.querySelector("#sort")
//*下拉選單
const dropdown = document.querySelector(".selectpicker")



if (dropdown) {
    const dropdownValue = dropdown.dataset.value
    $(".selectpicker").selectpicker("val", dropdownValue)
}

if (sort) {
    const oldHref = window.location.href
    function setHref() {
        let newHref = ""
        
        if(oldHref.indexOf("search") > 0){
            newHref = oldHref.split('&')[0]
        }else{
            if (oldHref.indexOf("/sort") < 0) {
                if (oldHref.indexOf("/", oldHref.length - 1) === oldHref.length - 1) {
                    newHref = oldHref.slice(0, -1)
                } else {
                    newHref = oldHref
                }
            }else{
                newHref = oldHref.slice(0, oldHref.indexOf("/sort"))
            }
        }

        return newHref
    }

    //#region -分頁設定
    async function displayPagination() {
        const keyword = document.querySelector("#keyword").value
        const perPageItems = 6
        let response = await fetch(`/page?keyword=${keyword}`)
        let allDataCount = await response.json()
        let totalPages = Math.ceil(parseInt(allDataCount) / perPageItems)
        let currentPage = parseInt($("#pagination").attr("data-currentPage"))
        
        //* 總頁數為1時不顯示分頁插件
        if (totalPages === 1) return

        $("#pagination").twbsPagination({
            totalPages: totalPages,
            visiblePages: 3,
            startPage: currentPage,
            onPageClick: function (event, pageNum) {
                const sortField = sort.dataset.value
                let newHref = setHref()
                let pagePath = oldHref.indexOf("search") < 0 ? `/sort?sortType=${sortField}&page=${pageNum}` : `&sortType=${sortField}&page=${pageNum}`                
                newHref += pagePath

                if (pageNum > currentPage || pageNum < currentPage) {
                    window.location.href = newHref
                }
            }
        })
    }
    displayPagination()
    //#endregion -

    //#region - 選擇排序
    $("select").on("change", function (e) {
        const sortName = this.options[this.selectedIndex].value
        let newHref = setHref()
        newHref += oldHref.indexOf("search") < 0 ? `/sort?sortType=${sortName}&page=1` : `&sortType=${sortName}&page=1`
        
        window.location.href = newHref
    })
    //#endregion -
}
