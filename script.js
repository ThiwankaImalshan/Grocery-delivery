let rowbodyHTML = document.querySelector('.row-body-ul');
let listCartHTML = document.querySelector('.listCart');
let navbarCart = document.querySelector('.navbar-cart');
let navbarCartSpan = document.querySelector('.navbar-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.cartTab-close');
let products = [];
let cart = [];



//----------Screen Height----------

//Adjust screen height according to device screen height
var s = document.createElement("style");
document.body.append(s);
window.onresize = function() {
s.innerHTML = ":root{--win-height:" + window.innerHeight + "px}";
}
s.innerHTML = ":root{--win-height:" + window.innerHeight + "px}";



//----------Category Drop Down----------

//default category menu display none
document.getElementById("category_menu_default_header").style.display = "none"
// Display Category menu when click btn-categories.
document.getElementById( 'btn-categories' ).addEventListener( 'click', function( event ) {
    document.getElementById( 'category_menu_default_header' ).style.display = 'inline';
    event.stopPropagation();
});



//----------Cart----------

// hide when click close button
document.getElementById( 'close-category-menu' ).addEventListener( 'click', function() {
    document.getElementById('category_menu_default_header').style.display = 'none';
});

// Show Cart
navbarCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

// Close Cart
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})



//----------Products----------

//fetch data from json file
fetch('./products.json')
    .then((response) => response.json())
    .then(productsArray=>renderAllProducts(productsArray));

    function renderAllProducts (productsArray){
        productsArray.forEach(product => renderOneProduct(product));
    }

    const findDiv=document.querySelector("#rowBody")
    function renderOneProduct(product){
        const newElement=document.createElement("div")
        newElement.className="row-card"
        newElement.innerHTML=`
        <div class="row-card-img">
            <img src="${product.image}" alt="Product 1">
        </div>
        <div class="row-txt">
            <h3>${product.name}</h3>
            <h4>Rs.${product.price}/=</h4>
            <button class="btn-addtocart">
                Add to Cart
            </button>
        </div>
        `
        findDiv.append(newElement)
    }