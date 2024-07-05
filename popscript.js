const signupForm = document.getElementById("signcontainer");
const loginForm = document.getElementById("logcontainer");
const reset = document.getElementById("passwordForm");
const formCnt = document.querySelector(".form-container");
const homePage = document.getElementById("home");
const accountPage = document.querySelector(".account");
const feed = document.querySelector(".feedpage");
const help = document.querySelector(".help");
const category = document.querySelector(".category");
const navBar = document.querySelector(".buttom-nav");
function sign() {
    signupForm.style.display = "block";
    loginForm.style.display = "none";
}
function log() {
    signupForm.style.display = "none";
    loginForm.style.display = "block";
}
function forgot() {
    signupForm.style.display = "none";
    loginForm.style.display = "none";
    reset.style.display = "flex";
}
function back() {
    signupForm.style.display = "none";
    loginForm.style.display = "block";
    reset.style.display = "none";
}
// navBar controls
function openAccountPage() {
    accountPage.style.display = "block";
    homePage.style.display = "none";
    help.style.display = "none";
    category.style.display = "none";
    feed.style.display = "none";
    document.getElementById("activehome").style.color = "white";
    document.getElementById("activehome2").style.color = "white";
    document.getElementById("activehome3").style.color = "white";
    document.getElementById("activehome4").style.color = "darkorange";
    document.getElementById("activehome5").style.color = "white";
}
function home() {
    accountPage.style.display = "none";
    homePage.style.display = "block";
    help.style.display = "none";
    category.style.display = "none";
    feed.style.display = "none";
    document.getElementById("activehome").style.color = "darkorange";
    document.getElementById("activehome2").style.color = "white";
    document.getElementById("activehome3").style.color = "white";
    document.getElementById("activehome4").style.color = "white";
    document.getElementById("activehome5").style.color = "white";
}
function openFeed() {
    accountPage.style.display = "none";
    homePage.style.display = "none";
    help.style.display = "none";
    category.style.display = "none";
    feed.style.display = "block";
    document.getElementById("activehome").style.color = "white";
    document.getElementById("activehome2").style.color = "white";
    document.getElementById("activehome3").style.color = "darkorange";
    document.getElementById("activehome4").style.color = "white";
    document.getElementById("activehome5").style.color = "white";
}
function openCategory() {
    accountPage.style.display = "none";
    homePage.style.display = "none";
    help.style.display = "none";
    category.style.display = "block";
    feed.style.display = "none";
    document.getElementById("activehome").style.color = "white";
    document.getElementById("activehome2").style.color = "darkorange";
    document.getElementById("activehome3").style.color = "white";
    document.getElementById("activehome4").style.color = "white";
    document.getElementById("activehome5").style.color = "white";
}
function openHelp() {
    accountPage.style.display = "none";
    homePage.style.display = "none";
    help.style.display = "block";
    category.style.display = "none";
    feed.style.display = "none";
    document.getElementById("activehome").style.color = "white";
    document.getElementById("activehome2").style.color = "white";
    document.getElementById("activehome3").style.color = "white";
    document.getElementById("activehome4").style.color = "white";
    document.getElementById("activehome5").style.color = "darkorange";
}

// page loading script

window.addEventListener("scroll", function () {
    if (window.scrollY + window.innerHeight >= document.body.clientHeight) {
        showProducts();
    }
});

//
// add to cart function
function openCartMenu() {
    // location.reload();
    const cartMenu = document.querySelector(".cart-menu");
    if (cartMenu.style.display === "block") {
        cartMenu.style.display = "none";
        // navBar.style.display = "flex";
    } else {
        cartMenu.style.display = "block";
        // navBar.style.display = "none";
    }
    localStorage.setItem("cartPage", "true");
}
function closeCartPage() {
    localStorage.removeItem("cartPage");
    document.querySelector(".cart-menu").style.display = "none";
}

// navBar hover
function navhover() {
    if ((homePage.style.display = "block")) {
        document.getElementById("activehome").style.color = "darkorange";
    }
}
navhover();

// page preloading animation
window.addEventListener("load", function () {
    var loadingAnimation = document.querySelector(".loading-animation");
    loadingAnimation.style.display = "none";
    if (localStorage.getItem("cartPage")) {
        document.querySelector(".cart-menu").style.display = "flex";
    }
});

// open address book
function openAddressBook() {
    const addressPress = document.getElementById("addressPage");
    if (addressPress.style.display === "flex") {
        addressPress.style.display = "none";
    } else {
        addressPress.style.display = "flex";
    }
}
function closeAddressBook() {
    const addressPress = document.getElementById("addressPage");
    if (addressPress.style.display === "flex") {
        addressPress.style.display = "none";
    } else {
        addressPress.style.display = "flex";
    }
}
// //
//
