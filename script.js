// 슬라이더 관련
const sliderContainer = document.querySelector('.slider-container');
const sliderWrapper = document.querySelector('.slider-wrapper');
const images = document.querySelectorAll('.slider-wrapper img');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');

let currentIndex = 0;
const imageCount = images.length;
const slideWidthPercentage = 100 / imageCount;
const slideIntervalTime = 3000;
let autoSlideInterval;

function goToSlide(index) {
  if (index < 0) currentIndex = imageCount - 1;
  else if (index >= imageCount) currentIndex = 0;
  else currentIndex = index;
  sliderWrapper.style.transform = `translateX(-${currentIndex * slideWidthPercentage}%)`;
}

function nextSlide() { goToSlide(currentIndex + 1); }
function prevSlide() { goToSlide(currentIndex - 1); }

function startAutoSlide() {
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(nextSlide, slideIntervalTime);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// 라우트와 섹션 id 매핑
const routes = {
  '/intro': 'intro',
  '/ppt': 'IDppt',
  '/planning': 'IDplanning',
  '/contact': 'contact'
};

// 네비게이션 클릭 이벤트
document.addEventListener('click', (e) => {
  if (e.target.matches('nav a')) {
    e.preventDefault();
    const path = e.target.getAttribute('href');
    // 실제 라우팅
    navigate(path);
  }
});

// 뒤로/앞으로가기 처리
window.addEventListener('popstate', () => {
  navigate(window.location.pathname);
});

// 초기 로드 시 라우팅
window.addEventListener('load', () => {
  // GitHub Pages에서 SPA 라우팅을 위해 세션스토리지 사용
  if (sessionStorage.redirect) {
    const redirect = sessionStorage.redirect;
    delete sessionStorage.redirect;
    history.replaceState(null, null, redirect);
  }
  // 현재 경로로 라우팅
  navigate(window.location.pathname);
});

// 라우팅 함수
function navigate(path) {
  // 경로가 없으면 /intro로 기본값
  if (path === '/' || path === '') path = '/intro';
  // 라우트 매핑에서 섹션 id 찾기
  const routeId = routes[path] || routes['/intro'];
  // 모든 섹션 숨기기
 document.querySelectorAll('.content').forEach(section => {
  section.classList.remove('active');
});
const targetSection = document.getElementById(routeId);
if (targetSection) targetSection.classList.add('active');
  // 히스토리 업데이트 (중복 방지)
  if (window.location.pathname !== path) {
    history.pushState({}, '', path);
  }
}


// 라우터 초기화
new SPARouter();

// 슬라이더 이벤트
nextButton.addEventListener('click', () => { stopAutoSlide(); nextSlide(); });
prevButton.addEventListener('click', () => { stopAutoSlide(); prevSlide(); });
sliderContainer.addEventListener('mouseenter', stopAutoSlide);
sliderContainer.addEventListener('mouseleave', startAutoSlide);

startAutoSlide();
