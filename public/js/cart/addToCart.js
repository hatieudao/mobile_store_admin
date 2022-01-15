

function tempAlert(msg, duration) {
  var el = document.createElement("div");
  el.setAttribute("class", "alert alert-success popup");
  el.setAttribute("role", "alert");
  el.innerHTML = msg;
  setTimeout(function () {
    el.parentNode.removeChild(el);
  }, duration);
  document.body.appendChild(el);
}
function addToCart(id) {
  const cart = JSON.parse(localStorage.getItem('cart') || '{}');
  if (!cart[`${id}`]) cart[`${id}`] = 0;
  cart[`${id}`] += 1;
  localStorage.setItem('cart', JSON.stringify(cart));
  const count = document.getElementById("cart-count");
  let sum = 0;
  for (let val of Object.values(cart)) {
    sum += val;
  }
  count.innerText = sum;
  tempAlert("Add to cart successfully", 5000);
}
function loadCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart') || '{}');
  const count = document.getElementById("cart-count");
  let sum = 0;
  for (let val of Object.values(cart)) {
    sum += val;
  }
  count.innerText = sum;
}
loadCartCount();
