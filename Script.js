let cart = [];

function add(name, price) {
  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({
      name: name,
      price: price,
      qty: 1
    });
  }

  updateCart();
  openCart();
}

function updateCart() {
  const items = document.getElementById("items");
  const count = document.getElementById("count");
  const total = document.getElementById("total");

  items.innerHTML = "";

  let totalItems = 0;
  let totalPrice = 0;

  cart.forEach((item, index) => {
    totalItems += item.qty;
    totalPrice += item.price * item.qty;

    const row = document.createElement("div");
    row.className = "cart-item";

    row.innerHTML = `
      <div>
        <strong>${item.name}</strong>
        <p>PKR ${(item.price * item.qty).toLocaleString()}</p>
      </div>

      <div class="quantity">
        <button onclick="changeQty(${index}, -1)">−</button>
        <span>${item.qty}</span>
        <button onclick="changeQty(${index}, 1)">+</button>
      </div>

      <button class="remove" onclick="removeItem(${index})">Remove</button>
    `;

    items.appendChild(row);
  });

  count.textContent = totalItems;
  total.textContent = `PKR ${totalPrice.toLocaleString()}`;
}

function changeQty(index, amount) {
  cart[index].qty += amount;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  updateCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

function toggleCart() {
  const cartPanel = document.getElementById("cart");
  const shade = document.getElementById("shade");

  cartPanel.classList.toggle("open");
  shade.classList.toggle("open");
}

function openCart() {
  document.getElementById("cart").classList.add("open");
  document.getElementById("shade").classList.add("open");
}

function checkout() {
  if (cart.length === 0) {
    alert("Your bag is empty!");
    return;
  }

  let order = "TEAM KAKAVAZ ORDER\n\n";
  let totalPrice = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.qty;
    totalPrice += itemTotal;

    order += `${item.name} × ${item.qty} — PKR ${itemTotal.toLocaleString()}\n`;
  });

  order += `\nTOTAL: PKR ${totalPrice.toLocaleString()}`;

  alert(order);
}

function join(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const message = document.getElementById("message");

  message.textContent = `You're on the list! We'll send updates to ${email}.`;

  document.getElementById("email").value = "";
}

updateCart();
