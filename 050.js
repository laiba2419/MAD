// Shopping cart array to hold product items
let cart = [];

// 1. Add Items to the Cart
const addItemToCart = (productId, productName, quantity, price) => {
    // Check if item already exists in the cart
    const existingProduct = cart.find(item => item.productId === productId);
    if (existingProduct) {
        // Update the quantity if product already exists
        existingProduct.quantity += quantity;
    } else {
        // Push a new product object into the cart
        cart.push({ productId, productName, quantity, price });
    }
};

// 2. Remove Items from the Cart
const removeItemFromCart = (productId) => {
    // Find index of the product to remove by productId
    const productIndex = cart.findIndex(item => item.productId === productId);
    if (productIndex !== -1) {
        // Remove product using splice
        cart.splice(productIndex, 1);
    }
};

// 2. Update Item Quantity
const updateItemQuantity = (productId, newQuantity) => {
    cart = cart.map(item => 
        item.productId === productId ? { ...item, quantity: newQuantity } : item
    );
};

// 3. Calculate Total Cost
const calculateTotalCost = () => {
    // Use reduce to calculate total price based on quantity and price
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// 4. Display Cart Summary
const displayCartSummary = () => {
    // Use map to generate summary for each product
    const summary = cart.map(item => ({
        productName: item.productName,
        quantity: item.quantity,
        totalPrice: item.price * item.quantity
    }));

    console.log('Cart Summary:', summary);
    return summary;
};

// 4. Filter out Items with Zero Quantity
const filterZeroQuantityItems = () => {
    // Use filter to remove items with zero quantity
    cart = cart.filter(item => item.quantity > 0);
};

// 5. Apply Discount Code (Optional)
const applyDiscount = (discountCode) => {
    const discounts = {
        'DISCOUNT10': 0.10,  // 10% discount
        'DISCOUNT20': 0.20,  // 20% discount
    };
    
    // Check if discount code is valid
    const discount = discounts[discountCode] || 0;
    const totalCost = calculateTotalCost();
    
    // Apply discount to total cost
    return totalCost - (totalCost * discount);
};

// Test the shopping cart functionality

// Adding items to the cart
addItemToCart(1, 'Android Mobile', 5, 120000);
addItemToCart(2, 'Tablets', 4, 8000);
addItemToCart(3, 'EarPhones', 6, 1500);

// Display cart summary
displayCartSummary();

// Calculate total cost
console.log('Total Cost:', calculateTotalCost());

// Apply a discount
console.log('Total Cost after DISCOUNT10:', applyDiscount('DISCOUNT10'));

// Update quantity of an item
updateItemQuantity(2, 3);
console.log('Cart after updating quantity:');
displayCartSummary();

// Remove an item from the cart
removeItemFromCart(3);
console.log('Cart after removing Headphones:');
displayCartSummary();

// Filter out items with zero quantity (if any)
filterZeroQuantityItems();
console.log('Cart after filtering zero-quantity items:');
displayCartSummary();