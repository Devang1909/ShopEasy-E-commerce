let moreshopping=document.querySelector("#more-shop");
moreshopping.addEventListener("click",function(){
    window.location.href="shop.html";
})

// for add to cart icon
let storage=document.querySelector(".cart");
storage.addEventListener("click",function(){
    window.location.href="storage.html";
})

document.addEventListener("DOMContentLoaded", function () {
      
    let buttons = document.querySelectorAll(".add-cart");

    // ❗ If no buttons found → stop error
    if (buttons.length === 0) return;

    buttons.forEach((btn) => {
        btn.addEventListener("click", function () {

            let product = btn.closest(".pro");

            if (!product) return; // safety

            let name = product.querySelector("span").innerText;
            let title = product.querySelectorAll("h5")[0].innerText;
            let price = product.querySelectorAll("h5")[1].innerText;
            let image = product.querySelector("img").src;

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            let existing = cart.find(item =>
                item.title === title &&
                item.price === price &&
                item.image === image
            );

            if (existing) {
                existing.quantity++;
            } else {
                cart.push({
                    name: name,
                    title: title,
                    price: price,
                    image: image,
                    quantity: 1
                });
            }

            localStorage.setItem("cart", JSON.stringify(cart));

        });
    });

});
// buy now buutons
let buybtn = document.querySelectorAll(".buy-now");

buybtn.forEach((btn) => {
    btn.addEventListener("click", function () {

        let product = btn.closest(".pro");

        let item = {
            brand: product.querySelector("span").innerText,
            title: product.querySelectorAll("h5")[0].innerText,
            price: product.querySelectorAll("h5")[1].innerText,
            image: product.querySelector("img").src
        };

        // ✅ SAVE DATA
        localStorage.setItem("buyNowItem", JSON.stringify(item));

        // ✅ REDIRECT
        window.location.href = "payment.html";
    });
});

// search box
document.addEventListener("DOMContentLoaded", function () {

    let searchBox = document.getElementById("search-box");

    searchBox.addEventListener("keypress", function (e) {

        if (e.key === "Enter") {

            let value = searchBox.value.trim();

            if (value !== "") {
                localStorage.setItem("searchQuery", value); // save search
                window.location.href = "search.html"; // go to search page
            }
        }
    });

});

// for menubar
// MENU TOGGLE
let menuBtn = document.getElementById("menu-toggle");
let navLinks = document.getElementById("nav-links");

menuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("active");
});

