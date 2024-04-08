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

    //add products to row-body
    const findDiv=document.querySelector("#rowBody")
    function renderOneProduct(product){
        const newElement=document.createElement("div")
        newElement.className="row-card"
        newElement.dataset.id=product.id; //product id
        newElement.innerHTML=`
        <div class="row-card-img">
            <img src="${product.image}" alt="Product 1">
        </div>
        <div class="row-txt" data-id="${product.id}">
            <h3>${product.name}</h3>
            <h4>Rs.${product.price}/=</h4>
            <button class="btn-addtocart">
                Add to Cart
            </button>
        </div>
        `
        findDiv.append(newElement)
    }



    //---------Cart---------

    //---------Add to cart product id event listener--------
    rowbodyHTML.addEventListener('click',(event)=>{
        let positionClick =event.target;
        if(positionClick.classList.contains('btn-addtocart')){
            let product_id = positionClick.parentNode.dataset.id;
            addToCart(product_id);
        }
    })

    //product id add to cart
    const addToCart=(product_id)=>{
        let positionThisProductInCart=cart.findIndex((value)=>value.product_id==product_id);
        if(cart.length<=0){
            cart=[{
                product_id:product_id,
                quantity:1
            }]
        }else if(positionThisProductInCart<0){
            cart.push({
                product_id:product_id,
                quantity:1
            })
        }else{
            cart(positionThisProductInCart).quantity=cart(positionThisProductInCart).quantity+1;
        }
        addCartToHTML();
    }

    //add cart to html file
    const addCartToHTML=()=>{
        listCartHTML.innerHTML='';
        if(cart.length>0){
            cart.forEach(carts=>{
                let newCart=document.createElement('div');
                newCart.classList.add('listCart-items');
                let positionProduct=products.findIndex((value)=>value.id==carts.product_id);
                let info=products[positionProduct];
                newCart.innerHTML=`
                <div class="listCart-image">
                    <img src="product img/Almond.jpg">
                </div>
                <div class="listCart-name">
                Almond Seeds
                </div>
                <div class="listCart-totalPrice">Rs.250.00</div>
                <div class="listCart-quantity">
                    <span class="listCart-minus"><</span>
                    <span>1</span>
                    <span class="listCart-plus">></span>
                </div>
                `;
                listCartHTML.appendChild(newCart);
            })
        }
    }

    console.log(products);
    