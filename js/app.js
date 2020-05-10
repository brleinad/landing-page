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

const SECTION_PADDING = 64;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
 * @description Determine if an element is in the viewport
 * @param {Element} element 
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

/**
* @description Build the menu navbar list items
*/
function buildMenu() {
   // build the nav
   const sections = document.querySelectorAll('section');
   const navbar = document.querySelector('#navbar__list');

   for (section of sections) {
      const navItem = document.createElement('li');
      const navItemAnchor = document.createElement('a');
      navItemAnchor.textContent = section.id.match(/\d/)[0]; //get the number
      navItemAnchor.className = 'menu__link';
      navItemAnchor.setAttribute('href', '#' + section.id);

      navItem.appendChild(navItemAnchor);
      navbar.appendChild(navItem);
   } 
}


/**
* @description Add class 'active' to section when near top of viewport
* @param {Event} event
*/
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

/**
* @description Scroll to anchor ID using scrollTO event
* @param {Event} event
*/
function scrollToSection(event) {
   event.preventDefault();
   const section = document.querySelector(event.target.attributes.href.value);
   const rect = section.getBoundingClientRect();
   const bodyRect = document.body.getBoundingClientRect();
   //sectionTop = rect.top - bodyRect.top + rect.height/2;
   const sectionDiv = section.querySelector('.landing__container');
   const sectionPadding = parseInt(window.getComputedStyle(sectionDiv).padding);
   console.log(`BOB: ${sectionPadding}`);
   sectionTop = rect.top + window.scrollY - sectionPadding;

   //section.scrollIntoView();
   window.scrollTo({
      top: sectionTop,
      left: window.screenLeft,
      behavior: 'smooth'
   });
   console.log(`Going to ${section.id}, TOP:${sectionTop}`);
}


/**
 * End Main Functions
 * Begin Events
 * 
*/

buildMenu();
// Set sections as active
document.addEventListener('scroll', activateSection);
// Scroll to section on link click
sectionLinks = document.querySelectorAll('.menu__link');
for (link of sectionLinks) {
   link.addEventListener('click', scrollToSection);
}

