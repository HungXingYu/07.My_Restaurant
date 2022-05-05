const navItem = $(".nav-pills li a")
const navIndex = $("#navIndex")
const navBackstage = $("#navBackstage")

const navCategory = window.location.pathname.split('/')[1]


navItem.removeClass("active")
switch (navCategory) {
    case "backstage":
        navBackstage.addClass("active")
        break
    case "restaurants":
        navItem.removeClass("active")
        break
    default :
        navIndex.addClass("active")
        break
}


