 // --- DOM 요소 선택 ---
        const sliderContainer = document.querySelector('.slider-container');
        const sliderWrapper = document.querySelector('.slider-wrapper');
        const images = document.querySelectorAll('.slider-wrapper img');
        const prevButton = document.querySelector('.prev-button');
        const nextButton = document.querySelector('.next-button');

        // --- 변수 설정 ---
        let currentIndex = 0; // 현재 이미지 인덱스
        const imageCount = images.length; // 전체 이미지 개수
        const slideWidthPercentage = 100 / imageCount; // 각 이미지의 너비(%)
        const slideIntervalTime = 3000; // 자동 슬라이드 간격 (3초)
        let autoSlideInterval; // setInterval을 저장할 변수

        // --- 함수 정의 ---

        // 지정된 인덱스로 슬라이드를 이동시키는 함수
        function goToSlide(index) {
            // 인덱스가 범위를 벗어날 경우 순환 처리
            if (index < 0) {
                currentIndex = imageCount - 1;
            } else if (index >= imageCount) {
                currentIndex = 0;
            } else {
                currentIndex = index;
            }
            // translateX를 이용해 wrapper를 왼쪽으로 이동
            sliderWrapper.style.transform = `translateX(-${currentIndex * slideWidthPercentage}%)`;
        }

        // 다음 슬라이드로 이동
        function nextSlide() {
            goToSlide(currentIndex + 1);
        }

        // 이전 슬라이드로 이동
        function prevSlide() {
            goToSlide(currentIndex - 1);
        }

        // 자동 슬라이드 시작
        function startAutoSlide() {
            // 이전에 실행되던 interval이 있다면 중지
            clearInterval(autoSlideInterval); 
            autoSlideInterval = setInterval(nextSlide, slideIntervalTime);
        }

        // 자동 슬라이드 중지
        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }


        // --- 이벤트 리스너 설정 ---

        // 다음 버튼 클릭 시
        nextButton.addEventListener('click', () => {
            stopAutoSlide(); // 수동 조작 시 자동 슬라이드 중지
            nextSlide();
        });

        // 이전 버튼 클릭 시
        prevButton.addEventListener('click', () => {
            stopAutoSlide(); // 수동 조작 시 자동 슬라이드 중지
            prevSlide();
        });
        
        // 슬라이더에 마우스 올리면 자동 슬라이드 중지
        sliderContainer.addEventListener('mouseenter', stopAutoSlide);

        // 슬라이더에서 마우스 벗어나면 자동 슬라이드 다시 시작
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
        

        // --- 초기 실행 ---
        startAutoSlide(); // 페이지 로드 시 자동 슬라이드 시작