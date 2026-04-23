document.addEventListener("DOMContentLoaded", function () {

    console.log("JS Loaded ✅");

    let buttons = document.querySelectorAll(".add-cart");

    buttons.forEach((btn) => {
        btn.addEventListener("click", function () {

            let product = btn.closest(".pro");

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
                existing.quantity += 1;
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

// for payment
let buybtn=document.querySelectorAll(".buy-now");
buybtn.forEach((btn)=>{
    btn.addEventListener("click",function(){
        window.location.href="payment.html";
    })
})
// for search box
function saveProducts() {
    let products = document.querySelectorAll(".pro");
    let all = [];

    products.forEach(p => {
        all.push({
            brand: p.querySelector("span").innerText,
            title: p.querySelectorAll("h5")[0].innerText,   
            price: p.querySelectorAll("h5")[1].innerText,
            image: p.querySelector("img").src
        });
    });

    localStorage.setItem("allProducts", JSON.stringify(all));
}

saveProducts();

// for search
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