const navItem = $(".nav-pills li a")
const navIndex = $("#navIndex")
const navBackstage = $("#navBackstage")

const navCategory = window.location.pathname.split('/')[1]


navItem.removeClass("active")
switch (navCategory) {
    case "":
        navIndex.addClass("active")
        break
    case "backstage":
        navBackstage.addClass("active")
        break
}


