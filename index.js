const panels = document.querySelectorAll(".panel");

panels.forEach((item) => {
  item.addEventListener("click", () => {
    removeActiveClasses();
    item.classList.add("active");
  });
});

const removeActiveClasses = () => {
  panels.forEach((item) => {
    item.classList.remove("active");
  });
};

//////////////////////////////////////

const sliderContainer = document.querySelector('.slider-container');

const leftSlideContent = [
  { title: 'Lighting', Details: 'new collection', color: '#b99f8a' },
  { title: 'Textiles', Details: 'new collection', color: '#354f32' },
  { title: 'Flooring', Details: 'new collection', color: '#657e85' },
  { title: 'Furniture', Details: 'new collection', color: '#2b2e32' }
];

const createSlideSection = () => {
  const leftSlide = document.createElement('div');
  leftSlide.classList.add('left-slide');
  
  leftSlideContent.forEach((item, index) => {
    const div = document.createElement('div');
    div.classList.add(`par${index + 1}`);
    div.style.backgroundColor = item.color;
    leftSlide.append(div);
    
    const h1 = document.createElement('h2');
    h1.textContent = item.title;
    div.append(h1);
    
    const p = document.createElement('p');
    p.textContent = item.Details;
    div.append(p);
  });
  
  return leftSlide;
};

const createSlideImages = async () => {
  const rightSlide = document.createElement('div');
  rightSlide.classList.add('right-slide');
  
  const urls = await fetchImages();
  
  urls.forEach(url => {
    const div = document.createElement('div');
    div.style.backgroundImage = `url(${url})`;
    div.classList.add('slide');
    rightSlide.appendChild(div);
  });
  
  return rightSlide;
};

const keyApi = '2Y8SgEv2Rp85Lh7SLCAEDIdTgYKa-d4Hj_Q5NJr0Acg';
const query = 'home design';
const apiUrl = `https://api.unsplash.com/search/photos?query=${query}&client_id=${keyApi}&per_page=4`;

const fetchImages = async () => {
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data.results.map(photo => photo.urls.regular);
};

const createButtons = () => {
  const actionButtons = document.createElement('div');
  actionButtons.classList.add('action-buttons');
  
  const downButton = document.createElement('button');
  downButton.classList.add('down-button');
  const icon1 = document.createElement('i');
  icon1.classList.add('bi','bi-arrow-down');
  downButton.append(icon1);
  actionButtons.append(downButton);
  
  const upButton = document.createElement('button');
  upButton.classList.add('up-button');
  const icon = document.createElement('i');
  icon.classList.add('bi','bi-arrow-up');
  upButton.append(icon);
  actionButtons.append(upButton);
  
  return actionButtons;
};

const initializeSlider = async () => {
  sliderContainer.append(createSlideSection());
  sliderContainer.append(await createSlideImages());
  sliderContainer.append(createButtons());

  const slideRight = document.querySelector('.right-slide');
  const slideLeft = document.querySelector('.left-slide');
  const upButton = document.querySelector('.up-button');
  const downButton = document.querySelector('.down-button');
  const slidesLength = slideRight.querySelectorAll('div').length;

  let activeSlideIndex = 0;

  slideLeft.classList.add(`top-${slidesLength - 1}`);

  const changeSlide = (direction) => {
    const sliderHeight = sliderContainer.clientHeight;
    if (direction === "up") {
      activeSlideIndex++;
      if (activeSlideIndex > slidesLength - 1) activeSlideIndex = 0;
    } else if (direction === "down") {
      activeSlideIndex--;
      if (activeSlideIndex < 0) activeSlideIndex = slidesLength - 1;
    }
    slideRight.style.transform = `translateY(-${activeSlideIndex * sliderHeight}px)`;
    slideLeft.style.transform = `translateY(${activeSlideIndex * sliderHeight}px)`;
  };

  upButton.addEventListener("click", () => changeSlide("up"));
  downButton.addEventListener("click", () => changeSlide("down"));
};

initializeSlider();