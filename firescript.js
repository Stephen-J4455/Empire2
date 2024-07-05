// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyCG7fRw21apfTA36HKl5LbVWiHI_8zk12A",
    authDomain: "signup-bfcf8.firebaseapp.com",
    databaseURL: "https://signup-bfcf8-default-rtdb.firebaseio.com",
    projectId: "signup-bfcf8",
    storageBucket: "signup-bfcf8.appspot.com",
    messagingSenderId: "862509936181",
    appId: "1:862509936181:web:6a16490f27a97bac7bcb7c"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();

// Firebase Auth Functions
function signUp() {
    const email = $("#signup-email").val();
    const password = $("#signup-password").val();
    const username = $("#userName").val();
    if ((email === "", password === "")) {
        document.getElementById("error1").style.display = "flex";
    } else {
        auth.createUserWithEmailAndPassword(email, password)
            .then(userCredential => {
                const user = userCredential.user;
                var userId = firebase.auth().currentUser.uid;
                let dbId = 1599263;
                db.ref(`USER/ADDRESS/${userId}`).set({
                    username: username,
                    database: dbId
                });
                // alert("Sign up successful: ", user);
                homePage.style.display = "block";
                formCnt.style.display = "none";
            })
            .catch(error => {
                //alert("Error signing up: ", error);
            });
    }
    event.preventDefault();
}

function login() {
    const email = $("#loginEmail").val();
    const password = $("#loginPassword").val();
    if ((email === "", password === "")) {
        document.getElementById("error2").style.display = "flex";
    } else {
        auth.signInWithEmailAndPassword(email, password)
            .then(userCredential => {
                const user = userCredential.user;
                //alert("Login successful: ", user);
                homePage.style.display = "block";
                formCnt.style.display = "none";
            })
            .catch(error => {
                // alert("Error logging in: ", error);
            });
        event.preventDefault();
    }
}

function logout() {
    auth.signOut()
        .then(() => {
            alert("User signed out");
            document.getElementById("body-box").style.display = "none";
            formCnt.style.display = "block";
            homePage.style.display = "none";
        })
        .catch(error => {
            //alert("Error signing out: ", error);
        });
}

auth.onAuthStateChanged(user => {
    if (user) {
        // console.log("User is signed in: ", user);
        const use = document.getElementById("userEmail");
        use.innerText = "User:  " + user.email;
        // Redirect to home page when logged in
        formCnt.style.display = "none";
        navBar.style.display = "flex";
        cart();
    } else {
        // alert("User is signed out");
        // Redirect to login page
        navBar.style.display = "none";
        formCnt.style.display = "flex";
        homePage.style.display = "none";
    }
});

function forgotPassword() {
    const email = document.getElementById("resetEmail").value;
    if (email === "") {
        document.getElementById("error").style.display = "flex";
    } else {
        firebase
            .auth()
            .sendPasswordResetEmail(email)
            .then(function () {
                // alert("Password reset email sent!");
            })
            .catch(function (error) {
                //alert("Error resetting password: " + error.message);
            });
    }
}
function closeerror() {
    const close = document.querySelectorAll(".errorMessage");
    close.forEach(close => {
        close.style.display = "none";
    });
}

// add firebase real time database to
let db = firebase.database();

function topPicks() {
    db.ref("TopPicks/products").on("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            let topPick = childSnapshot.val();
            document.getElementById(
                "topPickList"
            ).innerHTML += `<div class="top-prod"><img class="top-img"
            src="${topPick.image}" height="160px"
            width="110px"/><div
            class="top-picks-name">${topPick.name}</div></div>`;
            let lo = document.querySelectorAll(".topPick-loader ");
            lo.forEach(function (e) {
                e.style.display = "none";
            });
        });
    });
}
topPicks();

function popular() {
    db.ref("Popular/products").on("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            let popular = childSnapshot.val();
            document.getElementById("popularList").innerHTML += `<div
            class="popular-prod"><img class="popular-img" src="${popular.image}"
            height="150px" width="150px"/>
            <div
            class="popular-name">${popular.name}</div>
            <div class="price-box">
            <div class="popular-price"><b>GHC ${popular.sellingprice}</b></div>
            
            <div class="popular-cprice"><b>GHC ${popular.costprice}</b></div>
            </div>
                        <div
            class="top-picks-name">Seller: ${popular.seller}</div>
            <div class="top-picks-id">ID:${popular.userID}</div>
            <button class="add-to-cart-btn-mini"
            onclick="addCart('${popular.image}','${popular.name}','${popular.sellingprice}','${popular.seller}',this)">Add
            to Cart</button>
            </div>`;
        });
    });
}
popular();
function brand() {
    db.ref("Brand/logo").on("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            let brand = childSnapshot.val();
            document.getElementById("brandList").innerHTML += `<div
             class="brand-prod">
            <img class="brand-img" src="${brand.image}" height="90px"
            width="100px"/>
            <div class="brand-name">${brand.name}</div>
            </div>`;
        });
    });
}
brand();
function poster() {
    db.ref("Posters/flyers").on("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            let flyer = childSnapshot.val();
            document.getElementById(
                "advertise"
            ).innerHTML += `<img class="giftcards"  src="${flyer.image}"/>`;
        });
    });
}
poster();

// cart

function addCart(image, product, price, seller, quantity) {
    let user = firebase.auth().currentUser.uid;
    const cartRef = db.ref(`USER/CART/${user}`);
    cartRef.child(product).set({
        image: image,
        product: product,
        price: price,
        quantity: 1,
        seller: seller
    });
    //count();
    // calculateSubtotal();
}

function count() {
    let user = firebase.auth().currentUser.uid;
    db.ref(`USER/CART/${user}`).on("value", function (snapshot) {
        const cartCount = snapshot.numChildren();
        document.getElementById("count").innerText = cartCount;
    });
}
count();
// ADDRESS
// function submitaddress() {
//     const userName = document.getElementById("adrName").value;
//     var phone = document.getElementById("phone").value;
//     const location = document.getElementById("location").value;
//     const region = document.getElementById("region").value;
//     const city = document.getElementById("city").value;
//     let checkUser = 8283450;
//     db.ref(`USER/ADDRESS/${userID}`).set({
//         user: usEmail,
//         username2: userName,
//         contact: phone,
//         location: location,
//         region: region,
//         city: city,
//         database: checkUser
//     });
//     alert("Address book saved!");
// }
// //
// //
// function checkOut() {
//     db.ref(`USER/ADDRESS/${userID}`).on("value", function (snapshot) {
//         snapshot.forEach(function (childSnapshot) {
//             let checkAddress = snapshot.val();
//             if (checkAddress.database === 1599263) {
//                 document.querySelector(".adressbook-container").style.display =
//                     "flex";
//             } else {
//                 document.querySelector(".make-order").style.display = "flex";
//             }
//         });
//     });
// }
//
function cart() {
    let user = firebase.auth().currentUser.uid;
    db.ref(`USER/CART/${user}`).on("value", snapshot => {
        const cartItems = document.getElementById("cartList");
        cartItems.innerHTML = "";
        snapshot.forEach(childSnapshot => {
            const pro = childSnapshot.val();
            const li = document.createElement("div");
            li.innerHTML = `<div class="cartItem-div">
            <img class="cart-img" src="${pro.image}"/>
            <div class="cart-dispaly">
            	<div class="cart-list-content">
            			<div class="cart-product-name">${pro.product}</div>
            			<div class="price-flux"> Price: Ghc <div
            			id="price">${pro.price}</div></div>
            			<div class="cart-quantity"> Quantity:<text id="quant"
            			class="quantity">
        ${pro.quantity}</text></div>
        <div class="cart-seller">${pro.seller}</div>
             </div>
          </div>
        </div>`;
            const removeButton = document.createElement("button");
            removeButton.classList = "remove-btn";
            removeButton.innerText = "Remove";
            removeButton.onclick = () => {
                let user = firebase.auth().currentUser.uid;
                db.ref(`USER/CART/${user}`).child(pro.product).remove();
                calculateSubtotal();
            };
            li.appendChild(removeButton);
            cartItems.appendChild(li);
            count();
            calculateSubtotal();
        });
    });
}

function calculateSubtotal() {
    let total = [];
    let user = firebase.auth().currentUser.uid;
    db.ref(`USER/CART/${user}`).once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var price = childSnapshot.val().price;
            total += price;
        });
        document.getElementById("tot").innerHTML = ` ${total}`;
    });
}
