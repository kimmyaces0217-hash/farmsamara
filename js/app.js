/* Amarah Farms website interactions. Update the WhatsApp number and product prices before publishing. */
const SITE = {
  brand: "Amarah Farms",
  whatsappNumber: "254758144655", // Replace with your real WhatsApp number, digits only.
  currency: "KES",
  deliveryFee: 0,
};

const chickenProducts = [
  [
    "Whole Chicken",
    "Whole chicken, carefully prepared.",
    850,
    "whole.jpg",
    "Whole Chicken",
  ],
  [
    "Chicken Wings",
    "Great for grilling and family meals.",
    480,
    "wings.jpg",
    "Chicken Cuts",
  ],
  [
    "Chicken Thighs",
    "Tender, flavourful chicken thighs.",
    500,
    "thighs1.jpg",
    "Chicken Cuts",
  ],
  [
    "Chicken Breast",
    "Lean chicken breast portions.",
    600,
    "breast.jpg",
    "Chicken Cuts",
  ],
  [
    "Chicken Drumsticks",
    "Juicy drumsticks for any occasion.",
    480,
    "drums.jpg",
    "Chicken Cuts",
  ],
  [
    "Chicken Legs",
    "Fresh chicken leg portions.",
    520,
    "legs.jpg",
    "Chicken Cuts",
  ],
  [
    "Boneless",
    "Boneless fillet ready for your recipes.",
    650,
    "boneless1.jpg",
    "Boneless",
  ],
  [
    "Chicken Gizzards",
    "A popular choice for hearty meals.",
    350,
    "gizzard.jpg",
    "Chicken Offals",
  ],
  [
    "Chicken Liver",
    "Carefully packed chicken liver.",
    300,
    "liver.jpg",
    "Chicken Offals",
  ],
  [
    "Chicken Necks",
    "A versatile cut for soups and stews.",
    250,
    "necks.jpg",
    "Chicken Cuts",
  ],
  [
    "Chicken Back",
    "Ideal for stocks and flavourful broths.",
    280,
    "backs.jpg",
    "Chicken Cuts",
  ],
  [
    "Chicken Mince",
    "Convenient minced chicken portions.",
    550,
    "minced.jpg",
    "Ready to Cook",
  ],
  [
    "Chicken Sausages",
    "Easy-to-cook chicken sausages.",
    600,
    "sausages.jpg",
    "Ready to Cook",
  ],
  [
    "Chicken Feet",
    "Prepared chicken feet portions.",
    250,
    "feet.jpg",
    "Chicken Cuts",
  ],
  [
    "Chicken Wings (Bulk)",
    "A larger pack for sharing or catering.",
    900,
    "wingbulk.jpg",
    "Bulk Packs",
  ],
  [
    "Mixed Chicken Pack",
    "A mix of popular chicken cuts.",
    750,
    "mixed.jpg",
    "Mixed Packs",
  ],
];
const seafoodProducts = [
  [
    "Whole Tilapia",
    "Fresh whole tilapia, ready to prepare.",
    650,
    "tilapia.jpg",
    "Fresh Fish",
  ],
  [
    "Red Snapper",
    "A firm, flavourful fish selection.",
    950,
    "red.jpg",
    "Fresh Fish",
  ],
  [
    "Nile Perch Fillet",
    "Boneless fish fillet portions.",
    1100,
    "fillets.jpg",
    "Fish Fillets",
  ],
  [
    "Salmon Fillet",
    "Rich, tender salmon portions.",
    1800,
    "salmon.jpg",
    "Fish Fillets",
  ],
  [
    "Kingfish Steaks",
    "Firm steaks for grilling or pan-frying.",
    1000,
    "kingfish.jpg",
    "Fish Steaks",
  ],
  [
    "Tuna Steaks",
    "Meaty tuna steaks for a hearty meal.",
    1250,
    "tuna.jpg",
    "Fish Steaks",
  ],
  [
    "Whole Mackerel",
    "Full-flavoured whole mackerel.",
    700,
    "mackerel.jpg",
    "Fresh Fish",
  ],
  [
    "Fresh Sardines",
    "Small fish for quick, tasty meals.",
    550,
    "sardine.jpg",
    "Fresh Fish",
  ],
  [
    "Prawns",
    "Succulent prawns for your favourite dishes.",
    1400,
    "prawns.jpg",
    "Prawns & Shellfish",
  ],
  [
    "Tiger Prawns",
    "Large prawns for a special meal.",
    1900,
    "tiger-prawns.jpg",
    "Prawns & Shellfish",
  ],
  [
    "Calamari Rings",
    "Tender calamari rings, easy to cook.",
    1200,
    "calamari.jfif",
    "Calamari",
  ],
  [
    "Whole Squid",
    "Versatile squid for seafood recipes.",
    1300,
    "squid.jpg",
    "Calamari",
  ],
  [
    "Octopus",
    "A seafood favourite for adventurous menus.",
    1600,
    "octopus.jpg",
    "Seafood Specials",
  ],
  [
    "Crab",
    "Crab portions for seafood lovers.",
    1500,
    "crabss.jpg",
    "Seafood Specials",
  ],
  [
    "Mixed Seafood Pack",
    "A convenient mix of seafood favourites.",
    1350,
    "mixedsea.jpg",
    "Mixed Packs",
  ],
  [
    "Fish Fillet Pack",
    "A family-friendly pack of fish fillets.",
    1000,
    "mixedfillet.jpg",
    "Bulk Packs",
  ],
];

const money = (n) => `${SITE.currency} ${Number(n).toLocaleString("en-KE")}`;
const imagePath = (file) => `img/${file}`;
const getCart = () => {
  try {
    return JSON.parse(localStorage.getItem("amarahCart") || "{}");
  } catch {
    return {};
  }
};
const saveCart = (cart) => {
  localStorage.setItem("amarahCart", JSON.stringify(cart));
  updateCartUI();
};
const allProducts = () => [...chickenProducts, ...seafoodProducts];
function productById(id) {
  return allProducts().find((p) => slug(p[0]) === id);
}
function slug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
function cartCount() {
  return Object.values(getCart()).reduce((sum, item) => sum + item.qty, 0);
}
function cartTotal() {
  return Object.values(getCart()).reduce(
    (sum, item) => sum + item.qty * item.price,
    0,
  );
}

function renderHeader() {
  const page = document.body.dataset.page || "home";
  const links = [
    ["Home", "index.html", "home"],
    ["About Us", "about.html", "about"],
    ["Products", "products.html", "products"],
    ["Areas We Serve", "areas.html#areas", "areas"],
    ["Gallery", "gallery.html", "gallery"],
    ["Our Customers", "reviews.html#customers", "customers"],
    ["Contact", "contact.html", "contact"],
  ];
  document.getElementById("site-header").innerHTML = `
 <header class="site-header"><div class="container header-inner">
 <a class="brand" href="index.html"><img src="img/logo.png" alt="Amarah Farms logo"><span class="brand-copy"><strong>Amarah Farms</strong><small>Chicken and Sea Food</small></span></a>
 <nav class="main-nav" id="main-nav">${links.map(([label, url, key]) => `<a class="${page === key ? "active" : ""}" href="${url}">${label}</a>`).join("")}</nav>
 <div class="header-actions"><a class="nav-shop" href="products.html">Shop our products ↗</a><button class="cart-trigger" id="cart-trigger" aria-label="Open shopping cart"><img src="img/cart.png" alt=""><span class="cart-label">Cart</span><span class="cart-count" id="header-cart-count">0</span></button></div>
 <button class="menu-toggle" id="menu-toggle" aria-label="Toggle navigation" aria-expanded="false">☰</button>
 </div></header>
 <div class="modal-backdrop" id="cart-backdrop" role="dialog" aria-modal="true" aria-labelledby="cart-title"><section class="cart-modal"><div class="modal-head"><h2 id="cart-title">Your shopping cart</h2><button class="modal-close" id="cart-close" aria-label="Close cart">×</button></div><div class="cart-items" id="cart-items"></div><div class="cart-summary"><div class="summary-line"><span>Items subtotal</span><strong id="cart-subtotal">KES 0</strong></div><div class="summary-line"><span>Delivery</span><strong>Confirmed on order</strong></div><div class="summary-line total"><span>Total</span><strong id="cart-total">KES 0</strong></div><div class="cart-actions"><button class="btn btn-clear" id="clear-cart">Clear cart</button><button class="btn btn-red" id="checkout-cart">Send Order ↗</button></div><p class="checkout-note">Delivery fee and availability can be confirmed with our team before payment.</p></div></section></div><div class="toast" id="toast" role="status"></div>`;
  document.getElementById("site-footer").innerHTML = `
 <footer class="site-footer"><div class="container"><div class="footer-main"><div class="footer-about"><a class="footer-brand" href="index.html"><img src="img/logo.png" alt=""><span><strong>Amarah Farms</strong><small>Chicken and Sea Food</small></span></a><p>Fresh chicken and seafood, selected and handled with care. Good food. Good life.</p><div class="social-links"><a href="#" aria-label="Instagram">ig</a><a href="#" aria-label="Facebook">f</a><a href="#" aria-label="TikTok">♪</a></div></div><div class="footer-col"><h3>Quick links</h3><a href="index.html">Home</a><a href="about.html">About us</a><a href="products.html">Products</a><a href="gallery.html">Gallery</a><a href="contact.html">Contact</a></div><div class="footer-col"><h3>Our products</h3><a href="products.html#chicken">Chicken products</a><a href="products.html#seafood">Seafood products</a><a href="products.html">Bulk orders</a><a href="contact.html">Delivery enquiries</a></div><div class="footer-col"><h3>Contact us</h3><p>☎ +254 700 000 000</p><p>✉ info@amarahfarms.co.ke</p><p>⌖ Nairobi, Kenya</p><a href="products.html" style="color:#ffd62e">Shop our products ↗</a></div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Amarah Farms. All rights reserved.</span><span>Fresh · Quality · Halal</span></div></div></footer>`;
}
function renderProductGrid(products, targetId) {
  const target = document.getElementById(targetId);
  if (!target) return;
  target.innerHTML = products
    .map((p) => {
      const id = slug(p[0]);
      return `<article class="product-card" data-product="${id}"><img src="${imagePath(p[3])}" alt="${p[0]}" loading="lazy" onerror="this.onerror=null;this.src='img/product-placeholder.jpg'"><div class="product-card-body"><span class="product-tag">${p[4]}</span><h3>${p[0]}</h3><p>${p[1]}</p><div class="product-bottom"><div class="price-line"><span class="price" data-price>${money(p[2])}</span><span class="unit">/ kg or pack</span></div><div class="quantity-control"><button class="qty-btn" data-step="-1" data-id="${id}" aria-label="Decrease ${p[0]} quantity">−</button><span class="qty-number" id="qty-${id}">0</span><button class="qty-btn" data-step="1" data-id="${id}" aria-label="Increase ${p[0]} quantity">+</button></div><button class="add-btn" data-add="${id}">Add to cart</button></div></div></article>`;
    })
    .join("");
}
function updateProductQuantities() {
  const cart = getCart();
  document.querySelectorAll("[id^='qty-']").forEach((el) => {
    const id = el.id.slice(4);
    el.textContent = cart[id]?.qty || 0;
  });
  document.querySelectorAll("[data-add]").forEach((btn) => {
    const item = cart[btn.dataset.add];
    btn.textContent = item ? `In cart · ${item.qty}` : "Add to cart";
    btn.classList.toggle("added", !!item);
  });
}
function changeQuantity(id, step, addToCart = false) {
  const p = productById(id);
  if (!p) return;
  const cart = getCart();
  const current = cart[id]?.qty || 0;
  const next = Math.max(0, current + step);
  if (next === 0) delete cart[id];
  else
    cart[id] = {
      id,
      name: p[0],
      price: p[2],
      image: p[3],
      qty: next,
      category: p[4],
    };
  saveCart(cart);
  updateProductQuantities();
  renderCartItems();
  if (addToCart) showToast(`${p[0]} added to your cart`);
}
function updateCartUI() {
  const count = document.getElementById("header-cart-count");
  if (count) count.textContent = cartCount();
  updateProductQuantities();
  renderCartItems();
}
function renderCartItems() {
  const host = document.getElementById("cart-items");
  if (!host) return;
  const cart = getCart();
  const entries = Object.values(cart);
  host.innerHTML = entries.length
    ? entries
        .map(
          (item) =>
            `<div class="cart-item"><img src="${imagePath(item.image)}" alt="" onerror="this.onerror=null;this.src='img/product-placeholder.jpg'"><div><h3>${item.name}</h3><small>${money(item.price)} each</small><div class="cart-item-controls"><button data-cart-step="-1" data-id="${item.id}" aria-label="Decrease quantity">−</button><strong>${item.qty}</strong><button data-cart-step="1" data-id="${item.id}" aria-label="Increase quantity">+</button><button class="remove-item" data-remove="${item.id}">Remove</button></div></div><div class="cart-item-price">${money(item.price * item.qty)}</div></div>`,
        )
        .join("")
    : `<div class="cart-empty"><img src="img/logo.png" alt=""><strong>Your cart is empty</strong><p>Add some chicken or seafood to get started.</p><a class="text-link" href="products.html">Browse products ↗</a></div>`;
  const sub = document.getElementById("cart-subtotal"),
    total = document.getElementById("cart-total");
  if (sub) sub.textContent = money(cartTotal());
  if (total) total.textContent = money(cartTotal());
}
function openCart() {
  document.getElementById("cart-backdrop")?.classList.add("open");
  document.body.style.overflow = "hidden";
  renderCartItems();
}
function closeCart() {
  document.getElementById("cart-backdrop")?.classList.remove("open");
  document.body.style.overflow = "";
}
let toastTimer;
function showToast(message) {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
}
function whatsapp(message) {
  const url = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
function checkoutCart() {
  const cart = Object.values(getCart());
  if (!cart.length) {
    showToast("Your cart is empty");
    return;
  }
  const lines = cart.map(
    (i) =>
      `• ${i.name} — ${i.qty} × ${money(i.price)} = ${money(i.qty * i.price)}`,
  );
  whatsapp(
    `Hello Amarah Farms! I would like to place an order:\n\n${lines.join("\n")}\n\nSubtotal: ${money(cartTotal())}\nPlease confirm availability and delivery fee.`,
  );
}
function setupInteractions() {
  document.addEventListener("click", (event) => {
  const cartButton = event.target.closest(
    "#cart-trigger, [data-cart-open]"
  );

  if (cartButton) {
    event.preventDefault();
    openCart();
  }
});
  document.getElementById("cart-close")?.addEventListener("click", closeCart);
  document.getElementById("cart-backdrop")?.addEventListener("click", (e) => {
    if (e.target.id === "cart-backdrop") closeCart();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeCart();
  });
  document.getElementById("clear-cart")?.addEventListener("click", () => {
    saveCart({});
    renderCartItems();
    showToast("Cart cleared");
  });
  document
    .getElementById("checkout-cart")
    ?.addEventListener("click", checkoutCart);
  document.getElementById("menu-toggle")?.addEventListener("click", () => {
    const nav = document.getElementById("main-nav");
    const open = nav.classList.toggle("open");
    document
      .getElementById("menu-toggle")
      .setAttribute("aria-expanded", String(open));
    document.getElementById("menu-toggle").textContent = open ? "×" : "☰";
  });
  document.addEventListener("click", (e) => {
    const step = e.target.closest("[data-step]");
    if (step) {
      changeQuantity(step.dataset.id, Number(step.dataset.step));
      return;
    }
    const add = e.target.closest("[data-add]");
    if (add) {
      const id = add.dataset.add;
      const cart = getCart();
      const p = productById(id);
      if (p) {
        cart[id] = {
          id,
          name: p[0],
          price: p[2],
          image: p[3],
          qty: (cart[id]?.qty || 0) + 1,
          category: p[4],
        };
        saveCart(cart);
        updateProductQuantities();
        renderCartItems();
        showToast(`${p[0]} added to your cart`);
      }
      return;
    }
    const cartStep = e.target.closest("[data-cart-step]");
    if (cartStep) {
      changeQuantity(cartStep.dataset.id, Number(cartStep.dataset.cartStep));
      return;
    }
    const remove = e.target.closest("[data-remove]");
    if (remove) {
      const cart = getCart();
      delete cart[remove.dataset.remove];
      saveCart(cart);
      renderCartItems();
    }
  });
  document
    .getElementById("quick-order-form")
    ?.addEventListener("submit", (e) => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(e.target));
      whatsapp(
        `Hello Amarah Farms! Quick order enquiry\nName: ${d.name}\nPhone: ${d.phone}\nEmail: ${d.email || "Not provided"}\nDelivery location: ${d.location}\nOrder details: ${d.details || "Please contact me to discuss."}`,
      );
    });
  document.getElementById("contact-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.target));
    whatsapp(
      `Hello Amarah Farms!\nName: ${d.name}\nPhone: ${d.phone}\nEmail: ${d.email || "Not provided"}\nTopic: ${d.topic}\nMessage: ${d.message}`,
    );
  });
  document.querySelectorAll(".filter-btn").forEach((btn) =>
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.toggle("active", b === btn));
      document
        .querySelectorAll(".gallery-grid figure")
        .forEach(
          (card) =>
            (card.hidden =
              btn.dataset.filter !== "all" &&
              card.dataset.category !== btn.dataset.filter),
        );
    }),
  );
}
function setupHero() {
  const slides = [...document.querySelectorAll(".hero-slide")];
  const dots = document.querySelector(".hero-dots");
  if (!slides.length || !dots) return;
  dots.innerHTML = slides
    .map(
      (_, i) =>
        `<button class="hero-dot ${i === 0 ? "active" : ""}" aria-label="Show hero image ${i + 1}" data-slide="${i}"></button>`,
    )
    .join("");
  let current = 0;
  const show = (i) => {
    slides[current].classList.remove("active");
    dots.children[current]?.classList.remove("active");
    current = i;
    slides[current].classList.add("active");
    dots.children[current]?.classList.add("active");
  };
  dots.addEventListener("click", (e) => {
    const b = e.target.closest("[data-slide]");
    if (b) {
      show(Number(b.dataset.slide));
      reset();
    }
  });
  let timer = setInterval(() => show((current + 1) % slides.length), 4000);
  function reset() {
    clearInterval(timer);
    timer = setInterval(() => show((current + 1) % slides.length), 4000);
  }
}
renderHeader();
if (document.getElementById("chicken-grid")) {
  renderProductGrid(chickenProducts, "chicken-grid");
  renderProductGrid(seafoodProducts, "seafood-grid");
}
setupInteractions();
updateCartUI();
setupHero();
/*Reviews

/* AMARAH FARMS — REVIEWS PAGE */

document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation
  const menuToggle = document.getElementById("reviewMenuToggle");
  const navigation = document.getElementById("reviewNavigation");

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation",
      );

      menuToggle.textContent = isOpen ? "×" : "☰";
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.textContent = "☰";
      });
    });
  }

  // Review category filters
  const filterButtons = document.querySelectorAll(".review-filter");
  const reviewCards = document.querySelectorAll(".customer-review-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedCategory = button.dataset.filter;

      filterButtons.forEach((item) => {
        item.classList.toggle("active", item === button);
      });

      reviewCards.forEach((card) => {
        const matches =
          selectedCategory === "all" ||
          card.dataset.category === selectedCategory;

        card.hidden = !matches;
      });
    });
  });

  // Automatically update the footer year
  const copyrightYear = document.getElementById("reviewCopyrightYear");

  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }

  // Set your actual business establishment year here.
  // Example: const establishedYear = 2020;
  const establishedYear = null;

  const yearsElement = document.querySelector('[data-stat="years"]');

  if (yearsElement && Number.isInteger(establishedYear)) {
    const currentYear = new Date().getFullYear();

    if (establishedYear > 1900 && establishedYear <= currentYear) {
      const years = currentYear - establishedYear;

      yearsElement.textContent =
        years === 0 ? "Since " + establishedYear : years + "+";

      const description = yearsElement
        .closest(".experience-card")
        ?.querySelector("p");

      if (description) {
        description.textContent =
          "Serving customers since " + establishedYear + ".";
      }
    }
  }

  // Connect this page's cart button to your existing cart popup.
  // Update the selector below if your current cart uses a different ID/class.
  const reviewCartButton = document.querySelector("[data-cart-open]");

  if (reviewCartButton) {
    reviewCartButton.addEventListener("click", () => {
      const existingCartTrigger = document.querySelector(
        "#cartToggle, #cartBtn, .cartbar, .cart-button, [data-cart-trigger]",
      );

      if (existingCartTrigger && existingCartTrigger !== reviewCartButton) {
        existingCartTrigger.click();
      } else {
        // Fallback: take the customer to the products page.
        window.location.href = "products.html";
      }
    });
  }
});
/***********
/****** */

/* AMARAH FARMS — AREAS WE SERVE */

/*
  IMPORTANT:
  Replace this with your official WhatsApp number.
  Use digits only, including the country code.
  Example format: 2547XXXXXXXX
*/
const AREAS_WHATSAPP_NUMBER = "";


document.addEventListener("DOMContentLoaded", () => {

  // Mobile navigation
  const menuToggle = document.getElementById("areasMenuToggle");
  const navigation = document.getElementById("areasNavigation");

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );

      menuToggle.textContent = isOpen ? "×" : "☰";
    });

    navigation.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navigation.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.textContent = "☰";
      });
    });
  }


  // Copyright year
  const yearElement = document.getElementById("areasCopyrightYear");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  // Delivery enquiry form
  const enquiryForm = document.getElementById("areasContactForm");

  if (enquiryForm) {
    enquiryForm.addEventListener("submit", event => {
      event.preventDefault();

      if (!enquiryForm.reportValidity()) {
        return;
      }

      if (!AREAS_WHATSAPP_NUMBER.trim()) {
        alert(
          "Please add your official Amarah Farms WhatsApp number " +
          "in js/areas.js before using the enquiry form."
        );
        return;
      }

      const formData = new FormData(enquiryForm);

      const name = String(formData.get("name") || "").trim();
      const phone = String(formData.get("phone") || "").trim();
      const location = String(formData.get("location") || "").trim();
      const orderType = String(formData.get("orderType") || "").trim();
      const address = String(formData.get("address") || "").trim();
      const message = String(formData.get("message") || "").trim();

      const whatsappMessage = [
        "Hello Amarah Farms!",
        "",
        "I would like to enquire about delivery.",
        "",
        "Name: " + name,
        "Phone: " + phone,
        "Area: " + location,
        "Order type: " + orderType,
        "Delivery address: " + (address || "Not provided"),
        "Enquiry: " + (message || "Please advise on availability."),
        "",
        "Kindly confirm delivery availability, fees and timing."
      ].join("\n");

      const whatsappUrl =
        "https://wa.me/" +
        AREAS_WHATSAPP_NUMBER.replace(/\D/g, "") +
        "?text=" +
        encodeURIComponent(whatsappMessage);

      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    });
  }


  // Cart integration
  // If your existing app.js already handles data-cart-open,
  // let that script manage the cart popup.
  // Otherwise, connect this button to your existing cart trigger.
  const cartButton = document.querySelector(".areas-cart-button");

  if (cartButton) {
    cartButton.addEventListener("click", () => {
      const existingTrigger = document.querySelector(
        "#cartToggle, #cartBtn, [data-cart-trigger]"
      );

      if (existingTrigger && existingTrigger !== cartButton) {
        existingTrigger.click();
      } else if (
        !document.querySelector("[data-cart-open]")
      ) {
        window.location.href = "products.html";
      }
    });
  }

});

/* =========================================
   LEADERSHIP READ MORE INTERACTION
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".leader-card");
  const mobileQuery = window.matchMedia("(max-width: 600px)");

  function closeCard(card) {
    card.classList.remove("is-expanded");

    const button = card.querySelector(".leader-read-more");

    if (button) {
      button.textContent = "Read More";
      button.setAttribute("aria-expanded", "false");
    }
  }

  function closeAllCards() {
    cards.forEach(closeCard);
  }

  cards.forEach((card) => {
    const button = card.querySelector(".leader-read-more");

    if (!button) return;

    button.addEventListener("click", (event) => {
      event.stopPropagation();

      if (!mobileQuery.matches) return;

      const shouldOpen = !card.classList.contains("is-expanded");

      closeAllCards();

      if (shouldOpen) {
        card.classList.add("is-expanded");
        button.textContent = "Read Less";
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Close when tapping outside the expanded card
  document.addEventListener("click", (event) => {
    if (!mobileQuery.matches) return;

    cards.forEach((card) => {
      if (
        card.classList.contains("is-expanded") &&
        !card.contains(event.target)
      ) {
        closeCard(card);
      }
    });
  });

  // Close when the card leaves the visible screen
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            !entry.isIntersecting &&
            entry.target.classList.contains("is-expanded")
          ) {
            closeCard(entry.target);
          }
        });
      },
      { threshold: 0 }
    );

    cards.forEach((card) => observer.observe(card));
  }

  // Reset expanded cards when switching to desktop
  mobileQuery.addEventListener("change", (event) => {
    if (!event.matches) closeAllCards();
  });
});

