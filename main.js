document.addEventListener('DOMContentLoaded', () => {
  // 1. Navigation Scroll Effect
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
      } else {
          navbar.classList.remove('scrolled');
      }
  });

  // 2. Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if(targetId === '#') return;

          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
              const headerOffset = 80;
              const elementPosition = targetElement.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
              window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth"
              });
          }
      });
  });

  // 3. Contact Form Submission Animation
  const contactForm = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');

  if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
          e.preventDefault();
          
          // Simulate form submission
          const submitBtn = contactForm.querySelector('button[type="submit"]');
          const originalText = submitBtn.textContent;
          
          submitBtn.disabled = true;
          submitBtn.textContent = 'Enviando...';
          submitBtn.style.opacity = '0.7';

          setTimeout(() => {
              // Action after "submission"
              contactForm.reset();
              submitBtn.disabled = false;
              submitBtn.textContent = originalText;
              submitBtn.style.opacity = '1';
              
              successMsg.style.display = 'block';
              
              // Hide success message after 5 seconds
              setTimeout(() => {
                  successMsg.style.display = 'none';
              }, 5000);
          }, 1500);
      });
  }

  // 4. Reveal Elements on Scroll
  const revealElements = document.querySelectorAll('.service-card, .about-content, .info-item, .contact-form-wrapper');
  
  const revealCallback = (entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
              observer.unobserve(entry.target); // Reveal only once
          }
      });
  };

  const revealOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver(revealCallback, revealOptions);

  revealElements.forEach((el, index) => {
      // Initial state
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
      observer.observe(el);
  });
});
