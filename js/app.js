/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function isElementInViewPort(element) {
   const rect = element.getBoundingClientRect();
   //return ((rect.top >= -rect.height) && (rect.top <= window.innerHeight));
   return ((rect.top >= 0) && (rect.bottom <= window.innerHeight));
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

function buildMenu() {
   // build the nav
   const sections = document.querySelectorAll('section');
   const navbar = document.querySelector('#navbar__list');

   for (section of sections) {
      const navItem = document.createElement('li');
      const navItemAnchor = document.createElement('a');
      navItemAnchor.textContent = section.querySelector('h2').textContent; 
      navItemAnchor.className = 'menu__link';
      navItemAnchor.setAttribute('href', '#' + section.id);

      navItem.appendChild(navItemAnchor);
      navbar.appendChild(navItem);
   } 
}


// Add class 'active' to section when near top of viewport
function activateSection(event) {
   const sections = document.querySelectorAll('section');
   for (section of sections) {
      section.className = '';
      if (isElementInViewPort(section)) {
         section.className = 'active-section';
         console.log(section.id);
      }
   }
}

// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

buildMenu();
// Set sections as active
document.addEventListener('scroll', activateSection);
// Scroll to section on link click

