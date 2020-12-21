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
//define the navbar element
const navbarList = document.getElementById('navbar__list');
//get siblings of any element
const siblings = n => [...n.parentElement.children].filter(c=>c!=n);

/**
 * End Global Variables
 * Start Helper Functions
 *
*/



/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

//get the active section using IntersectionObserver API
function getActiveSection(){

  window.addEventListener('scroll', function() {

    if(!!window.IntersectionObserver){
      let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
        if(entry.isIntersecting){
          const ativeSection = entry.target;
          ativeSection.classList.add('your-active-class');
          const secSiblings = siblings(ativeSection);
          for (const secSibling of secSiblings) {
            secSibling.classList.remove('your-active-class');
          }
          entry.target.src = entry.target.dataset.src;
          observer.unobserve(entry.target);
          const items = navbarList.children;
          for(const item of items){
            if(item.classList.contains(ativeSection.id)){
              item.classList.add('active-link');
              const itemSiblings = siblings(item);
              for (const sibling of itemSiblings) {
                sibling.classList.remove('active-link');
              }
            }
          }
        }
        });
      }, {rootMargin: "0px 0px -400px 0px"});
      document.querySelectorAll('section').forEach(section => { observer.observe(section) });
    }

    else console.log('error');

  });
}

// build the nav
function buildNav(){
  const sections = document.querySelectorAll('section');
  for(const section of sections){

    console.log(section.getAttribute('data-nav'));

    const item = document.createElement('li');
    const sectionName = section.getAttribute('data-nav');
    const sectionId = section.id;
    navbarList.appendChild(item);
    item.classList.add('menu-item', sectionId);
    item.innerHTML = '<a href="#!">'+sectionName+'</a>';
    item.onclick = function () {
      section.scrollIntoView({'behavior':'smooth'});
    }
  }
}

buildNav();
getActiveSection();


// Add class 'active' to section when near top of viewport
// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu

// Scroll to section on link click

// Set sections as active
