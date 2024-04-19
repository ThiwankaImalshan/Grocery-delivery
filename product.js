    //------------Fetch data from category.json-------
    fetch('category.json')
    .then(response => response.json())
    .then(jsonData => {
        // Assign data to the variable
        const data = jsonData;
    



    //_________Insert products to PRODUCT page___________
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
                }
    
                html += `<div data-id="${product.id}" class="row-card p-slider-item">`;
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
                    html += `</div>`;
                }
            });
    
            html += `</div>`;
            html += `<i class="fa fa-arrow-circle-left p-prev-btn fa-2x" aria-hidden="true"></i>`;
            html += `<i class="fa fa-arrow-circle-right p-next-btn fa-2x" aria-hidden="true"></i>`;
            html += `</div>`;
            html += `</div>`;
        });
    
        // Create HTML elements from the HTML string
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
    
        // Dynamically update button color and clickability based on availability
        const productCards = tempDiv.querySelectorAll('.row-card');
        productCards.forEach(card => {
            const product = category.subcategories.find(subcat => subcat.products.find(prod => prod.name === card.querySelector('h3').textContent)).products.find(prod => prod.name === card.querySelector('h3').textContent);
            const button = card.querySelector('.btn-addtocart');
            if (product.availability === 'out of stock') {
                button.style.backgroundColor = '#DE3163';
                button.style.Color = 'white';
                button.textContent = "Out of Stock";
                button.style.pointerEvents = 'none';
                button.disabled = true;
            } else {
                button.style.backgroundColor = ''; // Use default stylesheet color
                button.disabled = false;
            }
        });
    
        return tempDiv.innerHTML;
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

    document.getElementById('fish-btn').addEventListener('click', function() {
        renderCategory('fish');
    });

    document.getElementById('rice-btn').addEventListener('click', function() {
        renderCategory('rice');
    });

    document.getElementById('beverages-btn').addEventListener('click', function() {
        renderCategory('beverages');
    });

    document.getElementById('chilled-btn').addEventListener('click', function() {
        renderCategory('chilled');
    });

    document.getElementById('grocery-btn').addEventListener('click', function() {
        renderCategory('grocery');
    });

    document.getElementById('pharmacy-btn').addEventListener('click', function() {
        renderCategory('pharmacy');
    });

    document.getElementById('bakery-btn').addEventListener('click', function() {
        renderCategory('bakery production');
    });

    document.getElementById('homeware-btn').addEventListener('click', function() {
        renderCategory('homeware');
    });



    //------------get clicking id from index.html and display each category--------
    function getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }
    
    // Retrieve clicked item ID from URL query parameter
    const clickedItemId = getQueryParam('id');
    console.log("Clicked Item ID:", clickedItemId);
    
    // Check if the clicked item ID matches a specific value
    if (clickedItemId === 'sub_dep_1_all') {
        // Perform a task if the clicked item ID matches the specific value
        console.log("Performing a task for the sub_dep_1_all...");
        renderCategory('vegetables');
    }else if(clickedItemId === 'sub_dep_2_all'){
    
        console.log("Performing a task for the sub_dep_2_all...");
        renderCategory('fruits');
    }else {
        // Perform a default task if the clicked item ID does not match the specific value
        console.log("Performing a default task...");
    }
})
.catch(error => console.error('Error fetching data:', error));




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






//______________________SEARCH PAGE_____________________________



    //-----------search products------------
    function searchProducts() {
        // Get the input text from the search box
        var searchText = document.getElementById('searchInput').value.toLowerCase();

        // Fetch the JSON data
        fetch('category.json')
        .then(response => response.json())
        .then(data => {
            var results = [];
            // Loop through categories
            data.categories.forEach(category => {
                // Loop through subcategories
                category.subcategories.forEach(subcategory => {
                    // Loop through products
                    subcategory.products.forEach(product => {
                        // Check if the product name contains the search text
                        if (product.name.toLowerCase().includes(searchText)) {
                            // Add the matching product to results
                            results.push(product);
                        }
                    });
                });
            });

            // Display search results
            displayResults(results);
        })
        .catch(error => console.error('Error fetching data:', error));
    }




    //-------------Display search result----------
    function displayResults(results) {
    var resultsContainer = document.getElementById('results');
    // Clear previous results
    resultsContainer.innerHTML = '';

    let productCounter = 0;
    var ul = document.createElement('ul');
    resultsContainer.appendChild(ul);
    // Display each result
    results.forEach(product => {
        if (productCounter % 3 === 0) {
            // Create a new row every 3 products
            var newRow = document.createElement('div');
            newRow.classList.add('search-row');
            resultsContainer.appendChild(newRow);
            var newUl = document.createElement('ul');
            newRow.appendChild(newUl);
            ul = newUl; // Update ul to the newly created ul
        }

        var rowCard = document.createElement('div');
        rowCard.classList.add('row-card');

        var rowCardImg = document.createElement('div');
        rowCardImg.classList.add('row-card-img');
        rowCard.appendChild(rowCardImg);

        var image = document.createElement('img');
        image.src = product.image;
        image.alt = product.name;
        rowCardImg.appendChild(image);

        var rowTxt = document.createElement('div');
        rowTxt.classList.add('row-txt');
        rowCard.appendChild(rowTxt);

        var name = document.createElement('h3');
        name.textContent = product.name;
        rowTxt.appendChild(name);

        var head4 = document.createElement('h4');
        head4.textContent = 'Rs.'+ product.price;
        rowTxt.appendChild(head4);

        var button = document.createElement('button');
        button.classList.add('btn-addtocart');
        button.textContent = 'Add to Cart';
        rowTxt.appendChild(button);

        ul.appendChild(rowCard);

        productCounter++;
    });

    //If no results found
    if (results.length === 0) {
        var noResultsMessage = document.createElement('p');
        noResultsMessage.textContent = 'No products found matching your search...';
        noResultsMessage.classList.add('no-result-message');
        resultsContainer.appendChild(noResultsMessage);
    }
}




//------------Products sugesstion in search bar---------
function suggestProducts() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const searchResultsContainer = document.getElementById('searchResults');
    searchResultsContainer.innerHTML = ''; // Clear previous results

    // Fetch products data from product.json
    fetch('category.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const suggestions = [];
            // Iterate through categories and subcategories
            for (const category of data.categories) {
                for (const subcategory of category.subcategories) {
                    // Iterate through products in subcategory
                    for (const product of subcategory.products) {
                        if (product.name.toLowerCase().includes(searchInput)) {
                            suggestions.push(product.name);
                        }
                    }
                }
            }
            // Display suggestions if input is not empty and there are matches
            if (searchInput !== '' && suggestions.length > 0) {
                searchResultsContainer.style.display = 'block';
                suggestions.forEach(suggestion => {
                    const li = document.createElement('li');
                    li.textContent = suggestion;
                    li.addEventListener('click', () => {
                        document.getElementById('searchInput').value = suggestion;
                        searchResultsContainer.style.display = 'none';
                        // Run searchProducts with the selected suggestion
                        searchProducts();
                    });
                    searchResultsContainer.appendChild(li);
                });
            } else {
                searchResultsContainer.style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Hide suggestions dropdown when clicking outside of it
document.body.addEventListener('click', function(event) {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    if (event.target !== searchInput && event.target !== searchResults) {
        searchResults.style.display = 'none';
    }
});












