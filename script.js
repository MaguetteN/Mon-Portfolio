// Animation du texte défilant
const typingText = document.getElementById('typingText');
const professions = [
  'Ingénieure Systèmes et Réseaux Télécoms',
  'Administratrice Systèmes, Réseaux et Sécurité'
];

let professionIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function typeText() {
  const currentText = professions[professionIndex];
  
  if (isDeleting) {
    typingText.textContent = currentText.substring(0, charIndex-1);
    charIndex--;
  } else {
    typingText.textContent = currentText.substring(0, charIndex+1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    typingDelay = 2000; // Pause avant de commencer à effacer
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    professionIndex = (professionIndex + 1) % professions.length;
    typingDelay = 500; // Pause avant de commencer le prochain mot
  } else {
    typingDelay = isDeleting ? 50 : 100;
  }

  setTimeout(typeText, typingDelay);
}

// Démarrer l'animation de texte
typeText();

// Navigation fluide avec le tableau de bord
const dashboardItems = document.querySelectorAll('.dashboard-item');

dashboardItems.forEach(item => {
  item.addEventListener('click', () => {
    const targetId = item.getAttribute('data-target');
    const targetElement = document.getElementById(targetId);

    // Retirer la classe active de tous les éléments
    dashboardItems.forEach(i => i.classList.remove('active'));
    // Ajouter la classe active à l'élément cliqué
    item.classList.add('active');

    // Faire défiler jusqu'à la section
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});

// Animation au défilement des sections
function revealOnScroll() {
  const sections = document.querySelectorAll('.section');
  
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight * 0.75) {
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
    }
  });
}

// Initialisation des sections
document.querySelectorAll('.section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'all 0.5s ease-out';
});

// Écouteur d'événement pour le défilement
window.addEventListener('scroll', revealOnScroll);

// Formulaire de contact
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Animation de confirmation
    const button = contactForm.querySelector('button');
    const originalText = button.textContent;
    button.textContent = 'Message envoyé !';
    button.style.backgroundColor = '#4CAF50';
    
    // Réinitialisation après 2 secondes
    setTimeout(() => {
      button.textContent = originalText;
      button.style.backgroundColor = '';
      contactForm.reset();
    }, 2000);
  });
}

// Appeler revealOnScroll au chargement de la page
revealOnScroll();
