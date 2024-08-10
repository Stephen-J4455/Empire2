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
                noteBox.style.display = "block";
                notification.innerText = "Error Signing Up! ";
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
                homePage.style.display = "block";
                formCnt.style.display = "none";
            })
            .catch(error => {
                noteBox.style.display = "block";
                notification.innerText = "Error Logging In! ";
            });
    }
    event.preventDefault();
}

function logout() {
    auth.signOut()
        .then(() => {
            document.getElementById("body-box").style.display = "none";
            formCnt.style.display = "block";
            homePage.style.display = "none";
            noteBox.style.display = "block";
            notification.innerText = "User Signed Out!";
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
        noteBox.style.display = "block";
        notification.innerText = "Enter Email To Reset Password";
    } else {
        firebase
            .auth()
            .sendPasswordResetEmail(email)
            .then(function () {
                noteBox.style.display = "block";
                notification.innerText = "Password reset email sent! ";
            })
            .catch(function (error) {
                noteBox.style.display = "block";
                notification.innerText = "Error resetting password! ";
            });
    }
    event.preventDefault();
}
function closeerror() {
    const close = document.querySelectorAll(".errorMessage");
    close.forEach(close => {
        close.style.display = "none";
    });
}

// add firebase real time database to
let db = firebase.database();

function openAccDelPage() {
    const delP = document.getElementById("confirmDel");
    if (delP.style.display === "flex") {
        delP.style.display = "none";
    } else {
        delP.style.display = "flex";
    }
}
function proceedDel() {
    const delP = document.getElementById("confirmDel");
    const delPass = document.getElementById("passDelPage");
    if (delPass.style.display === "block") {
        delPass.style.display = "none";
    } else {
        delPass.style.display = "block";
    }
}
function deleteAcc() {
    const delIn = document.getElementById("delPass").value;
    var mail = firebase.auth().currentUser.email;
    if (delIn === mail) {
        clearDatabase();
        deleteUserAccount();
    } else {
        noteBox.style.display = "block";
        notification.innerText = "Invalid Email";
    }
}
function clearDatabase() {
    let user = firebase.auth().currentUser.uid;
    db.ref(`USER/ADDRESS/${user}`).remove();
    db.ref(`USER/CART/${user}`)
        .remove()
        .then(function () {
            noteBox.style.display = "block";
            notification.innerText = "Clearing Database";
        })
        .catch(function (error) {
            noteBox.style.display = "block";
            notification.innerText = "Error removing database ";
        });
}
function deleteUserAccount() {
    var account = firebase.auth().currentUser;

    account
        .delete()
        .then(function () {
            noteBox.style.display = "block";
            notification.innerText = "Account Successfully Deleted";
            document.getElementById("body-box").style.display = "none";
            formCnt.style.display = "block";
            homePage.style.display = "none";
        })
        .catch(function (error) {
            // An error happened
            noteBox.style.display = "block";
            notification.innerText = "Error Deleting Account";
        });
}
function changeAccoutPassword() {
    const input = document.getElementById("changePass").value;
    if (input === "") {
        noteBox.style.display = "block";
        notification.innerText = "Enter Email To Reset Password ";
    } else {
        firebase
            .auth()
            .sendPasswordResetEmail(input)
            .then(function () {
                // alert("Password reset email sent!");
                noteBox.style.display = "block";
                notification.innerText = "Password reset email sent! ";
            })
            .catch(function (error) {
                //alert("Error resetting password: " + error.message);
                noteBox.style.display = "block";
                notification.innerText = "Error resetting password! ";
            });
    }
}

function topPicks() {
    db.ref("TopPicks/products").on("value", function (snapshot) {
        let topPickListHTML = "";

        snapshot.forEach(function (childSnapshot) {
            let topPick = childSnapshot.val();
            let images = [];

            // Collect all images from the product path
            for (let key in topPick) {
                if (key.startsWith("image")) {
                    images.push(topPick[key]);
                }
            }

            // Adjusted to pass all necessary parameters to openProductPage
            topPickListHTML += `
                <div onclick='openProductPage(${JSON.stringify(images)}, "${
                    topPick.name
                }", "${topPick.sellingprice}", "${topPick.costprice}", "${
                    topPick.identification
                }", "${topPick.seller}", "${topPick.productSize || ""}", "${
                    topPick.color || ""
                }", "${topPick.additionalInfo || ""}", "${
                    topPick.description || ""
                }")'
                class="top-prod">
                    <img class="top-img" src="${
                        images[0]
                    }" height="140px" width="110px"/>
                    <div class="top-picks-name">${topPick.name}</div>
                </div>
            `;
        });

        document.getElementById("topPickList").innerHTML = topPickListHTML;

        let loaders = document.querySelectorAll(".topPick-loader");
        loaders.forEach(function (loader) {
            loader.style.display = "none";
        });
    });
}

topPicks();

function popular() {
    db.ref("Popular/products").on("value", function (snapshot) {
        const popularList = document.getElementById("popularList");
        popularList.innerHTML = ""; // Clear the list before adding new elements

        snapshot.forEach(function (childSnapshot) {
            const images = [];
            const popular = childSnapshot.val();

            for (const key in popular) {
                if (key.startsWith("image")) {
                    images.push(popular[key]);
                }
            }

            const offCp = popular.costprice;
            const offSp = popular.sellingprice;
            const discount = parseInt(((offCp - offSp) / offCp) * 100);

            const productDiv = document.createElement("div");
            productDiv.className = "popular-prod";

            productDiv.innerHTML = `
                <div class="product-info">
                    <img class="popular-img" src="${images[0]}" height="150px" width="170px"/>
                    <div class="popular-name">${popular.name}</div>
                    <div class="price-box">
                        <div class="popular-price">GHC ${popular.sellingprice}</div>
                        <div class="popular-cprice">GHC ${popular.costprice}</div>
                    </div>
                    <div class="top-picks-name">Seller: ${popular.seller}</div>
                    <div class="top-picks-id">ID: ${popular.identification}</div>
                </div>
                <button class="add-to-cart-btn">Add to Cart</button>
                <div class="off-tag">-${discount}%</div>
            `;

            // Add event listener for opening product page
            productDiv
                .querySelector(".product-info")
                .addEventListener("click", function () {
                    openProductPage(
                        images,
                        popular.name,
                        popular.sellingprice,
                        popular.costprice,
                        popular.identification,
                        popular.seller,
                        popular.productSize,
                        popular.color,
                        popular.additionalInfo,
                        popular.description
                    );
                });

            // Add event listener for adding to cart
            productDiv
                .querySelector(".add-to-cart-btn")
                .addEventListener("click", function () {
                    addCart(
                        images, // Use the array of images
                        popular.name,
                        popular.sellingprice,
                        popular.seller,
                        popular.identification,
                        popular.productSize,
                        popular.color,
                        popular.additionalInfo,
                        popular.description,
                        1 // Assuming quantity to be 1 for now
                    );
                });

            popularList.appendChild(productDiv);
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
        const newList = document.querySelector(".new-products");
        newList.innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            const images = [];
            let newProduct = childSnapshot.val();
            for (const key in newProduct) {
                if (key.startsWith("image")) {
                    images.push(newProduct[key]);
                }
            }

            const newProd = document.createElement("div");
            newProd.className = "new-pd";
            newProd.innerHTML = `
                <div class="new-arrival-product">
                    <div class="new-click">
                        <img src="${newProduct.image1}" height="160px" width="170px"/>
                        <div class="new-arrival-name">${newProduct.name}</div>
                        <div class="new-arrival-sp">Ghc${newProduct.sellingprice}</div>
                        <div class="new-arrival-cp">Ghc${newProduct.costprice}</div>
                        <div class="new-arrival-seller">Seller: ${newProduct.seller}</div>
                        <div class="new-arrival-id">ID: ${newProduct.identification}</div>
                    </div>
                    <button class="add-to-cart-btn">Add to Cart</button>
                </div>`;

            newProd
                .querySelector(".new-click")
                .addEventListener("click", function () {
                    openProductPage(
                        images,
                        newProduct.name,
                        newProduct.sellingprice,
                        newProduct.costprice,
                        newProduct.identification,
                        newProduct.seller,
                        newProduct.productSize || "",
                        newProduct.color || "",
                        newProduct.additionalInfo || "",
                        newProduct.description || ""
                    );
                });

            newProd
                .querySelector(".add-to-cart-btn")
                .addEventListener("click", function () {
                    addCart(
                        images, // Use the array of images
                        newProduct.name,
                        newProduct.sellingprice,
                        newProduct.seller,
                        newProduct.identification,
                        newProduct.productSize || "",
                        newProduct.color || "",
                        newProduct.additionalInfo || "",
                        newProduct.description || "",
                        1 // Assuming quantity to be 1 for now
                    );
                });

            newList.appendChild(newProd);
        });
    });
}
newArrivals();
// cart

function addCart(
    image,
    product,
    price,
    seller,
    identification,
    productSize,
    color,
    additionalInfo,
    description,
    quantity
) {
    let user = firebase.auth().currentUser.uid;
    const cartRef = db.ref(`USER/CART/${user}/${product}`);

    cartRef.once("value").then(snapshot => {
        if (snapshot.exists()) {
            // Item already in cart, update quantity
            const currentData = snapshot.val();
            const newQuantity = (currentData.quantity || 0) + quantity;
            cartRef.update({ quantity: newQuantity });
        } else {
            // New item, set initial values
            cartRef.set({
                image1: image,
                product: product,
                price: price,
                seller: seller,
                id: identification,
                size: productSize,
                color: color,
                additionalInfo: additionalInfo,
                description: description,
                quantity: quantity
            });
        }
    });
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
            <img class="cart-img" src="${pro.image1}"/>
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
        document.getElementById("itemPrice").innerText = "Ghc" + sum.toFixed(2);
    });
}

function order() {
    let user = firebase.auth().currentUser.uid;
    var cartRef = db.ref(`USER/CART/${user}`);
    const addressRef = db.ref(`USER/ADDRESS/${user}`);
    const checkPage = db.ref(`CHECKOUT/${user}`);
    cartRef.once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            checkPage.child(childKey).update(childData);
            addressRef.once("value", function (snapshot) {
                var addressData = snapshot.val();
                checkPage.child(childKey).update(addressData);
            });
            noteBox.style.display = "block";
            notification.innerText = "Order Successful";
            closeOrderPage();
        });
    });

    db.ref(`USER/CART/${user}`).set("");
}
function closeOrderPage() {
    document.querySelector(".make-order").style.display = "none";
}

function closePPage() {
    const pPage = document.querySelector(".p-page");
    pPage.style.display = "none";
}

function openProductPage(
    images,
    product,
    sp,
    cp,
    id,
    seller,
    productSize,
    color,
    additionalInfo,
    description
) {
    const pPage = document.querySelector(".p-page");
    pPage.style.display = "flex";
    pPage.style.position = "fixed";

    const pageP = document.getElementById("prodInf");

    const percentageOff = Math.round(((cp - sp) / cp) * 100);

    const imagesHTML = images
        .map(
            img => `
        <div class="image-item">
            <img class="product-page-image" src="${img}" height="300px" width="360px" />
        </div>
    `
        )
        .join("");

    pageP.innerHTML = `
        <div class="product-page-card">
            <div class="images-container">
                ${imagesHTML}
            </div>
            <div class="product-page-name">${product}</div>
            <div class="price-card">
                <div class="product-page-sellingprice">Gh¢ ${sp}</div>
                <div class="product-page-costprice">Gh¢ ${cp}</div>
                <div class="product-page-off">${percentageOff}% off</div>
            </div>
            <div class="product-page-id">Product ID: ${id}</div>
            <div class="product-page-seller">Seller: ${seller}</div>
            <div class="product-page-cart-box">
                <button id="add-to-cart-btn" class="product-page-cart-btn">Add To Cart</button>
                <button class="product-page-call-btn"><svg viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg" height="3.5em"
                width="3em"><path fill="currentColor" d="m21.95
                40.2-2.65-2.45Q13.1 32 8.55 26.775T4 15.85q0-4.5
                3.025-7.525Q10.05 5.3 14.5 5.3q2.55 0 5.05 1.225T24
                10.55q2.2-2.8 4.55-4.025Q30.9 5.3 33.5 5.3q4.45 0 7.475 3.025Q44
                11.35 44 15.85q0 5.7-4.55 10.925Q34.9 32 28.7 37.75l-2.65
                2.45q-.85.8-2.05.8-1.2 0-2.05-.8Z"/></svg></button>
            </div>
        </div>
    `;

    const addToCartBtn = document.getElementById("add-to-cart-btn");
    addToCartBtn.addEventListener("click", () => {
        addCart(
            images,
            product,
            sp,
            seller,
            id,
            productSize,
            color,
            additionalInfo,
            description,
            1 // Assuming quantity to be 1 for now
        );
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
        const images = [];
        let i = 1;
        while (product[`image${i}`]) {
            images.push(product[`image${i}`]);
            i++;
        }
        const imagesArray = JSON.stringify(images);

        productDiv.innerHTML = `<div class="new-arrival-product">
        <div onclick='openProductPage(${imagesArray}, "${product.name}", "${
            product.sellingprice
        }", "${product.costprice}", "${product.identification}", "${
            product.seller
        }", "${product.productSize || ""}", "${product.color || ""}", "${
            product.additionalInfo || ""
        }", "${product.description || ""}")'>
            <img class="feed-image" src="${
                product.image1
            }" height="160px" width="170px"/>
            <div class="new-arrival-name">${product.name}</div>
            <div class="new-arrival-sp">${product.sellingprice}</div>
            <div class="new-arrival-cp">${product.costprice}</div>
            <div class="new-arrival-seller">${product.seller}</div>
            <div class="new-arrival-id">${product.identification}</div>
        </div>
        <button
            onclick="addCart('${product.image1}','${product.name}','${
                product.sellingprice
            }','${product.seller}','${product.identification}','${
                product.productSize || ""
            }','${product.color || ""}','${product.additionalInfo || ""}','${
                product.description || ""
            }', 1)"
            class="add-to-cart-btn">Add to Cart</button>
        </div>`;

        document.querySelector(".loader-container").style.display = "none";
        productsDiv.appendChild(productDiv);
    });
}

displayfeedPage();
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
        return; // Do nothing if the search input is empty
    }

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
                    const images = [];
                    const product = childSnapshot.val();
                    const productName = product.name.toLowerCase();
                    for (const key in product) {
                        if (key.startsWith("image")) {
                            images.push(product[key]);
                        }
                    }
                    if (productName.includes(searchInput)) {
                        const li = document.createElement("div");
                        const imagesArray = JSON.stringify(images);
                        li.innerHTML = `<div class="new-arrival-product">
                            <div class="search-click">
                                <img class="feed-image" src="${product.image1}" height="160px" width="170px"/>
                                <div class="new-arrival-name">${product.name}</div>
                                <div class="new-arrival-sp">${product.sellingprice}</div>
                                <div class="new-arrival-cp">${product.costprice}</div>
                                <div class="new-arrival-seller">${product.seller}</div>
                                <div class="new-arrival-id">${product.identification}</div>
                            </div>
                            <button class="add-to-cart-btn">Add to Cart</button>
                        </div>`;

                        li.querySelector(".search-click").addEventListener(
                            "click",
                            function () {
                                openProductPage(
                                    images,
                                    product.name,
                                    product.sellingprice,
                                    product.costprice,
                                    product.identification,
                                    product.seller,
                                    product.productSize || "",
                                    product.color || "",
                                    product.additionalInfo || "",
                                    product.description || ""
                                );
                            }
                        );

                        li.querySelector(".add-to-cart-btn").addEventListener(
                            "click",
                            function () {
                                addCart(
                                    images, // Use the array of images
                                    product.name,
                                    product.sellingprice,
                                    product.seller,
                                    product.identification,
                                    product.productSize || "",
                                    product.color || "",
                                    product.additionalInfo || "",
                                    product.description || "",
                                    1 // Assuming quantity to be 1 for now
                                );
                            }
                        );

                        searchResults.appendChild(li);
                    }
                });
            });
    });
}
function openResultPage() {
    document.getElementById("searchResults").style.display = "grid";
}
// search end
// category data

function catGros(path, card) {
    db.ref(path).on("value", function (snapshot) {
        const cardElement = document.getElementById(card);
        cardElement.innerHTML = ""; // Clear previous contents

        snapshot.forEach(function (childSnapshot) {
            const groceries = childSnapshot.val();
            const images = [];
            let i = 1;
            while (groceries[`image${i}`]) {
                images.push(groceries[`image${i}`]);
                i++;
            }

            // Escape HTML characters for security
            function escapeHtml(text) {
                const map = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#039;"
                };
                return text.replace(/[&<>"']/g, function (m) {
                    return map[m];
                });
            }

            const name = escapeHtml(groceries.name);
            const sellingPrice = escapeHtml(groceries.sellingprice);
            const costPrice = escapeHtml(groceries.costprice);
            const identification = escapeHtml(groceries.identification);
            const seller = escapeHtml(groceries.seller);
            const productSize = groceries.productSize
                ? escapeHtml(groceries.productSize)
                : "";
            const color = groceries.color ? escapeHtml(groceries.color) : "";
            const additionalInfo = groceries.additionalInfo
                ? escapeHtml(groceries.additionalInfo)
                : "";
            const description = groceries.description
                ? escapeHtml(groceries.description)
                : "";

            // Create elements and attach event listener
            const categoryProdDiv = document.createElement("div");
            categoryProdDiv.className = "category-prods";

            const productDiv = document.createElement("div");
            productDiv.addEventListener("click", () => {
                openProductPage(
                    images,
                    name,
                    sellingPrice,
                    costPrice,
                    identification,
                    seller,
                    productSize,
                    color,
                    additionalInfo,
                    description
                );
            });

            const img = document.createElement("img");
            img.className = "category-item-image";
            img.src = groceries.image1;
            productDiv.appendChild(img);

            const nameDiv = document.createElement("div");
            nameDiv.className = "category-item-name";
            nameDiv.textContent = name;
            productDiv.appendChild(nameDiv);

            categoryProdDiv.appendChild(productDiv);
            cardElement.appendChild(categoryProdDiv);
        });
    });
}
