// Show selected method
function showMethod(type) {
    document.querySelectorAll(".method").forEach(m => m.style.display = "none");
    document.getElementById(type).style.display = "block";
}

// Load Buy Now product
let item = JSON.parse(localStorage.getItem("buyNowItem"));

if (item) {
    document.getElementById("product-info").innerHTML = `
        <h3>${item.title}</h3>
        <img src="${item.image}" width="100">
        <p>${item.price}</p>
    `;
}

// Payment action
function payNow() {
    localStorage.removeItem("buyNowItem");
    window.location.href = "index.html";
}

