// // Global cart array to store cart items
let cart = [];

// Add item to the cart
function addToCart(cake) {
    console.log('addToCart called with:', cake);  // For debugging

    // Add the cake to the cart array
    cart.push(cake);

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the cart display (if elements exist on the page)
    updateCart();
}

// Update the cart display on the cart page
function updateCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    const totalPriceDiv = document.getElementById('total-price');

    // Check if the cart elements are available (they may not be on all pages)
    if (!cartItemsDiv || !totalPriceDiv) {
        console.warn('Cart elements not found on this page.');
        return; // Exit if the elements are not found (e.g., not on cart.html)
    }

    // Clear the current cart items
    cartItemsDiv.innerHTML = '';

    // Calculate the total price
    let totalPrice = 0;
    cart.forEach((cake, index) => {
        // Display each cake in the cart
        cartItemsDiv.innerHTML += `
            <div>
                <h3>${cake.name}</h3>
                <p>Price: $${cake.price}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
        // Add the price to the total
        totalPrice += cake.price;
    });

    // Update the total price display
    totalPriceDiv.innerHTML = 'Total Price: $${totalPrice}';
}

// Remove item from the cart by index
function removeFromCart(index) {
    // Remove the cake from the cart array
    cart.splice(index, 1);

    // Update localStorage with the new cart
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the cart display
    updateCart();
}

// Handle checkout process
function checkout() {
    alert('Proceeding to checkout!');
}

// Load the cart from localStorage when the page loads (for cart.html)
document.addEventListener('DOMContentLoaded', function() {
    // Load the saved cart from localStorage, if it exists
    const savedCart = localStorage.getItem('cart');
    
    // If there's a saved cart, parse it and assign it to the global cart array
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }

    // Call updateCart to display the saved cart items (if applicable)
    updateCart();
});