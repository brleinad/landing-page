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

/**
 * @description Determine if an element is in the viewport
 * @param {Element} element 
 */
function isElementInViewPort(element) {
   const rect = element.getBoundingClientRect();
   return ((rect.top >= 0) && (rect.bottom <= window.innerHeight));
}

/**
 * @description get the top position of a section to be used in scrollTo function.
 * @param {HTMLSectionElement} section -  
 */
function getSectionTop(section) {
   const rect = section.getBoundingClientRect();
   const bodyRect = document.body.getBoundingClientRect();
   const sectionChild = section.firstElementChild;
   const sectionPadding = parseInt(window.getComputedStyle(sectionChild).padding);
   sectionTop = rect.top + window.scrollY - sectionPadding;
   return (sectionTop);
}

/**
 * @description Create a nav item given a section ID
 * @param {string} sectionId - The section's ID to be used as reference
 */
function makeNavItem(sectionId) {
   const navItem = document.createElement('li');
   navItemAnchor = makeNavItemAnchor(sectionId);
   navItem.appendChild(navItemAnchor);
   return navItem;
}

/**
 * @description Create a nav item anchor given a section ID
 * @param {string} sectionId - The section's ID to be used as reference
 */
function makeNavItemAnchor(sectionId) {
   const navItemAnchor = document.createElement('a');
   navItemAnchor.textContent = sectionId.match(/\d/)[0]; //get the number
   navItemAnchor.className = 'menu__link';
   navItemAnchor.setAttribute('href', '#' + sectionId);
   navItemAnchor.setAttribute('id', sectionId + 'link');
   return navItemAnchor;
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
      navbar.appendChild(makeNavItem(section.id));
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

/*
 * @description add the class 'active' to the section item in the nav bar corresponding to the active section.
 * */
function activateNavItem(event) {
   const sections = document.querySelectorAll('section');
   for (section of sections) {
      const itemId = '#' + section.id + 'link';
      const navItem = document.querySelector(itemId);
      navItem.setAttribute('class', 'menu__link');
      if (isElementInViewPort(section)) {
         console.log(itemId);
         navItem.setAttribute('class', 'active-menu__link');
      }
   }
}

/**
* @description Scroll to anchor ID using scrollTO event
* @param {Event} event
*/
function scrollToSection(event) {
   //stop fast scrolling when clicking a link
   event.preventDefault();
   //Get section from clicked link's href
   const section = document.querySelector(event.target.attributes.href.value);

   window.scrollTo({
      top: getSectionTop(section),
      left: window.screenLeft,
      behavior: 'smooth'
   });
}


/**
 * End Main Functions
 * Begin Events
 * 
*/

buildMenu();
// Set sections as active
document.addEventListener('scroll', activateSection);
document.addEventListener('scroll', activateNavItem);
// Scroll to section on link click
sectionLinks = document.querySelectorAll('.menu__link');
for (link of sectionLinks) {
   link.addEventListener('click', scrollToSection);
}

