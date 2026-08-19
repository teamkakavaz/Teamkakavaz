let cart = [];

function add(name, price) {
  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1
    });
  }

  updateCart();
  toggleCart();
}

function removeItem(name) {
  cart = cart.filter(item => item.name !== name);
  updateCart();
}

function changeQuantity(name, amount) {
  const item = cart.find(item => item.name === name);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    removeItem(name);
    return;
  }

  updateCart();
}

function toggleCart() {
  const cartPanel = document.getElementById("cart");
  const shade = document.getElementById("shade");

  cartPanel.classList.toggle("open");
  shade.classList.toggle("show");
}

function updateCart() {
  const items = document.getElementById("items");
  const count = document.getElementById("count");
  const total = document.getElementById("total");

  if (!items || !count || !total) return;

  items.innerHTML = "";

  let totalPrice = 0;
  let totalItems = 0;

  cart.forEach(item => {
    totalPrice += item.price * item.quantity;
    totalItems += item.quantity;

    const product = document.createElement("div");

    product.className = "cart-item";

    product.innerHTML = `
      <div>
        <strong>${item.name}</strong>
        <p>PKR ${item.price.toLocaleString()}</p>

        <div class="quantity">
          <button onclick="changeQuantity('${item.name}', -1)">−</button>
          <span>${item.quantity}</span>
          <button onclick="changeQuantity('${item.name}', 1)">+</button>
        </div>

        <button onclick="removeItem('${item.name}')">
          REMOVE
        </button>
      </div>
    `;

    items.appendChild(product);
  });

  count.textContent = totalItems;
  total.textContent = "PKR " + totalPrice.toLocaleString();

  if (cart.length === 0) {
    items.innerHTML = "<p>Your bag is empty.</p>";
  }
}

function checkout() {
  if (cart.length === 0) {
    alert("Your bag is empty!");
    return;
  }

  let order = "TEAM KAKAVAZ ORDER\n\n";

  cart.forEach(item => {
    order += `${item.name} x${item.quantity} - PKR ${(item.price * item.quantity).toLocaleString()}\n`;
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  order += `\nTotal: PKR ${total.toLocaleString()}`;

  alert(order);
}

function join(event) {
  event.preventDefault();

  const email = document.getElementById("email");
  const message = document.getElementById("message");

  if (email && message) {
    message.textContent = "You're on the list! 🔥";
    email.value = "";
  }
}

updateCart();
