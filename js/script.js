const navMenu = document.querySelector(".nav-menu");

navMenu.addEventListener("click", (e) => {
  e.preventDefault();

  const target = e.target.getAttribute("href");
  const section = document.querySelector(target);

  if (section) { // Add a check to ensure section exists
    const sectionTop = section.offsetTop - 80;

    window.scrollTo({
      top: sectionTop,
      behavior: "smooth",
    });
  }
});


function toggleMenu() {
  const navMenu = document.getElementById('nav-menu');
  navMenu.classList.toggle('collapsed');
}
