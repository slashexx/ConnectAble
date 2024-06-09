const getStarted = document.getElementById("getStarted");
getStarted.addEventListener("click" , ()=> {
    window.location.href="login.html"
})

// Add this to script.js
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
  
    document.querySelectorAll('.fade-in').forEach(element => {
      observer.observe(element);
    });
  });
  