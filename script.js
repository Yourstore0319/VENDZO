/* ==========================================================================
   VENDZO TAXONOMY & PRODUCT ENGINE
   ========================================================================== */

const CATEGORIES = {
  "Beauty": {
    "Skincare": ["Face Wash", "Cleanser", "Toner", "Serum", "Moisturizer", "Sunscreen", "Face Masks", "Eye Care"],
    "Makeup": ["Foundation", "Concealer", "Lip Products", "Eye Makeup", "Blush", "Makeup Tools"],
    "Nails": ["Hand Nails", "Foot Nails", "Nail Polish", "Nail Care", "Nail Tools"],
    "Fragrance": ["Perfume", "Body Mist", "Fragrance Sets"]
  },
  "Personal Care": {
    "Hair Care": ["Shampoo", "Conditioner", "Hair Treatment", "Hair Oil", "Hair Styling"],
    "Bath & Body": ["Body Wash", "Body Lotion", "Hand Care", "Foot Care", "Deodorant"],
    "Oral Care": ["Toothpaste", "Toothbrush", "Mouthwash", "Oral Care Tools"],
    "Men's Grooming": ["Shaving", "Beard Care", "Face Care", "Grooming Tools"]
  },
  "Fashion": {
    "Clothing": ["T-Shirts", "Shirts", "Hoodies", "Jackets", "Jeans", "Trousers", "Dresses", "Activewear"],
    "Shoes": ["Sneakers", "Casual Shoes", "Formal Shoes", "Sandals", "Boots", "Sports Shoes"],
    "Accessories": ["Watches", "Bags", "Wallets", "Belts", "Sunglasses", "Hats & Caps"],
    "Jewelry": ["Rings", "Bracelets", "Necklaces", "Earrings"]
  },
  "Lifestyle": {
    "Home": ["Home Decor", "Lighting", "Organization"],
    "Fitness": ["Fitness Accessories", "Gym Accessories", "Sports Accessories"],
    "Tech Accessories": ["Phone Accessories", "Laptop Accessories", "Everyday Tech"],
    "Travel": ["Travel Bags", "Travel Accessories", "Organization"]
  }
};

/* Products Data Array (Add your existing items here) */
const PRODUCTS = [
  {
    id: "opi-black-cherry-chutney",
    name: "OPI Nail Lacquer – Black Cherry Chutney",
    mainCategory: "Beauty",
    subcategory: "Nails",
    productType: "Hand Nails",
    brand: "OPI",
    size: "15 ml",
    finish: "Pearl",
    description: "Rich, long-lasting OPI nail lacquer with a high-shine pearl finish and chip-resistant wear.",
    image: "https://m.media-amazon.com/images/I/513yR8+p2UL._SL1000_.jpg",
    affiliateLink: "https://amzn.to/4AoLOGg"
  }
  // Retain all your other existing products with matching category fields
];

/* Current Navigation State */
let state = {
  mainCategory: null,
  subcategory: null,
  productType: null
};

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  buildMegaMenus();
  setupMobileNav();
  renderView();
});

/* Dynamic Mega Menu Generation */
function buildMegaMenus() {
  Object.keys(CATEGORIES).forEach(mainCat => {
    const slug = mainCat.toLowerCase().replace(/\s+/g, '-');
    const menuEl = document.getElementById(`menu-${slug}`);
    if (!menuEl) return;

    let html = '';
    const subcats = CATEGORIES[mainCat];

    for (const [sub, types] of Object.entries(subcats)) {
      html += `<div class="sub-group">
        <div class="sub-group-title" onclick="selectSubcategory('${mainCat}', '${sub}', event)">${sub}</div>`;
      types.forEach(t => {
        html += `<a href="#" class="type-link" onclick="selectProductType('${mainCat}', '${sub}', '${t}', event)">${t}</a>`;
      });
      html += `</div>`;
    }
    menuEl.innerHTML = html;
  });
}

/* Mobile Menu Handling */
function setupMobileNav() {
  const toggleBtn = document.getElementById("mobileMenuToggle");
  const nav = document.getElementById("mainNav");

  toggleBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  // Mobile Accordion Dropdown
  document.querySelectorAll(".dropdown-item > a").forEach(item => {
    item.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        const parent = item.parentElement;
        parent.classList.toggle("mobile-open");
      }
    });
  });
}

/* Navigation Actions */
function navigateToHome(e) {
  if (e) e.preventDefault();
  state = { mainCategory: null, subcategory: null, productType: null };
  renderView();
  closeMobileNav();
}

function selectCategory(main, e) {
  if (e) e.preventDefault();
  state = { mainCategory: main, subcategory: null, productType: null };
  renderView();
  closeMobileNav();
}

function selectSubcategory(main, sub, e) {
  if (e) e.preventDefault();
  state = { mainCategory: main, subcategory: sub, productType: null };
  renderView();
  closeMobileNav();
}

function selectProductType(main, sub, type, e) {
  if (e) e.preventDefault();
  state = { mainCategory: main, subcategory: sub, productType: type };
  renderView();
  closeMobileNav();
}

function closeMobileNav() {
  document.getElementById("mainNav").classList.remove("open");
}

/* Dynamic Breadcrumbs Rendering */
function renderBreadcrumbs() {
  const container = document.getElementById("breadcrumbs");
  let html = `<a href="#" onclick="navigateToHome(event)">Home</a>`;

  if (state.mainCategory) {
    html += ` <span class="separator">/</span> `;
    if (!state.subcategory) {
      html += `<span>${state.mainCategory}</span>`;
    } else {
      html += `<a href="#" onclick="selectCategory('${state.mainCategory}', event)">${state.mainCategory}</a>`;
    }
  }

  if (state.subcategory) {
    html += ` <span class="separator">/</span> `;
    if (!state.productType) {
      html += `<span>${state.subcategory}</span>`;
    } else {
      html += `<a href="#" onclick="selectSubcategory('${state.mainCategory}', '${state.subcategory}', event)">${state.subcategory}</a>`;
    }
  }

  if (state.productType) {
    html += ` <span class="separator">/</span> <span>${state.productType}</span>`;
  }

  container.innerHTML = html;
}

/* Dynamic Content Rendering Engine */
function renderView() {
  renderBreadcrumbs();

  const titleEl = document.getElementById("pageTitle");
  const subEl = document.getElementById("pageSubtitle");
  const browserEl = document.getElementById("categoryBrowser");
  const pillsBar = document.getElementById("typeFilterBar");
  const pillsContainer = document.getElementById("pillsContainer");
  const gridTitle = document.getElementById("productGridTitle");

  // 1. HOME VIEW
  if (!state.mainCategory) {
    titleEl.textContent = "Curated Discovery";
    subEl.textContent = "Explore handpicked products across Beauty, Personal Care, Fashion, and Lifestyle.";
    gridTitle.textContent = "Featured Collection";
    pillsBar.style.display = "none";

    let catCards = "";
    Object.keys(CATEGORIES).forEach(cat => {
      catCards += `
        <div class="category-card" onclick="selectCategory('${cat}', event)">
          <h3>${cat}</h3>
        </div>`;
    });
    browserEl.innerHTML = catCards;
    browserEl.style.display = "grid";
  }
  // 2. MAIN CATEGORY VIEW
  else if (state.mainCategory && !state.subcategory) {
    titleEl.textContent = state.mainCategory;
    subEl.textContent = `Browse curated items in ${state.mainCategory}.`;
    gridTitle.textContent = `All ${state.mainCategory} Products`;
    pillsBar.style.display = "none";

    const subcats = CATEGORIES[state.mainCategory];
    let subCards = "";
    Object.keys(subcats).forEach(sub => {
      subCards += `
        <div class="category-card" onclick="selectSubcategory('${state.mainCategory}', '${sub}', event)">
          <h3>${sub}</h3>
        </div>`;
    });
    browserEl.innerHTML = subCards;
    browserEl.style.display = "grid";
  }
  // 3. SUBCATEGORY VIEW
  else if (state.subcategory && !state.productType) {
    titleEl.textContent = state.subcategory;
    subEl.textContent = `${state.mainCategory} → ${state.subcategory}`;
    gridTitle.textContent = `${state.subcategory} Collection`;
    browserEl.style.display = "none";

    const types = CATEGORIES[state.mainCategory][state.subcategory];
    let pills = `<button class="pill-btn active" onclick="selectSubcategory('${state.mainCategory}', '${state.subcategory}', event)">All</button>`;
    types.forEach(t => {
      pills += `<button class="pill-btn" onclick="selectProductType('${state.mainCategory}', '${state.subcategory}', '${t}', event)">${t}</button>`;
    });
    pillsContainer.innerHTML = pills;
    pillsBar.style.display = "flex";
  }
  // 4. PRODUCT TYPE VIEW
  else {
    titleEl.textContent = state.productType;
    subEl.textContent = `${state.mainCategory} → ${state.subcategory} → ${state.productType}`;
    gridTitle.textContent = state.productType;
    browserEl.style.display = "none";

    const types = CATEGORIES[state.mainCategory][state.subcategory];
    let pills = `<button class="pill-btn" onclick="selectSubcategory('${state.mainCategory}', '${state.subcategory}', event)">All</button>`;
    types.forEach(t => {
      const activeClass = t === state.productType ? "active" : "";
      pills += `<button class="pill-btn ${activeClass}" onclick="selectProductType('${state.mainCategory}', '${state.subcategory}', '${t}', event)">${t}</button>`;
    });
    pillsContainer.innerHTML = pills;
    pillsBar.style.display = "flex";
  }

  renderProducts();
}

/* Filter and Render Products */
function renderProducts() {
  const grid = document.getElementById("productGrid");
  const countEl = document.getElementById("productCount");

  const filtered = PRODUCTS.filter(p => {
    if (state.mainCategory && p.mainCategory !== state.mainCategory) return false;
    if (state.subcategory && p.subcategory !== state.subcategory) return false;
    if (state.productType && p.productType !== state.productType) return false;
    return true;
  });

  countEl.textContent = `(${filtered.length} products)`;

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="no-products" style="grid-column: 1/-1; text-align: center; padding: 3rem 0; color: #888;">
      <p>No products found in this selection yet.</p>
    </div>`;
    return;
  }

  grid.innerHTML = filtered.map(p => `
    <div class="product-card">
      <div class="product-image-wrap">
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
      </div>
      <div class="product-details">
        ${p.brand ? `<span class="product-brand">${p.brand}</span>` : ''}
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.description}</p>
        <div class="product-meta">
          ${p.size ? `<span>Size: ${p.size}</span>` : ''}
          ${p.finish ? `<span>Finish: ${p.finish}</span>` : ''}
        </div>
        <a href="${p.affiliateLink}" target="_blank" rel="noopener sponsored" class="affiliate-btn">
          View Product <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
      </div>
    </div>
  `).join('');
}
