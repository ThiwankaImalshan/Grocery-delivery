let rowbodyHTML = document.querySelector('.row-body');
let listCartHTML = document.querySelector('.listCart');
let navbarCart = document.querySelector('.navbar-cart');
let navbarCartSpan = document.querySelector('.navbar-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.cartTab-close');
let products = [];
let cart = [];

    // //Adjust screen height according to device screen height
    // var s = document.createElement("style");
    // document.body.append(s);
    // window.onresize = function() {
    // s.innerHTML = ":root{--win-height:" + window.innerHeight + "px}";
    // }
    // s.innerHTML = ":root{--win-height:" + window.innerHeight + "px}";

// Show Cart
navbarCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

// Close Cart
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

    const addDataToHTML = () => {
    // remove datas default from HTML

        // add new datas
        if(products.length > 0) // if has data
        {
            products.forEach(product => {
                let newProduct = document.createElement('div');
                newProduct.dataset.id = product.id;
                newProduct.classList.add('item');
                newProduct.innerHTML = 
                `<img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addCart">Add To Cart</button>`;
                listProductHTML.appendChild(newProduct);
            });
        }
    }