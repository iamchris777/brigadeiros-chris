let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart(){
  localStorage.setItem("cart", JSON.stringify(cart));
}

function toggleCart(){
  document.getElementById("cartPanel").classList.toggle("active");
}

function addToCart(name, price){
  const existing = cart.find(item => item.name === name);

  if(existing){
    existing.qty++;
  } else {
    cart.push({name, price, qty:1});
  }

  updateCart();
}

function changeQty(name, amount){
  const item = cart.find(i => i.name === name);

  if(!item) return;

  item.qty += amount;

  if(item.qty <= 0){
    cart = cart.filter(i => i.name !== name);
  }

  updateCart();
}

function updateCart(){
  const cartItems = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");
  const countEl = document.getElementById("cart-count");

  cartItems.innerHTML = "";

  let total = 0;
  let count = 0;

  cart.forEach(item=>{
    total += item.price * item.qty;
    count += item.qty;

    cartItems.innerHTML += `
      <div class="cart-item">
        <div>
          <strong>${item.name}</strong><br>
          S/ ${item.price.toFixed(2)}
        </div>
        <div class="qty-controls">
          <button onclick="changeQty('${item.name}',-1)">-</button>
          <span>${item.qty}</span>
          <button onclick="changeQty('${item.name}',1)">+</button>
        </div>
      </div>
    `;
  });

  totalEl.textContent = total.toFixed(2);
  countEl.textContent = count;

  saveCart();
}

function sendWhatsApp(){
  if(cart.length===0){
    alert("Tu carrito está vacío.");
    return;
  }

  let message = "Hola, quiero hacer este pedido:%0A%0A";

  cart.forEach(item=>{
    message += `• ${item.name} x${item.qty} - S/ ${(item.price*item.qty).toFixed(2)}%0A`;
  });

  const total = cart.reduce((sum,item)=>sum+(item.price*item.qty),0);

  message += `%0ATotal: S/ ${total.toFixed(2)}`;
  message += `%0A%0ANota: Si elegí cajas, indicaré sabores deseados.`;

  window.open(`https://wa.me/51971693488?text=${message}`,"_blank");
}

updateCart();
