document.addEventListener("DOMContentLoaded", function () {

    let resultBox = document.getElementById("results");

    // ✅ Get search query safely
    let query = localStorage.getItem("searchQuery");

    if (!query || query.trim() === "") {
        resultBox.innerHTML = "<h3 style='text-align:center'>No search entered ❌</h3>";
        return;
    }

    query = query.toLowerCase();

    // ✅ Get products
    let products = JSON.parse(localStorage.getItem("allProducts")) || [];

    if (products.length === 0) {
        resultBox.innerHTML = "<h3 style='text-align:center'>No products available ❌</h3>";
        return;
    }

    // ✅ Filter products
    let filtered = products.filter(item =>
        item.brand.toLowerCase().includes(query) ||
        item.title.toLowerCase().includes(query)
    );

    // ❌ No result
    if (filtered.length === 0) {
        resultBox.innerHTML = "<h3 style='text-align:center'>No products found ❌</h3>";
        return;
    }

    // ✅ Show products
    filtered.forEach((item, index) => {
        resultBox.innerHTML += `
            <div class="pro">
                <img src="${item.image}">
                <div class="des">
                    <span>${item.brand}</span>
                    <h5>${item.title}</h5>
                    <h5>${item.price}</h5>

                    <div class="btn-group">
                        <button class="add-cart" data-index="${index}">Add to Cart</button>
                        <button class="buy-now" data-index="${index}">Buy Now</button>
                    </div>
                </div>
            </div>
        `;
    });

    // ================================
    // 🛒 ADD TO CART
    // ================================
    document.querySelectorAll(".add-cart").forEach(btn => {
        btn.addEventListener("click", function () {

            let index = this.dataset.index;
            let product = filtered[index];

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            let existing = cart.find(p => p.title === product.title);

            if (existing) {
                existing.quantity = (existing.quantity || 1) + 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            alert("Added to Cart 🛒");
        });
    });

    // ================================
    // 💳 BUY NOW
    // ================================
    document.querySelectorAll(".buy-now").forEach(btn => {
        btn.addEventListener("click", function () {

            let index = this.dataset.index;
            let product = filtered[index];

            localStorage.setItem("buyNowItem", JSON.stringify(product));

            window.location.href = "payment.html";
        });
    });

});