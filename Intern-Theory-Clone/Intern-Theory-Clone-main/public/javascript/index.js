function checkOut(user) {
  const parsedProduct = JSON.parse(user);
  //console.log(parsedProduct);
  checkProduct(parsedProduct);
}

let cart_data = JSON.parse(localStorage.getItem("avail_data")) || [];

let total = localStorage.getItem("total");
if (total == null) {
  total = 0;
}
function checkProduct(prod) {
  console.log("cart:", prod);
  let cart_data = JSON.parse(localStorage.getItem("avail_data")) || [];
  console.log("cart_data:", cart_data);

  let status = document.getElementById(prod._id);
  if (status.innerText == "ADD TO CART") {
    status.innerText = "CHECKOUT >>";
    total = Number(total) + 1;

    cart_data.push(prod);

    localStorage.setItem("avail_data", JSON.stringify(cart_data));

    localStorage.setItem("total", total);
  }
}
