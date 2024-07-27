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
    if ((email === "", password === "", username === "")) {
        noteBox.style.display = "block";
        notification.innerText = "Enter Email and Password";
    } else {
        auth.createUserWithEmailAndPassword(email, password)
            .then(userCredential => {
                const user = userCredential.user;
                var userId = firebase.auth().currentUser.uid;
                let dbId = 1599263;
                db.ref(`USER/ADDRESS/${userId}`).set({
                    account: username,
                    database: dbId
                });
                // alert("Sign up successful: ", user);
                location.reload();
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
        noteBox.style.display = "block";
        notification.innerText = "Enter Email and Password";
    } else {
        auth.signInWithEmailAndPassword(email, password)
            .then(userCredential => {
                const user = userCredential.user;
                //alert("Login successful: ", user);
                homePage.style.display = "block";
                formCnt.style.display = "none";
                location.reload();
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
        document.querySelector(".cart-btn").style.display = "block";
        cart();
        getUserAddress();
        catGros("Category/grocery", "groceryP");
        catGros("Category/computing", "computingP");
        catGros("Category/electronics", "elecP");
        catGros("Category/home&office", "homeAndOfficeP");
        catGros("Category/phones", "phoneP");
        catGros("Category/machinary", "machinaryP");
        catGros("Category/fashion", "fashionP");
        catGros("Category/sports", "sportsP");
        catGros("Category/gaming", "gamingP");
        catGros("Category/health&beauty", "healthP");
        catGros("Category/garden&outdoors", "gardenP");
        catGros("Category/music", "musicP");
        catGros("Category/books&movies", "booksP");
        catGros("Category/misc", "miscP");
        catGros("Category/automobile", "automobileP");
        displayfeedPage();
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
            document.getElementById("topPickList").innerHTML += `<div
            onclick="openProductPage('${topPick.image}','${topPick.name}','${topPick.sellingprice}','${topPick.costprice}','${topPick.identification}','${topPick.seller}','${topPick.description}',this)"
            class="top-prod"><img class="top-img"
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
            let offCp = popular.costprice;
            let offSp = popular.sellingprice;
            document.getElementById(
                "popularList"
            ).innerHTML += `<div class="popular-prod">
            
            <div onclick="openProductPage('${popular.image}','${
                popular.name
            }','${popular.sellingprice}','${popular.costprice}','${
                popular.identification
            }','${popular.seller}','${popular.description}',this)">
                        
            <img class="popular-img" src="${popular.image}"
            height="150px" width="170px"/>
            <div
            class="popular-name">${popular.name}</div>
            <div class="price-box">
            <div class="popular-price">GHC ${popular.sellingprice}</div>
            <div class="popular-cprice">GHC ${popular.costprice}</div>
            </div>
      <div class="top-picks-name">Seller: ${popular.seller}</div>
            <div class="top-picks-id">ID:${popular.identification}</div>
            </div>
            <button class="add-to-cart-btn"
            onclick="addCart('${popular.image}','${popular.name}','${
                popular.sellingprice
            }','${popular.seller}',this)">Add to Cart</button>
             <div class="off-tag">-${parseInt(
                 ((offCp - offSp) / offCp) * 100
             )}%<div>
            
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
            document.querySelector(
                ".adds"
            ).innerHTML += `<img class="giftcards"  src="${flyer.image}"/>`;
            autoScroll();
        });
    });
}
poster();

function newArrivals() {
    db.ref("New/products").on("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            let newProduct = childSnapshot.val();
            document.querySelector(".new-products").innerHTML += `<div
            class="new-arrival-product">
            <div onclick="openProductPage('${newProduct.image}','${newProduct.name}','${newProduct.sellingprice}','${newProduct.costprice}','${newProduct.identification}','${newProduct.seller}','${newProduct.description}',this)">
            <img
            src="${newProduct.image}" height="160px" width="170px"/>
            <div class="new-arrival-name">${newProduct.name}</div>
            <div class="new-arrival-sp">Ghc${newProduct.sellingprice}</div>
            <div class="new-arrival-cp">Ghc${newProduct.costprice}</div>
            <div class="new-arrival-seller">Seller: ${newProduct.seller}</div>
            <div class="new-arrival-id">ID: ${newProduct.identification}</div>
            </div>
            <button
            onclick="addCart('${newProduct.image}','${newProduct.name}','${newProduct.sellingprice}','${newProduct.seller}',this)"
            class="add-to-cart-btn">Add to Cart</button>
            
            </div>`;
        });
    });
}
newArrivals();
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
function submitaddress() {
    let user = firebase.auth().currentUser.uid;
    const mail = firebase.auth().currentUser.email;
    let checkUser = 8283450;
    const userName = document.getElementById("adrName").value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const phone = document.getElementById("phone").value;
    const birthday = document.getElementById("birthday").value;
    const location = document.getElementById("location").value;
    const city = document.getElementById("city").value;
    if (
        (userName === "",
        gender === "",
        phone === "",
        birthday === "",
        location === "",
        city === "")
    ) {
        noteBox.style.display = "block";
        notification.innerText = "Invalid User Credentials";
    } else {
        db.ref(`USER/ADDRESS/${user}`).update({
            username: userName,
            contact: phone,
            birthday: birthday,
            gender: gender,
            email: mail,
            location: location,
            city: city,
            database: checkUser
        });
        noteBox.style.display = "block";
        notification.innerText = "Address Book Created Successfully";
        document.querySelector(".adressbook-container").style.display = "none";
    }
    event.preventDefault();
}
function closeAddressInput() {
    document.querySelector(".adressbook-container").style.display = "none";
}
function getUserAddress() {
    let user = firebase.auth().currentUser.uid;
    db.ref(`USER/ADDRESS/${user}`).once("value", function (snapshot) {
        const addrVal = snapshot.val();
        document.querySelector(".address-container").innerHTML = `<div>
        <div>Name: ${addrVal.username}</div>
        <div>Email: ${addrVal.email}</div>
        <div>Contact: ${addrVal.contact}</div>
        <div>Location: ${addrVal.location}</div>
        <div>Gender: ${addrVal.gender}</div>
        <div>Birthday: ${addrVal.birthday}</div>
        <div>City: ${addrVal.city}</div>
        </div>`;
    });
}
//
//
function checkOut() {
    let user = firebase.auth().currentUser.uid;
    db.ref(`USER/ADDRESS/${user}`).on("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            let checkAddress = snapshot.val();
            if (checkAddress.database === 1599263) {
                document.querySelector(".adressbook-container").style.display =
                    "flex";
            } else {
                document.querySelector(".make-order").style.display = "flex";
            }
        });
    });
}
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
            getProductData();
        });
    });
}
function getProductData() {
    let user = firebase.auth().currentUser.uid;
    var database = firebase.database();
    var ref = database.ref(`USER/CART/${user}`);

    ref.on("value", function (snapshot) {
        var sellingPrices = [];

        snapshot.forEach(function (childSnapshot) {
            var sellingPrice = childSnapshot.val().price;
            sellingPrices.push(parseFloat(sellingPrice));
        });

        var sum = sellingPrices.reduce(function (a, b) {
            return a + b;
        }, 0);

        document.getElementById("tot").innerText = sum.toFixed(2);
    });
}

function order() {
    let user = firebase.auth().currentUser.uid;
    var cartRef = db.ref(`USER/CART/${user}`);
    const checkPage = db.ref(`CHECKOUT/${user}`);
    cartRef.once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            checkPage.child(childKey).push(childData);
            noteBox.style.display = "block";
            notification.innerText = "Order Successful";
        });
    });
    db.ref(`USER/CART/${user}`).set("");
}
function closeOrderPage() {
    document.querySelector(".make-order").style.display = "none";
}
function openProductPage(image, product, sp, cp, id, seller) {
    const pPage = document.querySelector(".p-page");
    pPage.style.display = "flex";
    pPage.style.position = "fixed";
    pageP = document.getElementById("prodInf");
    pageP.innerHTML = `<div class="product-page-card">
    <img class="product-page-image" src="${image}"
    height="260px" width="360px"/>
    <div class="product-page-name">${product}</div>
    <div class="price-card">
    <div class="product-page-sellingprice">Gh¢ ${sp}</div>
    <div class="product-page-costprice">Gh¢ ${cp}</div>
    <div class="product-page-off"></div>
    </div>
    <div class="product-page-id">Product ID: ${id}</div>
    <div class="product-page-seller">Seller: ${seller}</div>
    	
    	 <div class="product-page-cart-box">
                    <button
                    onclick="addCart('${image}','${product}','${sp}','${seller}',this)"
                    class="product-page-cart-btn">Add To Cart</button>
                    <button class="product-page-call-btn">Buy Now</button>
                </div>
    </div>
    
    `;
}
function closePPage() {
    const pPage = document.querySelector(".p-page");
    pPage.style.display = "none";
}

// category data

function catGros(path, card) {
    db.ref(path).on("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            let groceries = childSnapshot.val();

            document.getElementById(card).innerHTML += `
            <div class="category-prods">
            <div onclick="openProductPage('${groceries.image}','${groceries.name}','${groceries.sellingprice}','${groceries.costprice}','${groceries.identification}','${groceries.seller}','${groceries.description}',this)">
            <img class="category-item-image"
            src="${groceries.image}" />
            <div class="category-item-name">${groceries.name}</div>
            </div>
           </div> `;
        });
    });
}

function displayfeedPage() {
    const paths = [
        "Popular/products",
        "Category/grocery",
        "TopPicks/products",
        "New/products",
        "Category/computing",
        "Category/phones",
        "Category/men",
        "Category/women",
        "Category/children",
        "Category/machinary",
        "Category/electronics",
        "Category/fashion",
        "Category/sports",
        "Category/gaming",
        "Category/home&office",
        "Category/health&beauty",
        "Category/garden&outdoors",
        "Category/music",
        "Category/books&movies",
        "Category/automobile"
    ];
    let limit = 10;
    const promises = paths.map(path =>
        db.ref(path).limitToFirst(limit).once("value")
    );

    Promise.all(promises).then(snapshots => {
        let products = [];
        snapshots.forEach(snapshot => {
            snapshot.forEach(childSnapshot => {
                products.push(childSnapshot.val());
            });
        });
        shuffleArray(products);
        displayFeedProducts(products);
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayFeedProducts(products) {
    const productsDiv = document.getElementById("feedList");
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.innerHTML = `<div class="new-arrival-product">
        <div onclick="openProductPage('${product.image}','${product.name}','${product.sellingprice}','${product.costprice}','${product.identification}','${product.seller}','${product.description}',this)">
        <img class="feed-image" src="${product.image}" height="160px"
        width="170px"/>
        <div class="new-arrival-name">${product.name}</div>
        <div class="new-arrival-sp">${product.sellingprice}</div>
        <div class="new-arrival-cp">${product.costprice}</div>
        <div class="new-arrival-seller">${product.seller}</div>
        <div class="new-arrival-id">${product.identification}</div>
        </div>
                 <button
            onclick="addCart('${product.image}','${product.name}','${product.sellingprice}','${product.seller}',this)"
            class="add-to-cart-btn">Add to Cart</button>
        </div>`; // Assuming product has a 'name' property
        document.querySelector(".loader-container").style.display = "none";
        productsDiv.appendChild(productDiv);
    });
}
// search
function openSearchPage() {
    const sbar = document.querySelector(".search-bar");
    const inputF = document.getElementById("search-product");
    sbar.classList.add("search-page");
    inputF.classList.add("search-box");
    document.querySelector(".close-search-page").style.display = "block";
}

function closeSearchpage() {
    const sbar = document.querySelector(".search-bar");
    const inputF = document.getElementById("search-product");
    sbar.classList.remove("search-page");
    inputF.classList.remove("search-box");
    document.querySelector(".close-search-page").style.display = "none";
    document.getElementById("searchResults").style.display = "none";
}

function searchProducts() {
    const searchInput = document
        .getElementById("search-product")
        .value.toLowerCase();
    if (searchInput === "") {
    } else {
        const searchResults = document.getElementById("searchResults");
        searchResults.innerHTML = "";

        const databasePaths = [
            "Popular/products",
            "Category/grocery",
            "New/products",
            "TopPicks/products"
        ];

        databasePaths.forEach(path => {
            firebase
                .database()
                .ref(path)
                .on("value", snapshot => {
                    snapshot.forEach(childSnapshot => {
                        const product = childSnapshot.val();
                        const productName = childSnapshot
                            .val()
                            .name.toLowerCase();
                        if (productName.includes(searchInput)) {
                            const li = document.createElement("div");
                            li.innerHTML = `<div class="new-arrival-product">
        <div onclick="openProductPage('${product.image}','${product.name}','${product.sellingprice}','${product.costprice}','${product.identification}','${product.seller}','${product.description}',this)">
        <img class="feed-image" src="${product.image}" height="160px"
        width="170px"/>
        <div class="new-arrival-name">${product.name}</div>
        <div class="new-arrival-sp">${product.sellingprice}</div>
        <div class="new-arrival-cp">${product.costprice}</div>
        <div class="new-arrival-seller">${product.seller}</div>
        <div class="new-arrival-id">${product.identification}</div>
        </div>
                 <button
            onclick="addCart('${product.image}','${product.name}','${product.sellingprice}','${product.seller}',this)"
            class="add-to-cart-btn">Add to Cart</button>
        </div>`;
                            searchResults.appendChild(li);
                        }
                    });
                });
        });
    }
}
function openResultPage() {
    document.getElementById("searchResults").style.display = "grid";
}
// search end
