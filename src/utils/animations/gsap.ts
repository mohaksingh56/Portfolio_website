import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const initScrollAnimations = () => {
  // Parallax effect for hero section
  gsap.to('.hero-bg', {
    yPercent: -50,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });

  // Stagger animation for project cards
  gsap.fromTo('.project-card', 
    {
      y: 100,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // Skill bars animation
  gsap.fromTo('.skill-bar', 
    {
      scaleX: 0
    },
    {
      scaleX: 1,
      duration: 1.5,
      ease: 'power2.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.skills-section',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // Timeline animation for experience
  gsap.fromTo('.timeline-item', 
    {
      x: (index) => index % 2 === 0 ? -100 : 100,
      opacity: 0
    },
    {
      x: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.3,
      scrollTrigger: {
        trigger: '.experience-timeline',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    }
  );
};

export const createFloatingAnimation = (element: HTMLElement) => {
  gsap.to(element, {
    y: -20,
    duration: 2,
    ease: 'power1.inOut',
    yoyo: true,
    repeat: -1
  });
};

export const createGlowPulse = (element: HTMLElement) => {
  gsap.to(element, {
    boxShadow: '0 0 20px currentColor, 0 0 40px currentColor',
    duration: 1.5,
    ease: 'power1.inOut',
    yoyo: true,
    repeat: -1
  });
};

export const createTypewriterEffect = (element: HTMLElement, text: string, duration = 2) => {
  const chars = text.split('');
  element.innerHTML = '';
  
  chars.forEach((char) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.opacity = '0';
    element.appendChild(span);
  });

  gsap.to(element.children, {
    opacity: 1,
    duration: duration / chars.length,
    stagger: duration / chars.length,
    ease: 'none'
  });
};
