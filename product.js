// fetch('category.json')
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(jsonData => {
//     // Your code to work with jsonData goes here
//     console.log(jsonData);

//     // Example: Loop through each category
//     jsonData.categories.forEach(category => {
//       console.log(`Category: ${category.name}`);
      
//       // Loop through each subcategory
//       category.subcategories.forEach(subcategory => {
//         console.log(`  Subcategory: ${subcategory.name}`);
        
//         // Loop through each product array
//         subcategory.products.forEach(product => {
//           console.log(`Product: ${product.name}, Price: ${product.price}, Description: ${product.description}`);
//         });
//       });
//     });
//   })
//   .catch(error => {
//     console.error('There was a problem with the fetch operation:', error);
//   });

//   // Sample array of products
//   const products = [
//     { name: "Fresh Apple", imgSrc: "product img/apple.jpg", inStock: true },
//     { name: "Snickers", imgSrc: "product img/snickers.jpg", inStock: true },
//     { name: "Fresh Orange juice", imgSrc: "product img/Orange juice.jpg", inStock: true }
//     // Add more products as needed
// ];

// // Function to create product HTML
// function createProductHTML(product) {
//     return `
//         <div class="row-card p-slider-item">
//             <div class="row-card-img">
//                 <img src="${product.imgSrc}" alt="${product.name}">
//             </div>
//             <div class="row-txt">
//                 <h3>${product.name}</h3>
//                 <h4>${product.inStock ? 'In Stock' : 'Out of Stock'}</h4>
//                 <button class="btn-addtocart">Add to Cart</button>
//             </div>
//         </div>
//     `;
// }

// // Function to display products
// function displayProducts(products) {
//     const productRowsContainer = document.getElementById('productRows');

//     products.forEach(product => {
//         // Create product HTML
//         const productHTML = createProductHTML(product);

//         // Append product HTML to the product row container
//         productRowsContainer.insertAdjacentHTML('beforeend', productHTML);
//     });
// }

// // Display products
// displayProducts(products);







// Fetch data from category.json
fetch('category.json')
.then(response => response.json())
.then(jsonData => {
    // Assign data to the variable
    const data = jsonData;
    




    // // Function to create HTML elements
    // function createHTML(selectedCategory) {
    //     let html = '';
    //     const category = data.categories.find(cat => cat.name === selectedCategory);

    //     category.subcategories.forEach(subcategory => {
    //         html += `<div class="row-body">`;
    //         html += `<h5>${subcategory.name}</h5>`;
    //         html += `<div class="p-slider-container">`;
    //         html += `<div class="p-slider">`;

    //         // Render products for the current subcategory
    //         html += `<div class="p-slider-row">`;
    //         html += `<ul>`;
    //         subcategory.products.forEach(product => {
    //             html += `<div class="row-card p-slider-item" style="transform: translateX(0%);">`;
    //             html += `<div class="row-card-img">`;
    //             html += `<img src="${product.image}" alt="${product.name}">`;
    //             html += `</div>`;
    //             html += `<div class="row-txt">`;
    //             html += `<h3>${product.name}</h3>`;
    //             html += `<h4>Rs.${product.price}</h4>`;
    //             html += `<button class="btn-addtocart">Add to Cart</button>`;
    //             html += `</div>`;
    //             html += `</div>`;
    //         });
    //         html += `</ul>`;
    //         html += `</div>`;

    //         html += `</div>`;
    //         html += `<i class="fa fa-arrow-circle-left p-prev-btn fa-2x" aria-hidden="true"></i>`;
    //         html += `<i class="fa fa-arrow-circle-right p-next-btn fa-2x" aria-hidden="true"></i>`;
    //         html += `</div>`;
    //         html += `</div>`;
    //     });

    //     return html;
    // }



    // Function to create HTML elements
    function createHTML(selectedCategory) {
        let html = '';
        const category = data.categories.find(cat => cat.name === selectedCategory);

        category.subcategories.forEach(subcategory => {
            html += `<div class="row-body">`;
            html += `<h5>${subcategory.name}</h5>`;
            html += `<div class="p-slider-container">`;
            html += `<div class="p-slider">`;

            let productCounter = 0;

            // Render products for the current subcategory
            subcategory.products.forEach(product => {
                if (productCounter % 3 === 0) {
                    html += `<div class="p-slider-row" style="transform: translateX(0%);">`;
                    // html += `<ul>`;
                }

                html += `<div class="row-card p-slider-item">`;
                html += `<div class="row-card-img">`;
                html += `<img src="${product.image}" alt="${product.name}">`;
                html += `</div>`;
                html += `<div class="row-txt">`;
                html += `<h3>${product.name}</h3>`;
                html += `<h4>Rs.${product.price}</h4>`;
                html += `<button class="btn-addtocart">Add to Cart</button>`;
                html += `</div>`;
                html += `</div>`;

                productCounter++;

                if (productCounter % 3 === 0 || productCounter === subcategory.products.length) {
                    // html += `</ul>`;
                    html += `</div>`;
                }
            });

            html += `</div>`;
            html += `<i class="fa fa-arrow-circle-left p-prev-btn fa-2x" aria-hidden="true"></i>`;
            html += `<i class="fa fa-arrow-circle-right p-next-btn fa-2x" aria-hidden="true"></i>`;
            html += `</div>`;
            html += `</div>`;
        });

        return html;
    }





    // Render HTML based on selected category
    function renderCategory(selectedCategory) {
        document.getElementById('catalog').innerHTML = createHTML(selectedCategory);
    }

    // Initially render vegetables category
    renderCategory('vegetables');

    // Event listeners for category selection buttons
    document.getElementById('vegitable-btn').addEventListener('click', function() {
        renderCategory('vegetables');
    });

    document.getElementById('fruit-btn').addEventListener('click', function() {
        renderCategory('fruits');
    });

    document.getElementById('meat-btn').addEventListener('click', function() {
      renderCategory('meats');
    });
})
.catch(error => console.error('Error fetching data:', error));





    // // Function to create HTML elements
    // function createHTML(selectedCategory) {
    //     let html = '';
    //     // const category = selectedCategory === 'vegetables' ? data.categories[0] : data.categories[1];
    //     const category = data.categories.find(cat => cat.name === selectedCategory);
    //     category.subcategories.forEach(subcategory => {
    //         html += `<div class="row-body">`;
    //         html += `<h5>${subcategory.name}</h5>`;
    //         html += `<div class="p-slider-container">`;
    //         html += `<div class="p-slider">`;
    //         let productCounter = 0;
    //         category.subcategories.forEach(subcategory => {
    //             html += `<div class="p-slider-row">`;
    //             html += `<ul>`;
    //             subcategory.products.forEach(product => {
    //                 if (productCounter % 3 === 0 && productCounter !== 0) {
    //                     html += `</ul>`;
    //                     html += `</div>`;
    //                     html += `<div class="p-slider-row">`;
    //                     html += `<ul>`;
    //                 }
    //                 html += `
                       
    //                         <div class="row-card p-slider-item" style="transform: translateX(0%);">
    //                             <div class="row-card-img">
    //                                 <img src="${product.image}" alt="${product.name}">
    //                             </div>
    //                             <div class="row-txt">
    //                                 <h3>${product.name}</h3>
    //                                 <h4>Rs.${product.price}</h4>
    //                                 <button class="btn-addtocart">
    //                                     Add to Cart
    //                                 </button>
    //                             </div>
    //                         </div>
                       
    //                 `;
    //                 productCounter++;
    //             });
    //             html += `</ul>`;
    //             html += `</div>`;
    //         });
    //         html += `</div>`;
    //         html += `<i class="fa fa-arrow-circle-left p-prev-btn fa-2x" aria-hidden="true"></i>`;
    //         html += `<i class="fa fa-arrow-circle-right p-next-btn fa-2x" aria-hidden="true"></i>`;
    //         html += `</div>`;
    //         html += `</div>`;
    //     });
    //     return html;
    // }



    // Function to move the slider right
function moveSliderRight() {
    const sliderContainer = document.querySelector('.p-slider-container');
    const sliderRows = document.querySelectorAll('.p-slider-row');
    const rowWidth = sliderRows[0].offsetWidth; // Assuming all rows have the same width

    // Calculate how much to translate based on the width of one row
    const translateAmount = rowWidth;

    // Apply transform to each row
    sliderRows.forEach(row => {
        const currentTransform = getComputedStyle(row).getPropertyValue('transform');
        const currentTranslateX = parseFloat(currentTransform.split(',')[4]); // Extract current translateX value
        row.style.transform = `translateX(${currentTranslateX + translateAmount}px)`;
    });
}

// Function to move the slider left
function moveSliderLeft() {
    const sliderContainer = document.querySelector('.p-slider-container');
    const sliderRows = document.querySelectorAll('.p-slider-row');
    const rowWidth = sliderRows[0].offsetWidth; // Assuming all rows have the same width

    // Calculate how much to translate based on the width of one row
    const translateAmount = rowWidth;

    // Apply transform to each row
    sliderRows.forEach(row => {
        const currentTransform = getComputedStyle(row).getPropertyValue('transform');
        const currentTranslateX = parseFloat(currentTransform.split(',')[4]); // Extract current translateX value
        row.style.transform = `translateX(${currentTranslateX - translateAmount}px)`;
    });
}
