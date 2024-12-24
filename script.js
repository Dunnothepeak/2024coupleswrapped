// script.js

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  const nextButton = document.getElementById('next-btn');
  const progressBar = document.querySelector('.progress-bar');
  let currentSlideIndex = 0;

  // Number rolling animation
  function animateNumber(element) {
    const target = +element.dataset.target;
    const increment = target / 50; // Increment per frame
    let current = 0;

    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(interval);
        revealFeedback(element);
      }
      element.textContent = Math.floor(current);
    }, 50); // Update every 50ms
  }

  function revealFeedback(element) {
    const feedback = element.nextElementSibling;
    feedback.classList.add('visible');
  }

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (i === index) {
        slide.classList.add('active');
        const statNumber = slide.querySelector('.stat-number');
        if (statNumber) {
          statNumber.textContent = '0';
          statNumber.classList.remove('revealed'); // Reset
          setTimeout(() => {
            statNumber.classList.add('revealed');
            animateNumber(statNumber);
          }, 500); // Delay before animation starts
        }
      }
    });

    progressBar.style.width = `${(index / (slides.length - 1)) * 100}%`;
    if (index === slides.length - 1) {
      nextButton.style.display = 'none'; // Hide on summary slide
    }
  }

  nextButton.addEventListener('click', () => {
    currentSlideIndex++;
    if (currentSlideIndex < slides.length) {
      showSlide(currentSlideIndex);
    }
  });

  showSlide(0); // Show first slide
});
