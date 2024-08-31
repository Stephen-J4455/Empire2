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

// notification
const notification = document.getElementById("note");
const noteBox = document.querySelector(".notification");
function closeNotification() {
    noteBox.style.display = "none";
}
// notification
// category
const grosP = document.getElementById("grosP");
const elecP = document.getElementById("elecP");
const phoneP = document.getElementById("phoneP");
const computingP = document.getElementById("computingP");
const machinaryP = document.getElementById("machinaryP");
const fashionP = document.getElementById("fashionP");
const sportsP = document.getElementById("sportsP");
const gamingP = document.getElementById("gamingP");
const homeAndOfficeP = document.getElementById("homeAndOfficeP");
const healthP = document.getElementById("healthP");
const gardenP = document.getElementById("gardenP");
const musicP = document.getElementById("musicP");
const miscP = document.getElementById("miscP");
const booksP = document.getElementById("booksP");
const automobileP = document.getElementById("automobileP");
const butt = document.getElementById("grocery");
// category end
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
    document.querySelector(".cart-btn").style.display = "none";
    document.getElementById("activehome").style.color = "rgb(2, 40, 100)";
    document.getElementById("activehome2").style.color = "rgb(2, 40, 100)";
    document.getElementById("activehome3").style.color = "rgb(2, 40, 100)";
    document.getElementById("activehome4").style.color = "darkorange";
    document.getElementById("activehome5").style.color = "rgb(2, 40, 100)";
}
function home() {
    accountPage.style.display = "none";
    homePage.style.display = "block";
    help.style.display = "none";
    category.style.display = "none";
    feed.style.display = "none";
    document.querySelector(".cart-btn").style.display = "block";
    document.getElementById("activehome").style.color = "darkorange";
    document.getElementById("activehome2").style.color = "rgb(2, 40, 100)";
    document.getElementById("activehome3").style.color = "rgb(2, 40, 100)";
    document.getElementById("activehome4").style.color = "rgb(2, 40, 100)";
    document.getElementById("activehome5").style.color = "rgb(2, 40, 100)";
    document.querySelector(".cart-btn").style.color = "white";
}
function openFeed() {
    accountPage.style.display = "none";
    homePage.style.display = "none";
    help.style.display = "none";
    category.style.display = "none";
    feed.style.display = "block";
    document.querySelector(".cart-btn").style.display = "block";
    document.getElementById("activehome").style.color = "rgb(2, 40, 100)";
    document.getElementById("activehome2").style.color = "rgb(2, 40, 100)";
    document.getElementById("activehome3").style.color = "darkorange";
    document.getElementById("activehome4").style.color = "rgb(2, 40, 100)";
    document.getElementById("activehome5").style.color = "rgb(2, 40, 100)";
    document.querySelector(".cart-btn").style.color = "#000066";
}

function openCategory() {
    accountPage.style.display = "none";
    homePage.style.display = "none";
    help.style.display = "none";
    category.style.display = "block";
    feed.style.display = "none";
    document.querySelector(".cart-btn").style.display = "block";
    document.getElementById("activehome").style.color = "rgb(2, 40, 100)";
    document.getElementById("activehome2").style.color = "darkorange";
    document.getElementById("activehome3").style.color = "rgb(2, 40, 100)";
    document.getElementById("activehome4").style.color = "rgb(2, 40, 100)";
    document.getElementById("activehome5").style.color = "rgb(2, 40, 100)";
    document.querySelector(".cart-btn").style.color = "#000066";
}
function openHelp() {
    accountPage.style.display = "none";
    homePage.style.display = "none";
    help.style.display = "block";
    category.style.display = "none";
    feed.style.display = "none";
    document.querySelector(".cart-btn").style.display = "none";
    document.getElementById("activehome").style.color = "rgb(2, 40, 100)";
    document.getElementById("activehome2").style.color = "rgb(2, 40, 100)";
    document.getElementById("activehome3").style.color = "rgb(2, 40, 100)";
    document.getElementById("activehome4").style.color = "rgb(2, 40, 100)";
    document.getElementById("activehome5").style.color = "darkorange";
}

//auto scroll
function autoScroll() {
    const container = document.querySelector(".adds");
    const cards = container.querySelectorAll(".giftcards");
    let currentIndex = 0;

    setInterval(() => {
        currentIndex = (currentIndex + 1) % cards.length;
        container.scrollTo({
            left: cards[currentIndex].offsetLeft,
            behavior: "smooth"
        });
    }, 3000);
}
autoScroll();

// page loading script

// window.addEventListener("scroll", function () {
//     if (window.scrollY + window.innerHeight >= document.body.clientHeight) {
//         displayfeedPage();
//     }
// });
document.getElementById("feedList").addEventListener("scroll", function () {
    const feedList = document.getElementById("feedList");

    // Check if scrolled to bottom
    if (feedList.scrollTop + feedList.clientHeight >= feedList.scrollHeight-5) {
        displayfeedPage();
    }
});

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
    if (localStorage.getItem("cartPage")) {
        document.querySelector(".cart-menu").style.display = "flex";
    }
});

// open address book
function openAddressBook() {
    const addressPress = document.getElementById("addressPage");
    const expandIcon = document.getElementById("expandIcon");
    if (addressPress.style.display === "flex") {
        addressPress.style.display = "none";
        expandIcon.style.rotate = "0deg";
        expandIcon.style.transition = "0.3s ease";
    } else {
        addressPress.style.display = "flex";
        expandIcon.style.rotate = "180deg";
        expandIcon.style.transition = "0.3s ease";
    }
}

// category page
function btnSelect(cardNum) {
    var catP = document.getElementsByClassName("for-gros");
    var buttons = document.querySelectorAll(".category-box span");
    for (var i = 0; i < catP.length; i++) {
        if (i == cardNum) {
            catP[i].classList.add("show");
        } else {
            catP[i].classList.remove("show");
        }
    }
    for (var i = 0; i < buttons.length; i++) {
        if (i == cardNum) {
            buttons[i].classList.add("cat-active");
        } else {
            buttons[i].classList.remove("cat-active");
        }
    }
}
// acc management
function openAccMgt() {
    const accBox = document.getElementById("accountManagement");
    const icon = document.getElementById("mgtIc");
    if (accBox.style.display === "flex") {
        accBox.style.display = "none";
        icon.style.rotate = "0deg";
        icon.style.transition = "0.3s ease";
    } else {
        accBox.style.display = "flex";
        icon.style.rotate = "180deg";
        icon.style.transition = "0.3s ease";
    }
}
function openPasswordReset() {
    const resetPage = document.getElementById("passwordChange");
    if (resetPage.style.display === "block") {
        resetPage.style.display = "none";
    } else {
        resetPage.style.display = "block";
    }
}
function shopMore() {
    const cart = document.querySelector(".cart-menu");
    const order = document.querySelector(".make-order");
    cart.style.display = "none";
    order.style.display = "none";
}
