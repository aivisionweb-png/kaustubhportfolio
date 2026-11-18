/* =========================================================
   KAUSTUBH SHUKLA — PERFORMANCE FIRST INTERACTION
========================================================= */

document.body.classList.add("loading");


/* =========================================================
   LOADER
========================================================= */

const loader = document.getElementById("loader");
const loadNum = document.getElementById("loadNum");
const loadBar = document.getElementById("loadBar");

let load = 0;

const loaderTimer = setInterval(() => {

  load += Math.floor(Math.random() * 9) + 5;

  if(load >= 100){

    load = 100;

    clearInterval(loaderTimer);

    setTimeout(() => {

      loader.classList.add("done");
      document.body.classList.remove("loading");

    }, 350);
  }

  loadNum.textContent = String(load).padStart(2,"0");
  loadBar.style.width = load + "%";

},50);


/* =========================================================
   CUSTOM CURSOR
========================================================= */

const cursor = document.getElementById("cursor");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let cursorX = mouseX;
let cursorY = mouseY;

if(window.matchMedia("(pointer:fine)").matches){

  window.addEventListener("mousemove",(e)=>{

    mouseX = e.clientX;
    mouseY = e.clientY;

  },{passive:true});


  function cursorLoop(){

    cursorX += (mouseX - cursorX) * .18;
    cursorY += (mouseY - cursorY) * .18;

    cursor.style.left = cursorX + "px";
    cursor.style.top = cursorY + "px";

    requestAnimationFrame(cursorLoop);
  }

  cursorLoop();


  document.querySelectorAll(
    "a,button,.project,.archive-card,.magnetic"
  ).forEach(el => {

    el.addEventListener("mouseenter",()=>{

      cursor.classList.add("big");

    });

    el.addEventListener("mouseleave",()=>{

      cursor.classList.remove("big");

    });

  });

}else{

  cursor.style.display = "none";

}


/* =========================================================
   MAGNETIC ELEMENTS
========================================================= */

if(window.matchMedia("(pointer:fine)").matches){

  document.querySelectorAll(".magnetic").forEach(el=>{

    el.addEventListener("mousemove",(e)=>{

      const r = el.getBoundingClientRect();

      const x =
        (e.clientX - r.left - r.width / 2) * .12;

      const y =
        (e.clientY - r.top - r.height / 2) * .12;

      el.style.transform =
        `translate3d(${x}px,${y}px,0)`;

    });

    el.addEventListener("mouseleave",()=>{

      el.style.transform = "";

    });

  });

}


/* =========================================================
   SCROLL PROGRESS
========================================================= */

const progress = document.getElementById("progress");

let ticking = false;

window.addEventListener("scroll",()=>{

  if(ticking) return;

  ticking = true;

  requestAnimationFrame(()=>{

    const max =
      document.documentElement.scrollHeight -
      window.innerHeight;

    if(max > 0){

      progress.style.height =
        ((window.scrollY / max) * 100) + "%";

    }

    ticking = false;

  });

},{passive:true});


/* =========================================================
   REVEAL
========================================================= */

const revealObserver =
  new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

      if(entry.isIntersecting){

        entry.target.classList.add("in");

        revealObserver.unobserve(entry.target);

      }

    });

  },{
    threshold:.12,
    rootMargin:"0px 0px -40px"
  });


document.querySelectorAll(".reveal")
.forEach(el=>revealObserver.observe(el));


/* =========================================================
   MENU
========================================================= */

const menuBtn = document.getElementById("menuBtn");
const menuPanel = document.getElementById("menuPanel");
const menuClose = document.getElementById("menuClose");

menuBtn.addEventListener("click",()=>{

  menuPanel.classList.add("open");

});

menuClose.addEventListener("click",()=>{

  menuPanel.classList.remove("open");

});

document.querySelectorAll(".menu-content a")
.forEach(link=>{

  link.addEventListener("click",()=>{

    menuPanel.classList.remove("open");

  });

});


/* =========================================================
   CLOCK
========================================================= */

const clock = document.getElementById("clock");

function updateClock(){

  if(!clock) return;

  clock.textContent =
    new Date().toLocaleTimeString(
      "en-IN",
      {hour12:false}
    );

}

updateClock();

setInterval(updateClock,1000);


/* =========================================================
   COUNTERS
========================================================= */

const counterObserver =
  new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

      if(!entry.isIntersecting) return;

      const el = entry.target;

      if(el.dataset.done) return;

      el.dataset.done = "1";

      const target =
        Number(el.dataset.count);

      let current = 0;

      function animate(){

        current += Math.ceil(target / 15);

        if(current > target){
          current = target;
        }

        el.textContent = current;

        if(current < target){

          requestAnimationFrame(animate);

        }

      }

      animate();

      counterObserver.unobserve(el);

    });

  },{
    threshold:.8
  });


document.querySelectorAll("[data-count]")
.forEach(el=>counterObserver.observe(el));


/* =========================================================
   PROJECT MODAL
========================================================= */

const modal =
  document.getElementById("modal");

const modalTitle =
  document.getElementById("modalTitle");

const modalKind =
  document.getElementById("modalKind");

const modalDescription =
  document.getElementById("modalDescription");

const modalLink =
  document.getElementById("modalLink");

const modalGallery =
  document.getElementById("modalGallery");

const modalClose =
  document.getElementById("modalClose");


function openModal(){

  modal.classList.add("open");

  document.body.style.overflow = "hidden";

}


function closeModal(){

  modal.classList.remove("open");

  document.body.style.overflow = "";

  modalGallery.innerHTML = "";

}


document.querySelectorAll(".project")
.forEach(card=>{

  card.addEventListener("click",()=>{

    modalTitle.textContent =
      card.dataset.name;

    modalKind.textContent =
      card.dataset.kind;

    modalDescription.textContent =
      card.dataset.description;

    modalLink.href =
      card.dataset.url;

    modalLink.textContent =
      "OPEN LIVE PROJECT ↗";

    modalGallery.innerHTML = "";

    openModal();

  });

});


modalClose.addEventListener(
  "click",
  closeModal
);


window.addEventListener("keydown",(e)=>{

  if(e.key === "Escape"){

    closeModal();

  }

});


/* =========================================================
   PROJECT TILT
   ONLY DESKTOP
========================================================= */

if(window.matchMedia("(pointer:fine)").matches){

  document.querySelectorAll(".project")
  .forEach(card=>{

    const visual =
      card.querySelector(".project-image");

    card.addEventListener("mousemove",(e)=>{

      const r =
        card.getBoundingClientRect();

      const x =
        ((e.clientX - r.left) / r.width - .5);

      const y =
        ((e.clientY - r.top) / r.height - .5);

      visual.style.transform =
        `perspective(900px)
         rotateX(${y * -2}deg)
         rotateY(${x * 2}deg)
         scale(.99)`;

    });

    card.addEventListener("mouseleave",()=>{

      visual.style.transform = "";

    });

  });

}


/* =========================================================
   ARCHIVE
   NOTHING IS CREATED UNTIL USER OPENS IT
========================================================= */

const archiveToggle =
  document.getElementById("archiveToggle");

const archiveContent =
  document.getElementById("archiveContent");

const archiveGrid =
  document.getElementById("archiveGrid");

const archiveFilters =
  document.getElementById("archiveFilters");

let archiveMounted = false;


/* =========================================================
   ARCHIVE DATA
========================================================= */

const archiveCards = [

  {
    category:"funwave",
    series:"funwave",
    page:9,
    type:"FUNWAVE",
    title:"Crunch. Flavour. Love."
  },

  {
    category:"funwave",
    series:"funwave",
    page:18,
    type:"CHARACTER SYSTEM",
    title:"Funo / Character World"
  },

  {
    category:"food",
    series:"mexican",
    page:2,
    type:"MEXICAN PIZZA PARLOUR",
    title:"Restaurant Menu"
  },

  {
    category:"food",
    series:"mexican",
    page:39,
    type:"FOOD DIRECTION",
    title:"Menu Pages"
  },

  {
    category:"brand",
    series:"wafflora",
    page:1,
    type:"WAFFLORA",
    title:"Good Things Come in Waffles"
  },

  {
    category:"event",
    series:"events",
    page:46,
    type:"KS ENTERPRISE",
    title:"Rath Yatra"
  },

  {
    category:"event",
    series:"events",
    page:51,
    type:"EVENT",
    title:"Maha Aarti"
  },

  {
    category:"event",
    series:"events",
    page:50,
    type:"INVITATION",
    title:"Gujarati Invitation"
  },

  {
    category:"brand",
    series:"qr",
    page:48,
    type:"DIGITAL / QR",
    title:"QR Menu Creative"
  }

];


const series = {

  funwave:{
    title:"FUNWAVE",
    kind:"BRAND / PACKAGING / CHARACTER SYSTEM",
    description:
      "Product creatives, packaging, social campaigns and character development from the supplied design archive.",
    pages:
      Array.from(
        {length:27},
        (_,i)=>i+9
      )
  },


  mexican:{
    title:"MEXICAN PIZZA PARLOUR",
    kind:"RESTAURANT / MENU / DIGITAL",
    description:
      "Restaurant menus, food creatives, combos and QR-led digital menu work.",
    pages:[
      2,3,4,5,6,7,8,
      36,37,38,39,40,
      41,42,43,44,45
    ]
  },


  wafflora:{
    title:"WAFFLORA",
    kind:"FOOD BRAND / CAMPAIGN",
    description:
      "Playful waffle-focused brand creative.",
    pages:[1]
  },


  events:{
    title:"EVENT / FESTIVE WORK",
    kind:"EVENT / INVITATION / FESTIVE",
    description:
      "Corporate festive communication, invitations and event artwork.",
    pages:[46,50,51]
  },


  qr:{
    title:"QR / DIGITAL MENU",
    kind:"DIGITAL / QR EXPERIENCE",
    description:
      "QR-led menu and scan-to-view promotional creatives.",
    pages:[47,48,49]
  }

};


/* =========================================================
   IMAGE PATH
========================================================= */

function imagePath(page){

  return (
    "assets/work/page-" +
    String(page).padStart(2,"0") +
    ".jpg"
  );

}


/* =========================================================
   MOUNT ARCHIVE
========================================================= */

function mountArchive(){

  if(archiveMounted) return;

  archiveMounted = true;


  /* FILTERS */

  archiveFilters.innerHTML = [

    ["all","ALL"],
    ["funwave","FUNWAVE"],
    ["food","FOOD / MENU"],
    ["brand","BRAND"],
    ["event","EVENT"]

  ].map(item=>{

    return `
      <button
        type="button"
        data-filter="${item[0]}"
        class="${item[0] === "all" ? "active" : ""}"
      >
        ${item[1]}
      </button>
    `;

  }).join("");


  /* CARDS */

  archiveGrid.innerHTML =
    archiveCards.map((item,index)=>{

      return `

        <article
          class="archive-card reveal"
          data-category="${item.category}"
          data-series="${item.series}"
        >

          <div class="archive-image">

            <img
              src="${imagePath(item.page)}"
              alt="${item.title}"
              loading="${index < 2 ? "eager" : "lazy"}"
              decoding="async"
            >

          </div>

          <div class="archive-meta">

            <span>
              ${String(index+1).padStart(2,"0")}
              /
              ${item.type}
            </span>

            <h3>${item.title}</h3>

            <b>OPEN SERIES ↗</b>

          </div>

        </article>

      `;

    }).join("");


  /* REVEAL */

  archiveGrid
    .querySelectorAll(".reveal")
    .forEach(el=>{

      revealObserver.observe(el);

    });


  /* CURSOR */

  if(window.matchMedia("(pointer:fine)").matches){

    archiveGrid
      .querySelectorAll(".archive-card")
      .forEach(card=>{

        card.addEventListener(
          "mouseenter",
          ()=>{
            cursor.classList.add("big");
            cursor.querySelector("span").textContent="OPEN";
          }
        );

        card.addEventListener(
          "mouseleave",
          ()=>{
            cursor.classList.remove("big");
          }
        );

      });

  }


  /* FILTER */

  archiveFilters
    .querySelectorAll("button")
    .forEach(button=>{

      button.addEventListener("click",()=>{

        archiveFilters
          .querySelectorAll("button")
          .forEach(b=>b.classList.remove("active"));

        button.classList.add("active");

        const filter =
          button.dataset.filter;

        archiveGrid
          .querySelectorAll(".archive-card")
          .forEach(card=>{

            card.classList.toggle(
              "is-hidden",
              filter !== "all" &&
              card.dataset.category !== filter
            );

          });

      });

    });


  /* OPEN SERIES */

  archiveGrid
    .querySelectorAll(".archive-card")
    .forEach(card=>{

      card.addEventListener("click",()=>{

        openArchiveSeries(
          card.dataset.series
        );

      });

    });

}


/* =========================================================
   ARCHIVE TOGGLE
========================================================= */

archiveToggle.addEventListener("click",()=>{

  const isOpen =
    archiveContent.classList.contains("open");


  if(!isOpen){

    mountArchive();

    archiveContent.classList.add("open");

    archiveContent.setAttribute(
      "aria-hidden",
      "false"
    );

    archiveToggle
      .querySelector("span")
      .textContent =
      "COLLAPSE ARCHIVE";

    archiveToggle
      .querySelector("b")
      .textContent =
      "−";


  }else{

    archiveContent.classList.remove("open");

    archiveContent.setAttribute(
      "aria-hidden",
      "true"
    );

    archiveToggle
      .querySelector("span")
      .textContent =
      "EXPAND ARCHIVE";

    archiveToggle
      .querySelector("b")
      .textContent =
      "+";

  }

});


/* =========================================================
   SERIES GALLERY
   ONLY 6 IMAGES AT A TIME
========================================================= */

let galleryIndex = 0;
let currentSeries = null;


function openArchiveSeries(key){

  const item = series[key];

  if(!item) return;

  currentSeries = item;

  galleryIndex = 0;

  modalTitle.textContent =
    item.title;

  modalKind.textContent =
    item.kind;

  modalDescription.textContent =
    item.description;

  modalLink.style.display =
    "none";

  modalGallery.innerHTML = "";

  renderGalleryBatch();

  openModal();

}


function renderGalleryBatch(){

  if(!currentSeries) return;


  const pages =
    currentSeries.pages;

  const nextPages =
    pages.slice(
      galleryIndex,
      galleryIndex + 6
    );


  nextPages.forEach(page=>{

    const img =
      document.createElement("img");

    img.src =
      imagePath(page);

    img.alt =
      `${currentSeries.title} page ${page}`;

    img.loading =
      "lazy";

    img.decoding =
      "async";


    img.addEventListener("click",()=>{

      img.classList.toggle("zoom");

    });


    modalGallery.appendChild(img);

  });


  galleryIndex +=
    nextPages.length;


  if(galleryIndex < pages.length){

    const more =
      document.createElement("button");

    more.className =
      "gallery-more";

    more.textContent =
      `LOAD MORE · ${pages.length - galleryIndex} REMAINING`;


    more.addEventListener("click",()=>{

      more.remove();

      renderGalleryBatch();

    });


    modalGallery.appendChild(more);

  }

}


/* =========================================================
   HERO LIGHT PARALLAX
   NO HEAVY CONTINUOUS ANIMATION
========================================================= */

if(window.matchMedia("(pointer:fine)").matches){

  let parallaxTick = false;

  window.addEventListener("scroll",()=>{

    if(parallaxTick) return;

    parallaxTick = true;

    requestAnimationFrame(()=>{

      const hero =
        document.querySelector(".hero-center");

      if(hero){

        hero.style.transform =
          `translate3d(0,${Math.min(
            window.scrollY * .08,
            70
          )}px,0)`;

      }

      parallaxTick = false;

    });

  },{passive:true});

}
