// VENDZO VERSION 2 — PRODUCT EDITOR
// Add/edit products below. Use your Amazon Associates Special Link in "link".
const products = [
  {name:"OPI Nail Lacquer – Black Cherry Chutney",category:"Beauty",description:"Salon-quality, chip-resistant nail polish delivering a rich dark red hue with a high-shine pearl finish. Features a Pro-Wide brush for smooth, streak-free application..",image:"https://placehold.co/900x900/e9e1d7/222?text=Beauty+Product",link:"https://amzn.to/4iyr1JT"},
  {name:"Personal Care Product",category:"Personal Care",description:"Add your short product description here.",image:"https://placehold.co/900x900/e1e8df/222?text=Personal+Care",link:"PASTE-AMAZON-AFFILIATE-LINK"},
  {name:"Fashion Pick",category:"Fashion",description:"Add your short product description here.",image:"https://placehold.co/900x900/e5e2df/222?text=Fashion+Pick",link:"PASTE-AMAZON-AFFILIATE-LINK"},
  {name:"Skincare Favorite",category:"Beauty",description:"Add your short product description here.",image:"https://placehold.co/900x900/e9e1d7/222?text=Skincare",link:"PASTE-AMAZON-AFFILIATE-LINK"},
  {name:"Hair Care Pick",category:"Personal Care",description:"Add your short product description here.",image:"https://placehold.co/900x900/e1e8df/222?text=Hair+Care",link:"PASTE-AMAZON-AFFILIATE-LINK"},
  {name:"Everyday Style",category:"Fashion",description:"Add your short product description here.",image:"https://placehold.co/900x900/e5e2df/222?text=Style",link:"PASTE-AMAZON-AFFILIATE-LINK"}
];

const grid=document.getElementById("products");
const buttons=document.querySelectorAll(".filter");

function safe(v){return String(v).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}

function render(filter="All"){
  const list=filter==="All"?products:products.filter(p=>p.category===filter);
  grid.innerHTML=list.map(p=>`
    <article class="product-card">
      <img class="product-image" src="${safe(p.image)}" alt="${safe(p.name)}" loading="lazy">
      <div class="product-info">
        <div class="tag">${safe(p.category)}</div>
        <h3>${safe(p.name)}</h3>
        <p>${safe(p.description)}</p>
        <a class="shop-btn" href="${safe(p.link)}" target="_blank" rel="nofollow sponsored noopener">View on Amazon →</a>
      </div>
    </article>`).join("");
}
buttons.forEach(b=>b.addEventListener("click",()=>{buttons.forEach(x=>x.classList.remove("active"));b.classList.add("active");render(b.dataset.filter)}));
render();
document.getElementById("year").textContent=new Date().getFullYear();
