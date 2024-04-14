//_________________________HOME PAGE__________________________________

//_________________Cart__________________

let rowbody = document.querySelector('.a-row-body');
let listCart = document.querySelector('.listCart');
let navbarcart = document.querySelector('.navbar-cart');
let navbarcartSpan = document.querySelector('.navbar-cart span');
// let cartBox = [];
let cartBox = JSON.parse(localStorage.getItem('cart')) || [];
//---------Add to cart product id event listener--------
rowbody.addEventListener('click',(event)=>{
    let positionClick =event.target;
    if(positionClick.classList.contains('btn-addtocart')){
        let product_id = positionClick.parentNode.parentNode.dataset.id;
        addtoCart(product_id);
    }
})


let outerProductsArray;
async function fetchData() {
    try {
        const response = await fetch('category.json');
        const data = await response.json();

        const products = [];
        data.categories.forEach(category => {
            category.subcategories.forEach(subcategory => {
                subcategory.products.forEach(product => {
                    products.push(product);
                });
            });
        });

        outerProductsArray = products;

        localStorage.setItem('outerProductsArray', JSON.stringify(outerProductsArray));

        addcarttoHTML();

        // Call a function to handle the data
        handleData();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
function handleData() {
    // Now you can safely use outerProductsArray here
    console.log("Outer Products Array:", outerProductsArray);
}
fetchData();






//----------------Add to cart function------------
const addtoCart = (product_id) => {
    let positionThisProductInCart = cartBox.findIndex((value) => value.product_id == product_id);
    if (cartBox.length <= 0) {
        cartBox = [{
            product_id: product_id,
            quantity: 1
        }];
    } else if (positionThisProductInCart < 0) {
        cartBox.push({
            product_id: product_id,
            quantity: 1
        });
    } else {
        cartBox[positionThisProductInCart].quantity = cartBox[positionThisProductInCart].quantity + 1;
    }
    console.log(cartBox);
    addcarttoHTML();
    saveCartToLocalStorage(); // Save the cart data to local storage after each modification
};





//---------------add cart to html file--------------
const addcarttoHTML=()=>{
    listCart.innerHTML='';
    let totalQuantity=0;
    if(cartBox.length>0){
        cartBox.forEach(cartss=>{
            totalQuantity=totalQuantity+cartss.quantity;
            let newCart=document.createElement('div');
            newCart.classList.add('listCart-items');
            newCart.dataset.id=cartss.product_id;
            let positionProduct=outerProductsArray.findIndex((value)=>value.id==cartss.product_id);
            let info=outerProductsArray[positionProduct];
            newCart.innerHTML=`
            <div class="listCart-image">
                <img src="${info.image}">
            </div>
            <div class="listCart-name">
            ${info.name}
            </div>
            <div class="listCart-totalPrice">Rs.${info.price*cartss.quantity}</div>
            <div class="listCart-quantity">
                <span class="listCart-minus"><</span>
                <span>${cartss.quantity}</span>
                <span class="listCart-plus">></span>
            </div>
            `;
            listCart.appendChild(newCart);
        })
    }
    navbarcartSpan.innerText=totalQuantity;
}


//-----------------capture the product position click in cart and minus or plus click----------
listCart.addEventListener('click',(event)=>{
    let positionClick=event.target;
    if(positionClick.classList.contains('listCart-minus')||positionClick.classList.contains('listCart-plus')){
        let product_id =positionClick.parentElement.parentElement.dataset.id;
        let type='listCart-minus';
        if(positionClick.classList.contains('listCart-plus')){
            type='listCart-plus';
        }
        changequantity(product_id,type);
        console.log(product_id,type);
    }
})


//--------------adjust quantity and price when plus or minus click------------
const changequantity=(product_id,type)=>{
    let positionItemInCart=cartBox.findIndex((value)=>value.product_id==product_id);
    if(positionItemInCart>=0){
        switch (type) {
            case 'listCart-plus':
                 cartBox[positionItemInCart].quantity=cartBox[positionItemInCart].quantity+1;
                break;
        
            default:
                let valueChange=cartBox[positionItemInCart].quantity-1;
                if(valueChange>0){
                    cartBox[positionItemInCart].quantity=valueChange;
                }else{
                    cartBox.splice(positionItemInCart,1);
                }
                break;
        }
    }
    saveCartToLocalStorage();
    addcarttoHTML();
}

//-----------Function to save the cart data to local storage--------
const saveCartToLocalStorage = () => {
    localStorage.setItem('cart', JSON.stringify(cartBox));
};


// // Function to retrieve cart data from local storage and render it in the HTML
// const renderCartFromLocalStorage = () => {
//     let storedCart = JSON.parse(localStorage.getItem('cart'));
//     if (storedCart) {
//         cartBox = storedCart;
//         addcarttoHTML();
//     }
// };

// // Call renderCartFromLocalStorage on page load to display the cart contents
// renderCartFromLocalStorage();


//---------------Retrieve cart data from local storage on page load----------------
window.addEventListener('load', () => {
    // Get cart data from local storage
    const cartData = JSON.parse(localStorage.getItem('cart'));
    // If cart data exists, assign it to cartBox array
    if (cartData && Array.isArray(cartData)) {
        cartBox = cartData;
    }
    // Render cart items from local storage
    renderCartItemsFromLocalStorage();
});

// Function to render the cart items from local storage
const renderCartItemsFromLocalStorage = () => {
    console.log("Rendering cart items from local storage...");
    console.log("Cart data from local storage:", cartBox);
    
    listCart.innerHTML = '';
    let totalQuantity = 0;
    if (cartBox.length > 0) {
        cartBox.forEach(cartss => {
            totalQuantity += cartss.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('listCart-items');
            newCart.dataset.id = cartss.product_id;
            let positionProduct = outerProductsArray.findIndex((value) => value.id == cartss.product_id);
            let info = outerProductsArray[positionProduct];
            newCart.innerHTML = `
                <div class="listCart-image">
                    <img src="${info.image}">
                </div>
                <div class="listCart-name">
                    ${info.name}
                </div>
                <div class="listCart-totalPrice">Rs.${info.price * cartss.quantity}</div>
                <div class="listCart-quantity">
                    <span class="listCart-minus"><</span>
                    <span>${cartss.quantity}</span>
                    <span class="listCart-plus">></span>
                </div>
            `;
            listCart.appendChild(newCart);
        });
    }
    navbarcartSpan.innerText = totalQuantity;
    console.log("Cart items rendered successfully.");
};









