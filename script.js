// Creating an array of products
const products = [
  {
    name: "Nike Air Jordan",
    image: "images/nike-shoe.jpg",
    price: 200,
    id: 1,
    quantity: 1,
  },
  {
    name: "RedBull Energy Drink",
    image: "images/red-bull.jpg",
    price: 100,
    id: 2,
    quantity: 1,
  },
  {
    name: "IPad 12",
    price: 500,
    image: "images/ipad.jpg",
    id: 3,
    quantity: 1,
  },
  {
    name: "Wears",
    price: 3000,
    image: "images/shirt.jpg",
    id: 4,
    quantity: 1,
  },
  {
    name: "Art",
    image: "images/painting.jpg",
    price: 50,
    id: 5,
    quantity: 1,
  },
  {
    name: "HP Laptop",
    price: 900,
    image: "images/hp-laptop.jpg",
    id: 6,
    quantity: 1,
  },
];

let cart = [];
// Mapping all the products 
const productsHTML = products.map(
  (product) => `<div class="product-card">
        <img src="${product.image}"/>
        <h2 class="product-name">${product.name}</h2>
        <strong>$${product.price}</strong>
        <button class="product-btn" id=${product.id}>Add to Cart</button>
    </div>`
);
const result = document.querySelector(".result");
result.innerHTML = productsHTML.join("");

// Rendering and mapping cart items
function updateCart() {
  const cartHTML = cart.map(
    (item) => `<div class="cart-item">
            <h3>${item.name}</h3>
            <div class="cart-detail">
                <img src="${item.image}"/>
                <div class="mid">
                  <button onclick={decrItem(${item.id})}>-</button>
                  <p>${item.quantity}</p>
                  <button onclick={incrItem(${item.id})}>+</button>
                </div>
                <p>$${item.price}</p>
                <button onclick={deleteItem(${item.id})} class="cart-product" id=${item.id}>D</button>
            </div>
           </div>`
  );

  const cartItems = document.querySelector(".cart-items");
  cartItems.innerHTML = cartHTML.join("");
}

// Adding Items to Cart
let num = document.querySelectorAll(".product-btn").length;
for (let i = 0; i < num; i++) {
  document
    .querySelectorAll(".product-btn")
    [i].addEventListener("click", function (e) {
      addToCart(products, parseInt(e.target.id));
    });
}
//  Creating another function to add items to cart on clicking the "Add to cart" button of a product with products and id as arguments.
function addToCart(products, id) {
  const product = products.find((product) => product.id === id);
  const cartProduct = cart.find((product) => product.id === id);

// this should increase the no of product not add a new product in the cart.
  if (cartProduct != undefined && product.id == cartProduct.id) {
    incrItem(id);
  } else {
    cart.unshift(product);
  }
  updateCart();
  getTotal(cart);
}

// Calculating Total items and Total cart value
function getTotal(cart) {
  let { totalItem, cartTotal } = cart.reduce(
    (total, cartItem) => {
      total.cartTotal += cartItem.price * cartItem.quantity;
      total.totalItem += cartItem.quantity;
      return total;
    },
    { totalItem: 0, cartTotal: 0 }
  );
  const totalItemsHTML = document.querySelector(".noOfItems");
  totalItemsHTML.innerHTML = `${totalItem} items`;
  const totalAmountHTML = document.querySelector(".total");
  totalAmountHTML.innerHTML = `$${cartTotal}`;
}

// Increasing quantity of items
function incrItem(id) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i] && cart[i].id == id) {
      cart[i].quantity += 1;
    }
  }
  updateCart();
  getTotal(cart);
}
// Decreasing quantity of items
function decrItem(id) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id == id && cart[i].quantity > 1) {
      cart[i].quantity -= 1;
    }
  }
  updateCart();
  getTotal(cart);
}

// Deleting Items from cart
function deleteItem(id) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      cart[i].quantity = 1;
      cart.splice(i, 1);
    }
  }
  updateCart();
  getTotal(cart);
}
