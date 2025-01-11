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
    img: "image-meringue-desktop.jpg",
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
  })
);

const incrementBtn = document.querySelectorAll(".increment__icon");
const decrementBtn = document.querySelectorAll(".decrement__icon");
const btnClickedText = document.querySelectorAll(".btn__clicked--text");

incrementBtn.forEach((btn, index) =>
  btn.addEventListener("click", function () {
    const text = btnClickedText[index]; // Parse the current text content as a number
    let textContentNumber = parseInt(text.textContent, 10) || 0;

    // Increment the number
    textContentNumber += 1;

    // Update the text content with the new value
    text.textContent = textContentNumber;
  })
);

decrementBtn.forEach((btn, index) =>
  btn.addEventListener("click", function () {
    const text = btnClickedText[index]; // Parse the current text content as a number
    let textContentNumber = parseInt(text.textContent, 10) || 0;

    // Increment the number
    textContentNumber -= 1;

    // Update the text content with the new value
    text.textContent = textContentNumber;

    if (textContentNumber < 1) {
      text.textContent = 1;
      const curBtn = productBtn[index];
      curBtn.classList.remove("none__out");
      const curActiveBtn = productBtnSelect[index];
      curActiveBtn.classList.add("none");
      curActiveBtn.classList.remove("selected");
      const curImg = itemImg[index];
      curImg.style.border = "none";
    }
  })
);
