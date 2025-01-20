const cartCounter = document.querySelector('.cart-link span');
const productGrid = document.querySelector('.product-grid');
const categoryGrid = document.querySelector('.category-grid');
const newsletterForm = document.querySelector('.newsletter-form');

// State Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let products = [];
let categories = [];

// Fetch Products from API
async function fetchProducts() {
    try {
        const response = await fetch('/api/products');
        products = await response.json();
        console.log('Fetched products:', products); // Log the fetched products
        renderProducts();
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Fetch Sales Products from API
async function fetchSalesProducts() {
    try {
        const response = await fetch('/api/products/sale'); // Adjust the endpoint as necessary
        const salesProducts = await response.json();
        renderSalesProducts(salesProducts);
    } catch (error) {
        console.error('Error fetching sales products:', error);
    }
}

// Render Products
function renderProducts() {
    if (!productGrid) return;

    // Clear existing products
    productGrid.innerHTML = '';

    if (products.length === 0) {
        // Show empty product box if no products are available
        productGrid.innerHTML = `
            <div class="product-card empty">
                <p>No products available.</p>
            </div>
        `;
    } else {
        // Render products if available
        productGrid.innerHTML = products.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="price">$${product.price.toFixed(2)}</p>
                    <button onclick="addToCart(${product.id})" class="add-to-cart">
                        Add to Cart
                    </button>
                </div>
            </div>
        `).join('');
    }
}

// Render Sales Products
function renderSalesProducts(salesProducts) {
    const salesGrid = document.querySelector('.sales-products .product-grid');
    if (!salesGrid) return;

    salesGrid.innerHTML = salesProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price"><span class="discount">${product.discount}% OFF</span> AED ${product.price.toFixed(2)} <del>AED ${product.originalPrice.toFixed(2)}</del></p>
                <button onclick="addToCart(${product.id})" class="add-to-cart">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Cart Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCounter();
}

function updateCartCounter() {
    cartCounter.textContent = `Cart (${cart.length})`;
}

// Newsletter Subscription
if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        
        try {
            const response = await fetch('/api/newsletter/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            });
            
            if (response.ok) {
                alert('Successfully subscribed to newsletter!');
                newsletterForm.reset();
            }
        } catch (error) {
            console.error('Error subscribing to newsletter:', error);
            alert('Failed to subscribe. Please try again.');
        }
    });
}

// Registration Form Submission
const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = {
            username: signupForm.username.value,
            email: signupForm.email.value,
            password: signupForm.password.value
        };
        
        console.log('Registration data:', formData); // Log the registration data

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Registration successful!');
                window.location.href = 'index.html'; // Redirect to home page
                signupForm.reset();
            } else {
                const errorData = await response.json();
                alert('Registration failed: ' + errorData.message);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('Failed to register. Please try again.');
        }
    });
}

// Login Form Submission
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = {
            email: loginForm.email.value,
            password: loginForm.password.value
        };

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Login successful!');
                window.location.href = 'index.html'; // Redirect to home page
            } else {
                const errorData = await response.json();
                alert('Login failed: ' + errorData.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('Failed to login. Please try again.');
        }
    });
}

// Logout Functionality
const logoutButton = document.getElementById('logout-button');
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        // Clear user session (if applicable)
        localStorage.removeItem('user'); // Example: remove user data from local storage
        window.location.href = 'login.html'; // Redirect to login page
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    fetchSalesProducts(); // Fetch sales products on page load
    updateCartCounter();
});
