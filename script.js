// Minimal JavaScript: smooth scrolling for internal links and simple mobile nav
// Edit: replace contact email and social URLs in index.html directly.

document.addEventListener('DOMContentLoaded', function(){
  // Set current year in footer
  var y = new Date().getFullYear();
  var el = document.getElementById('year');
  if(el) el.textContent = y;

  // Smooth scroll for internal links (handles browsers without CSS smooth behavior)
  var internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach(function(link){
    link.addEventListener('click', function(e){
      var targetId = link.getAttribute('href').slice(1);
      if(!targetId) return; // ignore top-of-page links
      var target = document.getElementById(targetId);
      if(target){
        e.preventDefault();
        target.focus({preventScroll:true});
        target.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  // Mobile nav toggle (adds minimal behavior — can be styled further)
  var navToggle = document.querySelector('.nav-toggle');
  var navList = document.getElementById('primary-menu');
  if(navToggle && navList){
    navToggle.addEventListener('click', function(){
      var expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      // When hidden set aria-hidden and CSS can hide it
      if(!expanded){
        navList.setAttribute('aria-hidden','false');
      } else {
        navList.setAttribute('aria-hidden','true');
      }
    });
  }
});
