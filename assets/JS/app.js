const productsCard = document.querySelector(".products-card");
const discoverProducts = document.querySelector(".discover-products");
const menu = document.querySelector(".menu");
const sideMenu = document.querySelector(".side-menu");
const basket = document.querySelector(".basket");
const bestSellersSection = document.querySelector(".best-sellers-section");
const productsSection = document.querySelector(".products-section");
const brandSection = document.querySelector(".brand-section");
const discoverSection = document.querySelector(".discover-section");
const megaDiscount = document.querySelector(".mega-discount");
const skinCareExpertise = document.querySelector(".skinCareExpertise");
const basketSection = document.querySelector(".basket-section");
const cards = document.querySelector(".cards");
const totalSum = document.querySelector(".sum");
const oldPrice = document.querySelector(".oldPrice");
const total = document.querySelector(".total");
const productNumber = document.querySelector(".product-number");
const closeIcon = document.querySelector(".close-icon");
let cartList = [];
const products = [
  {
    id: 1,
    productImage: "./assets/image/Frame 1601.png",
    brand: "Bioderma",
    title: "Sensibio Micellar water, 1 l",
    price: "14.00",
    oldPrice: "20.00",
  },
  {
    id: 2,
    productImage: "./assets/image/bioderma-Blue.png",
    brand: "Bioderma",
    title: "Sensibio Micellar water, 1 l",
    price: "14.00",
    oldPrice: "20.00",
  },
  {
    id: 3,
    productImage: "./assets/image/bioderma-yellow.jpg",
    brand: "Bioderma",
    title: "Sensibio Micellar water, 1 l",
    price: "14.00",
    oldPrice: "20.00",
  },
  {
    id: 4,
    productImage: "./assets/image/Frame 1602 .png",
    brand: "Bioderma",
    title: "Sensibio Micellar water, 1 l",
    price: "14.00",
    oldPrice: "20.00",
  },
];
const brands = [
  {
    id: 1,
    image: "./assets/image/Matricium.png",
  },
  {
    id: 2,
    image: "./assets/image/Bioderma.png",
  },
  {
    id: 3,
    image: "./assets/image/Bioderma.png",
  },
  {
    id: 4,
    image: "./assets/image/Matricium.png",
  },
];
const discoverproducts = [
  {
    id: 1,
    image: "./assets/image/image 3.png",
    steps: "1. Addım: Təmizlə",
    title: "Dəri tipinə uyğun təmizləyicilər",
  },
  {
    id: 2,
    image: "./assets/image/Frame 47656.png",
    steps: "2. Addım: Müalicə et və qulluq (nəmləndir) et",
    title: "Dəri tipinə uyğun qulluq məhsulları",
  },
  {
    id: 3,
    image: "./assets/image/image 5.png",
    steps: "3. Addım: Günəşdən qoru",
    title: "Dəri tipinə uyğun Günəş qoruyucuları",
  },
];

menu.addEventListener("click", function () {
  sideMenu.classList.add("open");
});
closeIcon.addEventListener("click", function () {
  sideMenu.classList.remove("open");
});

basket.addEventListener("click", () => {
  bestSellersSection.classList.toggle("hidden");
  productsSection.classList.toggle("hidden");
  brandSection.classList.toggle("hidden");
  discoverSection.classList.toggle("hidden");
  megaDiscount.classList.toggle("hidden");
  basketSection.classList.toggle("cart-active");
});


const addToCart = (id) => {
  const product = products.find((item) => item.id === id);
  const exsisting = cartList.find((item) => item.id === id);

  if (exsisting) {
    const updatedCart = cartList.filter((cartItem) => {
      if (cartItem.id === id) {
        return { ...cartItem, quantity: cartItem.quantity++ };
      } else {
        return cartItem;
      }
    });
    cartList = updatedCart;
  } else {
    cartList.push({ ...product, quantity: 1 });
  }
  createCartList();
  calculatePrice();
  discoverPrice();
  calcTotalSum();
  totalNumber();
};

const removeCart = (id) => {
  const updatedCartList = cartList.filter((item) => item.id !== id);
  cartList = updatedCartList;
  createCartList();
  calculatePrice();
  discoverPrice();
  calcTotalSum();
  totalNumber();
};

const calculatePrice = () => {
  const calculatedArray = cartList.map((item) => item.quantity * item.oldPrice);
  const sum = calculatedArray.reduce((acc, curr) => acc + curr, 0);
  totalSum.innerHTML = `${sum}.00 AZN`;
  return sum;
};

const discoverPrice = () => {
  const sum = calculatePrice();
  const totalSum = calcTotalSum();
  const discover = totalSum - sum;
  oldPrice.innerHTML = `${discover}.00AZN`;
};

const calcTotalSum = () => {
  const calculatedArray = cartList.map((item) => item.quantity * item.price);
  const totalSum = calculatedArray.reduce((acc, curr) => acc + curr, 0);
  total.innerHTML = `${totalSum}.00 AZN`;
  return totalSum;
};

const totalNumber = () => {
  const totalQuantity = cartList.reduce((acc, item) => acc + item.quantity, 0);
  productNumber.innerHTML = `${totalQuantity}`;
};

const changeQuantity = (id, change) => {
  const existingProduct = cartList.find((item) => item.id === id);
  if (existingProduct) {
    existingProduct.quantity += change;

    if (existingProduct.quantity <= 0) {
      removeCart(id);
    }
    createCartList();
    calculatePrice();
    discoverPrice();
    calcTotalSum();
    totalNumber();
  }
};

const createCartList = () => {
  cards.innerHTML = "";
  cartList.map((item) => {
    cards.innerHTML += `
    <div class="basket-cart">
                  <div class="basket-card-img">
                    <img
                      src="${item.productImage}"
                      alt="baset-bioderma"
                    />
                  </div>
                  <div class="basket-card-body">
                    <div class="body-top">
                      <div class="basket-info">
                        <p>${item.brand}</p>
                        <h4>${item.title}</h4>
                      </div>
                      <div class="remove" onclick="removeCart(${item.id})">
                        <img src="./assets/icons/remove.svg" alt="remove-icon" />
                      </div>
                    </div>
                    <div class="body-bottom">
                      <div class="counter">
                        <span class="inrement" onclick="changeQuantity(${item.id}, -1)">-</span>
                        <span class="count">${item.quantity} </span>
                        <span class="decrement" onclick="changeQuantity(${item.id}, 1)">+</span>
                      </div>
                      <div class="price">
                        <span class="old-price">${item.oldPrice}  AZN</span>
                        <span class="new-price">${item.price} AZN</span>
                      </div>
                    </div>
                  </div>
                </div>
    `;
  });
};

products.map((product) => {
  productsCard.innerHTML += `<div class="card">
                <img
                  src="${product.productImage}"
                  class="card-img-top"
                  alt="bioderm-products"
                />
                <div class="card-body">
                  <div class="card-info">
                    <p class="card-brand">${product.brand}</p>
                    <h5 class="card-title">${product.title}</h5>
                    <span class="card-price">${product.price} AZN</span>
                  </div>
                  <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    <span class="button-text">Səbətə at</span>
                    <img
                      src="./assets/icons/BlueBasket.svg"
                      alt="basket-icon"
                      class="cart-icon"
                    />
                  </button>
                </div>
              </div>`;
});

discoverproducts.map((item) => {
  discoverProducts.innerHTML += `<div class="card-discover">
                <img
                  src="${item.image}"
                  class="discover-image"
                  alt="bioderm-products"
                />
                <div class="card-discover-body">
                  <div class="card-info">
                    <h5 class="steps">${item.steps}</h5>
                    <p class="title">${item.title}</p>
                  </div>
                  <button class="discover-btn">Kəşf et</button>
                </div>
              </div> `;
});

let displayedCount = 2;
function displayBrands() {
  const brandShowcase = document.querySelector(".brand-showcase");
  brandShowcase.innerHTML = "";

  for (let i = 0; i < displayedCount; i++) {
    if (i < brands.length) {
      brandShowcase.innerHTML += `
                <div class="brand">
                    <img
                        src="${brands[i].image}"
                        alt="brend-${i + 1}"
                        class="brand-img"
                    />
                </div>
            `;
    }
  }
}
document.querySelector(".more-items").addEventListener("click", () => {
  displayedCount += 2;
  displayBrands();
});

displayBrands();
