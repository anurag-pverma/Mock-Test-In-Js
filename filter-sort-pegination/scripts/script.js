// Global Variables
let globalDataArray = [];
let wishlistData = JSON.parse(localStorage.getItem("wishlist")) || [];
globalData();

async function globalData() {
    globalDataArray = await fetch(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products?limit=55&orderBy=desc`);
    globalDataArray = await globalDataArray.json();
    globalDataArray = globalDataArray.data;
    console.log(globalDataArray);
}

//Pagination variables and functionality
let pages = 4;  //Try to get this from the api itself
let per_page = 12;
renderPagination(pages);

function renderPagination(pages, orderBy) {
    let pagination_root = document.getElementById("pagination-container");
    pagination_root.innerHTML = null;
    apiCall(1, orderBy);
    for (let page = 1; page <= pages; page++) {
        let button = document.createElement("button");
        button.setAttribute("class", "pagination-btn");
        button.innerText = page;
        button.addEventListener("click", function () {
            apiCall(page, orderBy);
        })
        pagination_root.append(button);
    }
}

// API Call
async function apiCall(page, orderBy) {
    if (orderBy != undefined) {
        data = await fetch(
            `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products?page=${page}&limit=12&orderBy=${orderBy}`
        );
    }
    else
        data = await fetch(
            `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products?page=${page}&limit=12&orderBy=desc`
        );

    data = await data.json();
    pages = data.totalPages;
    data = data.data;
    renderDOM(data)
}

// Rendering products to DOM
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

        let wishlist = document.createElement("img");
        wishlist.setAttribute("src", "https://cdn-icons-png.flaticon.com/512/3287/3287041.png");
        wishlist.setAttribute("class", "wishlist-icon");
        wishlist.addEventListener("click", function () {
            wishlistData.push(el);
            alert("Added to wishlist");
            localStorage.setItem("wishlist", JSON.stringify(wishlistData));
        })

        product_desc.append(left_container, wishlist);
        product.append(image, product_desc);
        root.append(product);
    })
}

// Filter by category functionality
let filter_category = document.getElementById('filter-category');
filter_category.addEventListener("change", filterCategory);
function filterCategory() {
    let category = filter_category.value;
    if (category == "none")
        renderPagination(pages);
    else {
        let filteredProducts = globalDataArray.filter((el) => {
            return category == el.category;
        })
        document.getElementById("pagination-container").innerHTML = null;
        renderDOM(filteredProducts);
    }
}

//Sort by price functionality
let sort_price = document.getElementById('filter-sort');
sort_price.addEventListener("change", sortByPrice);
function sortByPrice() {

    let query = sort_price.value;
    console.log(query);
    if (query == "lth") {
        renderPagination(pages, "asc")
    }
    if (query == "htl") {
        renderPagination(pages, "desc")
    }

}