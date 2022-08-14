const lstCourses = document.querySelector(".lst-courses");
const searchIcon = document.querySelector(".search-icon");
const searchInput = document.querySelector(".search-input");
const searchBarForm = document.querySelector(".search-bar-form");

function templateCourse(item) {
  const { image, title, rating, stars, price, instructors } = item;
  return `<div class="card">
        <div class="card-img">
          <a href="#"><img src="${image}" alt="python" /></a>
        </div>
        <div class="card-info">
          <div class="card-title">
            ${title}
          </div>
          <div class="card-auther">${instructors[0].name}</div>
          <div class="card-rate">
            <ul id="ul-list">
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
          <div class="card-price">E£${price}</div>
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
  for (let card of DATA.courses) {
    // console.log(card);
    courses += templateCourse(card);
    //dataContainer.add(card.title, q);
    q++;
    if(q>=5)break;
  }
  const res = `<div class="show-courses">
    <div class="hder-of-courses-section">
      <div class="title">${DATA.header}</div>
      <div class="details">${DATA.description}</div>
    </div>
    <button type="button" class="btn-Explore">Explore ${btn_name}</button>
    <div class="lst-courses">${courses}</div>
  </div>`;
  // console.log(dataContainer)
  document.querySelector(`${Selector}`).innerHTML = res;
}


getHeader("Python","#python","python");


searchBarForm.addEventListener("submit",  (e) => {
  e.preventDefault();
  const content = document.querySelectorAll("#myTabContent .active .show-courses .lst-courses .card");
  console.log(content)
  for(let i = 0;i<content.length;i++){
    const title = content[i].querySelector(".card-info .card-title").textContent.trim();
    
    console.log(title,searchInput.value);
    if(title != searchInput.value && searchInput.value!==""){
      content[i].classList.add("d-none")
    }else{
      content[i].classList.remove("d-none");
    }
  }
  // console.log("item => ",item);
});
