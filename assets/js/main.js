const carousel = document.querySelector("[data-carousel]");

if (carousel) {
  const slides = Array.from(carousel.querySelectorAll(".portfolio-slide"));
  const dots = Array.from(carousel.querySelectorAll(".carousel-dots button"));
  const prevButton = carousel.querySelector(".carousel-prev");
  const nextButton = carousel.querySelector(".carousel-next");

  let currentIndex = 0;
  let autoplay;

  function showSlide(index) {
    currentIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === currentIndex);
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === currentIndex);
    });
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  function startAutoplay() {
    autoplay = window.setInterval(nextSlide, 6000);
  }

  function resetAutoplay() {
    window.clearInterval(autoplay);
    startAutoplay();
  }

  nextButton.addEventListener("click", () => {
    nextSlide();
    resetAutoplay();
  });

  prevButton.addEventListener("click", () => {
    prevSlide();
    resetAutoplay();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      resetAutoplay();
    });
  });

  showSlide(currentIndex);
  startAutoplay();
}


const mosaic = document.querySelector("[data-mosaic]");

if (mosaic) {
  const images = [
    "assets/images/portfolio/portfolio-01.jpg",
    "assets/images/gallery/gallery-01.jpg",
    "assets/images/portfolio/portfolio-02.jpg",
    "assets/images/gallery/gallery-02.jpg",
    "assets/images/gallery/gallery-03.jpg",
    "assets/images/gallery/gallery-04.jpg",
    "assets/images/galleries/vlad-denisa.jpg",
    "assets/images/galleries/david-esra.jpg",
    "assets/images/galleries/rus-a-viii-a.jpg",
    "assets/images/galleries/babeni-a-viii-a.jpg",
    "assets/images/galleries/letca-a-viii-a.jpg",
    "assets/images/portfolio/portfolio-04.jpg"
  ];

  function getImageOrientation(width, height) {
    const ratio = width / height;

    if (ratio > 1.18) {
      return "landscape";
    }

    if (ratio < 0.85) {
      return "portrait";
    }

    return "square";
  }

  images.forEach((src, index) => {
    const loader = new Image();

    loader.onload = () => {
      const orientation = getImageOrientation(loader.naturalWidth, loader.naturalHeight);

      const item = document.createElement("div");
      item.className = `mosaic-item mosaic-${orientation}`;
      item.style.backgroundImage = `url("${src}")`;
      item.setAttribute("aria-label", `Portfolio image ${index + 1}`);

      mosaic.appendChild(item);
    };

    loader.onerror = () => {
      console.warn(`Could not load mosaic image: ${src}`);
    };

    loader.src = src;
  });
}
