let wishlistData = JSON.parse(localStorage.getItem("wishlist")) || [];
renderDOM(wishlistData);

function renderDOM(data) {
    let root = document.getElementById("product-container");
    root.innerHTML = null;
    window.location.href = "#"
    data.map((el) => {
        let product = document.createElement("div");
        product.setAttribute("class", "product");

        let image = document.createElement("img");
        image.setAttribute("src", el.image);
        image.setAttribute("class", "product-image");

        let product_desc = document.createElement("div");
        product_desc.setAttribute("class", "product-desc");

        let left_container = document.createElement("div");
        left_container.setAttribute("class", "left-container");

        let brand = document.createElement("p");
        brand.setAttribute("class", "brand");
        brand.innerText = el.brand;

        let title = document.createElement("p");
        title.setAttribute("class", "title");
        title.innerText = el.title;

        let price = document.createElement("p");
        price.setAttribute("class", "price");
        price.innerText = `₹ ${el.price} /-`;

        left_container.append(brand, title, price);

        product_desc.append(left_container);
        product.append(image, product_desc);
        root.append(product);
    })
}