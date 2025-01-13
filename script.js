const productList = document.querySelector(".product__list");

let productItems = [
  {
    id: Math.floor(Math.random() * Date.now()),
    img: "image-waffle-desktop.jpg",
    productName: "Waffle",
    productDesp: "Waffle with Berries",
    productPrice: "$6.50",
  },
  {
    id: Math.floor(Math.random() * Date.now()),
    img: "image-creme-brulee-desktop.jpg",
    productName: "Creme Brulee",
    productDesp: "Vanilla Bean Creme Brulee",
    productPrice: "$7.00",
  },
  {
    id: Math.floor(Math.random() * Date.now()),
    img: "image-macaron-desktop.jpg",
    productName: "Macaron",
    productDesp: "Macaron Mix of Five",
    productPrice: "$8.00",
  },
  {
    id: Math.floor(Math.random() * Date.now()),
    img: "image-tiramisu-desktop.jpg",
    productName: "Tiramisu",
    productDesp: "Classic Tiramisu",
    productPrice: "$5.50",
  },
  {
    id: Math.floor(Math.random() * Date.now()),
    img: "image-baklava-desktop.jpg",
    productName: "Baklava",
    productDesp: "Pistachio Baklava",
    productPrice: "$4.00",
  },
  {
    id: Math.floor(Math.random() * Date.now()),
    img: "image-pie-desktop.jpg",
    productName: "Pie",
    productDesp: "Lemon Meringue Pie",
    productPrice: "$5.00",
  },
  {
    id: Math.floor(Math.random() * Date.now()),
    img: "image-cake-desktop.jpg",
    productName: "Cake",
    productDesp: "Red Velvet Cake",
    productPrice: "$4.50",
  },
  {
    id: Math.floor(Math.random() * Date.now()),
    img: "image-brownie-desktop.jpg",
    productName: "Brownie",
    productDesp: "Salted Caramel Brownie",
    productPrice: "$4.50",
  },
  {
    id: Math.floor(Math.random() * Date.now()),
    img: "image-panna-cotta-desktop.jpg",
    productName: "Panna Cotta",
    productDesp: "Vanilla Panna Cotta",
    productPrice: "$6.50",
  },
];
////////
// Dynamically Create Items based on array
productItems.forEach(({ id, img, productName, productDesp, productPrice }) => {
  let itemNumber = 1;
  productList.innerHTML += `
       
        <div class="product__list--item" id="${id}">
          <img
            src="${img}"
            alt=""
            srcset=""
            class="product__item--img"
          />
          <div class="product__item--btn">
            <ion-icon
              name="cart-outline"
              class="product__item--icon"
            ></ion-icon>
            <p class="product__item--btn--text">Add to Cart</p>
          </div><div class="product__item--btn--clicked none">
            <ion-icon
              name="remove-circle-outline"
              class="decrement__icon"
            ></ion-icon>
            <p class="btn__clicked--text">${itemNumber}</p>
            <ion-icon
              name="add-circle-outline"
              class="increment__icon"
            ></ion-icon>
          </div>
          <div class="product__item--info">
            <p class="product__item--name">${productName}</p>
            <p class="product__item--desp">${productDesp}</p>
            <p class="product__item--price">${productPrice}</p>
          </div>
      `;
});
//////////////////////////
// Make active button visible when normal btn is clicked
const productBtn = document.querySelectorAll(".product__item--btn");
const productBtnSelect = document.querySelectorAll(
  ".product__item--btn--clicked"
);
const itemImg = document.querySelectorAll(".product__item--img");
productBtn.forEach((btn, index) =>
  btn.addEventListener("click", function () {
    btn.classList.add("none__out");
    const selectedBtn = productBtnSelect[index];
    const curImg = itemImg[index];
    curImg.style.border = "5px solid #e67022";
    if (selectedBtn) {
      selectedBtn.classList.add("selected");
      selectedBtn.classList.remove("none");
    }
    cartChange(btn, index);
    updateModalItems(btn, index);
    totalQuantity();
    allItemPrice();
  })
);
function cartChange(btn, index) {
  const selectedBtn = productBtnSelect[index];
  const cartList = document.querySelector(".cart__list");

  if (selectedBtn.classList.contains("selected")) {
    // Selecting specific cart item name
    const cartSpecific = btn.parentElement;
    const cartName = cartSpecific.querySelector(".product__item--name");
    // Selecting specific cart item price
    const cartPrice = cartSpecific.querySelector(".product__item--price");
    // Selecting total number text
    const cartPriceNumber = parseFloat(cartPrice.textContent.slice(1));
    const quantity = parseInt(
      selectedBtn.querySelector(".btn__clicked--text").textContent,
      10
    );
    const cartTotalPrice = (quantity * cartPriceNumber).toFixed(2);

    const cartItem = document.createElement("li");
    cartItem.innerHTML = `
      <div class="cart__item--wrapper">
        <div class="cart__item--details">
          <h3 class="cart__item--name">${cartName.textContent}</h3>
          <div class="cart__item--summary">
            <p class="cart__item--quantity">${quantity}x</p>
            <p class="cart__item--price">@${cartPrice.textContent}</p>
            <p class="cart__item--total--price">$${cartTotalPrice}</p>
          </div>
        </div>
        <div class="delete__btn--box">
          <ion-icon name="remove-circle-outline" class="delete__icon"></ion-icon>
        </div>
      </div>
    `;
    cartItem.classList.add("cart__list--item");
    cartList.appendChild(cartItem);
    addDeleteEventListeners(index);
  }
}
//////////////////////////////
// Implement increment and decrement functionality
const incrementBtn = document.querySelectorAll(".increment__icon");
const decrementBtn = document.querySelectorAll(".decrement__icon");
const btnClickedText = document.querySelectorAll(".btn__clicked--text");

incrementBtn.forEach((btn, index) =>
  btn.addEventListener("click", () => {
    incrementChange(index);
    updateCartItem(index);
    updateModalItem(index);
  })
);
function incrementChange(index) {
  const text = btnClickedText[index];
  let textContentNumber = parseInt(text.textContent, 10) || 0;

  textContentNumber += 1;

  text.textContent = textContentNumber;
}

decrementBtn.forEach((btn, index) =>
  btn.addEventListener("click", () => {
    decrementChange(index);
    updateCartItem(index);
    updateModalItem(index);
  })
);
function resetItemState(index) {
  const curBtn = productBtn[index];
  curBtn.classList.remove("none__out");
  const curActiveBtn = productBtnSelect[index];
  curActiveBtn.classList.add("none");
  curActiveBtn.classList.remove("selected");
  const curImg = itemImg[index];
  curImg.style.border = "none";
}
function decrementChange(index) {
  const text = btnClickedText[index];
  let textContentNumber = parseInt(text.textContent);

  textContentNumber -= 1;

  text.textContent = textContentNumber;

  if (textContentNumber < 1) {
    resetItemState(index);
    text.textContent = 1;
  }
  totalQuantity();
}
///////////////////////////
// Adding the quantity and total price
function updateCartItem(index) {
  const cartListItems = document.querySelectorAll(".cart__list--item");

  const selectedBtn = productBtnSelect[index];
  console.log(selectedBtn);

  const cartSpecific = productBtn[index].parentElement;
  const cartPrice = cartSpecific.querySelector(".product__item--price");
  const cartPriceNumber = parseFloat(cartPrice.textContent.slice(1));
  const quantity = parseInt(selectedBtn.textContent, 10);
  const cartTotalPrice = (quantity * cartPriceNumber).toFixed(2);

  cartListItems.forEach((item) => {
    const itemName = item.querySelector(".cart__item--name").textContent;
    const itemQuantity = item.querySelector(".cart__item--quantity");
    const itemTotalPrice = item.querySelector(".cart__item--total--price");
    if (
      itemName ===
      cartSpecific.querySelector(".product__item--name").textContent
    ) {
      if (selectedBtn.classList.contains("none")) {
        item.remove();
      } else {
        itemQuantity.textContent = `${quantity}x`;
        itemTotalPrice.textContent = `$${cartTotalPrice}`;
      }
    }
    allItemPrice();
    totalQuantity();
  });
}
// Getting order total amount
function allItemPrice() {
  const cartListItems = document.querySelectorAll(".cart__list--item");
  let totalPrice = 0;

  cartListItems.forEach((item) => {
    const itemQuantity = parseInt(
      item.querySelector(".cart__item--quantity").textContent.replace("x", "")
    );

    const itemPrice = parseFloat(
      item.querySelector(".cart__item--price").textContent.slice(2)
    );
    console.log(itemPrice);

    totalPrice += itemQuantity * itemPrice;
  });

  const totalPriceDisplay = document.querySelector(".price__all--price");
  totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
}
// Getting quantity total
function totalQuantity() {
  const cartListItems = document.querySelectorAll(".cart__list--item");
  const cartMain = document.querySelector(".cart__main");
  const noItemsBox = document.querySelector(".no__items--box");
  let totalQuantity = 0;
  cartListItems.forEach((item) => {
    const itemQuantity = parseInt(
      item.querySelector(".cart__item--quantity").textContent.replace("x", "")
    );

    totalQuantity += itemQuantity;
  });

  const totalQuantityDisplay = document.querySelector(".cart__heading");
  totalQuantityDisplay.textContent = `Your Cart (${totalQuantity})`;
  if (totalQuantity > 0) {
    cartMain.classList.remove("none");
    noItemsBox.classList.add("none");
  } else {
    cartMain.classList.add("none");
    noItemsBox.classList.remove("none");
  }
}
// Deleting for one item
const deleteButton = document.querySelector(".delete__icon");
function addDeleteEventListeners(index) {
  const deleteButtons = document.querySelectorAll(".delete__icon");

  deleteButtons.forEach((button) =>
    button.addEventListener("click", function () {
      deleteCartItem(button);
      resetItemState(index);
    })
  );
}
function deleteCartItem(deleteButton) {
  const cartItem = deleteButton.closest(".cart__list--item");

  // Get the name of the product being removed
  const cartItemName = cartItem.querySelector(".cart__item--name").textContent;

  // Find the corresponding product button
  productItems.forEach((item, index) => {
    if (item.productName === cartItemName) {
      const quantityText = btnClickedText[index];
      quantityText.textContent = 1;
    }
  });
  cartItem.remove(); // Remove the item from the cart
  allItemPrice(); // Update the total price after removal
  totalQuantity();
}
// Modal
const modalBtn = document.querySelector(".confirm__btn");
const modal = document.querySelector(".modal");
const deleteModal = document.querySelector(".modal__exit--btn");
const overlay = document.querySelector(".overlay");
overlay.addEventListener("click", function () {
  if (!modal.classList.contains("none")) {
    modal.classList.add("none");
    overlay.classList.add("none");
  }
});
modalBtn.addEventListener("click", function () {
  modal.classList.remove("none");
  overlay.classList.remove("none");
});
function addModal() {
  modal.classList.remove("none");
}
deleteModal.addEventListener("click", function () {
  modal.classList.add("none");
  overlay.classList.add("none");
});

function updateModalItems(btn, index) {
  const selectedBtn = productBtnSelect[index];
  const modalList = document.querySelector(".modal__items--list");

  // Selecting specific cart item name
  const cartSpecific = btn.parentElement;
  const cartName = cartSpecific.querySelector(".product__item--name");
  // Selecting specific cart item price
  const cartPrice = cartSpecific.querySelector(".product__item--price");
  // Selecting total number text
  const cartPriceNumber = parseFloat(cartPrice.textContent.slice(1));
  const quantity = parseInt(
    selectedBtn.querySelector(".btn__clicked--text").textContent,
    10
  );
  const cartTotalPrice = (quantity * cartPriceNumber).toFixed(2);
  const img = cartName.textContent;
  const modalItem = document.createElement("li");
  modalItem.innerHTML = `
            <img src="image-${img}-desktop.jpg" class="modal__item--img" />
            <div class="modal__item--info">
              <p class="modal__info--heading">${cartName.textContent}</p>
              <div class="modal__additional--info">
                <p class="modal__info--quantity">1x</p>
                <p class="modal__info--price">${cartPrice.textContent}</p>
              </div>
            </div>
            <div class="modal__total--price">$${cartTotalPrice}</div>
    `;
  modalItem.classList.add("modal__item");
  modalList.appendChild(modalItem);
}

function updateModalItem(index) {
  const modalList = document.querySelectorAll(
    ".modal__items--list .modal__item"
  );

  const selectedBtn = productBtnSelect[index];
  console.log(selectedBtn);

  const cartSpecific = productBtn[index].parentElement;
  const cartName = cartSpecific.querySelector(
    ".product__item--name"
  ).textContent;
  const cartPrice = cartSpecific.querySelector(".product__item--price");
  const cartPriceNumber = parseFloat(cartPrice.textContent.slice(1));
  const quantity = parseInt(
    selectedBtn.querySelector(".btn__clicked--text").textContent,
    10
  );
  const cartTotalPrice = (quantity * cartPriceNumber).toFixed(2);

  modalList.forEach((item) => {
    const modalName = item.querySelector(".modal__info--heading").textContent;
    if (modalName === cartName) {
      const modalQuantity = item.querySelector(".modal__info--quantity");
      const modalTotalPrice = item.querySelector(".modal__total--price");

      modalQuantity.textContent = `${quantity}x`;
      modalTotalPrice.textContent = `$${cartTotalPrice}`;
      if (selectedBtn.classList.contains("none")) {
        item.remove();
      }
    }
  });
  allItemPrice();
  totalQuantity();
}
