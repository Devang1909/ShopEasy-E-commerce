document.addEventListener("DOMContentLoaded", function () {

    let cartList = document.querySelector(".cart-items");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function displayCart() {
        cartList.innerHTML = "";

        if (cart.length === 0) {
            cartList.innerHTML = "<p>No items in cart</p>";
            return;
        }

        cart.forEach((item, index) => {

            let li = document.createElement("li");

            li.innerHTML = `
    <img src="${item.image}" width="80">
    <div>
        <p><strong>${item.name}</strong></p>
        <p>${item.price}</p>

        <div class="qty-box">
            <button class="decrease" data-index="${index}">-</button>
            <span>${item.quantity}</span>
            <button class="increase" data-index="${index}">+</button>
        </div>

        <button class="remove-btn" data-index="${index}">Remove</button>
        <button class="buy-btn" data-index="${index}">Buy Now</button>
    </div>
`;

            cartList.appendChild(li);
        });
        

        // ➕ Increase
        document.querySelectorAll(".increase").forEach(btn => {
            btn.addEventListener("click", function () {
                let index = this.dataset.index;
                cart[index].quantity++;
                localStorage.setItem("cart", JSON.stringify(cart));
                displayCart();
            });
        });

        // ➖ Decrease
        document.querySelectorAll(".decrease").forEach(btn => {
            btn.addEventListener("click", function () {
                let index = this.dataset.index;

                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                } else {
                    cart.splice(index, 1); // remove if 1
                }

                localStorage.setItem("cart", JSON.stringify(cart));
                displayCart();
            });
        });
        // 💳 Buy Now
document.querySelectorAll(".buy-btn").forEach(btn => {
    btn.addEventListener("click", function () {
        let index = this.dataset.index;

        let product = cart[index];

        // Save single product for payment
        localStorage.setItem("buyNowItem", JSON.stringify(product));

        // Redirect to payment page
        window.location.href = "payment.html";
    });
});
        // ❌ Remove
        document.querySelectorAll(".remove-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                let index = this.dataset.index;
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                displayCart();
            });
        });
    }
    

    displayCart();
});
