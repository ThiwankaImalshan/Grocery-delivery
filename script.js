let rowbodyHTML = document.querySelector('.carousel');
let listCartHTML = document.querySelector('.listCart');
let navbarCart = document.querySelector('.navbar-cart');
let navbarCartSpan = document.querySelector('.navbar-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.cartTab-close');
let products = [];
let cart = [];



//----------Page Loader---------------

var loading;
function loadingFunction() {
  loading = setTimeout(showPage, 0);
}
function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("container").style.display = "block";
}



//-----------Drop Down Menu each sub category visibility------------
    const depIds = document.querySelectorAll('[id^="dep_id_"]');
    const subDepIds = document.querySelectorAll('[id^="sub_dep_id_"]');

    depIds.forEach((dep, index) => {
        dep.addEventListener('click', function() {
            subDepIds.forEach(subDep => {
                subDep.style.display = 'none';
            });
            depIds.forEach(dep => {
                dep.classList.remove('clicked');
                dep.style.backgroundColor = ''; 
            });
            subDepIds[index].style.display = 'block';
            dep.classList.add('clicked');
            dep.style.backgroundColor = '#65A945'; 
        });
    });



//----------Product carousel--------

const carousel = document.querySelector('.carousel');
let index = 0;
const cardWidth=254;
const cardMarginRight=40;
// const cardWidth = document.querySelector('.row-card').offsetWidth;
// const cardMarginRight = parseInt(window.getComputedStyle(document.querySelector('.row-card')).marginRight);

function nextCard() {
  index++;
  carousel.style.transition = 'transform 0.5s ease';
  carousel.style.transform = `translateX(-${(cardWidth + cardMarginRight) * index}px)`;
}

function prevCard() {
  if (index > 0) {
    index--;
    carousel.style.transition = 'transform 0.5s ease';
    carousel.style.transform = `translateX(-${(cardWidth + cardMarginRight) * index}px)`;
  }
}

function autoLoop() {
  setInterval(() => {
    if (index < carousel.children.length - 5) { //no of card length
      nextCard();
    } else {
      index = 0;
    //carousel.style.transition = 'none';
      carousel.style.transition = 'transform 0.5s ease';
      carousel.style.transform = 'translateX(0)';
    }
  }, 2000); //time interva;
}
autoLoop();

function prevCard() {
if (index > 0) {
  index--;
  const translateDistance = (cardWidth + cardMarginRight) * index;
  carousel.style.transition = 'transform 0.5s ease';
  carousel.style.transform = `translateX(-${translateDistance}px)`;
}
}
//   document.querySelector('.btn-prev').addEventListener('click', prevCard);
//   document.querySelector('.btn-next').addEventListener('click', nextCard);



//----------Screen Height----------

//Adjust screen height according to device screen height
var s = document.createElement("style");
document.body.append(s);
window.onresize = function() {
s.innerHTML = ":root{--win-height:" + window.innerHeight + "px}";
}
s.innerHTML = ":root{--win-height:" + window.innerHeight + "px}";



//----------Category Drop Down Menu----------

//default category menu display none
document.getElementById("category_menu_default_header").style.display = "none"
// Display Category menu when click btn-categories.
document.getElementById( 'btn-categories' ).addEventListener( 'click', function( event ) {
    document.getElementById( 'category_menu_default_header' ).style.display = 'inline';
    event.stopPropagation();
});



//----------Add to Cart Buttons----------

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

    //add data from json file to products array
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(product => {
            products.push(product);
        });
        return products;
    })
    .catch(error => {
        console.error('Error fetching products:', error);
    });

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

    // const addDataToHTML = () =>{
    //     rowbodyHTML.innerHTML='';
    //     if(products.length>0){
    //         products.forEach(product=>{
    //             let newProduct=document.createElement('div');
    //             newProduct.classList.add('row-card');
    //             newProduct.innerHTML=`
    //             <div class="row-card-img">
    //            <img src="${product.image}" alt="Product 1">
    //        </div>
    //        <div class="row-txt" data-id="${product.id}">
    //            <h3>${product.name}</h3>
    //            <h4>Rs.${product.price}/=</h4>
    //            <button class="btn-addtocart">
    //                Add to Cart
    //            </button>
    //        </div>
    //             `;
    //             rowbodyHTML.appendChild(newProduct);
    //         })
    //     }
    // }



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
        addCartToMemory();
    }

    //save cart data in memory
    const addCartToMemory=()=>{
        localStorage.setItem('carts',JSON.stringify(cart));
    }


    //add cart to html file
    const addCartToHTML=()=>{
        listCartHTML.innerHTML='';
        let totalQuantity=0;
        if(cart.length>0){
            cart.forEach(carts=>{
                totalQuantity=totalQuantity+carts.quantity;
                let newCart=document.createElement('div');
                newCart.classList.add('listCart-items');
                newCart.dataset.id=carts.product_id;
                let positionProduct=products.findIndex((value)=>value.id==carts.product_id);
                let info=products[positionProduct];
                newCart.innerHTML=`
                <div class="listCart-image">
                    <img src="${info.image}">
                </div>
                <div class="listCart-name">
                ${info.name}
                </div>
                <div class="listCart-totalPrice">Rs.${info.price*carts.quantity}</div>
                <div class="listCart-quantity">
                    <span class="listCart-minus"><</span>
                    <span>${carts.quantity}</span>
                    <span class="listCart-plus">></span>
                </div>
                `;
                listCartHTML.appendChild(newCart);
            })
        }
        navbarCartSpan.innerText=totalQuantity;
    }

    //capture the product position click in cart and minus or plus click
    listCartHTML.addEventListener('click',(event)=>{
        let positionClick=event.target;
        if(positionClick.classList.contains('listCart-minus')||positionClick.classList.contains('listCart-plus')){
            let product_id =positionClick.parentElement.parentElement.dataset.id;
            let type='listCart-minus';
            if(positionClick.classList.contains('listCart-plus')){
                type='listCart-plus';
            }
            changeQuantity(product_id,type);
        }
    })

    //adjust quantity and price when plus or minus click
    const changeQuantity=(product_id,type)=>{
        let positionItemInCart=cart.findIndex((value)=>value.product_id==product_id);
        if(positionItemInCart>=0){
            switch (type) {
                case 'listCart-plus':
                     cart[positionItemInCart].quantity=cart[positionItemInCart].quantity+1;
                    break;
            
                default:
                    let valueChange=cart[positionItemInCart].quantity-1;
                    if(valueChange>0){
                        cart[positionItemInCart].quantity=valueChange;
                    }else{
                        cart.splice(positionItemInCart,1);
                    }
                    break;
            }
        }
        addCartToMemory();
        addCartToHTML();
    }

        
        //add data from json file to products array
        // const initApp=()=>{
        // fetch('products.json')
        // .then(response=>response.json())
        // .then(data=>{
        //     products=data;

        //     //get cart from memory
        //     if(localStorage.getItem('carts')){
        //         carts=JSON.parse(localStorage.getItem('carts'));
        //         addCartToHTML();
        //     }
        // })
        // }
        // initApp();





    