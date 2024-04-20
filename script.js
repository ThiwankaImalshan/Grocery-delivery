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
  loading = setTimeout(showPage, 2500);
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



//----------Add to Cart Open Close Buttons----------

// hide when click close button
document.getElementById( 'close-category-menu' ).addEventListener( 'click', function() {
    document.getElementById('category_menu_default_header').style.display = 'none';
});



// // Show Cart
// navbarCart.addEventListener('click', () => {
//     body.classList.toggle('showCart');
// })

// // Close Cart
// closeCart.addEventListener('click', () => {
//     body.classList.toggle('showCart');
// })

function toggleCart() {
    body.classList.toggle('showCart');
}

// Event listeners for opening and closing the cart
navbarCart.addEventListener('click', toggleCart);
closeCart.addEventListener('click', toggleCart);





