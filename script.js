const lstCourses = document.querySelector(".lst-courses");
const searchIcon = document.querySelector(".search-icon");
const searchInput = document.querySelector(".search-input");
const searchBarForm = document.querySelector(".search-bar-form");
const rightArrow = document.querySelector(".right-arrow");
const leftArrow = document.querySelector(".left-arrow");
const swiperSmall={
  slidesPerView: 1,
  spaceBetween: 30,
  slidesPerGroup: 1,
  loop: true,
  loopFillGroupWithBlank: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".right-arrow",
    prevEl: ".left-arrow",
  },
}
const swiperMid={
  slidesPerView: 3,
  spaceBetween: 30,
  slidesPerGroup: 3,
  loop: true,
  loopFillGroupWithBlank: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".right-arrow",
    prevEl: ".left-arrow",
  },
}

const swiperLarge={
  slidesPerView: 5,
  spaceBetween: 30,
  slidesPerGroup: 5,
  loop: true,
  loopFillGroupWithBlank: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".right-arrow",
    prevEl: ".left-arrow",
  },
}

function templateCourse(item) {
  const { image, title, rating, stars, price, instructors } = item;
  return `<div class="sigleCourse">
        <div class="sigleCourse-img">
          <a href="#"><img src="${image}" alt="python" /></a>
        </div>
        <div class="sigleCourse-info">
          <div class="sigleCourse-title">
            ${title}
          </div>
          <div class="sigleCourse-auther">${instructors[0].name}</div>
          <div class="sigleCourse-rate">
            <ul id="sigleCourse-stars">
              <i>${rating.toFixed(1)}</i>
              <i class="${
                stars[0] == 1
                  ? "fas fa-star"
                  : stars[0] == 0.5
                  ? "fas fa-star-half-alt"
                  : "fa-regular fa-star"
              }" style="color: #f4c150"></i>
              <i class="${
                stars[1] == 1
                  ? "fas fa-star"
                  : stars[1] == 0.5
                  ? "fas fa-star-half-alt"
                  : "fa-regular fa-star"
              }" style="color: #f4c150"></i>
              <i class="${
                stars[2] == 1
                  ? "fas fa-star"
                  : stars[2] == 0.5
                  ? "fas fa-star-half-alt"
                  : "fa-regular fa-star"
              }" style="color: #f4c150"></i>
              <i class="${
                stars[3] == 1
                  ? "fas fa-star"
                  : stars[3] == 0.5
                  ? "fas fa-star-half-alt"
                  : "fa-regular fa-star"
              }" style="color: #f4c150"></i>
              <i class="${
                stars[4] == 1
                  ? "fas fa-star"
                  : stars[4] == 0.5
                  ? "fas fa-star-half-alt"
                  : "fa-regular fa-star"
              }" style="color: #f4c150"></i>
            </ul>
          </div>
          <div class="sigleCourse-price">E£${price}</div>
        </div>
        </div>`;
}

async function getData(url) {
  let ret = await fetch(url);
  ret = await ret.json();
  return ret;
}

async function getHeader(CAT,Selector,btn_name) {
  let courses = "";

  const DATA = await getData(`http://localhost:3000/${CAT}`);
  // console.log(DATA);
  let q = 0;
  for (let sigleCourse of DATA.courses) {
    // console.log(sigleCourse);
    courses += templateCourse(sigleCourse);
    //dataContainer.add(sigleCourse.title, q);
    q++;
    //if(q>=6)break;
  }
  
  const res = `<div class="show-courses">
    <div class="hder-of-courses-section">
      <div class="title">${DATA.header}</div>
      <div class="details">${DATA.description}</div>
    </div>
    <button type="button" class="btn-Explore">Explore ${btn_name}</button>
    <div class="lst-courses">
      <div class="lst-groupCourses">
        <div class="groupCourses">
          ${courses}
        </div>
        <button class="right-arrow"><i class="fa-solid fa-circle-chevron-right"></i></button>
        <button class="left-arrow"><i class="fa-solid fa-circle-chevron-left"></i></button>
      </div>
    </div>
  </div>`;
  // console.log(dataContainer)
  document.querySelector(`${Selector}`).innerHTML = res;
  console.log(res);

  const rightArrow = document.querySelector(`${Selector} .show-courses .lst-courses .lst-groupCourses .right-arrow`);
  const leftArrow = document.querySelector(`${Selector} .show-courses .lst-courses .lst-groupCourses .left-arrow`);
  
  rightArrow.addEventListener("click",()=>{
    const groupCourses = rightArrow.parentElement.querySelector(".groupCourses");
    const pos = parseInt(groupCourses.style.left==''?0:groupCourses.style.left) - 300;
    
    groupCourses.style.left = pos + "px";
  })
  leftArrow.addEventListener("click",()=>{
    const groupCourses = leftArrow.parentElement.querySelector(".groupCourses");
    const pos = parseInt(groupCourses.style.left==''?0:groupCourses.style.left) + 300;

    if(pos<=0) groupCourses.style.left=pos + "px";
  })
}


getHeader("Python","#python","python");
getHeader("Excel","#Excel","Excel");
getHeader("WebDevelopment","#WebDevelopment","Web Development");
getHeader("JavaScript","#JavaScript","JavaScript");
getHeader("DataScience","#DataScience","Data Science");
getHeader("AWSCertificate","#AWSCertificate","AWS Certificate");
getHeader("Drawing","#Drawing","Drawing");


searchBarForm.addEventListener("submit",  (e) => {
  e.preventDefault();
  const content = document.querySelectorAll("#myTabContent .active .show-courses .lst-courses .sigleCourse");
  console.log(content)
  for(let i = 0;i<content.length;i++){
    const title = content[i].querySelector(".sigleCourse-info .sigleCourse-title").textContent.trim();
    
    console.log(title,searchInput.value);
    if(title != searchInput.value && searchInput.value!==""){
      content[i].classList.add("d-none")
    }else{
      content[i].classList.remove("d-none");
    }
  }
  // console.log("item => ",item);
});







// function setup(x) {
//   if (x.matches) { // If media query matches
//     console.log(x);
//     new Swiper(".mySwiper", swiperSmall);
//     // document.body.style.backgroundColor = "yellow";
//   } else {
//   //  document.body.style.backgroundColor = "pink";
  
//     new Swiper(".mySwiper", swiperLarge);
//     document.querySelector(".swiper").style.height='500px';
//   }
// }

// var x = window.matchMedia("(max-width: 700px)")
// setup(x) 
// x.addListener(setup) 